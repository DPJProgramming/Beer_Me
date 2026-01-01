import { StyleSheet, Text, View} from "react-native";
import BeerForm from "../components/BeerForm";
import { SafeAreaView } from "react-native-safe-area-context";
import {useBeerList} from "../context/beerListContext";
import { BeerType } from "../types/types";

type Props = {
    onClose: () => void;
}

export default function AddBeer( {onClose: closeAddBeer}: Props) {
    const {addBeerContext} = useBeerList();

    const addBeer = async (values: BeerType, onClose: () => void) => {
        const host = process.env.EXPO_PUBLIC_IP ?? 'no IP found';
        
        //append data from addBeer form
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('type', values.type ?? '');
        formData.append('subType', values.subType ?? '');
        formData.append('rating', values.rating.toString());
        formData.append('brewery', values.brewery ?? '');
        formData.append('description', values.description ?? '');
        formData.append('location', values.location ?? '');
        formData.append('date', new Date().toISOString().split('T')[0]);

        //handle image upload
        if (values.image) {
            const filename = values.image.split('/').pop() ?? 'upload.heic';
            const ext = filename.includes('.') ? filename.substring(filename.lastIndexOf('.') + 1).toLowerCase() : 'jpeg';
            const mimeType = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;

            formData.append('image', {
                uri: values.image,
                type: mimeType,
                name: filename,
            } as any);
        }

        //send to backend
        const config = {
            method:"post",
            body: formData,
        }
        const response = await fetch(`${host}/addBeer`, config);

        if(response.ok){
            alert('Beer added successfully');
            addBeerContext(values); // use context to update beer list on frontend
            onClose();
        }
        else{
            alert('Failed to add beer. Please try again.');
        }
    };

    return (
        <SafeAreaView style={addStyles.view}>
            <View style={addStyles.header}>
                <Text style={addStyles.title}>Pour a New Brew</Text>
            </View>

            <View style={addStyles.view}>
                <BeerForm onSubmit={(values) => addBeer(values, closeAddBeer)} onClose={closeAddBeer} accept={"Add"}/>
            </View>
        </SafeAreaView>
    );
}

const addStyles = StyleSheet.create({
    view:{
        flex: 1,
    },
    header: {
        height: 50,
        backgroundColor: "#2905baff",
        alignItems: "center",
        justifyContent: "center",
    },
    title:{
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
        color: "#FFF",
        paddingBottom: 4
    },
});
