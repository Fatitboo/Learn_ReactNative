import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

function Button({ children, onPress }) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
}
export default Button;
const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 16,
        marginHorizontal:4,
        backgroundColor: Colors.primary800,
        borderRadius: 4,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 2
    },
    text: {
        textAlign: 'center',
        color: Colors.primary50,
        fontSize: 16
    },
    pressed: {
        opacity: 0.7
    }
});