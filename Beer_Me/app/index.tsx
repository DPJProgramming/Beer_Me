import {useEffect, useState} from "react";
import { StyleSheet, View, FlatList, Modal, Button, Pressable, Image, Text, Alert} from "react-native";
import Beer from "./components/Beer";
import {useBeerList} from "./context/beerListContext";
import AddBeer from "./components/AddBeer";
import { BeerType } from "./types/types";
import BeerDetails from "./components/BeerDetails";

//fetch beers from backend
export default function myBeers() {
    const {beers, setBeers, removeBeerContext} = useBeerList(); //expose context for beer list
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [selectedBeer, setSelectedBeer] = useState<BeerType | undefined>(undefined);

    //const host = `http://localhost:3000`; //for web
    const host = process.env.EXPO_PUBLIC_IP ?? 'no IP found';

    //fetch beers on initial load
    useEffect(() => {        
        (async () => {
            try{
                const beersData = await getBeers(host);
                setBeers(beersData);
            }
            catch(err){
                console.error(err);
                console.log("Failed to fetch beers");
            }
        })()
    }, []);
    
    // use context for CRUD operations
    const deleteBeer = (id: number) => {
        removeBeerContext(id);
    }
    const openUpdateBeer = (beer: BeerType) => {
        setSelectedBeer(beer);
        setIsEditVisible(true);
    }
    const closeUpdateBeer = () => {
        setIsEditVisible(false);
    }
    const openBeerDetails = (beer: BeerType) => {
        setSelectedBeer(beer);
        setIsDetailsVisible(true);
    }
    const closeBeerDetails = () => {
        setIsDetailsVisible(false);
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
        <View style={homeStyles.mainContainer}>
            <View >
                <FlatList
                    numColumns={2}
                    data={beers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item: beer}) => {
                        const beerType = (beer.subType && beer.subType.trim().length) ? beer.subType : beer.type;

                        return(
                            <View style={homeStyles.beerContainer}>
                                <Pressable onPress={() => openBeerDetails(beer)}>
                                    <View>
                                        <Text>{beer.name}</Text>
                                        <Text>{beer.rating}</Text>
                                    </View>
                                    <View>
                                        <Image 
                                            source={{uri: `${host}/img/${beer.image}`}} 
                                            style={homeStyles.image}
                                        />
                                    </View>
                                </Pressable>
                                <Button title="Delete" onPress={() => confirmDelete(beer.id)}/>
                                <Button title="Change" onPress={() => openUpdateBeer(beer)}/>
                            </View>
                        );
                    }}>
                </FlatList>
                <Modal
                    animationType="slide" 
                    visible={selectedBeer !== undefined && isEditVisible} 
                    onRequestClose={closeUpdateBeer}
                >
                    {selectedBeer && <AddBeer onClose={closeUpdateBeer} beer={selectedBeer}/>}
                </Modal>
                <Modal
                    animationType="slide" 
                    visible={selectedBeer !== undefined && isDetailsVisible} 
                    onRequestClose={closeBeerDetails}
                >
                    {selectedBeer && <BeerDetails onClose={closeBeerDetails} beer={selectedBeer}/>}
                </Modal>
            </View>
        </View> 
    );
}

async function getBeers(host : string){
    const response = await fetch(`${host}/allBeers`, {method: 'GET'});
    const beers = await response.json();

    return beers;
}

const homeStyles = StyleSheet.create({
    mainContainer:{
        flex: 1,
    },
    beerContainer:{
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
        backgroundColor: '#fff'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    }
});
