import { Stack } from "expo-router";
import {Modal, View, StyleSheet} from "react-native";
import { useState} from "react";
import BeerMeButton from "./components/BeerMeButton";
import RecycleBinButton from "./components/RecycleBinButton";
import AddBeer from "./components/AddBeer";
import { BeerListProvider } from "./context/beerListContext";
import RecycleBin from "./components/RecycleBin";

export default function RootLayout() {
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [isRecylceBinVisible, setIsRecylceBinVisible] = useState(false);
    
    const openAddBeer = () => {
        setIsAddFormVisible(true);
    }
    const closeAddBeer = () => {
        setIsAddFormVisible(false);
    }

    const openRecycleBin = () => {
        setIsRecylceBinVisible(true);
    }
    const closeRecycleBin = () => {
        setIsRecylceBinVisible(false);
    }

    return (
        <BeerListProvider>
            <View style={rootStyles.mainContainer}>
                <Stack>
                    <Stack.Screen name="index" options={{headerShown: false}} />
                </Stack>

                <Modal
                    animationType="slide" 
                    visible={isAddFormVisible} 
                    onRequestClose={closeAddBeer}
                >
                    <AddBeer onClose={closeAddBeer} />
                </Modal>
                <BeerMeButton onPress={openAddBeer}/>
                <RecycleBinButton onPress={openRecycleBin}/>

                    <Modal
                    animationType="slide" 
                    visible={isRecylceBinVisible} 
                    onRequestClose={closeRecycleBin}
                >
                    <RecycleBin />
                </Modal>
            </View>
        </BeerListProvider>
    );
}

const rootStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
});