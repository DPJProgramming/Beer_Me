import {useEffect, useState} from "react";
import {useBeerList} from "./context/beerListContext";
import { StyleSheet, View, FlatList, Modal, Pressable, Image, Text, Alert, TextInput} from "react-native";


export default function recycleBin(){
    const [beersInBin, setBeersInBin] = useState();
    const [beerToRestore, setBeerToRestore] = useState();
    const [restoreBeer] = useBeerList;
    const host = process.env.EXPO_PUBLIC_IP ?? 'no IP found';

    useEffect(() => {
        (async () => {
            try {
                const beers = await getRecylcedBeers(host);
                setBeersInBin(beers);
            } 
            catch(err) {
                console.error(err);
            }
        })();
    }, []);

    const getRecycledBeers(host: string){
        const response = await fetch(`${host}/getRecycledBeers`, { method: 'GET' });
        return response.json();
    }

    const permantDelete(id: number){
        const response = await fetch(`${host}/permanentDelete`, { method: 'DELETE' });
        return response.json();
        //setBeersInBin filtering
    }

    const permantDeleteAll(){
        const response = await fetch(`${host}/permanentDeleteAll`, { method: 'DELETE' });
        return response.json();
        //setBeersInBin filtering or set to []
    }

    const confirmDelete = (id: number, messageOne: string, messageTwo: string) => {
            Alert.alert(messageOne, messageTwo, [
                { text: "Keep It", style: "cancel" },
                { text: "Delete It", style: "destructive", onPress: () => permantDelete(id) }
            ]);
    };

    const confirmDeleteAll = (id: number, messageOne: string, messageTwo: string) => {
            Alert.alert(messageOne, messageTwo, [
                { text: "Keep", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => permantDeleteAll() }
            ]);
    };
}