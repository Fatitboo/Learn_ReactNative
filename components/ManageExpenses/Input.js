import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ label, style, inputConfig, inValid }) {
    const inputStyle = [styles.input];
    if (inputConfig && inputConfig.multiline) {
        inputStyle.push(styles.multilineInput)
    }
    if (inValid) inputStyle.push(styles.errInput)
    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, inValid && styles.errLabel]}>{label}</Text>
            <TextInput style={inputStyle} {...inputConfig} />
        </View>
    );
}
export default Input;
const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 6,
        marginVertical: 8,
    },
    label: {
        color: GlobalStyles.colors.primary100,
        fontSize: 12,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4,
        padding: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top'
    },
    errLabel: {
        color: GlobalStyles.colors.error500,
    },
    errInput: {
        backgroundColor: GlobalStyles.colors.error50
    }
});