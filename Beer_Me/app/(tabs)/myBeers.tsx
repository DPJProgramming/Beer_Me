import { StyleSheet, Text, View } from "react-native";

export default function Index() {
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
