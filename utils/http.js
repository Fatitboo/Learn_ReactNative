import axios from 'axios'
const BACKEND_URL = 'https://expense-tracker-app-1e1bd-default-rtdb.firebaseio.com';
export async function storeExpense(enteredData) {
    const response = await axios.post(BACKEND_URL + '/expenses.json', enteredData);
    const id = response.data.name;
    return id;
}
export async function fetchExpense() {
    const response = await axios.get(BACKEND_URL + '/expenses.json');
    const expenses = [];
    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };
        expenses.push(expenseObj);
    }
    expenses.reverse();
    return expenses;
}

export function updateExpense(id, expense) {
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expense);
}

export function deleteExpense(id) {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}