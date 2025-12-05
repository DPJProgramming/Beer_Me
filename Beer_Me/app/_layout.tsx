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
        <SafeAreaView style={rootStyles.container}>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: true}} />
            </Stack>

            <Modal 
                animationType="slide" 
                visible={isFormVisible} 
                onRequestClose={closeAddBeer}
            >
                <Pressable style={rootStyles.upper} onPress={closeAddBeer} />
                <AddBeer/>
                <View style={rootStyles.lower}>
                    <Button title="Cancel" onPress={closeAddBeer} />
                </View>
            </Modal>
            <View style={rootStyles.buttonContainer} pointerEvents="box-none">
                <BeerMeButton onPress={openAddBeer}/>
                <SafeAreaView style={rootStyles.fill}>
                </SafeAreaView>
            </View>
        </SafeAreaView>
    );
}

const rootStyles = StyleSheet.create({
    fill:{
        flex: 1,
    },
    upper:{
        height: 100,
        backgroundColor: "#DDD",
        opacity: 0.5
    },
    lower:{
        flex: 1,
        backgroundColor: "#FFF",
    },
    container: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 5,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 50,
    }
});