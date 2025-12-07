import React from "react";
import { StyleSheet, Text, View, Modal, Pressable, Button } from "react-native";
import BeerForm from "../components/BeerForm";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    isVisible: boolean;
    onClose: () => void;
}

export default function AddBeer( {isVisible, onClose: closeAddBeer}: Props) {
    return (
        <SafeAreaView style={addStyles.view}>
            <View style={addStyles.header}>
                <Text style={addStyles.title}>Pour a New Brew</Text>
            </View>
            <BeerForm />
            {isVisible && (
                <Pressable style={addStyles.footer} pointerEvents="auto">
                    <Button title="Cancel" onPress={closeAddBeer} />
                </Pressable>
            )}
        </SafeAreaView>
    );
}

const addStyles = StyleSheet.create({
    view:{
        flex: 1,
    },
    header: {
        height: 50,
        backgroundColor: "#2905baff",
        alignItems: "center",
        justifyContent: "center",
    },
    title:{
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
        color: "#FFF",
        paddingBottom: 4
    },
    footer:{
        height: 100,
        backgroundColor: "#FFF",
    },
    close:{
        padding: 6,
        color: "#2905baff"
    }
});
