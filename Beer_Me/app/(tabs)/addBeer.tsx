import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import BeerForm from "../components/BeerForm";

export default function addBeer() {
  return (
    <View
      style={homeStyles.view}
    >
      <Text>Add a new beer here</Text>
      <BeerForm />
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
