# Todo List

![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E)
![Runtime](https://img.shields.io/badge/runtime-browser%20console-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

A menu-driven todo list manager for the browser console. It keeps three separate lists, Todo, Done, and Removed, and lets the user add tasks, remove them, mark them as done, and display any list.

## Features

- Add a task to the Todo list
- Remove a task by name, which moves it to the Removed list
- Mark a task as done, which moves it from the Todo list to the Done list
- Display the Todo list, the Done list, the Removed list, or all three
- Clear messages for empty lists, tasks that are not found, and invalid menu choices
- Feedback through both `alert()` dialogs and console output, with `console.error()` used for error cases

## Tech Stack

| Category | Details |
| --- | --- |
| Language | JavaScript |
| Runtime | Browser developer console |
| Input and output | `prompt()`, `alert()`, `console.log()`, `console.error()` |
| State | Three in-memory arrays: `tasksTodo`, `tasksDone`, `tasksRemoved` |

## Project Structure

```text
02 - Todo List/
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

The main menu is repeated until option 5 is chosen.

| Option | Action |
| --- | --- |
| 1 | Add a task |
| 2 | Remove a task by name |
| 3 | Mark a task as done |
| 4 | Display a list (opens a second menu) |
| 5 | Quit |

The display menu offers 1 for the Todo list, 2 for the Done list, 3 for the Removed list, and 4 for all lists.

## How It Works

- Tasks are plain strings stored in arrays.
- Removing or completing a task looks it up with `includes()`, finds its position with `indexOf()`, and takes it out of `tasksTodo` with `splice()` after pushing it onto the destination array.
- Each action checks first whether the list is empty and reports it with `alert()` and `console.error()`.
- Lists are printed with a `for` loop that numbers each entry.

## Known Limitations

- Task names are matched exactly, including capitalization, and only the first matching entry is affected.
- The add option does not check for empty input. Clicking Cancel on the add prompt stores the value `null` as a task.
- Duplicate tasks are allowed.
- Nothing is saved between runs.

## License

This project is part of a repository licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

Copyright (c) 2026 Ubaid Ahmad

Return to the [repository index](../README.md).
