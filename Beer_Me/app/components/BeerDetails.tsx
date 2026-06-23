import { StyleSheet, View, Modal, ScrollView, Text, Image, Alert, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BeerType } from "../types/types";
import { useEffect, useState } from "react";
import { useBeerList } from "../context/beerListContext";
import AddBeer from "./AddBeer";

type Props = {
    onClose: () => void;
    beer: BeerType;
}

export default function BeerDetails({ onClose: closeBeerDetails, beer }: Props) {
    if (!beer) return null;

    const host = process.env.EXPO_PUBLIC_IP ?? 'no IP found';
    const insets = useSafeAreaInsets();   // safe area without SafeAreaView wrapping the whole screen
    const { deleteBeerContext, beers } = useBeerList();
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [beerState, setBeerState] = useState<BeerType>(beer);

    useEffect(() => {
        const updated = beers.find(b => b.id === beer.id);
        if (updated) setBeerState(updated);
    }, [beers, beer.id]);

    const deleteBeer = async (id: number) => {
        setIsDeleting(true);
        const deleted = await deleteBeerContext(id);
        if (deleted.ok) closeBeerDetails();
        else { alert("Failed to delete beer: " + deleted.message); setIsDeleting(false); }
    };

    const confirmDelete = (id: number) => {
        Alert.alert("Recycle This Beer?", "This brew will be gone forever.", [
            { text: "Keep It", style: "cancel" },
            { text: "Recycle", style: "destructive", onPress: () => deleteBeer(id) }
        ]);
    };

    const beerTypeLabel = [beerState.type, beerState.subType].filter(Boolean).join(' › ');

    return (
        // Plain View + manual top padding so the header is always reachable
        <View style={[styles.root, { paddingTop: insets.top }]}>

            {/* ── Header — always pinned, never obscured ── */}
            <View style={styles.header}>
                <Pressable
                    style={styles.closeBtn}
                    onPress={closeBeerDetails}
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                    <Text style={styles.closeBtnText}>✕</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Beer Details</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView
                contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 32 }]}
                showsVerticalScrollIndicator={false}
            >
                {/* ── Hero image — full width, not cropped ── */}
                <View style={styles.heroContainer}>
                    <Image
                        source={{ uri: `${host}/img/${beerState.image}` }}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />
                    {/* Rating overlay — TOP LEFT */}
                    <View style={styles.ratingOverlay}>
                        <Text style={styles.ratingStar}>★</Text>
                        <Text style={styles.ratingNumber}>{beerState.rating}</Text>
                        <Text style={styles.ratingDenom}>/5</Text>
                    </View>
                </View>

                {/* ── Name & type ── */}
                <View style={styles.nameCard}>
                    <Text style={styles.beerName}>{beerState.name}</Text>
                    {beerTypeLabel ? (
                        <View style={styles.typePill}>
                            <Text style={styles.typePillText}>{beerTypeLabel}</Text>
                        </View>
                    ) : null}
                </View>

                {/* ── Info rows ── */}
                <View style={styles.infoCard}>
                    {([
                        { label: '🍺  Brewery',     value: beerState.brewery },
                        { label: '📍  Location',    value: beerState.location },
                        { label: '📅  Date Added',  value: beerState.date },
                        beerState.updatedDate
                            ? { label: '✏️  Last Updated', value: beerState.updatedDate }
                            : null,
                    ] as ({ label: string; value: string | undefined } | null)[])
                        .filter((r): r is { label: string; value: string | undefined } => r !== null)
                        .map((row) => (
                            <View key={row.label} style={styles.infoRow}>
                                <Text style={styles.infoLabel}>{row.label}</Text>
                                <Text style={styles.infoValue}>{row.value || '—'}</Text>
                            </View>
                        ))}
                </View>

                {/* ── Tasting notes ── */}
                <View style={styles.descCard}>
                    <Text style={styles.descTitle}>Tasting Notes</Text>
                    <Text style={styles.descBody}>
                        {beerState.description || 'Nothing here yet — tap Edit to add your notes.'}
                    </Text>
                </View>

                {/* ── Action buttons ── */}
                <View style={styles.actionRow}>
                    <Pressable
                        style={[styles.actionBtn, styles.editBtn]}
                        onPress={() => setIsEditVisible(true)}
                    >
                        <Text style={styles.actionBtnText}>✏️  Edit Beer</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.actionBtn, styles.deleteBtn, isDeleting && styles.disabledBtn]}
                        onPress={() => { if (!isDeleting) confirmDelete(beerState.id); }}
                        disabled={isDeleting}
                    >
                        <Text style={styles.actionBtnText}>🗑  Delete</Text>
                    </Pressable>
                </View>
            </ScrollView>

            <Modal animationType="slide" visible={isEditVisible} onRequestClose={() => setIsEditVisible(false)}>
                <AddBeer onClose={() => setIsEditVisible(false)} beer={beerState} />
            </Modal>
        </View>
    );
}

const HEADER_BG = '#F5EAD8';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#FDF6EC',
    },

    // ── Header ────────────────────────────────────────────────
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: HEADER_BG,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 2,
        borderBottomColor: '#E8D5B7',
        // Shadow below header
        shadowColor: '#C4A882',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#3D2B1F',
        letterSpacing: 0.4,
    },
    closeBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#3D2B1F',   // dark, always visible
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeBtnText: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: '800',
    },

    // ── Scroll ────────────────────────────────────────────────
    scrollContent: {
        // paddingBottom set dynamically above
    },

    // ── Hero ──────────────────────────────────────────────────
    heroContainer: {
        position: 'relative',
        backgroundColor: '#F5EAD8',
        width: '100%',
        height: 300,         // fixed height; image uses resizeMode="contain" so nothing is cropped
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    // Rating — TOP LEFT
    ratingOverlay: {
        position: 'absolute',
        top: 14,
        left: 14,
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(18,10,4,0.78)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 30,
        borderWidth: 1.5,
        borderColor: '#E8604C',
        gap: 2,
    },
    ratingStar: {
        fontSize: 18,
        color: '#FF6B4A',
        lineHeight: 26,
    },
    ratingNumber: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FF6B4A',
        lineHeight: 28,
    },
    ratingDenom: {
        fontSize: 13,
        color: '#FFAB96',
        fontWeight: '600',
        lineHeight: 24,
    },

    // ── Name card ─────────────────────────────────────────────
    nameCard: {
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        marginTop: 16,
        padding: 18,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: '#EFE0C8',
        shadowColor: '#C4A882',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
    },
    beerName: {
        fontSize: 26,
        fontWeight: '800',
        color: '#3D2B1F',
        marginBottom: 10,
    },
    typePill: {
        alignSelf: 'flex-start',
        backgroundColor: '#EAF4FB',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: '#B8D8EB',
    },
    typePillText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#5B8FA8',
        letterSpacing: 0.3,
    },

    // ── Info card ─────────────────────────────────────────────
    infoCard: {
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        marginTop: 14,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: '#EFE0C8',
        overflow: 'hidden',
        shadowColor: '#C4A882',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F5EAD8',
    },
    infoLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: '#A08060',
    },
    infoValue: {
        fontSize: 13,
        color: '#3D2B1F',
        fontWeight: '500',
        flex: 1,
        textAlign: 'right',
        marginLeft: 8,
    },

    // ── Description card ─────────────────────────────────────
    descCard: {
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        marginTop: 14,
        padding: 18,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: '#EFE0C8',
        shadowColor: '#C4A882',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
    },
    descTitle: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.5,
        color: '#5B8FA8',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    descBody: {
        fontSize: 15,
        color: '#5A4030',
        lineHeight: 24,
    },

    // ── Actions ───────────────────────────────────────────────
    actionRow: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginTop: 22,
        gap: 12,
    },
    actionBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.22,
        shadowRadius: 4,
        elevation: 3,
    },
    editBtn: {
        backgroundColor: '#5B8FA8',
        shadowColor: '#5B8FA8',
    },
    deleteBtn: {
        backgroundColor: '#E8604C',
        shadowColor: '#E8604C',
    },
    disabledBtn: {
        opacity: 0.5,
    },
    actionBtnText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#FFF',
    },
});
