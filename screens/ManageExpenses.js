import { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpenses/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpenses({ route, navigation }) {
    const ExpenseCtx = useContext(ExpensesContext);
    const edittedExpenseId = route.params?.id;
    const isEditing = !!edittedExpenseId;
    const [isSubmitSucess, setIsSubmitSucess]  = useState(false);
    const selectedExpense = ExpenseCtx.expenses.find(expense => expense.id === edittedExpenseId)
    const [Err, setErr] = useState();

    useEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);


    function cancelPressHandler() {
        navigation.goBack();
    }
    async function confirmHandler(expenseData) {
        setIsSubmitSucess(true);
        try{
            if (isEditing) {
                ExpenseCtx.updateExpense(edittedExpenseId, expenseData);
                await updateExpense(edittedExpenseId, expenseData);
            }
            else {
                const id = await storeExpense(expenseData);
                ExpenseCtx.addExpense({ ...expenseData, id: id });
            }
            navigation.goBack();
        }catch(err){
            setErr('Could not save data expense - Please try again later!');
            setIsSubmitSucess(false);
        }
        
    }
    async function deleteExpenseHandler() {
        setIsSubmitSucess(true);
        try{
            await deleteExpense(edittedExpenseId);
            ExpenseCtx.deleteExpense(edittedExpenseId);
            navigation.goBack();
        }catch{
            setErr('Could not delete this expense - Please try again later!');
            setIsSubmitSucess(false);
        }
    }
    function errHandler(){
        setErr(null);
    }
    if(Err && !isSubmitSucess){
        return <ErrorOverlay message={Err} onConfirm={errHandler}/>
    }
    if(isSubmitSucess){
        return <LoadingOverlay/>
    }
    return (
        <View style={styles.container}>
            <ExpenseForm
                Label={isEditing ? 'Update' : 'Add'}
                onCancel={cancelPressHandler}
                onSubmit={confirmHandler}
                defaultValue={selectedExpense} />

            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        name='trash'
                        color={GlobalStyles.colors.error500}
                        size={30}
                        onPress={deleteExpenseHandler} />
                </View>
            )}
        </View>
    );
}
export default ManageExpenses;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary800,
        padding: 12
    },
    deleteContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 8,
        borderTopColor: GlobalStyles.colors.error50,
        borderTopWidth: 2,
        marginTop: 16,
    },
});