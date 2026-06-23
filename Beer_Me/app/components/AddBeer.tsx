import { StyleSheet, Text, View } from "react-native";
import BeerForm from "../components/BeerForm";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBeerList } from "../context/beerListContext";
import { BeerType } from "../types/types";

type Props = {
    onClose: () => void;
    beer?: BeerType;
}

export default function AddBeer({ onClose: closeAddBeer, beer }: Props) {
    const { addBeerContext, editBeerContext } = useBeerList();
    const insets = useSafeAreaInsets();

    const addBeer = async (values: BeerType, onClose: () => void) => {
        await addBeerContext(values, onClose);
    };
    const editBeer = async (values: BeerType, onClose: () => void) => {
        await editBeerContext(values, onClose);
    };

    return (
        <View style={[styles.root, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={styles.headerEyebrow}>
                    {beer ? 'UPDATE BREW' : 'NEW BREW'}
                </Text>
                {/* Centered, prominent title */}
                <Text style={styles.headerTitle}>
                    {beer ? `✏️  ${beer.name}` : '🍺  Pour New Beer'}
                </Text>
            </View>
            <View style={styles.formWrapper}>
                <BeerForm
                    onSubmit={(values) =>
                        beer ? editBeer(values, closeAddBeer) : addBeer(values, closeAddBeer)
                    }
                    onClose={closeAddBeer}
                    accept={beer ? "Save Changes" : "Add Beer"}
                    initialValues={beer}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#FDF6EC',
    },
    header: {
        backgroundColor: '#F5EAD8',
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#E8D5B7',
        alignItems: 'center',          // center everything horizontally
        shadowColor: '#C4A882',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    headerEyebrow: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 2,
        color: '#5B8FA8',
        marginBottom: 4,
        textAlign: 'center',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#3D2B1F',
        textAlign: 'center',
    },
    formWrapper: {
        flex: 1,
    },
});
