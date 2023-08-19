import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expense-context";
import { fetchExpense } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";


function AllExpenses() {
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
    return <ExpensesOutput expenses={expenseCtx.expenses} expensesPeriod='Total' />
}
export default AllExpenses;