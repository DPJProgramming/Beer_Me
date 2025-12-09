import React from "react";
import { StyleSheet, Text, View, Modal, Pressable, ScrollView } from "react-native";
import BeerForm from "../components/BeerForm";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    onClose: () => void;
}

export default function AddBeer( {onClose: closeAddBeer}: Props) {
    const AddBeer = () => {
        alert("Add Beer Pressed");
    };

    return (
        <SafeAreaView style={addStyles.view}>
            <View style={addStyles.header}>
                <Text style={addStyles.title}>Pour a New Brew</Text>
            </View>

            <ScrollView>
                <BeerForm />
            </ScrollView>

            <View style={addStyles.footer}>
                <Pressable style={[addStyles.button, addStyles.add]} onPress={AddBeer}>
                    <Text style={addStyles.add}>Add</Text>
                </Pressable>

                <Pressable style={[addStyles.button, addStyles.cancel]} onPress={closeAddBeer}>
                    <Text style={addStyles.cancel}>Cancel</Text>
                </Pressable>
            </View>
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
        borderWidth: 2,
        backgroundColor: "transparent",
        flexDirection: "row",
        padding: 30,
        height: 50,
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1,
    },
    button:{
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        height: 44,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 6,
    },
    cancel:{
        backgroundColor: "#ff0000ff",
        fontSize: 20,
        color: "#FFF",
    },
    add:{
        backgroundColor: "#00c51aff",
        fontSize: 20,
        color: "#FFF",
    }
});
