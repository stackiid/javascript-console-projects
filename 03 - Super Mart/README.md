# Super Mart 🛒

A console-based grocery store simulator where users browse a catalog and manage a shopping cart.

## Overview

Super Mart displays a catalog of over 100 store items in a formatted table, then lets the user add items to a cart, view the cart, remove items, and view previously removed items — all through console prompts.

## Why I Built This Project

I built this to practice working with larger arrays of data, formatting console output with `console.table()`, and building a multi-option cart management flow.

## Features

- Browse the full store catalog (displayed via `console.table`)
- Add items to cart (validated against the catalog)
- View current cart contents
- Remove items from cart
- View a history of removed items

## Technologies Used

- JavaScript (Browser Console)
- `prompt()` / `alert()` for I/O
- `console.table()` for structured data display

## JavaScript Concepts Demonstrated

- Arrays and array iteration
- Loops (`while`, `for`)
- Conditionals
- Array methods: `push()`, `splice()`, `indexOf()`, `includes()`
- Data restructuring (flat array → table rows)

## Learning Outcomes

This project demonstrates:

- Transforming a flat list into a structured table format for readability
- Validating user input against a reference dataset before mutating state
- Managing two related arrays (cart and removed items) independently
- Building a straightforward menu loop for repeated user actions

## Project Structure

```
03 - Super Mart/
│
├── main.js
└── README.md
```

`main.js` contains the store catalog, the table-formatting logic, and the full cart management menu.

## How It Works

1. The program builds and displays a table of all store items.
2. The user chooses to browse/add, view cart, remove an item, view removed items, or quit.
3. Each action validates input against the catalog or cart before applying it.
4. The loop continues until the user quits.

## Getting Started

**Prerequisites:** A modern web browser.

```bash
git clone <your-repo-url>
cd "03 - Super Mart"
```

Open `main.js`, copy its contents into your browser's developer console, and press Enter to run.

## Example Output

```
Here are the are items in your cart:
1 - Apples
2 - Milk
```

## Technical Highlights

- Reshaping a 100+ item array into a 6-column table for `console.table()`
- Consistent validation pattern across add/remove operations
- Clear separation between "available in store" and "in cart" state

## Limitations

- No persistent storage — cart resets when the session ends
- No pricing, checkout, or payment flow
- Item names must match exactly (case-sensitive)

## Future Improvements

- Add prices and a checkout/total calculation
- Add case-insensitive and partial-name search
- Add quantity support instead of one entry per add

## Skills Demonstrated

- JavaScript Fundamentals
- Array Manipulation
- Data Formatting
- Control Flow

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
