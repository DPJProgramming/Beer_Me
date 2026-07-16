import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Pressable, StyleSheet } from 'react-native';

type Props = {
    onPress: () => void;
};

export default function RecycleBinButton({ onPress }: Props) {
    return (
        <View style={styles.wrapper} pointerEvents="box-none">
            <Pressable
                style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
                onPress={onPress}
            >
                <MaterialCommunityIcons name="recycle" size={22} color="#FFF" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        alignItems: 'center',
        zIndex: 999,
    },
    fab: {
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#5B8FA8',
        width: 48,
        height: 48,
        justifyContent: 'center',
        borderRadius: 24,
        shadowColor: '#2B5E78',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 2.5,
        borderColor: '#E8C88A',
    },
    fabPressed: {
        opacity: 0.85,
        transform: [{ scale: 0.96 }],
    },
});
