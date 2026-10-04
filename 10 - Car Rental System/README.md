# Car Rental System

![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E)
![Runtime](https://img.shields.io/badge/runtime-browser%20console-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

A car rental desk simulator for the browser console. The fleet has 20 cars. The user can list the fleet, look up a car, check its status, rent it for a number of days with a random discount and a partial upfront payment, and return it with an itemized fine calculation.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Rental and Return Flow](#rental-and-return-flow)
- [Data Model](#data-model)
- [Known Limitations](#known-limitations)
- [License](#license)

## Features

- Fleet of 20 cars (sedans, hatchbacks, SUVs, luxury sedans, luxury SUVs, and one electric sedan) with daily rates from PKR 3,000 to PKR 20,000
- Car lookup by make (case-insensitive) or by car ID
- Randomly generated car IDs: two uppercase letters followed by three digits
- Rental pricing with a random discount of 0, 2, 5, 8, 12, 14, 16, 18, or 20 percent
- Payment split: 75 percent at rental time and 25 percent at return
- Return process with a menu of eight fine options, including a custom amount
- Rental status for each car (Available or On Rent)

## Tech Stack

| Category | Details |
| --- | --- |
| Language | JavaScript |
| Runtime | Browser developer console |
| Input and output | `prompt()`, `alert()`, `console.log()` |
| Techniques | Object with methods, nested functions, `switch`, `Math.random()`, `toLowerCase()` |

## Project Structure

```text
10 - Car Rental System/
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

The menu repeats until option 6 is chosen.

| Option | Action |
| --- | --- |
| 1 | Display Cars (ID, make, model, year, and status) |
| 2 | Get Car Details (enter a make or a car ID) |
| 3 | Get Rental Status |
| 4 | Rent a Car (enter a make or ID, then the number of days) |
| 5 | Return a Car |
| 6 | Exit |

Car IDs are generated each time the script runs, so use option 1 to see the current IDs. IDs are compared exactly, so type the letters in uppercase. Looking up by make returns the first car with that make.

## Rental and Return Flow

**Renting**

1. The cost is the daily rate multiplied by the number of days.
2. A random discount is applied and the discounted price is shown.
3. The user confirms with `Yes` or `No`.
4. After confirming, the user must type `Pay` to pay 75 percent of the discounted price. The car is then marked as rented, and the amount paid and the remaining 25 percent are stored on the car object.

**Returning**

1. The program shows the stored rental details.
2. The user enters fine options as comma-separated numbers: 1 Damage (PKR 5,000), 2 Late return (PKR 2,000), 3 Missing documents (PKR 1,000), 4 Mileage exceeded (PKR 3,000), 5 Traffic violation (PKR 4,000), 6 Cleaning required (PKR 1,500), 7 Fuel not filled (PKR 2,500), or 8 Other (a custom amount).
3. The total due is the remaining 25 percent plus the fines.
4. The user types `Pay`, and the rental fields are reset so the car is available again.

## Data Model

Each car object has `carId`, `make`, `model`, `year`, `isRented`, `rentalDays`, `dailyRate`, and `type`. Renting adds `totalRentalCost`, `discountPercentage`, `discountAmount`, `discountedCost`, `amountPaid`, and `remainingCost`. All amounts are in PKR.

## Known Limitations

- The number of rental days is not validated, so a non-numeric or negative value flows into the cost calculation.
- Fines are chosen by the user from the menu. Nothing is calculated automatically, for example from a return date.
- The payment prompts repeat until `Pay` is typed.
- Clicking Cancel on any prompt whose input is lowercased (the make or ID, the Yes/No question, and the payment prompts) raises an error and stops the script.
- The details loop uses an undeclared variable (`key`), which creates a global variable in non-strict code.
- Nothing is saved between runs.

## License

This project is part of a repository licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

Copyright (c) 2026 Ubaid Ahmad

Return to the [repository index](../README.md).
