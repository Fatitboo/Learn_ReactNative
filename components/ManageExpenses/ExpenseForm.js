import { Alert, StyleSheet, Text, View } from "react-native";
import Button from '../UI/Button'

import Input from "./Input";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({Label, onCancel, onSubmit, defaultValue}) {
    const [inputs, setInputs] = useState({
        amount:{
            value: defaultValue ?defaultValue.amount.toString():'',
            isValid: true },
        date: {
            value:defaultValue? defaultValue.date.toISOString().slice(0,10):'',
            isValid: true},
        description:{
            value: defaultValue?defaultValue.description:'',
            isValid: true}
    })
    function inputDataChange(indentifyInput, enteredData) {
        setInputs((curInputData)=>{
            return {
                ...curInputData,
                [indentifyInput]: {value: enteredData, isValid:true}
            };
        })
     }
    function confirmExpenseHandler(){
        const enteredData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description:inputs.description.value
        } 
        const amountIsValid = !isNaN(enteredData.amount) && enteredData.amount>0;
        const dateIdValid = enteredData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = enteredData.description.trim().length > 0;
        if(!amountIsValid||!dateIdValid||!descriptionIsValid){
            setInputs((curInputs)=>{
                return {
                    amount:{
                        value: curInputs.amount.value,
                        isValid: amountIsValid },
                    date: {
                        value:curInputs.date.value,
                        isValid: dateIdValid},
                    description:{
                        value: curInputs.description.value,
                        isValid: descriptionIsValid}
                }
            })
            return;
        }
        onSubmit(enteredData);
    }

    const checkValidInputs = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid ;
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.inputRow}
                    label='Amount'
                    inValid={!inputs.amount.isValid}
                    inputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputDataChange.bind(this,'amount'),
                        value: inputs.amount.value
                    }} />
                <Input
                    style={styles.inputRow}
                    label='Date'
                    inValid={!inputs.date.isValid}
                    inputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputDataChange.bind(this,'date'),
                        value: inputs.date.value
                    }} />
            </View>

            <Input
                label='Description'
                inValid={!inputs.description.isValid}
                inputConfig={{
                    multiline: true,
                    
                    onChangeText: inputDataChange.bind(this,'description'),
                    value: inputs.description.value
                }} />

            {checkValidInputs && <Text style={styles.errText}>Do ngu do an hai</Text>}
            <View style={styles.buttons}>
                <Button style={styles.button} onPress={onCancel} mode='flat'>Cancel</Button>
                <Button style={styles.button} onPress={confirmExpenseHandler}>{Label}</Button>
            </View>
        </View>
    );
}
export default ExpenseForm;
const styles = StyleSheet.create({
    inputsRow: {
        flexDirection: 'row',
    },
    inputRow: {
        flex: 1
    },
    form: {
        marginTop: 80
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
        textAlign: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20
    },
    errText:{
        textAlign:'center',
        color:GlobalStyles.colors.error500,
        margin:8,

    }
});