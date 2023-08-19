import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

function GuessLogItem({roundNumber, guess}){
    return (
        <View style={styles.listItem}>
            <Text style={styles.itemText}>#{roundNumber}</Text>
            <Text style={styles.itemText}>Opponent's guess: {guess}</Text>
        </View>
    );
}
export default GuessLogItem;
const styles = StyleSheet.create({
    listItem:{
        borderColor:Colors.primary800,
        borderWidth:1,
        borderRadius:40,
        padding:12,
        marginVertical:8,
        backgroundColor:Colors.accent500,
        justifyContent:'space-between',
        flexDirection:'row',
        width:'100%',
        elevation:4,
        shadowColor:'black',
        shadowOffset:{width:1, height:1},
        shadowOpacity:0.25,
        shadowRadius:3,
    },
    itemText:{
        fontFamily:'open-sans'
    }
})