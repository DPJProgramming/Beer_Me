import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";

export default function Beer() {
    const beer = {
            name: "Sample Beer",
            type: "IPA",
            subType: "Hazy / New England IPA",
            rating: 4.5,
            imageUrl: "./assets/images/Delete.png",
            brewery: "Sample Brewery",
            description: "A delicious sample beer.",
            location: "Sample Location"
    };
    return (        
        <View>
            <Text>{beer.name}</Text>
            <Text>{beer.type}</Text>
            <Text>{beer.subType}</Text>
            <Text>{beer.rating}</Text>
            <Image style={BeerStyles.image} source={require("../../assets/images/Delete.png")} />
            <Text>{beer.brewery}</Text>
            <Text>{beer.description}</Text>
            <Text>{beer.location}</Text>
        </View>
    );
}

const BeerStyles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        marginBottom: 12
    }
});