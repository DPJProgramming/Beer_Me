import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";

export default function Beer(beer: {name: string, type: string, subType: string,
                                    rating: number, image: string, brewery: string,
                                    description: string, location: string}){  
    return (        
        <View>
            <Text>{beer.name}</Text>
            <Text>{beer.type}</Text>
            <Text>{beer.subType}</Text>
            <Text>{beer.rating}</Text>
            <Image source={{uri: beer.image}} style={BeerStyles.image} />
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