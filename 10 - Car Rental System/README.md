# Car Rental System 🚗

A console-based car rental platform with dynamic discounts, split payments, and return-time fine calculation.

## Overview

The program manages a fleet of 20 cars, each with a randomly generated ID. Users can browse the fleet, view car details, check rental status, rent a car (with a random discount and a 75%-upfront payment split), and return a car (with itemized fines and the remaining 25% balance due).

## Why I Built This Project

I built this to practice modeling a multi-step business transaction - quote, discount, partial payment, later settlement - rather than a simple single-step action, and to practice nested helper functions scoped to the operation that uses them.

## Features

- Display the full fleet with rental status
- Get detailed car information by make or ID
- Check a car's rental status
- Rent a car: quote with a random discount, confirm, and pay 75% upfront
- Return a car: select applicable fines, pay the remaining 25% plus fines

## Technologies Used

- JavaScript (Browser Console)
- `prompt()` / `alert()` for I/O
- `Math.random()` for ID generation and discount selection

## JavaScript Concepts Demonstrated

- Object literals with methods
- Nested/helper functions scoped inside other functions (`applyRandomDiscount`, `calculateFine`)
- Loops (`while`, `for`) and `switch` statements
- Multi-stage transactional logic (quote → confirm → pay → later settle)
- String parsing (`split(",")` for multi-select fine choices)

## Learning Outcomes

This project demonstrates:

- Breaking a real-world transaction into distinct stages, each gated by its own confirmation loop
- Scoping a helper function inside the function that needs it, keeping logic co-located
- Parsing and validating multi-value input (comma-separated fine selections)
- Carrying state forward between two separate operations (rent now, settle on return)

## Project Structure

```
10 - Car Rental System/
│
├── main.js
└── README.md
```

`main.js` contains the car fleet, the `carRentalFunctions` object with all rental/return logic, and the `main()` menu loop.

## How It Works

1. The user selects an action from the main menu: display, get details, check status, rent, return, or exit.
2. Renting a car quotes a total cost, applies a random discount, and requires the user to confirm and pay 75% upfront in a payment-confirmation loop.
3. Returning a car recalculates any fines from a checklist, adds the remaining 25% balance, and requires payment before marking the car available again.
4. The loop continues until the user exits.

## Getting Started

**Prerequisites:** A modern web browser.

```bash
git clone <your-repo-url>
cd "10 - Car Rental System"
```

Open `main.js`, copy its contents into your browser's developer console, and press Enter to run.

## Example Output

```
BMW 3 Series is available for rent.
Rent Days: 3
Daily Rate: PKR 12000
Total Amount: PKR 12000 x 3 = PKR 36000
Discount: 12%
Discounted Price: PKR 31680
Amount to pay now (75%): PKR 23760
```

## Technical Highlights

- Two-part payment model (75% at rental, 25% + fines at return) tracked entirely in object state
- Randomized discount engine reused across every rental quote
- Multi-select fine calculation parsed from a single comma-separated prompt

## Limitations

- No persistent storage - fleet and rental state reset each session
- No real payment processing, just simulated "pay" confirmation
- Fine categories and discount tiers are fixed, not configurable

## Future Improvements

- Add rental date ranges instead of a day count
- Add a customer/renter profile tied to each booking
- Add configurable discount tiers and fine categories

## Skills Demonstrated

- JavaScript Fundamentals
- Object-Oriented Design
- Multi-Stage Transaction Logic
- Function Scoping

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
