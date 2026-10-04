# Library System

![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E)
![Runtime](https://img.shields.io/badge/runtime-browser%20console-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

A library catalog manager for the browser console. Books are stored as objects with a title, author, ISBN, and borrowed status, and the menu lets the user borrow a book by ISBN, return a book, add a new book, and view the full catalog.

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

- Starting catalog of 12 books, one of which is already marked as borrowed
- Borrow a book by entering its ISBN, with checks for unknown ISBNs and books that are already borrowed
- Return a book by ISBN, with checks for unknown ISBNs and books that are not borrowed
- Add a book by title and author, with an automatically generated ISBN
- View the full catalog with title, author, ISBN, and Available or Borrowed status
- Menu loop implemented with functions and a `switch` statement

## Tech Stack

| Category | Details |
| --- | --- |
| Language | JavaScript |
| Runtime | Browser developer console |
| Input and output | `prompt()`, `alert()`, `console.log()` |
| State | An in-memory array of book objects |

## Project Structure

```text
04 - Library System/
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

The program starts by calling `systemStart()` and shows the menu until option 5 is chosen.

| Option | Action |
| --- | --- |
| 1 | Search/Borrow Book (asks for an ISBN and checks the book out) |
| 2 | Return Book (asks for an ISBN) |
| 3 | Add Book (asks for a title and an author) |
| 4 | View Catalog |
| 5 | Shutdown System |

To borrow or return a book, copy its ISBN from the catalog listing (option 4).

## Data Model

Each book is an object:

| Field | Description |
| --- | --- |
| `title` | Book title |
| `author` | Author name |
| `ISBN` | Thirteen-digit string |
| `borrowed` | `true` when checked out, `false` when available |

## How It Works

- `displayBooks()` loops through the array and prints each book's fields and status.
- `generateISBN()` builds a string that starts with `978` followed by ten random digits.
- `addBook()` reads a title and an author, generates an ISBN, and pushes a new object with `borrowed: false`.
- `borrowBook()` and `returnBook()` loop through the array to find a matching ISBN, flip the `borrowed` flag when the state allows it, and report the result with `alert()`.
- `systemStart()` runs the menu loop with a `switch` statement and a `running` flag.

## Known Limitations

- Option 1 is labeled Search/Borrow, but it only borrows by exact ISBN. There is no search by title or author.
- Generated ISBNs are random digits with no check-digit calculation, and uniqueness is not verified.
- The add option does not validate empty titles or authors.
- Nothing is saved between runs.

## License

This project is part of a repository licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

Copyright (c) 2026 Ubaid Ahmad

Return to the [repository index](../README.md).
