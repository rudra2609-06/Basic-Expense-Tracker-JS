document.addEventListener('DOMContentLoaded', () => {
    // Grab Elements
    const inputExpenseName = document.querySelector("#expense-name");
    const inputExpenseAmount = document.querySelector("#expense-amount");
    const addExpenseBtn = document.querySelector("#add-expense-btn");
    const displayTotal = document.querySelector("#total");
    const expenseForm = document.querySelector("#expense-form");
    const expenseList = document.querySelector("#expense-list");

    let expenses = JSON.parse(localStorage.getItem("ExpenseDetails")) || [];

    // Render existing expenses from localStorage
    expenses.forEach((expense) => {
        renderExpense(expense.name, expense.price, expense.id);
    });

    // Add new expense
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const enteredExpense = inputExpenseName.value.trim();
        const enteredAmount = inputExpenseAmount.value.trim();
        const id = Date.now();

        expenses.push(
			{ id, name: enteredExpense, price: Number(enteredAmount) });
        saveExpense(expenses);
        renderExpense(enteredExpense, enteredAmount, id);

        inputExpenseName.value = "";
        inputExpenseAmount.value = "";
    });

    function renderExpense(text, price, id) {
        // Create main expense container
        const expenseDiv = document.createElement('div');
        expenseDiv.setAttribute('data-id', id);

        // Add expense text and delete button
        expenseDiv.innerHTML = `
            <p>${text} - $${Number(price).toFixed(2)}</p>
            <button data-id="${id}" class="delete-btn">Delete</button>
        `;
        expenseDiv.classList.add('expense');
        // Show the list and append the new expense
        expenseList.classList.remove('hidden');
        expenseList.appendChild(expenseDiv);

        // Update total
        let totalPrice = 0;
        expenses.forEach(exp => {
            totalPrice += exp.price;
        });
        displayTotal.textContent = `$${totalPrice.toFixed(2)}`;

        // Delete button functionality
        const delBtn = expenseDiv.querySelector(".delete-btn");
        delBtn.addEventListener('click', () => {
            expenses = expenses.filter((p) => p.id !== id);
            expenseDiv.remove();
            saveExpense(expenses);

            // Update total after deletion
            let totalPrice = 0;
            expenses.forEach(exp => {
                totalPrice += exp.price;
            });
            displayTotal.textContent = `$${totalPrice.toFixed(2)}`;
        });
    }

    function saveExpense(expenses) {
        localStorage.setItem("ExpenseDetails", JSON.stringify(expenses));
    }
});
