import { Label } from '@react-navigation/elements';
import React from 'react';
import { TextInput, View, StyleSheet, Text} from 'react-native';

export default function BeerForm() {
    return (
        <View>
            <Text style={formStyles.label}>Name</Text>
            <TextInput style={formStyles.input} placeholder="Name" />

            <Text style={formStyles.label}>Type</Text>
            <TextInput style={formStyles.input} placeholder="Type" />

            <Text style={formStyles.label}>Sub-Type</Text>
            <TextInput style={formStyles.input} placeholder="Sub-Type" />

            <Text style={formStyles.label}>Rating</Text>
            <TextInput style={formStyles.input} placeholder="Rating" keyboardType="numeric" />

            <Text style={formStyles.label}>Brewery</Text>
            <TextInput style={formStyles.input} placeholder="Brewery" />

            <Text style={formStyles.label}>Description</Text>
            <TextInput style={formStyles.input} placeholder="Description" multiline />

            <Text style={formStyles.label}>Location</Text>
            <TextInput style={formStyles.input} placeholder="Location" />
        </View>
    );
}

const formStyles = StyleSheet.create({
    label:{
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4
    },
    input:{
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8
    }
});