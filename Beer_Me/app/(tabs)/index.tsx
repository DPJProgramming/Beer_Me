import {useEffect, useState} from "react";
import { StyleSheet, Text, View, FlatList, TextInput, Platform } from "react-native";
import Beer from "../components/Beer";

export default function myBeers() {
    type BeerType = {
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
    const placeHolder = require("../../assets/images/placeholder.png");

    //const host = `http://localhost:3000`; //for web
    const host = process.env.EXPO_PUBLIC_IP ?? 'no IP found';

    useEffect(() => {        
        (async () => {
            try{
                const beersData = await getBeers(host);
                setBeers(beersData);

                console.log("Beers fetched successfully");
            }
            catch(err){
                console.error(err);
                console.log("Failed to fetch beers");
            }
        })()
    }, []);

    return (
        <View style={homeStyles.view}>
            <Text>Top beers goes here</Text>
            <FlatList
                numColumns={2}
                data={beers}
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
                )}}>
                
            </FlatList>
        </View>
    );
}

async function getBeers(host : string){
    const response = await fetch(`${host}/allBeers`, {method: 'GET'});
    const beers = await response.json();

    return beers;
}

const homeStyles = StyleSheet.create({
    view:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch", // allow FlatList to use full width (not centered)
        paddingTop: 12
    }

});
