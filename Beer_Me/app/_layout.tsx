import { Stack } from "expo-router";
import {Modal, View, Button} from "react-native";
import { useState } from "react";
import BeerMeButton from "./components/BeerMeButton";
import AddBeer from "./components/AddBeer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [addingBeer, setAddingBeer] = useState(false);
    
    const addBeer = () => {
        setIsFormVisible(true);
    }
    const closeAddBeer = () => {
        setIsFormVisible(false);
    }

    return (
        <SafeAreaView>
            <BeerMeButton onPress={addBeer} />
            <SafeAreaView style={{flex: 1}}>
                <Modal animationType="slide" transparent={false} visible={isFormVisible} >
                    <AddBeer/>
                    <Button title="Cancel" onPress={closeAddBeer} />
                </Modal>
            </SafeAreaView>
        </SafeAreaView>
    );
}