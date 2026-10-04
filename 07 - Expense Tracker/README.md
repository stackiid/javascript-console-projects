# Expense Tracker

![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E)
![Runtime](https://img.shields.io/badge/runtime-browser%20console-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

An expense manager for the browser console, built around a single object that holds the data and the methods that work on it. The user can add, delete, list, and total expenses.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Data Model](#data-model)
- [How It Works](#how-it-works)
- [Known Limitations](#known-limitations)
- [License](#license)

## Features

- Ten starting expenses across seven categories
- Add an expense with a description, an amount, and a category, with validation through `try` and `catch`
- Delete an expense by description, matched without regard to capitalization
- List every expense with its ID, description, amount, and category
- Show the total of all expenses
- Automatic ID assignment (one more than the last expense's ID)

## Tech Stack

| Category | Details |
| --- | --- |
| Language | JavaScript |
| Runtime | Browser developer console |
| Input and output | `prompt()`, `alert()`, `console.log()`, `console.error()` |
| Techniques | Object methods using `this`, `try`/`catch` with `throw new Error()`, `findIndex()`, `splice()`, `forEach()` |

## Project Structure

```text
07 - Expense Tracker/
|-- main.js
`-- README.md
```

## Running the Project

1. Open any modern desktop browser.
2. Open the developer tools console (press `F12`, then choose the Console tab).
3. Copy the full contents of `main.js`, paste them into the console, and press Enter.
4. Respond to the `prompt()` dialogs and read the `alert()` dialogs. Additional output is written to the console.

Some browsers ask you to type `allow pasting` before the console accepts pasted code.

The program calls `prompt()` and `alert()`, which are browser functions, so it is meant to run in a browser console rather than in Node.js. There is no package manifest, installation step, build step, or test suite in this project. All data lives in memory and is reset every time the script is run again.

## Usage

The menu repeats until option 5 is chosen.

| Option | Action |
| --- | --- |
| 1 | Add Expense |
| 2 | Delete Expense |
| 3 | List All Expenses |
| 4 | View Total Expenses |
| 5 | Exit |

## Data Model

The `expenseTracker` object has an `expenses` array and five methods: `addExpense`, `deleteExpense`, `listExpenses`, `getTotal`, and `main`. Each expense is an object:

| Field | Description |
| --- | --- |
| `id` | Number |
| `description` | Text |
| `amount` | Number |
| `category` | Text. The starting data uses Food, Housing, Utilities, Entertainment, Health, Transportation, and Education |

The starting expenses add up to 1512.

## How It Works

- `addExpense()` throws an error when the description or category is empty or when the amount is not a number greater than 0, and the `catch` block reports the message with `alert()` and `console.error()`.
- `deleteExpense()` lowercases both the stored description and the input, finds the first match with `findIndex()`, and removes it with `splice()`.
- `getTotal()` adds every `amount` in a `for` loop.
- `main()` runs the menu with a `switch` statement and is started with `expenseTracker.main()`.

## Known Limitations

- Amounts have no currency symbol or fixed number of decimals, and the total is a plain floating-point sum.
- Clicking Cancel on the delete prompt raises an uncaught error and stops the script.
- Only the first expense with a matching description is deleted.
- Nothing is saved between runs.

## License

This project is part of a repository licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

Copyright (c) 2026 Ubaid Ahmad

Return to the [repository index](../README.md).
