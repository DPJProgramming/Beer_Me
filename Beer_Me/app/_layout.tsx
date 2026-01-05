import { Stack } from "expo-router";
import {Modal, View, StyleSheet} from "react-native";
import { useState} from "react";
import BeerMeButton from "./components/BeerMeButton";
import AddBeer from "./components/AddBeer";
import { BeerListProvider } from "./context/beerListContext";

export default function RootLayout() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    
    const openAddBeer = () => {
        setIsFormVisible(true);
    }
    const closeAddBeer = () => {
        setIsFormVisible(false);
    }

    return (
        <BeerListProvider initialBeers={[]}>
            <View style={rootStyles.mainContainer}>
                <Stack>
                    <Stack.Screen name="index" options={{headerShown: true}} />
                </Stack>

                <Modal
                    animationType="slide" 
                    visible={isFormVisible} 
                    onRequestClose={closeAddBeer}
                >
                    <AddBeer onClose={closeAddBeer} />
                </Modal>
                    <BeerMeButton onPress={openAddBeer}/>
            </View>
        </BeerListProvider>
    );
}

const rootStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
});