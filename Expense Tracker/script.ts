interface Expense {
    amount: number;
    name: string;
    category: string;
    date: string;
}

const expenseForm = document.getElementById("exp-f") as HTMLFormElement;
const expenseList = document.getElementById("expense-list") as HTMLUListElement;
const totalExpense = document.getElementById("total-expense") as HTMLParagraphElement;

let expen: Expense[] = JSON.parse(localStorage.getItem("expenses") || "[]");
let totalamnt: number = JSON.parse(localStorage.getItem("totalAmount") || "0");

const saveLocalStorage = () => {
    localStorage.setItem("expenses", JSON.stringify(expen));
    localStorage.setItem("totalAmount", totalamnt.toString());  
};

const loadExpenses = () => {
    expenseList.innerHTML = "";
    expen.forEach(expense => {
        const listexpense = document.createElement("li");
        listexpense.className = "list-group-item d-flex justify-content-between align-items-start";
        listexpense.innerHTML = `<strong>${expense.name}</strong> - ₹${expense.amount} (${expense.category}) <small>${expense.date}</small>`;
        expenseList.appendChild(listexpense);
    });
    totalExpense.innerText = `Total Expense: ₹${totalamnt}`;
};

loadExpenses();

expenseForm.addEventListener("submit", (exp) => {
    exp.preventDefault();

    const amntval = document.getElementById("amount") as HTMLInputElement;
    const expname = document.getElementById("expense-name") as HTMLInputElement;
    const categoryInput = document.getElementById("category") as HTMLSelectElement;
    const dateInput = document.getElementById("datetime") as HTMLInputElement;

    const expense: Expense = {
        amount: parseFloat(amntval.value),
        name: expname.value,
        category: categoryInput.value,
        date: dateInput.value,
    };

    if (!expense.amount || !expense.name || !expense.category || !expense.date) {
        alert("Please fill all fields.");
        return;
    }

    expen.push(expense);
    totalamnt += expense.amount;
    saveLocalStorage();
    loadExpenses();

    amntval.value = "";
    expname.value = "";
    categoryInput.value = "";
    dateInput.value = "";
});
