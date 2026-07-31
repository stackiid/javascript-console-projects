# Expense Tracker 💰

A console-based expense tracker built as a single object with methods for adding, deleting, listing, and totaling expenses.

## Overview

`expenseTracker` is an object that holds an array of expense records and exposes methods to add a new expense, delete one by description, list all expenses, and calculate the running total. A menu loop drives the whole interaction.

## Why I Built This Project

I built this to practice organizing related state and behavior together in a single object (rather than separate global arrays and functions), and to practice using `try`/`catch` for input validation instead of plain `if` checks.

## Features

- Add an expense (description, amount, category) with auto-incrementing ID
- Delete an expense by description
- List all recorded expenses
- View the total of all expenses
- Input validation via thrown errors

## Technologies Used

- JavaScript (Browser Console)
- `prompt()` / `alert()` for I/O

## JavaScript Concepts Demonstrated

- Object literals with methods (`this` binding)
- Error handling with `try` / `catch` / `throw`
- Array methods: `findIndex()`, `splice()`, `forEach()`
- Loops and `switch` statements

## Learning Outcomes

This project demonstrates:

- Grouping data and behavior into a single cohesive object
- Using `this` correctly inside object methods
- Validating input by throwing and catching custom errors instead of chained `if` statements
- Searching an array of objects by a text field with `findIndex()`

## Project Structure

```
07 - Expense Tracker/
│
├── main.js
└── README.md
```

`main.js` defines the `expenseTracker` object (data + methods) and calls `expenseTracker.main()` to start the menu loop.

## How It Works

1. `expenseTracker.main()` displays the menu and reads the user's choice.
2. A `switch` statement routes the choice to the matching method.
3. `addExpense()` validates input and throws errors for invalid values, caught and reported to the user.
4. `deleteExpense()`, `listExpenses()`, and `getTotal()` operate on the shared `expenses` array.
5. The loop repeats until the user exits.

## Getting Started

**Prerequisites:** A modern web browser.

```bash
git clone <your-repo-url>
cd "07 - Expense Tracker"
```

Open `main.js`, copy its contents into your browser's developer console, and press Enter to run.

## Example Output

```
====== EXPENSE LIST ======
ID: 1
Description: Groceries
Amount: 50
Category: Food
-------------------------
```

## Technical Highlights

- Object-based state management instead of scattered global variables
- `try`/`catch`/`throw` used for genuine input validation, not just error suppression
- Auto-incrementing ID logic based on the last item in the array

## Limitations

- No persistent storage - expenses reset each session
- No editing of existing expenses, only add/delete
- Category is free text, not validated against a fixed list

## Future Improvements

- Add expense editing
- Add category-based filtering and totals
- Add persistent storage (file or `localStorage`)

## Skills Demonstrated

- JavaScript Fundamentals
- Object-Oriented Thinking
- Error Handling
- Array Manipulation

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
