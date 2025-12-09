import { useState } from 'react';
import { TextInput, StyleSheet, Text, ScrollView, Image, Alert, View} from 'react-native';
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

export default function BeerForm() {
    const [image, setImage] = useState<string | undefined>(undefined);

    const pickImage = async () => {
        const image = await getImage();
        
        if(image){
            setImage(image);
        }
    };

    return (
        <View style={formStyles.mainContainer}>
            <Text style={formStyles.label}>Name</Text>
            <TextInput style={formStyles.input} placeholder="Name" />

            

            <Text style={formStyles.label}>Type</Text>
            <Picker style={formStyles.input}>
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
            <Picker>
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

            <Text style={formStyles.label}>Rating</Text>
            <TextInput style={formStyles.input} placeholder="Rating" keyboardType="numeric" />

            <Text style={formStyles.label}>Brewery</Text>
            <TextInput style={formStyles.input} placeholder="Brewery" />

            <Text style={formStyles.label}>Description</Text>
            <TextInput style={formStyles.input} placeholder="Description" multiline />

            <Text style={formStyles.label}>Location</Text>
            <TextInput style={formStyles.input} placeholder="Location" />
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
});