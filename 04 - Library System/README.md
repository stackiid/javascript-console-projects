# Library System 📚

A console-based library catalog system for borrowing, returning, and adding books.

## Overview

This program manages a catalog of books stored as objects, each with a title, author, ISBN, and borrowed status. Users can search and borrow a book by ISBN, return a borrowed book, add a new book (with an auto-generated ISBN), and view the full catalog.

## Why I Built This Project

I built this to move beyond simple arrays of strings and practice working with arrays of objects — modeling real entities with multiple properties and writing functions that operate on that structured data.

## Features

- View the full book catalog with availability status
- Borrow a book by ISBN
- Return a borrowed book by ISBN
- Add a new book with an auto-generated ISBN

## Technologies Used

- JavaScript (Browser Console)
- `prompt()` / `alert()` for I/O

## JavaScript Concepts Demonstrated

- Arrays of objects
- Functions
- Conditionals and `switch` statements
- Loops (`while`, `for`)
- Random ID/ISBN generation
- Boolean state tracking (`borrowed`)

## Learning Outcomes

This project demonstrates:

- Modeling real-world entities as objects within an array
- Writing single-purpose functions (`addBook`, `borrowBook`, `returnBook`, `displayBooks`)
- Using a `switch` statement to route menu choices to functions
- Searching an array of objects by a specific property (ISBN)

## Project Structure

```
04 - Library System/
│
├── main.js
└── README.md
```

`main.js` contains the book catalog array and every function that reads or modifies it, plus the menu loop that ties them together.

## How It Works

1. The program shows a menu: search/borrow, return, add, view catalog, or shut down.
2. `switch` routes the user's choice to the matching function.
3. Each function searches the book array by ISBN and updates state or displays results.
4. The loop repeats until the user shuts down the system.

## Getting Started

**Prerequisites:** A modern web browser.

```bash
git clone <your-repo-url>
cd "04 - Library System"
```

Open `main.js`, copy its contents into your browser's developer console, and press Enter to run.

## Example Output

```
● Title      : 1984
● Author     : George Orwell
● ISBN       : 9781940177173
● Status     : Available
```

## Technical Highlights

- Clean separation of concerns: one function per action
- Reusable ISBN generator function
- `switch`-based menu routing instead of long `if`/`else` chains

## Limitations

- No persistent storage — catalog resets each session
- No due dates or borrower tracking
- ISBN must be entered exactly to find a book

## Future Improvements

- Track which user borrowed each book and when it's due
- Add search by title or author, not just ISBN
- Add persistent storage (file or `localStorage`)

## Skills Demonstrated

- JavaScript Fundamentals
- Working with Objects
- Function Decomposition
- Control Flow

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
