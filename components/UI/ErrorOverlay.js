import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

function ErrorOverlay({message, onConfirm}){
    return (
        <View style={styles.container}>
            <Text style={styles.label}>An error occurred!</Text>
            <Text style={styles.errText}>{message}</Text>
            <Button onPress={onConfirm}>Okey</Button>
        </View>
    );
}
export default ErrorOverlay;
const styles = StyleSheet.create({
    container:{
        padding:16,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:GlobalStyles.colors.primary700,
        flex:1
    },
    label:{
        color:'white',
        fontSize:20,
        textAlign:'center',
        fontWeight:'bold',
        marginBottom:10
    },
    errText:{
        fontSize:14,
        color:'white',
        textAlign:'center', 
        marginBottom:10
    }
});