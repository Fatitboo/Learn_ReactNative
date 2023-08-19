import { View, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";


function NumberContainer({children}){
    return (
        <View style={styles.numberContainer}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    );
}
export default NumberContainer;
const deviceWidth= Dimensions.get('window').width;
const styles = StyleSheet.create({
    numberContainer:{
        margin:deviceWidth<380?12:24,
        borderColor:Colors.accent500,
        borderWidth:2,
        padding:deviceWidth<380?12:24,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8
    },
    numberText:{
        fontSize:deviceWidth<380?18:36,
        // fontWeight:'bold',
        fontFamily:'open-sans-bold',
        color: Colors.accent500,
    }
});