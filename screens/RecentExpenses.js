import { Text } from "react-native";
import {useContext, useEffect, useState}  from 'react';
import { ExpensesContext } from "../store/expense-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getMinusDate } from "../utils/date";
import { fetchExpense } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
function RecentExpenses(){
    const expenseCtx = useContext(ExpensesContext);
    const [isFetching, setIsFetching] = useState(false);
    const [isErr, setErr] = useState();
    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpense();
                expenseCtx.setExpenses(expenses);
            } catch (err) {
                setErr('Could not fetch expenses!');
            }
            setIsFetching(false);
        }
        getExpenses();
    }, []);
    function errHandler(){
        setErr(null)
    }
    if(isErr && !isFetching){
        return <ErrorOverlay message={isErr} onConfirm={errHandler}/>
    }
    if (isFetching) {
        return <LoadingOverlay />
    }
    const recentExpenses = expenseCtx.expenses.filter((expense)=>{
        const today = new Date();
        const pass7days = getMinusDate(today, 7);
        return expense.date > pass7days;
    })
    return <ExpensesOutput expenses={recentExpenses} expensesPeriod='Last 7 Days'/>
}
export default RecentExpenses;