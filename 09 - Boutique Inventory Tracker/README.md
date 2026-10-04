# Boutique Inventory Tracker

![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E)
![Runtime](https://img.shields.io/badge/runtime-browser%20console-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

An inventory manager for a fictional boutique, written for the browser console. It tracks 30 products in three categories and lets the user browse the inventory, look up products, update stock and prices, check availability and restock alerts, and simulate sales.

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

- 30 products: 13 in Clothing, 6 in Shoes, and 11 in Accessories
- A short product code generated for each product when the script starts
- Browse by category (`shoes`, `clothes`, or `accessories`)
- Product lookup by exact name or code, printing every field
- Stock level and price updates
- Availability check that reports the stock count or an out-of-stock message
- Restock alert when stock is at or below a product's restock threshold
- Single-sale simulation and a daily sales simulation that sells one unit of every in-stock product
- Menu loop with nine options

## Tech Stack

| Category | Details |
| --- | --- |
| Language | JavaScript |
| Runtime | Browser developer console |
| Input and output | `prompt()`, `alert()`, `console.log()`, `console.error()` |
| Techniques | Array of objects, functions that take arguments and return values, `switch`, `Object.keys()`, `for...of` |

## Project Structure

```text
09 - Boutique Inventory Tracker/
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

The menu repeats until option 9 is chosen.

| Option | Action |
| --- | --- |
| 1 | Display Inventory (then type `shoes`, `clothes`, or `accessories`) |
| 2 | Get Product Details (by name or code) |
| 3 | Update Stock Level (name or code, then a new quantity) |
| 4 | Update Price (name or code, then a new price) |
| 5 | Check Product Availability |
| 6 | Check Restock Alert |
| 7 | Simulate Sale (reduces stock by one) |
| 8 | Process Daily Sales (one sale per in-stock product) |
| 9 | Exit |

Names must be typed exactly as stored, and the generated codes are printed in the category listing from option 1.

## Data Model

| Field | Description |
| --- | --- |
| `id` | Number from 1 to 30 |
| `name` | Product name |
| `price` | Number |
| `stock` | Units in stock |
| `restockThreshold` | Stock level at or below which a restock alert is raised |
| `category` | `Clothing`, `Shoes`, or `Accessories` |
| `code` | Added at startup: the digit 7 followed by three random digits |

## How It Works

- `generateCode()` builds each product code, and a loop assigns one to every product when the script loads.
- Each operation (`getProductDetails()`, `updateStockLevel()`, `updatePrice()`, `isProductAvailable()`, `checkRestockAlert()`, `simulateSale()`) loops through the products and matches the input against `name` or `code`.
- `simulateSale()` returns the sold product, or `null` when the product is out of stock or not found.
- `processDailySales()` calls `simulateSale()` for each in-stock product and then `checkRestockAlert()` for each product that sold.
- `main()` runs the menu with a `switch` statement and returns when option 9 is chosen.

## Known Limitations

- Codes are random and not checked for uniqueness. The digits 0 to 8 are used, so the digit 9 never appears in the three random positions.
- Two product names appear twice ("Tommy Hilfiger Jacket" and "Calvin Klein Jacket"), so operations that stop at the first match act on the first product with that name. Using the code avoids this.
- Stock and price updates do not validate the entered number.
- Lookups are case-sensitive.
- The price update message uses a dollar sign, while the data has no currency.
- Nothing is saved between runs.

## License

This project is part of a repository licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

Copyright (c) 2026 Ubaid Ahmad

Return to the [repository index](../README.md).
