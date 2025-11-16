import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Beer from "../components/Beer";


export default function myBeers() {
  return (
    <View style={homeStyles.view}>
        <Text>All your beers go here</Text>
        <Beer></Beer>
    </View>
  );
}

const homeStyles = StyleSheet.create({
    view:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
