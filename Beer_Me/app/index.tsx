import {useEffect, useState} from "react";
import { StyleSheet, View, FlatList, Modal, Pressable, Image, Text, Alert, TextInput} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DropDownPicker from 'react-native-dropdown-picker';
import {useBeerList} from "./context/beerListContext";
import AddBeer from "./components/AddBeer";
import { BeerType } from "./types/types";
import BeerDetails from "./components/BeerDetails";

export default function myBeers() {
    const insets = useSafeAreaInsets();
    const {beers, setBeers, deleteBeerContext, sortBeerContext, searchBeerContext, setOriginalBeers} = useBeerList();
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [selectedBeer, setSelectedBeer] = useState<BeerType | undefined>(undefined);
    const [sortOpen, setSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState<string>("date desc");
    const [sortOptions] = useState([
        { label: "Name", value: "name" },
        { label: "Rating", value: "rating" },
        { label: "Date ↑", value: "date asc" },
        { label: "Date ↓", value: "date desc" },
        { label: "Type", value: "type" },
        { label: "Brewery", value: "brewery" },
    ]);

    const host = process.env.EXPO_PUBLIC_IP ?? 'no IP found';
    const displayBeers = beers.filter((beer) => beer && beer.id !== undefined && beer.id !== null);

    useEffect(() => {
        (async () => {
            try {
                const beersData = await getBeers(host);
                setBeers(beersData);
                setOriginalBeers(beersData);
            } catch(err) {
                console.error(err);
            }
        })();
    }, []);

    const confirmDelete = (id: number) => {
        Alert.alert("Recycle This Beer?", "",[
            { text: "Keep It", style: "cancel" },
            { text: "Recycle", style: "destructive", onPress: () => deleteBeer(id) }
        ]);
    };

    const deleteBeer = async (id: number) => {
        setIsDeleting(true);
        const deleted = await deleteBeerContext(id);
        if (deleted.ok) closeBeerDetails();
        else alert("Failed to delete beer: " + deleted.message);
        setIsDeleting(false);
    };

    const openUpdateBeer = (beer: BeerType) => { setSelectedBeer(beer); setIsEditVisible(true); };
    const closeUpdateBeer = () => { setIsDetailsVisible(false); setIsEditVisible(false); };
    const openBeerDetails = (beer: BeerType) => { setSelectedBeer(beer); setIsDetailsVisible(true); };
    const closeBeerDetails = () => setIsDetailsVisible(false);

    const onSearch = (term: string) => {
        setSortOpen(false); // always collapse dropdown when typing
        searchBeerContext(term);
    };

    const onSort = (val: string | null) => {
        if (val) sortBeerContext(val);
    };

    return (
        <View style={[styles.mainContainer, { paddingTop: insets.top }]}>

            {/* ── Control bar — zIndex must be high so dropdown floats above FlatList ── */}
            <View style={styles.controlBar}>

                <View style={styles.controlGroup}>
                    <Text style={styles.controlLabel}>SORT BY</Text>
                    <DropDownPicker
                        open={sortOpen}
                        value={sortBy}
                        items={sortOptions}
                        setOpen={setSortOpen}
                        setValue={setSortBy}
                        listMode="SCROLLVIEW"
                        style={styles.pickerStyle}
                        dropDownContainerStyle={styles.dropdownContainer}
                        labelStyle={styles.pickerLabel}
                        listItemLabelStyle={styles.pickerLabel}
                        onChangeValue={onSort}
                        zIndex={3000}
                        zIndexInverse={1000}
                    />
                </View>

                <View style={styles.divider} />

                <View style={styles.controlGroup}>
                    <Text style={styles.controlLabel}>SEARCH</Text>
                    <TextInput
                        style={styles.searchInput}
                        onChangeText={onSearch}
                        onFocus={() => setSortOpen(false)}
                        placeholder="brewery, name, type..."
                        placeholderTextColor="#C4A882"
                    />
                </View>
            </View>

            {/* ── Beer Grid — lower z-order so the dropdown overlaps it ── */}
            <View style={styles.listWrapper}>
                <FlatList
                    numColumns={2}
                    data={displayBeers}
                    columnWrapperStyle={styles.row}
                    keyExtractor={(item, index) =>
                        item.id != null ? item.id.toString() : `missing-${index}`
                    }
                    contentContainerStyle={styles.listContent}
                    onScrollBeginDrag={() => setSortOpen(false)}
                    keyboardShouldPersistTaps="handled"
                    renderItem={({ item: beer }) => (
                        <Pressable
                            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
                            onPress={() => { setSortOpen(false); openBeerDetails(beer); }}
                        >
                            <View style={styles.imageWrapper}>
                                <Image
                                    source={{ uri: `${host}/img/${beer.image}` }}
                                    style={styles.cardImage}
                                />
                                {/* Rating badge — TOP LEFT */}
                                <View style={styles.ratingBadge}>
                                    <Text style={styles.ratingText}>★ {beer.rating}</Text>
                                </View>
                            </View>

                            <View style={styles.cardFooter}>
                                <Text style={styles.beerName} numberOfLines={1}>{beer.name}</Text>
                                <Text style={styles.beerBrewery} numberOfLines={1}>
                                    {beer.brewery || '—'}
                                </Text>
                            </View>
                        </Pressable>
                    )}
                />
            </View>

            <Modal animationType="slide" visible={selectedBeer !== undefined && isEditVisible} onRequestClose={closeUpdateBeer}>
                {selectedBeer && <AddBeer onClose={closeUpdateBeer} beer={selectedBeer} />}
            </Modal>
            <Modal animationType="slide" visible={selectedBeer !== undefined && isDetailsVisible} onRequestClose={closeBeerDetails}>
                {selectedBeer && <BeerDetails onClose={closeBeerDetails} beer={selectedBeer} />}
            </Modal>
        </View>
    );
}

async function getBeers(host: string) {
    const response = await fetch(`${host}/allBeers`, { method: 'GET' });
    return response.json();
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FDF6EC',
    },

    // ── Control bar ──────────────────────────────────────────
    controlBar: {
        flexDirection: 'row',
        backgroundColor: '#FFF8F0',
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 12,
        borderBottomWidth: 2,
        borderBottomColor: '#E8D5B7',
        gap: 12,
        alignItems: 'flex-start',
        // High zIndex so the open dropdown renders above FlatList on Android too
        zIndex: 999,
        elevation: 999,
        shadowColor: '#C4A882',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
    },
    controlGroup: {
        flex: 1,
    },
    controlLabel: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1.5,
        color: '#5B8FA8',
        marginBottom: 6,
    },
    divider: {
        width: 1,
        backgroundColor: '#E8D5B7',
        height: 46,
        alignSelf: 'center',
        marginTop: 16,
    },
    pickerStyle: {
        borderColor: '#E8D5B7',
        borderWidth: 1.5,
        borderRadius: 10,
        backgroundColor: '#FFF',
        height: 42,
        minHeight: 42,
    },
    dropdownContainer: {
        borderColor: '#E8D5B7',
        borderWidth: 1.5,
        borderRadius: 10,
        backgroundColor: '#FFF',
    },
    pickerLabel: {
        fontSize: 13,
        color: '#6B4F2A',
        textAlign: 'center',
    },
    searchInput: {
        height: 42,
        borderWidth: 1.5,
        borderColor: '#E8D5B7',
        borderRadius: 10,
        backgroundColor: '#FFF',
        paddingHorizontal: 12,
        fontSize: 13,
        color: '#6B4F2A',
    },

    // ── List ─────────────────────────────────────────────────
    listWrapper: {
        flex: 1,
        zIndex: 1,
    },
    listContent: {
        padding: 12,
        paddingBottom: 120,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 14,
    },

    // ── Card ─────────────────────────────────────────────────
    card: {
        width: '48.5%',
        backgroundColor: '#FFF',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 2.5,
        borderColor: '#FFFFFF',          // bright white border
        shadowColor: '#8A6030',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.22,
        shadowRadius: 8,
        elevation: 5,
    },
    cardPressed: {
        opacity: 0.88,
        transform: [{ scale: 0.975 }],
    },
    imageWrapper: {
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#F5EAD8',
    },
    ratingBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: 'rgba(18,10,4,0.76)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#E8604C',
    },
    ratingText: {
        color: '#FF6B4A',
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 0.4,
    },
    cardFooter: {
        paddingHorizontal: 10,
        paddingTop: 8,
        paddingBottom: 10,
        backgroundColor: '#FFFAF4',
    },
    beerName: {
        fontSize: 13,
        fontWeight: '700',
        color: '#3D2B1F',
        marginBottom: 2,
    },
    beerBrewery: {
        fontSize: 11,
        color: '#5B8FA8',
        fontWeight: '500',
    },
});
