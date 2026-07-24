# Todo List ✅

A console-based todo list manager that tracks pending, completed, and removed tasks.

## Overview

This program lets a user manage a list of tasks entirely through the console: adding new tasks, removing them, marking them as done, and viewing any of the three tracked lists (Todo, Done, Removed) individually or all at once.

## Why I Built This Project

I built this to practice array manipulation in JavaScript - specifically adding, searching, and removing items - along with building a menu-driven console application using a persistent loop.

## Features

- Add a task to the Todo list
- Remove a task by name
- Mark a task as done (moves it from Todo to Done)
- Display the Todo list, Done list, Removed list, or all three
- Input handling for empty/not-found tasks

## Technologies Used

- JavaScript (Browser Console)
- `prompt()` / `alert()` for I/O
- Arrays for state management

## JavaScript Concepts Demonstrated

- Variables and arrays
- Loops (`while`, `for`)
- Conditionals (`if` / `else if`)
- Array methods: `push()`, `splice()`, `indexOf()`, `includes()`
- Menu-driven program structure

## Learning Outcomes

This project demonstrates:

- Managing multiple related pieces of state (three separate arrays)
- Searching and mutating arrays safely with `indexOf()` and `splice()`
- Structuring a persistent menu loop with nested decision logic
- Giving clear feedback for both successful actions and error cases

## Project Structure

```
02 - Todo List/
│
├── main.js
└── README.md
```

`main.js` contains the full application: the three task arrays and the menu loop that operates on them.

## How It Works

1. The program displays a menu of five options.
2. The user selects an option to add, remove, mark done, display, or quit.
3. The selected action runs against the relevant array(s).
4. The program loops back to the menu until the user chooses to quit.

## Getting Started

**Prerequisites:** A modern web browser.

```bash
git clone <your-repo-url>
cd "02 - Todo List"
```

Open `main.js`, copy its contents into your browser's developer console, and press Enter to run.

## Example Output

```
===== Todo List =====
1 - Buy groceries
2 - Finish report
```

## Technical Highlights

- Three independent list states managed with clean, isolated logic
- Consistent use of `indexOf()` + `splice()` for safe removal
- Nested menu (list selector within the display option) without losing clarity

## Limitations

- No persistent storage - all lists reset when the console session ends
- No GUI, console-only interaction
- Task names must match exactly (case-sensitive) to be found

## Future Improvements

- Add case-insensitive task matching
- Add persistent storage via `localStorage` or a file (Node.js version)
- Add task editing and due dates

## Skills Demonstrated

- JavaScript Fundamentals
- Array Manipulation
- Control Flow
- Code Organization

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
