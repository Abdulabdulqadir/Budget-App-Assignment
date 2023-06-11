var stats = document.getElementById('stats');
var text = document.getElementById('text');
var budget = document.getElementById('budget');
var budgetPlace = document.getElementById('budgetPlace');
var initialBudget;
var convert;
var showing = false;
var titleInp = document.getElementById('titleInp');
var costInp = document.getElementById('costInp');
var e = document.getElementById('e');
var b = document.getElementById('b');

function show() {
    if (!showing) {
        stats.style.maxHeight = '400px';
        stats.style.padding = '10px';
        text.innerHTML = 'Hide';
        showing = true;
    } else {
        stats.style.maxHeight = '0';
        stats.style.padding = '0';
        text.innerHTML = 'Show';
        showing = false;
    }
}

function setBudget() {
    if (budget.value !== "") {
        localStorage.setItem('Budget', budget.value);
    }
    initialBudget = parseFloat(localStorage.getItem('Budget'));
    budgetPlace.innerText = initialBudget;
}
setBudget();

var expense = getStoredExpenses();
addExpense();

function getStoredExpenses() {
    var storedExpenses = localStorage.getItem('expenses');
    return storedExpenses ? JSON.parse(storedExpenses) : [];
}

function updateStoredExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expense));
}

function add() {
    var newCost = parseFloat(costInp.value);
    var totalCost = getTotalCost();

    if (totalCost + newCost > initialBudget) {
        alert('Budget limit exceeded. Expense not added.');
        return;
    }

    var cheatSheet = {
        title: titleInp.value,
        cost: costInp.value,
    }
    expense.push(cheatSheet);
    titleInp.value = "";
    costInp.value = "";
    addExpense();
    updateStoredExpenses();
}

function addExpense() {
    document.getElementById("eL").innerHTML = "";
    document.getElementById("eL").innerHTML = `<h1>Expense List</h1>`;

    for (i = 0; i < expense.length; i++) {
        document.getElementById("eL").innerHTML += `
            <div class="list-item">
                <div class="expense-name">
                    <h3>${expense[i].title}</h3>
                </div>
                <div class="expense-price">
                    <p>${expense[i].cost}</p>
                </div>
                <div class="delete">
                    <p><i class="fa fa-trash" onclick="removeExpense(${i})"></i></p>
                </div>
            </div>
        `;
    }
}

function getTotalCost() {
    var totalCost = 0;
    for (i = 0; i < expense.length; i++) {
        totalCost += parseFloat(expense[i].cost);
    }
    return totalCost;
}

function removeExpense(index) {
    expense.splice(index, 1);
    addExpense();
    updateStoredExpenses();
}

function calc() {
    var totalCost = getTotalCost();
    e.innerText = totalCost;
    b.innerText = initialBudget - totalCost;

    if (totalCost > initialBudget) {
        alert('Budget limit exceeded.');
    }
}

setInterval(calc, 1000);