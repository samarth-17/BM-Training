var expenseForm = document.getElementById("exp-f");
var expenseList = document.getElementById("expense-list");
var totalExpense = document.getElementById("total-expense");
var expen = JSON.parse(localStorage.getItem("expenses") || "[]");
var totalamnt = JSON.parse(localStorage.getItem("totalamnt") || "0");
var saveLocalStorage = function () {
    localStorage.setItem("expenses", JSON.stringify(expen));
    localStorage.setItem("totalAmount", totalamnt.toString());
};
var loadExpenses = function () {
    expenseList.innerHTML = "";
    expen.forEach(function (expense) {
        var listexpense = document.createElement("li");
        listexpense.className = "list-group-item d-flex justify-content-between align-items-start";
        listexpense.innerHTML = "<strong>".concat(expense.name, "</strong> - \u20B9").concat(expense.amount, " (").concat(expense.category, ") <small>").concat(expense.date, "</small>");
        expenseList.appendChild(listexpense);
    });
    totalExpense.innerText = "Total Expense: \u20B9".concat(totalamnt);
};
loadExpenses();
expenseForm.addEventListener("submit", function (exp) {
    exp.preventDefault();
    var amntval = document.getElementById("amount");
    var expname = document.getElementById("expense-name");
    var categoryInput = document.getElementById("category");
    var dateInput = document.getElementById("datetime");
    var expense = {
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
