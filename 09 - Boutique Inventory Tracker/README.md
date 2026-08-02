# Boutique Inventory Tracker 👗

A console-based inventory management system for a clothing boutique, with stock tracking, restock alerts, and sales simulation.

## Overview

The program manages a 30-item product catalog (clothing, shoes, accessories), each with a price, stock level, and restock threshold. Users can browse by category, look up product details, update stock or price, check availability, trigger restock alerts, simulate individual sales, and process a full day of sales across the entire catalog.

## Why I Built This Project

I built this to practice writing a set of interrelated functions that all operate on the same shared dataset, and to model realistic business logic like restock thresholds and end-of-day batch processing.

## Features

- Browse inventory by category (shoes, clothes, accessories)
- Look up a product by name or generated 4-digit code
- Update a product's stock level
- Update a product's price
- Check whether a product is in stock
- Check and alert on low-stock (restock threshold) conditions
- Simulate a single sale (decrements stock by 1)
- Process daily sales across the entire catalog in one action

## Technologies Used

- JavaScript (Browser Console)
- `prompt()` / `alert()` for I/O

## JavaScript Concepts Demonstrated

- Arrays of objects
- Functions with parameters and return values
- `Object.keys()` for dynamic property iteration
- Loops (`for`, `while`) and `switch` statements
- Random code generation

## Learning Outcomes

This project demonstrates:

- Looking up records by more than one identifier (name or code)
- Using `Object.keys()` to print any object's fields generically
- Composing functions together (`processDailySales` calls `simulateSale`, which feeds `checkRestockAlert`)
- Separating read operations (details, availability) from write operations (stock/price updates)

## Project Structure

```
09 - Boutique Inventory Tracker/
│
├── main.js
└── README.md
```

`main.js` contains the product catalog, all inventory functions, and the `main()` menu loop that ties them together.

## How It Works

1. The program displays a 9-option menu.
2. Each option calls a dedicated function: display, get details, update stock/price, check availability, check restock, simulate a sale, or process all daily sales.
3. `processDailySales()` loops through every in-stock product, sells one unit via `simulateSale()`, and checks `checkRestockAlert()` for each.
4. The loop continues until the user exits.

## Getting Started

**Prerequisites:** A modern web browser.

```bash
git clone <your-repo-url>
cd "09 - Boutique Inventory Tracker"
```

Open `main.js`, copy its contents into your browser's developer console, and press Enter to run.

## Example Output

```
Sold: Nike Air Max (remaining stock: 7)
Restock alert: Rolex Watch (Code: 7284) is running low (stock: 3).
```

## Technical Highlights

- Function composition: daily sales processing reuses the single-sale and restock-check functions
- Dual-identifier lookup (name or code) applied consistently across every function
- Generic object field printing via `Object.keys()` instead of hardcoded field lists

## Limitations

- No persistent storage - inventory resets each session
- No purchase history or revenue tracking over time
- Product codes can collide since they're randomly generated without uniqueness checks

## Future Improvements

- Add revenue tracking and daily sales reports
- Guarantee unique product codes
- Add a proper checkout flow with multiple items per transaction

## Skills Demonstrated

- JavaScript Fundamentals
- Function Composition
- Working with Objects
- Business Logic Modeling

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
