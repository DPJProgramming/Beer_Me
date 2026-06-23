import { useState } from 'react';
import { TextInput, StyleSheet, Text, ScrollView, Image, Alert, View, Pressable } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import { BeerType } from '../types/types';

async function getImage(): Promise<string | undefined> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
        Alert.alert("Permission Needed", "Photo library access is required to upload a beer photo.");
        return undefined;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) return result.assets[0].uri;
    return undefined;
}

type BeerFormProps = {
    onSubmit: (values: BeerType) => void;
    onClose: () => void;
    initialValues?: Partial<BeerType>;
    accept: string;
};

export default function BeerForm({ onSubmit, onClose, initialValues, accept }: BeerFormProps) {
    const host = process.env.EXPO_PUBLIC_IP ?? 'no IP found';

    const [id] = useState<number>(initialValues?.id ?? 0);
    const [rating, setRating] = useState<number>(initialValues?.rating ?? 0);
    const [brewery, setBrewery] = useState<string>(initialValues?.brewery ?? "");
    const [description, setDescription] = useState<string>(initialValues?.description ?? "");
    const [location, setLocation] = useState<string>(initialValues?.location ?? "");
    const [image, setImage] = useState<string | undefined>(
        initialValues?.image ? `${host}/img/${initialValues.image}` : undefined
    );
    const [name, setName] = useState<string>(initialValues?.name ?? "");
    const [type, setType] = useState<string>(initialValues?.type ?? "");
    const [typeOpen, setTypeOpen] = useState(false);
    const [typeItems, setTypeItems] = useState([
        { label: "India Pale Ale (IPA)", value: "India Pale Ale (IPA)" },
        { label: "Pale Ale", value: "Pale Ale" },
        { label: "Wheat Beer", value: "Wheat Beer" },
        { label: "Lager", value: "Lager" },
        { label: "Amber/Red Ale", value: "Amber/Red Ale" },
        { label: "Brown Ale", value: "Brown Ale" },
        { label: "Porter", value: "Porter" },
        { label: "Stout", value: "Stout" },
        { label: "Other", value: "Other" },
    ]);
    const [subType, setSubType] = useState<string>(initialValues?.subType ?? "");
    const [subTypeOpen, setSubTypeOpen] = useState(false);
    const [subTypeItems, setSubTypeItems] = useState<{ label: string; value: string }[]>([]);

    const setSubTypeValues = (selectedType: string) => {
        const map: Record<string, { label: string; value: string }[]> = {
            "India Pale Ale (IPA)": [
                { label: "Hazy / New England IPA", value: "Hazy / New England IPA" },
                { label: "West Coast IPA", value: "West Coast IPA" },
                { label: "Session IPA", value: "Session IPA" },
                { label: "Other", value: "Other" },
            ],
            "Pale Ale": [
                { label: "American Pale Ale (APA)", value: "American Pale Ale (APA)" },
                { label: "English Pale Ale", value: "English Pale Ale" },
                { label: "Blonde Ale", value: "Blonde Ale" },
                { label: "Other", value: "Other" },
            ],
            "Wheat Beer": [
                { label: "Hefeweizen", value: "Hefeweizen" },
                { label: "American Wheat Beer", value: "American Wheat Beer" },
                { label: "Belgian Witbier", value: "Belgian Witbier" },
                { label: "Other", value: "Other" },
            ],
            "Lager": [
                { label: "Pilsner", value: "Pilsner" },
                { label: "Amber/Vienna", value: "Amber/Vienna" },
                { label: "Helles", value: "Helles" },
                { label: "Märzen / Oktoberfest", value: "Märzen / Oktoberfest" },
                { label: "Doppelbock", value: "Doppelbock" },
                { label: "Other", value: "Other" },
            ],
            "Amber/Red Ale": [
                { label: "Irish Red Ale", value: "Irish Red Ale" },
                { label: "American Amber Ale", value: "American Amber Ale" },
                { label: "Other", value: "Other" },
            ],
            "Brown Ale": [
                { label: "American Brown Ale", value: "American Brown Ale" },
                { label: "English Brown Ale", value: "English Brown Ale" },
                { label: "Dark Brown/Belgian Ale", value: "Dark Brown/Belgian Ale" },
                { label: "Other", value: "Other" },
            ],
            "Porter": [
                { label: "English Porter", value: "English Porter" },
                { label: "Robust Porter", value: "Robust Porter" },
                { label: "Baltic Porter", value: "Baltic Porter" },
                { label: "Other", value: "Other" },
            ],
            "Stout": [
                { label: "Dry Stout", value: "Dry Stout" },
                { label: "Milk Stout (Sweet Stout)", value: "Milk Stout (Sweet Stout)" },
                { label: "Imperial Stout", value: "Imperial Stout" },
                { label: "Other", value: "Other" },
            ],
            "Other": [{ label: "Other", value: "Other" }],
        };
        setSubTypeItems(map[selectedType] ?? []);
        setSubType("");
    };

    const pickImage = async () => {
        const picked = await getImage();
        if (picked) setImage(picked);
    };

    const collapseDropdowns = () => { setSubTypeOpen(false); setTypeOpen(false); };

    const submitForm = () => {
        onSubmit({
            id,
            name: name.trim(),
            type: type || "",
            subType: subType || "",
            rating,
            brewery: brewery.trim(),
            description: description.trim(),
            location: location.trim(),
            image,
            date: initialValues?.date ?? new Date().toISOString().split('T')[0],
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Pressable onPress={collapseDropdowns}>

                    {/* Name */}
                    <Text style={styles.label}>Beer Name <Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Hazy Afternoon"
                        placeholderTextColor="#C4A882"
                        value={name}
                        onChangeText={setName}
                        onFocus={collapseDropdowns}
                    />

                    {/* Photo */}
                    <Text style={styles.label}>Photo</Text>
                    <View style={styles.photoRow}>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.photoThumb} />
                        ) : (
                            <View style={styles.photoPlaceholder}>
                                <Text style={styles.photoPlaceholderText}>🍺</Text>
                            </View>
                        )}
                        <View style={styles.photoButtons}>
                            <Pressable style={styles.photoBtn} onPress={pickImage}>
                                <Text style={styles.photoBtnText}>
                                    {image ? '📷  Change' : '📷  Choose Photo'}
                                </Text>
                            </Pressable>
                            {image && (
                                <Pressable style={[styles.photoBtn, styles.removeBtn]} onPress={() => setImage(undefined)}>
                                    <Text style={styles.photoBtnText}>✕  Remove</Text>
                                </Pressable>
                            )}
                        </View>
                    </View>

                    {/* Type */}
                    <Text style={styles.label}>Type</Text>
                    <View style={{ zIndex: 20 }}>
                        <DropDownPicker
                            open={typeOpen}
                            value={type}
                            items={typeItems}
                            setOpen={setTypeOpen}
                            setValue={setType}
                            onChangeValue={(v) => setSubTypeValues(v as string)}
                            setItems={setTypeItems}
                            placeholder="What style is this brew?"
                            listMode="SCROLLVIEW"
                            style={styles.picker}
                            dropDownContainerStyle={styles.pickerDropdown}
                            labelStyle={styles.pickerLabel}
                            listItemLabelStyle={styles.pickerLabel}
                            placeholderStyle={{ color: '#C4A882' }}
                            onOpen={() => setSubTypeOpen(false)}
                        />
                    </View>

                    {/* Sub-Type */}
                    <Text style={styles.label}>Sub-Type</Text>
                    <View style={{ zIndex: 10 }}>
                        <DropDownPicker
                            open={subTypeOpen}
                            value={subType}
                            items={subTypeItems}
                            setOpen={setSubTypeOpen}
                            setValue={setSubType}
                            setItems={setSubTypeItems}
                            placeholder="Select a sub-type (optional)"
                            listMode="SCROLLVIEW"
                            style={styles.picker}
                            dropDownContainerStyle={styles.pickerDropdown}
                            labelStyle={styles.pickerLabel}
                            listItemLabelStyle={styles.pickerLabel}
                            placeholderStyle={{ color: '#C4A882' }}
                            onOpen={() => setTypeOpen(false)}
                        />
                    </View>

                    {/* Rating */}
                    <Text style={styles.label}>Rating <Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0 – 5"
                        placeholderTextColor="#C4A882"
                        value={rating.toString()}
                        keyboardType="numeric"
                        onChangeText={(t) => setRating(Number(t))}
                        onFocus={collapseDropdowns}
                    />

                    {/* Brewery */}
                    <Text style={styles.label}>Brewery</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Who brewed it?"
                        placeholderTextColor="#C4A882"
                        value={brewery}
                        onChangeText={setBrewery}
                        onFocus={collapseDropdowns}
                    />

                    {/* Description */}
                    <Text style={styles.label}>Tasting Notes</Text>
                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        placeholder="How does it taste? What do you love about it?"
                        placeholderTextColor="#C4A882"
                        value={description}
                        multiline
                        numberOfLines={4}
                        onChangeText={setDescription}
                        onFocus={collapseDropdowns}
                    />

                    {/* Location */}
                    <Text style={styles.label}>Location</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Where did you have this?"
                        placeholderTextColor="#C4A882"
                        value={location}
                        onChangeText={setLocation}
                        onFocus={collapseDropdowns}
                    />
                </Pressable>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <Pressable style={[styles.footerBtn, styles.cancelBtn]} onPress={onClose}>
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                </Pressable>
                <Pressable style={[styles.footerBtn, styles.submitBtn]} onPress={submitForm}>
                    <Text style={styles.submitBtnText}>{accept}</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF6EC',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 24,
    },

    // ── Field ─────────────────────────────────────────────────
    label: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1.2,
        color: '#A08060',
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    required: {
        color: '#E8604C',
    },
    input: {
        backgroundColor: '#FFF',
        borderWidth: 1.5,
        borderColor: '#E8D5B7',
        borderRadius: 12,
        height: 46,
        paddingHorizontal: 14,
        fontSize: 15,
        color: '#3D2B1F',
        marginBottom: 20,
    },
    multilineInput: {
        height: 100,
        paddingTop: 12,
        textAlignVertical: 'top',
    },

    // ── Photo ─────────────────────────────────────────────────
    photoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        marginBottom: 20,
    },
    photoThumb: {
        width: 100,
        height: 100,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: '#E8D5B7',
    },
    photoPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 14,
        backgroundColor: '#F5EAD8',
        borderWidth: 2,
        borderColor: '#E8D5B7',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoPlaceholderText: {
        fontSize: 36,
    },
    photoButtons: {
        flex: 1,
        gap: 8,
    },
    photoBtn: {
        backgroundColor: '#5B8FA8',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        alignItems: 'center',
    },
    removeBtn: {
        backgroundColor: '#E8604C',
    },
    photoBtnText: {
        color: '#FFF',
        fontSize: 13,
        fontWeight: '700',
    },

    // ── Pickers ───────────────────────────────────────────────
    picker: {
        borderWidth: 1.5,
        borderColor: '#E8D5B7',
        borderRadius: 12,
        backgroundColor: '#FFF',
        height: 46,
        minHeight: 46,
        marginBottom: 20,
    },
    pickerDropdown: {
        borderWidth: 1.5,
        borderColor: '#E8D5B7',
        borderRadius: 12,
        backgroundColor: '#FFF',
    },
    pickerLabel: {
        fontSize: 14,
        color: '#3D2B1F',
    },

    // ── Footer ────────────────────────────────────────────────
    footer: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#F5EAD8',
        borderTopWidth: 2,
        borderTopColor: '#E8D5B7',
    },
    footerBtn: {
        flex: 1,
        height: 50,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    cancelBtn: {
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#E8D5B7',
        shadowColor: 'transparent',
    },
    cancelBtnText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#A08060',
    },
    submitBtn: {
        backgroundColor: '#5B8FA8',
        shadowColor: '#5B8FA8',
    },
    submitBtnText: {
        fontSize: 15,
        fontWeight: '800',
        color: '#FFF',
        letterSpacing: 0.3,
    },
});
