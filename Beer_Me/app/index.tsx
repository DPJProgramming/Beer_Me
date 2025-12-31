import {useEffect} from "react";
import { StyleSheet, View, FlatList} from "react-native";
import Beer from "./components/Beer";
import {BeerListProvider} from "./context/beerListContext";
import {useBeerList} from "./context/beerListContext";

//fetch beers from backend
export default function myBeers() {
    const {beers, setBeers, removeBeerContext} = useBeerList(); //get beers from context

    //const host = `http://localhost:3000`; //for web
    const host = process.env.EXPO_PUBLIC_IP ?? 'no IP found';

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
    const refreshAfterDelete = (id: number) => {
        removeBeerContext(id);
    }

    return (
        <BeerListProvider initialBeers={beers}>
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
                                    onDelete={() => refreshAfterDelete(beer.id)}
                                >
                                </Beer>
                            );
                        }}>
                        
                    </FlatList>
                </View>
            </View> 
        </BeerListProvider>
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
