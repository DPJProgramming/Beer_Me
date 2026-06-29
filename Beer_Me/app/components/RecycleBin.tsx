import {useEffect, useState} from "react";
import {useBeerList} from "./context/beerListContext";
import { StyleSheet, View, FlatList, Modal, Pressable, Image, Text, Alert, TextInput} from "react-native";
import { BeerType } from "./types/types";
import DropDownPicker from 'react-native-dropdown-picker';


export default function recycleBin(){
    let [beersInBin, setBeersInBin] = useState<BeerType[]>([]);
    let [searchedBeers, setSearchedBeers] = useState<BeerType[]>([]);
    let [displayBeers, setDisplayBeers] = useState<BeerType[]>([]);
    const [beerToRestore, setBeerToRestore] = useState<BeerType | null>(null);
    const [restoreBeer] = useBeerList;
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

    useEffect(() => {
        (async () => {
            try {
                const beers = await getRecycledBeers(host);
                setBeersInBin(beers);
                setDisplayBeers(beers);
            } 
            catch(err) {
                console.error(err);
            }
        })();
    }, []);

    const getRecycledBeers(host: string){
        const response = await fetch(`${host}/getRecycledBeers`, { method: 'GET' });
        return response.json();
    }

    const permantDelete(id: number){
        const response = await fetch(`${host}/permanentDelete`, { method: 'DELETE' });
        return response.json();
        //setBeersInBin filtering
    }

    const permantDeleteAll(){
        const response = await fetch(`${host}/permanentDeleteAll`, { method: 'DELETE' });
        return response.json();
        //setBeersInBin filtering or set to []
    }

    const confirmDelete = (id: number, messageOne: string, messageTwo: string) => {
            Alert.alert(messageOne, messageTwo, [
                { text: "Keep It", style: "cancel" },
                { text: "Delete It", style: "destructive", onPress: () => permantDelete(id) }
            ]);
    };

    const confirmDeleteAll = (id: number, messageOne: string, messageTwo: string) => {
            Alert.alert(messageOne, messageTwo, [
                { text: "Keep", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => permantDeleteAll() }
            ]);
    };

    const onSort = (val: string | null) => {
        if(val){
            const sortBeer = (sortBy: string) => {
       switch(sortBy){
            case "name":
                beersInBin = beersInBin.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "rating": //default sort for home page
                beersInBin = beersInBin.sort((a, b) => b.rating - a.rating);
                break;
            case "date asc":// default sort for myBeers page
                beersInBin = beersInBin.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                break;
            case "date desc":
                beersInBin = beersInBin.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                break;
            case "type":
                beersInBin = beersInBin.sort((a, b) => (a.type ?? "").localeCompare(b.type ?? ""));
                break;
            case "brewery":
                beersInBin = beersInBin.sort((a, b) => (a.brewery ?? "").localeCompare(b.brewery ?? ""));
                break;
            default:
                beersInBin = beersInBin;
        }

        setDisplayBeers([...displayBeers]);
    }
        }
    };

    const onSearch = (term: string) => {
        setSortOpen(false); // always collapse dropdown when typing
        searchBeers(term);
    };

    const searchBeers = (searchFor: string) => {
        const searchTerm = searchFor.toLowerCase().trim();

        if(searchTerm === ""){
            setDisplayBeers(beersInBin);
            return;
        }
    
        const filteredBeers = beersInBin.filter((beer) => 
                            beer.name.toLowerCase().startsWith(searchTerm)
                         || beer.type?.toLowerCase().startsWith(searchTerm)
                         || beer.subType?.toLowerCase().startsWith(searchTerm)
                         || beer.brewery?.toLowerCase().startsWith(searchTerm));

        setSearchedBeers(filteredBeers);
    }

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
                        <View style={styles.card}>
                            <View style={styles.imageWrapper}>
                                <Image
                                    source={{ uri: `${host}/img/${beer.image}` }}
                                    style={styles.cardImage}
                                />
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
                        </View>
                    )}
                />
            </View>
        </View>
    );
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
