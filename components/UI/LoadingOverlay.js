import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function LoadingOverlay(){
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='white'/>
        </View>
    );
}
export default LoadingOverlay;
const styles = StyleSheet.create({
    container:{
        padding:16,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:GlobalStyles.colors.primary700,
        flex:1
    }
});