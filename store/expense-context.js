import { createContext, useReducer } from "react";


export const ExpensesContext  = createContext({
    expenses:[],
    addExpense:({description, date, amount})=>{},
    updateExpense:(id, {description, date, amount})=>{},
    deleteExpense:(id)=>{},
    setExpenses: (expense)=>{}
});

function expensesReducer(state, action){
    switch(action.type){
        case 'ADD':
            const newExpenseId = new Date().toString() + Math.random().toString();
            return [{...action.payload, id:newExpenseId}, ...state];
        case 'UPDATE':
            const indexOfExpense = state.findIndex((expense)=> expense.id === action.payload.id);
            const selectedExpense = state[indexOfExpense];
            const updateExpense = {...selectedExpense, ...action.payload.data};
            const updateExpensesArr = [...state];
            updateExpensesArr[indexOfExpense] = updateExpense;
            return updateExpensesArr;
        case 'DELETE':
            return state.filter((expense)=> expense.id !== action.payload);
        case 'SET':
            return action.payload;
        default:
            return state;
    }
}
function ExpenseContextProvider({children}){
    const [expenseState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData){
        dispatch({type: 'ADD' , payload: expenseData});
    }
    function updateExpense(id, expenseData){
        dispatch({type: 'UPDATE', payload:{id:id, data:expenseData}});
    }
    function deleteExpense(id){
        dispatch({type:'DELETE', payload:id});
    }
    function setExpenses(expenses){
        dispatch({type:'SET', payload:expenses})
    }
    const value ={
        expenses: expenseState,
        addExpense:addExpense,
        updateExpense:updateExpense,
        deleteExpense:deleteExpense,
        setExpenses:setExpenses
    }
    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
export default ExpenseContextProvider;