import { useState } from 'react';
import { TextInput, StyleSheet, Text, ScrollView, Image, Alert, View, Button, Pressable} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import {Picker} from '@react-native-picker/picker';

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

export type BeerFormValues = {
  image: string | undefined;
  name: string;
  type: string;
  subType: string;
  rating: number | undefined;
  brewery: string;
  description: string;
  location: string;
  date: string;
};

type BeerFormProps = {
    onSubmit: (values: BeerFormValues) => void;
    onClose: () => void;
    initialValues?: Partial<BeerFormValues>;
    accept: string;
};

export default function BeerForm({ onSubmit, onClose, initialValues, accept }: BeerFormProps) {
    const [image, setImage] = useState<string | undefined>(undefined);
    const [name, setName] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [subType, setSubType] = useState<string>("");
    const [rating, setRating] = useState<number | undefined>(undefined);
    const [brewery, setBrewery] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [date, setDate] = useState<string>("");

    const pickImage = async () => {
        const image = await getImage();
        
        if(image){
            setImage(image);
        }
    };

    const submitForm = () => {
        onSubmit({ image, name, type, subType, rating, brewery, description, location, date });
    };

    return (
        <View style={formStyles.mainContainer}>
            <ScrollView>
                <Text style={formStyles.label}>Name *</Text>
                <TextInput style={formStyles.input} placeholder="Name" onChangeText={setName}/>

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
                <Picker style={formStyles.input} onValueChange={setType}>
                    <Picker.Item label="IPA" value="IPA" />
                    <Picker.Item label="Blonde" value="Blonde" />
                    <Picker.Item label="Bock" value="Bock" />
                    <Picker.Item label="Brown" value="Brown" />
                    <Picker.Item label="Lager" value="Lager" />
                    <Picker.Item label="Pilsner" value="Pilsner" />
                    <Picker.Item label="Pale Ale" value="Pale Ale" />
                    <Picker.Item label="India Pale Ale (IPA)" value="India Pale Ale (IPA)" />
                    <Picker.Item label="Wheat Beer" value="Wheat Beer" />
                    <Picker.Item label="Amber Ale" value="Amber Ale" />
                    <Picker.Item label="Stout" value="Stout" />
                    <Picker.Item label="Porter" value="Porter" />
                    <Picker.Item label="Brown Ale" value="Brown Ale" />
                    <Picker.Item label="Blonde Ale" value="Blonde Ale" />
                    <Picker.Item label="Other" value="Other" />
                </Picker>


                <Text style={formStyles.label}>Sub-Type</Text>
                <Picker style={formStyles.input} onValueChange={setSubType}>
                    <Picker.Item label="Hazy / New England IPA (subtype of IPA — juicy, low bitterness)" value="Hazy / New England IPA" />
                    <Picker.Item label="West Coast IPA (subtype of IPA — clear, piney, bitter)" value="West Coast IPA" />
                    <Picker.Item label="American Pale Ale (APA) (subtype of Pale Ale — hoppy but balanced)" value="American Pale Ale (APA)" />
                    <Picker.Item label="Hefeweizen (subtype of Wheat Beer — unfiltered, banana & clove notes)" value="Hefeweizen" />
                    <Picker.Item label="Belgian Witbier (subtype of Wheat Beer — brewed with orange peel & coriander)" value="Belgian Witbier" />
                    <Picker.Item label="Dry Stout (subtype of Stout — smooth, roasty, like Guinness)" value="Dry Stout" />
                    <Picker.Item label="Milk Stout (Sweet Stout) (subtype of Stout — creamy, slightly sweet)" value="Milk Stout (Sweet Stout)" />
                    <Picker.Item label="Vienna Lager (subtype of Lager — reddish-amber, toasty flavor)" value="Vienna Lager" />
                    <Picker.Item label="Märzen / Oktoberfest (subtype of Lager — malty, medium-bodied)" value="Märzen / Oktoberfest" />
                    <Picker.Item label="Doppelbock (subtype of Bock — rich, strong, dark lager)" value="Doppelbock" />
                    <Picker.Item label="Other" value="Other" />
                </Picker>

                <Text style={formStyles.label}>Rating *</Text>
                <TextInput style={formStyles.input} placeholder="Rating" keyboardType="numeric" onChangeText={(text) => setRating(Number(text))} />

                <Text style={formStyles.label}>Brewery</Text>
                <TextInput style={formStyles.input} placeholder="Brewery" onChangeText={setBrewery} />

                <Text style={formStyles.label}>Description</Text>
                <TextInput style={formStyles.input} placeholder="Description" multiline onChangeText={setDescription} />

                <Text style={formStyles.label}>Location</Text>
                <TextInput style={formStyles.input} placeholder="Location" onChangeText={setLocation} />
            </ScrollView>

            <View style={formStyles.footer}>
                <Pressable style={[formStyles.button, formStyles.accept]} onPress={submitForm}>
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
    }
});