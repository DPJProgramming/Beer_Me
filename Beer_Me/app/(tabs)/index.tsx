import React from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import BeerForm from "../components/BeerForm";

export default function Index() {
  return (
    <View
      style={homeStyles.view}
    >
      <Text>Top beers goes here</Text>
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
