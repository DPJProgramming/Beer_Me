import { StyleSheet, Text, View} from "react-native";
import BeerForm from "../components/BeerForm";
import { SafeAreaView } from "react-native-safe-area-context";
import {useBeerList} from "../context/beerListContext";
import { BeerType } from "../types/types";

type Props = {
    onClose: () => void;
    beer?: BeerType;
}

export default function AddBeer( {onClose: closeAddBeer, beer}: Props) {
    const {addBeerContext, editBeerContext} = useBeerList();

    const addBeer = async (values: BeerType, onClose: () => void) => {
        await addBeerContext(values, onClose);
    };

    const editBeer = async (values: BeerType, onClose: () => void) => {
        await editBeerContext(values, onClose);
    };

    return (
        <SafeAreaView style={addStyles.view}>
            <View style={addStyles.header}>
                <Text style={addStyles.title}>{beer ? "Edit Brew" : "Pour a New Brew"}</Text>
            </View>

            <View style={addStyles.view}>
                <BeerForm onSubmit={(values) => beer ? editBeer(values, closeAddBeer) : addBeer(values, closeAddBeer)} onClose={closeAddBeer} accept={beer ? "Edit" : "Add"} initialValues={beer}/>
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
});
