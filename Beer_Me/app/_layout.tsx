import { Stack } from "expo-router";
import {Modal, View, Button, Pressable, StyleSheet} from "react-native";
import { useState } from "react";
import BeerMeButton from "./components/BeerMeButton";
import AddBeer from "./components/AddBeer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [addingBeer, setAddingBeer] = useState(false);
    
    const openAddBeer = () => {
        setIsFormVisible(true);
    }
    const closeAddBeer = () => {
        setIsFormVisible(false);
    }

    return (
        <SafeAreaView style={rootStyles.mainContainer}>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: true}} />
            </Stack>

            <Modal 
                animationType="slide" 
                visible={isFormVisible} 
                onRequestClose={closeAddBeer}
            >
                <AddBeer isVisible={isFormVisible} onClose={closeAddBeer} />
            </Modal>
            <View style={rootStyles.buttonContainer} pointerEvents="box-none">
                <BeerMeButton onPress={openAddBeer}/>
            </View>
        </SafeAreaView>
    );
}

const rootStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    modalHeader:{
        height: 100,
        backgroundColor: "#DDD",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
});