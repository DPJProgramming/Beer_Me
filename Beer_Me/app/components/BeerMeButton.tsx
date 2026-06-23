import { MaterialIcons } from '@expo/vector-icons';
import { View, Pressable, StyleSheet, Text } from 'react-native';

type Props = {
    onPress: () => void;
};

export default function BeerMeButton({ onPress }: Props) {
    return (
        <View style={styles.wrapper} pointerEvents="box-none">
            <Pressable
                style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
                onPress={onPress}
            >
                <MaterialIcons name="add" size={30} color="#FFF" />
                <Text style={styles.label}>Pour</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 28,
        right: 20,
        alignItems: 'center',
        zIndex: 999,
    },
    fab: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#5B8FA8',
        paddingVertical: 14,
        paddingHorizontal: 22,
        borderRadius: 50,
        shadowColor: '#2B5E78',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 8,
        // Warm amber ring
        borderWidth: 2.5,
        borderColor: '#E8C88A',
    },
    fabPressed: {
        opacity: 0.85,
        transform: [{ scale: 0.96 }],
    },
    label: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
});
