# Super Mart

![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E)
![Runtime](https://img.shields.io/badge/runtime-browser%20console-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

A grocery-store cart simulator for the browser console. It prints a catalog of 100 items as a table and then lets the user add items to a cart, view the cart, remove items, and review the items that were removed.

## Features

- Catalog of 100 store items, grouped into rows of six and printed with `console.table()`
- Add an item to the cart, validated against the catalog
- View the current cart
- Remove an item from the cart
- View the history of removed items
- Error and confirmation messages through `alert()` and the console

## Tech Stack

| Category | Details |
| --- | --- |
| Language | JavaScript |
| Runtime | Browser developer console |
| Input and output | `prompt()`, `alert()`, `console.log()`, `console.error()`, `console.table()` |
| State | In-memory arrays: `superMartItems`, `userCart`, `removedItem` |

## Project Structure

```text
03 - Super Mart/
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

The catalog table is printed once, when the script starts. After that, a menu repeats until option 5 is chosen.

| Option | Action |
| --- | --- |
| 1 | Ask for an item name and add it to the cart if it exists in the catalog |
| 2 | Show the cart |
| 3 | Remove an item from the cart by name |
| 4 | Show the items that were removed from the cart |
| 5 | Quit |

## How It Works

1. A loop turns the flat `superMartItems` array into row objects with six columns each (`Column1` to `Column6`) and passes them to `console.table()`.
2. Adding an item uses `includes()` against the catalog and `push()` onto the cart.
3. Removing an item uses `includes()` and `indexOf()` on the cart, `splice()` to take it out, and `push()` to record it in the removed list.
4. The cart and the removed list are printed with numbered `for` loops.

## Known Limitations

- Item names must be typed exactly as shown in the catalog, including capitalization.
- The catalog table is not shown again after the script starts, and option 1 only asks for an item name.
- The cart stores names only, so there are no quantities or prices.
- The last table row contains four items, so its last two columns have no value.
- An unrecognized menu choice is ignored and the menu is shown again without a message.
- Nothing is saved between runs.

## License

This project is part of a repository licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

Copyright (c) 2026 Ubaid Ahmad

Return to the [repository index](../README.md).
