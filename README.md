# JavaScript Console Projects

![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E)
![Runtime](https://img.shields.io/badge/runtime-browser%20console-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

A collection of twelve console-based JavaScript programs. Each project is a single `main.js` file that runs in the browser developer console, uses `prompt()` and `alert()` for input and output, and keeps its data in memory. The projects range from a number-guessing game to booking systems with several user roles.

## Table of Contents

- [Overview](#overview)
- [Projects](#projects)
- [Repository Structure](#repository-structure)
- [Technology Overview](#technology-overview)
- [Getting Started](#getting-started)
- [Working With Individual Projects](#working-with-individual-projects)
- [License](#license)

## Overview

This repository holds 12 independent projects, numbered 01 to 12. Every project lives in its own folder, contains one `main.js` file, and has its own `README.md` that documents the features, usage, implementation, and known limitations of that project.

The numbering also reflects growing scope. Project 01 is a 36-line script, while project 12 is a 2,487-line application with customer and administrator menus.

The projects are independent of one another. They share a language and a runtime, and there is no shared code between them.

## Projects

| # | Project | Description | Documentation |
| --- | --- | --- | --- |
| 01 | [Guessing Game](./01%20-%20Guessing%20Game/) | Number-guessing game with high and low feedback and an attempt counter. | [README](./01%20-%20Guessing%20Game/README.md) |
| 02 | [Todo List](./02%20-%20Todo%20List/) | Menu-driven task manager with Todo, Done, and Removed lists. | [README](./02%20-%20Todo%20List/README.md) |
| 03 | [Super Mart](./03%20-%20Super%20Mart/) | Grocery cart simulator with a 100-item catalog printed as a console table. | [README](./03%20-%20Super%20Mart/README.md) |
| 04 | [Library System](./04%20-%20Library%20System/) | Book catalog built from objects, with borrow, return, add, and view operations. | [README](./04%20-%20Library%20System/README.md) |
| 05 | [Student Grading System](./05%20-%20Student%20Grading%20System/) | Certificate generator that calculates percentages and grades for classes 9 to 12. | [README](./05%20-%20Student%20Grading%20System/README.md) |
| 06 | [Secure Digital Banking](./06%20-%20Secure%20Digital%20Banking/) | Banking simulation with a username, password, and one-time passcode login, followed by balance, deposit, and withdrawal. | [README](./06%20-%20Secure%20Digital%20Banking/README.md) |
| 07 | [Expense Tracker](./07%20-%20Expense%20Tracker/) | Expense manager built around one object with add, delete, list, and total methods. | [README](./07%20-%20Expense%20Tracker/README.md) |
| 08 | [Meal Planner](./08%20-%20Meal%20Planner/) | Randomized multi-day meal plan generator with timed console output. | [README](./08%20-%20Meal%20Planner/README.md) |
| 09 | [Boutique Inventory Tracker](./09%20-%20Boutique%20Inventory%20Tracker/) | Inventory manager for 30 boutique products with stock and price updates, restock alerts, and sales simulation. | [README](./09%20-%20Boutique%20Inventory%20Tracker/README.md) |
| 10 | [Car Rental System](./10%20-%20Car%20Rental%20System/) | Rental desk for a 20-car fleet with random discounts, partial payment, and fines on return. | [README](./10%20-%20Car%20Rental%20System/README.md) |
| 11 | [Book My Flight](./11%20-%20Book%20My%20Flight/) | Flight booking platform with guest, user, and administrator roles and 60 generated flights. | [README](./11%20-%20Book%20My%20Flight/README.md) |
| 12 | [CineMax Cinema](./12%20-%20CineMax%20Cinema/) | Cinema booking system with a seat map, food ordering, coupons, a wallet, and administrator reports. | [README](./12%20-%20CineMax%20Cinema/README.md) |

All 12 projects have their own README.

## Repository Structure

```text
javascript-console-projects/
|-- 01 - Guessing Game/
|   |-- main.js
|   `-- README.md
|-- 02 - Todo List/
|   |-- main.js
|   `-- README.md
|-- 03 - Super Mart/
|   |-- main.js
|   `-- README.md
|-- 04 - Library System/
|   |-- main.js
|   `-- README.md
|-- 05 - Student Grading System/
|   |-- main.js
|   `-- README.md
|-- 06 - Secure Digital Banking/
|   |-- main.js
|   `-- README.md
|-- 07 - Expense Tracker/
|   |-- main.js
|   `-- README.md
|-- 08 - Meal Planner/
|   |-- main.js
|   `-- README.md
|-- 09 - Boutique Inventory Tracker/
|   |-- main.js
|   `-- README.md
|-- 10 - Car Rental System/
|   |-- main.js
|   `-- README.md
|-- 11 - Book My Flight/
|   |-- main.js
|   `-- README.md
|-- 12 - CineMax Cinema/
|   |-- main.js
|   `-- README.md
|-- LICENSE
`-- README.md
```

## Technology Overview

All projects are written in plain JavaScript and have no package manifest, dependencies, or build step.

| Browser feature | Used in |
| --- | --- |
| `prompt()` and `alert()` for input and output | All projects |
| `console.log()` for output | All projects |
| `console.error()` and `console.warn()` for error and warning output | 02, 03, 06, 07, 08, 09, and 11 |
| `console.table()` | 03 - Super Mart |
| `setInterval()`, `setTimeout()` | 08 - Meal Planner, 11 - Book My Flight |

Because the programs depend on `prompt()` and `alert()`, they are meant to run in a browser console and not in Node.js.

## Getting Started

The repository has no root-level setup or commands. Each project is run on its own.

```bash
git clone https://github.com/stackiid/javascript-console-projects.git
cd javascript-console-projects
```

Then pick a project from the [Projects](#projects) table and follow the steps below.

## Working With Individual Projects

1. Open a project folder, for example `01 - Guessing Game`.
2. Read its `README.md` for what the program does and how to use it.
3. Open a modern desktop browser and its developer tools console (press `F12`, then choose the Console tab).
4. Copy the full contents of the project's `main.js`, paste it into the console, and press Enter.
5. Answer the `prompt()` dialogs and read the `alert()` dialogs. Further output appears in the console.

Some browsers ask you to type `allow pasting` before the console accepts pasted code. Data is not saved between runs.

## License

This repository is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

Copyright (c) 2026 Ubaid Ahmad
