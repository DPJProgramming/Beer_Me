import {useEffect, useState} from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import Beer from "../components/Beer";

export default function Index() {
    let [beers, setBeers] = useState([]);
    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try{
                const beersData = await getBeers();
                setBeers(beersData);
                setIsLoading(false);
            }
            catch(err){
                console.error(err);
                setError("Failed to fetch beers");
            }
        })()
    }, []);

    //const beers = getBeers();//[{
    //         name: "Sample Beer",
    //         type: "IPA",
    //         subType: "Hazy / New England IPA",
    //         rating: 4.5,
    //         image: "../../assets/images/Delete.png",
    //         brewery: "Sample Brewery",
    //         description: "A delicious sample beer.",
    //         location: "Sample Location"
    // }];
    return (
        <View style={homeStyles.view}>
            <Text>Top beers goes here</Text>
            <FlatList
                data={beers}
                renderItem={({item: beer}) => {
                    return(
                    <Beer
                        name={beer.name}
                        type={beer.type}
                        subType={beer.subType}
                        rating={beer.rating}
                        image={beer.image}
                        brewery={beer.brewery}
                        description={beer.description}
                        location={beer.location}
                    >
                    </Beer>
                )}}>
                
            </FlatList>
        </View>
    );
}

async function getBeers(){
    const response = await fetch('http://localhost:3000/topBeers', {method: 'GET'});
    const beers = await response.json();

    return beers;
}

const homeStyles = StyleSheet.create({
    view:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
