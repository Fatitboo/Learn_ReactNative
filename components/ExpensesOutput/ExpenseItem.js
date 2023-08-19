import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFomattedDate } from "../../utils/date";
import {  useNavigation  } from '@react-navigation/native'

function ExpenseItem({ id,description, date, amount}){
    const navigation= useNavigation();
    function expensePressHandler(){

        navigation.navigate('ManageExpenses', {id: id})
    }
    return (
        <Pressable onPress={expensePressHandler} style={({pressed}) => pressed&&styles.pressed}>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase,styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>{getFomattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>${amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    );
}
export default ExpenseItem;
const styles = StyleSheet.create({
    expenseItem:{
        padding:12,
        marginVertical:8,
        flexDirection:'row',
        borderRadius:6,
        backgroundColor:GlobalStyles.colors.primary500,
        justifyContent:'space-between',
        elevation:3,
        shadowColor:GlobalStyles.colors.gray500,
        shadowOffset:{width:1, height:1},
        shadowOpacity:0.4,
        shadowRadius:4
    },
    textBase:{
        color:GlobalStyles.colors.primary50
    },
    description:{
        fontWeight:'bold',
        fontSize:16,
        marginBottom:4
    },
    amountContainer:{
        backgroundColor:'white',
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:12,
        paddingVertical:4,
        minWidth:80
    },
    amount:{
        color:GlobalStyles.colors.primary500,
        fontWeight:'bold'
    },
    pressed:{
        opacity:0.75
    }
});