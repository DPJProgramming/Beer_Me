import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";


export default function myBeers() {
  return (
    <View
      style={homeStyles.view}
    >
      <Text>All your beers go here</Text>
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
