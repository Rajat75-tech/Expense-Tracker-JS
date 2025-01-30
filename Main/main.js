document.addEventListener("DOMContentLoaded", function () {

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let incomes = JSON.parse(localStorage.getItem('incomes')) || [];

    function updateChartsAndExpenses() {

        const incomeExpenseChart = document.getElementById("incomeExpenseChart").getContext("2d");
        const incomeExpenseData = [
            incomes.reduce((sum, income) => sum + parseFloat(income.amount), 0),
            expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0)
        ];

        if (window.incomeExpenseChartInstance) {
            window.incomeExpenseChartInstance.destroy();
        }

        window.incomeExpenseChartInstance = new Chart(incomeExpenseChart, {
            type: "pie",
            data: {
                labels: ["Income", "Expense"],
                datasets: [{
                    data: incomeExpenseData,
                    backgroundColor: ["#4caf50", "#f44336"],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: "top" }
                }
            }
        });

        const teamSpendingTrendChart = document.getElementById("teamSpendingTrend").getContext("2d");
        const spendingData = expenses.map(expense => parseFloat(expense.amount));

        if (window.teamSpendingTrendChartInstance) {
            window.teamSpendingTrendChartInstance.destroy();
        }

        window.teamSpendingTrendChartInstance = new Chart(teamSpendingTrendChart, {
            type: "line",
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"], 
                datasets: [{
                    label: "Team Spending Trend",
                    data: spendingData,
                    fill: false,
                    borderColor: "#6200ea",
                    tension: 0.1
                }]
            },
            options: { responsive: true }
        });

        const dayToDayExpensesChart = document.getElementById("dayToDayExpenses").getContext("2d");
        const dayToDayData = [50, 75, 100, 60, 90]; 

        if (window.dayToDayExpensesChartInstance) {
            window.dayToDayExpensesChartInstance.destroy();
        }

        window.dayToDayExpensesChartInstance = new Chart(dayToDayExpensesChart, {
            type: "bar",
            data: {
                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                datasets: [{
                    label: "Expenses",
                    data: dayToDayData,
                    backgroundColor: "#3700b3",
                    borderRadius: 5
                }]
            },
            options: { responsive: true }
        });

        const recentExpensesList = document.getElementById("recent-expenses-list");
        recentExpensesList.innerHTML = ''; 

        const allEntries = [...expenses, ...incomes].reverse();

        allEntries.forEach(entry => {
            const li = document.createElement('li');
            if (entry.name) { 
                li.textContent = `${entry.name} - ₹${entry.amount} (${entry.category}, ${entry.date})`;
                li.style.backgroundColor = "#f44336";
            } else { 
                li.textContent = `${entry.source} - ₹${entry.amount} (${entry.date})`;
                li.style.backgroundColor = "#4caf50";
            }
            li.style.width = "540px";
            recentExpensesList.appendChild(li);
        });

        const totalIncome = incomes.reduce((sum, income) => sum + parseFloat(income.amount), 0);
        const totalExpense = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        const netBalance = totalIncome - totalExpense;
        document.getElementById('net-balance-amount').textContent = `₹${netBalance}`;
    }

    const expenseModal = document.getElementById("expense-modal");
    const openExpenseModalBtn = document.getElementById("new-expense-btn");
    const closeExpenseModalBtn = document.getElementById("close-modal-btn");
    const expenseForm = document.getElementById("expense-form");

    openExpenseModalBtn.addEventListener("click", function () {
        expenseModal.style.display = "flex";
    });

    closeExpenseModalBtn.addEventListener("click", function () {
        expenseModal.style.display = "none";
    });

    expenseForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const expenseName = document.getElementById("expense-name").value;
        const expenseAmount = document.getElementById("expense-amount").value;
        const expenseCategory = document.getElementById("expense-category").value;
        const expenseDate = document.getElementById("expense-date").value;

        expenses.push({
            name: expenseName,
            amount: expenseAmount,
            category: expenseCategory,
            date: expenseDate
        });
        localStorage.setItem('expenses', JSON.stringify(expenses));

        expenseModal.style.display = "none"; 
        expenseForm.reset(); 

        updateChartsAndExpenses(); 
    });

    const incomeModal = document.getElementById("income-modal");
    const openIncomeModalBtn = document.getElementById("new-income-btn");
    const closeIncomeModalBtn = document.getElementById("close-income-modal-btn");
    const incomeForm = document.getElementById("income-form");

    openIncomeModalBtn.addEventListener("click", function () {
        incomeModal.style.display = "flex"; 
    });

    closeIncomeModalBtn.addEventListener("click", function () {
        incomeModal.style.display = "none";
    });

    incomeForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const incomeSource = document.getElementById("income-source").value;
        const incomeAmount = document.getElementById("income-amount").value;
        const incomeDate = document.getElementById("income-date").value;

        incomes.push({
            source: incomeSource,
            amount: incomeAmount,
            date: incomeDate
        });
        localStorage.setItem('incomes', JSON.stringify(incomes));

        incomeModal.style.display = "none";
        incomeForm.reset();

        updateChartsAndExpenses();
    });

    updateChartsAndExpenses();
});


document.addEventListener("DOMContentLoaded", function () {
    const userNameElement = document.getElementById("userName");
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        userNameElement.textContent = loggedInUser;
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Not Logged In',
            text: 'Redirecting to login page...',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        }).then(() => {
            window.location.href = "../Login/login.html";
        });
    }
});
 

document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.querySelector("#logout");

    logoutBtn.addEventListener("click", function () {
        Swal.fire({
            title: 'Logout Confirmation',
            text: 'Are you sure you want to log out?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Logout',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("loggedInUser");
                Swal.fire({
                    icon: 'success',
                    title: 'Logged Out!',
                    text: 'You have been logged out successfully!',
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = "../Login/login.html";
                });
            }
        });
    });
});