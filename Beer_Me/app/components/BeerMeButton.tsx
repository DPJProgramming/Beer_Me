import { MaterialIcons } from '@expo/vector-icons';
import {View, Pressable, StyleSheet} from 'react-native';

type Props = {
    onPress: () => void;
};

export default function CircleButton({onPress}: Props) {
    return (
        <View>
            <Pressable style={styles.circleButton} onPress={onPress}>
                <MaterialIcons name="add" size={38} color="#ff0000ff" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    circleButton: {
        alignSelf: 'center',
        width: 84,
        height: 84,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 42,
        backgroundColor: "#00eaffff",
        position: 'absolute',
        bottom: 30,
        zIndex: 999,
    },
});