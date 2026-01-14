import { Button, StyleSheet, View, Modal, ScrollView, Text, Image, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BeerType } from "../types/types";
import { useState } from "react";
import { useBeerList } from "../context/beerListContext";
import AddBeer from "./AddBeer";

type Props = {
    onClose: () => void;
    beer: BeerType;
}

export default function BeerDetails( {onClose: closeBeerDetails, beer}: Props) {
    console.log(beer);
    if(!beer) {
        return null;
    }
    const host = process.env.EXPO_PUBLIC_IP ?? 'no IP found';
    const {removeBeerContext} = useBeerList(); //expose context for beer list
    const [isEditVisible, setIsEditVisible] = useState(false);

    const deleteBeer = (id: number) => {
        removeBeerContext(id);
        closeBeerDetails();
    }
    const openUpdateBeer = () => {
        setIsEditVisible(true);
    }
    const closeUpdateBeer = () => {
        setIsEditVisible(false);
    }

    const confirmDelete = (id: number) => {
            Alert.alert(
                "Confirm Deletion",
                "Are you sure you want to recycle this beer?", [
                    { text: "Cancel", style: "cancel", onPress: () => {} },
                    { text: "Delete", style: "destructive", onPress: () => deleteBeer(id) }
                ]
            );              
        }
    return (
        <SafeAreaView style={detailStyles.view}>
            <View style={detailStyles.header}>
                <Text style={detailStyles.headerTitle}>Beer Details</Text>
            </View>
            <ScrollView contentContainerStyle={detailStyles.scrollContent}>
                <View style={detailStyles.imageContainer}>
                    <Image 
                        source={{uri: `${host}/img/${beer.image}`}} 
                        style={detailStyles.image} 
                    />
                </View>
                
                <View style={detailStyles.contentCard}>
                    <Text style={detailStyles.beerName}>{beer.name}</Text>
                    <Text style={detailStyles.rating}>★ {beer.rating}/5</Text>
                </View>

                <View style={detailStyles.contentCard}>
                    <View style={detailStyles.infoRow}>
                        <Text style={detailStyles.label}>Type:</Text>
                        <Text style={detailStyles.value}>
                            {beer.type}
                            {beer.subType && `, ${beer.subType}`}
                            {!beer.type && ' (Tap Edit to add)'}
                        </Text>
                    </View>
                    <View style={detailStyles.infoRow}>
                        <Text style={detailStyles.label}>Brewery:</Text>
                        <Text style={detailStyles.value}>{beer.brewery || '(Tap Edit to add)'}</Text>
                    </View>
                    <View style={detailStyles.infoRow}>
                        <Text style={detailStyles.label}>Location:</Text>
                        <Text style={detailStyles.value}>{beer.location || '(Tap Edit to add)'}</Text>
                    </View>
                </View>

                <View style={detailStyles.contentCard}>
                    <Text style={detailStyles.label}>Description</Text>
                    <Text style={detailStyles.description}>{beer.description || '(Tap Edit to add)'}</Text>
                </View>

                <View style={detailStyles.buttonContainer}>
                    <View style={detailStyles.button}>
                        <Button title="Edit Beer" onPress={() => openUpdateBeer()} color="#2905ba"/>

                    </View>
                    <View style={detailStyles.button}>
                        <Button title="Delete" onPress={() => confirmDelete(beer.id)} color="#d32f2f"/>
                    </View>
                </View>
                
                <View style={detailStyles.closeButtonContainer}>
                    <Button title="Close" onPress={closeBeerDetails} color="#666"/>
                </View>
                <Modal
                    animationType="slide" 
                    visible={ isEditVisible} 
                    onRequestClose={closeUpdateBeer}
                >
                    {<AddBeer onClose={closeUpdateBeer} beer={beer}/>}
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}

const detailStyles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: "#2905baff",
        paddingVertical: 16,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#FFF",
    },
    scrollContent: {
        paddingBottom: 30,
    },
    imageContainer: {
        alignItems: 'center',
        paddingVertical: 24,
        backgroundColor: '#fff',
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    contentCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 16,
        padding: 16,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    beerName: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },
    rating: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2905baff',
    },
    infoRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: '#333',
        marginLeft: 8,
        flex: 1,
    },
    description: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginTop: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 24,
        gap: 12,
    },
    button: {
        flex: 1,
    },
    closeButtonContainer: {
        marginHorizontal: 16,
        marginTop: 16,
    },
});
