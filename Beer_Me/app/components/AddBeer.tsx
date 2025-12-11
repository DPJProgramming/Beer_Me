import { StyleSheet, Text, View} from "react-native";
import BeerForm, {BeerFormValues} from "../components/BeerForm";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    onClose: () => void;
}

const addBeer = (values: BeerFormValues) => {
        // const host = process.env.EXPO_PUBLIC_IP ?? 'no IP found';
        // const result = fetch(`http://${host}:3000/addBeer`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         image: values.image,
        //         name: values.name,
        //         type: values.type,
        //         subType: values.subType,
        //         rating: values.rating,
        //         brewery: values.brewery,
        //         description: values.description,
        //         location: values.location,
        //         date: values.date
        //     })
        // });
        // console.log(result);
        console.log("Name: " + values.name);
        alert("Beer added!");
};

export default function AddBeer( {onClose: closeAddBeer}: Props) {
    return (
        <SafeAreaView style={addStyles.view}>
            <View style={addStyles.header}>
                <Text style={addStyles.title}>Pour a New Brew</Text>
            </View>

            <View style={addStyles.view}>
                <BeerForm onSubmit={addBeer} onClose={closeAddBeer} accept={"Add"}/>
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
