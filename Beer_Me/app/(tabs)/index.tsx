import React from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import Beer from "../components/Beer";

export default function Index() {
    const beers = [{
            name: "Sample Beer",
            type: "IPA",
            subType: "Hazy / New England IPA",
            rating: 4.5,
            image: "../../assets/images/Delete.png",
            brewery: "Sample Brewery",
            description: "A delicious sample beer.",
            location: "Sample Location"
    }];//getBeers();
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
     const config = {
        method:"get",
        mode: 'cors' as RequestMode
    }

    const response = await fetch('/topBeers', config);
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
