const expenseTracker = {
  expenses: [
    { id: 1, description: "Groceries", amount: 50.0, category: "Food" },
    { id: 2, description: "Rent", amount: 1200.0, category: "Housing" },
    {
      id: 3,
      description: "Internet Bill",
      amount: 60.0,
      category: "Utilities",
    },
    {
      id: 4,
      description: "Movie Ticket",
      amount: 15.0,
      category: "Entertainment",
    },
    { id: 5, description: "Gym Membership", amount: 30.0, category: "Health" },
    {
      id: 6,
      description: "Bus Pass",
      amount: 20.0,
      category: "Transportation",
    },
    { id: 7, description: "Coffee", amount: 5.0, category: "Food" },
    { id: 8, description: "Phone Bill", amount: 40.0, category: "Utilities" },
    {
      id: 9,
      description: "Book Purchase",
      amount: 12.0,
      category: "Education",
    },
    { id: 10, description: "Dentist Visit", amount: 80.0, category: "Health" },
  ],

  addExpense: function () {
    try {
      let expenseId =
        this.expenses.length > 0
          ? this.expenses[this.expenses.length - 1].id + 1
          : 1;

      let expenseDesc = prompt("Enter expense description:");
      if (!expenseDesc) throw new Error("Description cannot be empty.");

      let expenseAmount = parseFloat(prompt("Enter expense amount:"));
      if (isNaN(expenseAmount) || expenseAmount <= 0) {
        throw new Error("Amount must be greater than 0.");
      }

      let expenseCategory = prompt("Enter expense category:");
      if (!expenseCategory) throw new Error("Category cannot be empty.");

      this.expenses.push({
        id: expenseId,
        description: expenseDesc,
        amount: expenseAmount,
        category: expenseCategory,
      });

      alert(`${expenseDesc} has been added successfully.`);
      console.log("Expense added:", {
        id: expenseId,
        description: expenseDesc,
        amount: expenseAmount,
        category: expenseCategory,
      });
    } catch (error) {
      alert("Error: " + error.message);
      console.error(error.message);
    }
  },

  deleteExpense: function () {
    let expenseDesc = prompt("Enter the name of the expense to delete:");
    let index = this.expenses.findIndex(
      (exp) => exp.description.toLowerCase() === expenseDesc.toLowerCase(),
    );

    if (index !== -1) {
      let removed = this.expenses.splice(index, 1);
      alert(`${removed[0].description} has been removed.`);
      console.log("Expense removed:", removed[0]);
    } else {
      alert("Expense not found.");
      console.log("Delete failed: Expense not found.");
    }
  },

  listExpenses: function () {
    alert("Retrieving all recorded expenses...");
    console.log("====== EXPENSE LIST ======");
    this.expenses.forEach((exp) => {
      console.log(`ID: ${exp.id}`);
      console.log(`Description: ${exp.description}`);
      console.log(`Amount: ${exp.amount}`);
      console.log(`Category: ${exp.category}`);
      console.log("-------------------------");
    });
    alert("All expenses displayed in console.");
  },

  getTotal: function () {
    alert("Calculating total expenses...");
    let total = 0;
    for (let i = 0; i < this.expenses.length; i++) {
      total += this.expenses[i].amount;
    }
    console.log(`Total Expenses: ${total}`);
    alert(`Total expenses: ${total}`);
  },

  main: function () {
    let running = true;
    while (running) {
      let choice = prompt(
        `Expense Tracker Menu:
1. Add Expense
2. Delete Expense
3. List All Expenses
4. View Total Expenses
5. Exit`,
      );

      switch (choice) {
        case "1":
          this.addExpense();
          break;
        case "2":
          this.deleteExpense();
          break;
        case "3":
          this.listExpenses();
          break;
        case "4":
          this.getTotal();
          break;
        case "5":
          running = false;
          alert("Thank you for using Expense Tracker. Goodbye!");
          console.log("Application terminated by user.");
          break;
        default:
          alert("Invalid option. Please choose between 1-5.");
          console.log("Invalid menu choice entered.");
      }
    }
  },
};

expenseTracker.main();
