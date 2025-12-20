import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";

const deleteBeer = async (id: number, onDelete: (id: number) => void) => {
    // const confirmDelete = confirm('Are you sure you want to delete this beer?');
    // if(!confirmDelete){
    //     return;
    // }

    const host = process.env.EXPO_PUBLIC_IP ?? 'no IP found';
    const response = await fetch(`${host}/deleteBeer/${id}`, {method: "post"});

    if(response.ok){
        alert('Beer deleted successfully');
        onDelete(id);
    }
    else{
        alert('Failed to delete beer. Please try again.');
    }
}

export default function Beer(beer: {id:number, name?: string, type?: string, subType?: string,
                                    rating?: number, image?: string, brewery?: string,
                                    description?: string, location?: string,
                                    onDelete: (id: number) => void}
                            ){  
    return (        
        <View style={BeerStyles.container}>
            <Text>{beer.name}</Text>
            <Text style={BeerStyles.type}>{beer.type}</Text>
            <Text style={BeerStyles.type}>{beer.subType}</Text>
            <Text style={BeerStyles.rating}>{`${beer.rating}/5`}</Text>
            <Image source={{uri: beer.image}} style={BeerStyles.image} />
            <Text>{beer.brewery}</Text>
            <Text>{beer.description}</Text>
            <Text>{beer.location}</Text>
            <Button title="Delete" onPress={() => deleteBeer(beer.id, beer.onDelete)}/>
        </View>
    );
}

//TO DO: modify template  styling
const BeerStyles = StyleSheet.create({
    // single-column (row) container - keep as fallback
    container:{
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
        backgroundColor: '#fff'
    },

    // grid (two-column) tile
    gridContainer: {
        flexBasis: '48%',   // roughly half of the parent width
        maxWidth: '48%',
        minWidth: 0,        // important to allow shrinking on Android
        marginBottom: 12,
        padding: 8,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 12
    },

    gridImage: {
        width: '100%',
        height: 120,
        marginBottom: 8,
        borderRadius: 6,
    },

    name:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    type:{
        fontSize: 16,
        fontStyle: 'italic'
    },
     rating:{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green'
    }
});