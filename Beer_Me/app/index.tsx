import {useEffect, useState} from "react";
import { StyleSheet, View, FlatList, Modal} from "react-native";
import Beer from "./components/Beer";
import {BeerListProvider} from "./context/beerListContext";
import {useBeerList} from "./context/beerListContext";
import AddBeer from "./components/AddBeer";
import { BeerType } from "./types/types";

//fetch beers from backend
export default function myBeers() {
    const {beers, setBeers, removeBeerContext} = useBeerList(); //expose context for beer list
    const [isEditVisible, setIsEditVisible] = useState(false);
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
    
    // Refresh beer list after delete
    const deleteBeer = (id: number) => {
        removeBeerContext(id);
    }

    const updateBeer = (id: number) => {
        console.log(`Update beer with id: ${id}`);
    }

    const openUpdateBeer = (beer: BeerType) => {
        setSelectedBeer(beer);
        setIsEditVisible(true);
    }
    const closeUpdateBeer = () => {
        setIsEditVisible(false);
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
                            <Beer
                                id={beer.id}
                                name={beer.name ?? ''}
                                rating={beer.rating ?? 0}
                                type={beerType ?? ''}
                                subType={beer.subType ?? ''}
                                image={`${host}/img/${beer.image}`}
                                onDelete={() => deleteBeer(beer.id)}
                                onUpdate={() => openUpdateBeer(beer)}
                            >
                            </Beer>
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
});
