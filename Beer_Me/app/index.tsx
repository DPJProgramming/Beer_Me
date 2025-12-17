import {useEffect, useState} from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Beer from "./components/Beer";

export default function myBeers() {
    type BeerType = {
        id: number;
        name: string;
        image?: string;
        type?: string;
        subType?: string;
        rating?: number;
        brewery?: string;
        description?: string;
        location?: string;
    };


    let [beers, setBeers] = useState<BeerType[]>([]);
    const placeHolder = require("../assets/images/placeholder.png");

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

    return (
        <View style={homeStyles.mainContainer}>
            <View style={homeStyles.view}>
                <FlatList
                    style={homeStyles.list}
                    numColumns={2}
                    data={beers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item: beer}) => {
                        const beerType = (beer.subType && beer.subType.trim().length) ? beer.subType : beer.type;

                        return(
                            <Beer
                                name={beer.name ?? ''}
                                rating={beer.rating ?? 0}
                                type={beerType ?? ''}
                                subType={beer.subType ?? ''}
                                image={beer.image ? `${host}/img/${beer.image}` : placeHolder}
                            >
                            </Beer>
                        );
                    }}>
                    
                </FlatList>
            </View>
        </View>
    );
}

async function getBeers(host : string){
    const response = await fetch(`${host}/allBeers`, {method: 'GET'});
    const beers = await response.json();

    console.log(beers.length);

    return beers;
}

const homeStyles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        //justifyContent: "flex-start",
        //alignItems: "stretch",
    },
    view:{
        //flex: 1,
        //justifyContent: "flex-start",
        //alignItems: "stretch",
    },
    list: {
        //flex: 1,
        //width: '100%'
    }
});
