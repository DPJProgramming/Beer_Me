import React from "react";
import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import BeerForm from "../components/BeerForm";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    isVisible: boolean;
    onClose: () => void;
}

export default function AddBeer() {
    return (
        <SafeAreaView style={addStyles.view}>
            <View style={addStyles.titleContainer}>
                <Text>Add a new beer here</Text>
            </View>
            <BeerForm />
        </SafeAreaView>
    );
}

const addStyles = StyleSheet.create({
    view:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleContainer: {
        width: "100%",
        height: 50,
        backgroundColor: "#25292e",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    }
});
