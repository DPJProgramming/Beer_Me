import { useState } from 'react';
import { TextInput, StyleSheet, Text, ScrollView, Image, Alert, View, Button, Pressable, KeyboardAvoidingView, Platform} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import {useForm} from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { BeerType } from '../types/types';


async function getImage() : Promise<string | undefined> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
        Alert.alert("Cant upload image");
    } 
    else {
        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.canceled) {
            return result.assets[0].uri;
        }
    }
    return undefined;
};

// export type BeerFormValues = {
//     name: string;
//     rating: number;
//     image?: string | undefined;
//     type?: string;
//     subType?: string;
//     brewery?: string;
//     description?: string;
//     location?: string;
// };

type BeerFormProps = {
    onSubmit: (values: BeerType) => void;
    onClose: () => void;
    initialValues?: Partial<BeerType>;
    accept: string;
};

export default function BeerForm({ onSubmit, onClose, initialValues, accept }: BeerFormProps) {
    const pickImage = async () => {
        const image = await getImage();
        
        if(image){
            setImage(image);
        }
    };

    const submitForm = () => {
        onSubmit({ id, image, name, type, subType, rating, brewery, description, location });
    };

    const form = useForm<BeerType>({
        defaultValues: {
            id: initialValues?.id ?? 0,
            image: initialValues?.image ?? undefined,
            name: initialValues?.name ?? "", 
            type: initialValues?.type ?? "",
            subType: initialValues?.subType ?? "",
            rating: initialValues?.rating ?? 0,
            brewery: initialValues?.brewery ?? "",
            description: initialValues?.description ?? "",
            location: initialValues?.location ?? "",
        }
    })

    const [image, setImage] = useState<string | undefined>(undefined);
    const [name, setName] = useState<string>("");

    const [type, setType] = useState<string>("");
    const [typeOpen, setTypeOpen] = useState(false);
    const [typeItems, setTypeItems] = useState([
        { label: "IPA", value: "IPA" },
        { label: "Blonde", value: "Blonde" },
        { label: "Bock", value: "Bock" },
        { label: "Brown", value: "Brown" },
        { label: "Lager", value: "Lager" },
        { label: "Pilsner", value: "Pilsner" },
        { label: "Pale Ale", value: "Pale Ale" },
        { label: "India Pale Ale (IPA)", value: "India Pale Ale (IPA)" },
        { label: "Wheat Beer", value: "Wheat Beer" },
        { label: "Amber Ale", value: "Amber Ale" },
        { label: "Stout", value: "Stout" },
        { label: "Porter", value: "Porter" },
        { label: "Brown Ale", value: "Brown Ale" },
        { label: "Blonde Ale", value: "Blonde Ale" },
        { label: "Other", value: "Other" }
    ]);

    const [subType, setSubType] = useState<string>("");
    const [subTypeOpen, setSubTypeOpen] = useState(false);
    const [subTypeItems, setSubTypeItems] = useState([
        { label: "Hazy / New England IPA", value: "Hazy / New England IPA" },
        { label: "West Coast IPA", value: "West Coast IPA" },
        { label: "American Pale Ale (APA)", value: "American Pale Ale (APA)" },
        { label: "Hefeweizen", value: "Hefeweizen" },
        { label: "Belgian Witbier", value: "Belgian Witbier" },
        { label: "Dry Stout", value: "Dry Stout" },
        { label: "Milk Stout (Sweet Stout)", value: "Milk Stout (Sweet Stout)" },
        { label: "Vienna Lager", value: "Vienna Lager" },
        { label: "Märzen / Oktoberfest", value: "Märzen / Oktoberfest" },
        { label: "Doppelbock", value: "Doppelbock" },
        { label: "Other", value: "Other" }
    ]);

    const [id, setId] = useState<number>(initialValues?.id ?? 0);
    const [rating, setRating] = useState<number>(initialValues?.rating ?? 0);
    const [brewery, setBrewery] = useState<string>(initialValues?.brewery ?? "");
    const [description, setDescription] = useState<string>(initialValues?.description ?? "");
    const [location, setLocation] = useState<string>(initialValues?.location ?? "");
    
    return (
        <View style={formStyles.mainContainer}>
            <ScrollView>
                <Pressable onPress={() => {setSubTypeOpen(false); setTypeOpen(false)}}>
                    <Text style={formStyles.label}>Name *</Text>
                    <TextInput style={formStyles.input} placeholder="Name" onChangeText={setName} onFocus={() => {setSubTypeOpen(false); setTypeOpen(false)}}/>

                    <Text style={formStyles.label}>Photo</Text>
                    <View style={formStyles.imageContainer}>
                        {image && (
                            <Image style={formStyles.image} source={{ uri: image }} />
                        )}
                        <View style={formStyles.buttonColumn}>
                            <Pressable style={formStyles.imageButton} onPress={pickImage}>
                                <Text style={{ color: "white" }}>
                                    {image && "Change photo" || "Choose a photo"}
                                </Text>
                            </Pressable>
                            {image && (
                                <Pressable onPress={() => setImage(undefined)} style={formStyles.removeButton}>
                                    <Text style={{ color: "white" }}>Remove photo</Text>
                                </Pressable>                    
                            )}
                        </View>
                    </View>

                    <Text style={formStyles.label}>Type</Text>
                    <View style={{ zIndex: 2 }}>
                        <DropDownPicker
                            open={typeOpen}
                            value={type}
                            items={typeItems}
                            setOpen={setTypeOpen}
                            setValue={setType}
                            setItems={setTypeItems}
                            placeholder="What type of beer is this?"
                            listMode="SCROLLVIEW"
                            style={[formStyles.input, { zIndex: 3 }]}
                            labelStyle={{ textAlign: 'center' }}
                            listItemLabelStyle={{ textAlign: 'center' }}
                            onOpen={() => {setSubTypeOpen(false);}}
                        />
                    </View>

                    <Text style={formStyles.label}>Sub-Type</Text>
                    <View style={{ zIndex: 1 }} onFocus={() => {setTypeOpen(false)}}>
                        <DropDownPicker 
                            open={subTypeOpen}
                            value={subType}
                            items={subTypeItems}
                            setOpen={setSubTypeOpen}
                            setValue={setSubType}
                            setItems={setSubTypeItems}
                            placeholder="If this beer has a sub-type, select it"
                            listMode="SCROLLVIEW"
                            style={[formStyles.input, { zIndex: 2 }]}
                            labelStyle={{ textAlign: 'center' }}
                            listItemLabelStyle={{ textAlign: 'center' }}
                            onOpen={() => {setTypeOpen(false);}}
                        />
                    </View>

                    <Text style={formStyles.label}>Rating *</Text>
                    <TextInput style={formStyles.input} placeholder="Rating" keyboardType="numeric" onChangeText={(text) => setRating(Number(text))} onFocus={() => {setSubTypeOpen(false); setTypeOpen(false)}} />

                    <Text style={formStyles.label}>Brewery</Text>
                    <TextInput style={formStyles.input} placeholder="Brewery" onChangeText={setBrewery} onFocus={() => {setSubTypeOpen(false); setTypeOpen(false)}} />

                    <Text style={formStyles.label}>Description</Text>
                    <TextInput style={formStyles.input} placeholder="Description" multiline onChangeText={setDescription} onFocus={() => {setSubTypeOpen(false); setTypeOpen(false)}} />
                
                    <Text style={formStyles.label}>Location</Text>
                    <TextInput style={formStyles.input} placeholder="Location" onChangeText={setLocation} onFocus={() => {setSubTypeOpen(false); setTypeOpen(false)}} />
                </Pressable>
            </ScrollView>

            <View style={formStyles.footer}>
                <Pressable style={[formStyles.button, formStyles.accept]} onPress={form.handleSubmit(submitForm)}>
                    <Text style={formStyles.accept}>{accept}</Text>
                </Pressable>

                <Pressable style={[formStyles.button, formStyles.cancel]} onPress={onClose}>
                    <Text style={formStyles.cancel}>Cancel</Text>
                </Pressable>
            </View>
        </View>
    );
}

const formStyles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        width: "100%",
        alignSelf: "center",
    },
    label:{
        paddingLeft: 20,
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
        //marginBottom: 1
    },
    input:{
        alignSelf: "center",
        height: 40,
        width: "90%",
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 25,
        marginTop: 4,
        paddingHorizontal: 8
    },
    image:{
        width: 120,
        height: 120,
        borderRadius: 5,
    },
    imageContainer:{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 20,
        marginLeft: 20,
    },
    imageButton:{
        alignSelf: "flex-start",
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        marginLeft: 20,
        marginBottom: 20,
    },
    removeButton:{
        alignSelf: "flex-start",
        backgroundColor: "#ff4444",
        padding: 10,
        borderRadius: 5,
        marginLeft: 20,
        marginBottom: 20,
    },
    buttonColumn:{
        flexDirection: "column",
        gap: 8,
        flex: 1,
    },
    footer:{
        backgroundColor: "#cccaf6ff",
        borderWidth: 2,
        flexDirection: "row",
        padding: 30,
        height: 50,
        alignItems: "center",
        justifyContent: "space-between",
        //zIndex: 1,
    },
    button:{
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        height: 44,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 6,
    },
    cancel:{
        backgroundColor: "#ff0000ff",
        fontSize: 20,
        color: "#FFF",
    },
    accept:{
        backgroundColor: "#00c51aff",
        fontSize: 20,
        color: "#FFF",
    },
    types:{
        flex: 1,
    }
});