import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import {Picker} from '@react-native-picker/picker';

export default function addBeer() {
  return (
    <View
      style={homeStyles.view}
    >
      <Text>All your beers go here</Text>
      <Picker
          style={{ height: 50, width: 250 }}
        >
        <Picker.Item label="Courses" value="courses" />
          <Picker.Item label="Data-Structures" value="DSA" />
          <Picker.Item label="ReactJs" value="react" />
          <Picker.Item label="C++" value="cpp" />
          <Picker.Item label="Python" value="py" />
          <Picker.Item label="Java" value="java" />
      </Picker>
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
