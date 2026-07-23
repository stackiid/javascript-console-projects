# Guessing Game 🎯

A number-guessing game that generates a random target and gives the player high/low feedback until they find it.

## Overview

The program picks a random number between 1 and 100 and asks the player to guess it. After every guess, it tells the player whether to go higher or lower, and counts how many attempts it took to win.

## Why I Built This Project

I built this as a first project to practice core JavaScript control flow: loops that run until a condition is met, conditionals that branch program behavior, and basic input validation using `prompt()`.

## Features

- Random number generation between 1 and 100
- Continuous guessing loop until the correct number is found
- Too high / too low feedback after each guess
- Attempt counter shown on a win
- Input validation for non-numeric and out-of-range guesses

## Technologies Used

- JavaScript (Browser Console)
- `prompt()` / `alert()` for I/O
- `Math.random()` for number generation

## JavaScript Concepts Demonstrated

- Variables (`let`)
- Data types (numbers, strings, booleans)
- Operators (comparison, arithmetic)
- Conditionals (`if` / `else if` / `else`)
- Loops (`while (true)` with `break` / `continue`)
- `isNaN()` validation
- Template literals

## Learning Outcomes

This project demonstrates:

- Writing a controlled infinite loop with a clear exit condition
- Validating user input before acting on it
- Using comparison operators to drive program branching
- Tracking state (attempt count) across loop iterations

## Project Structure

```
01 - Guessing Game/
│
├── project.js
└── README.md
```

`project.js` contains the entire game: number generation, the guessing loop, and all feedback logic.

## How It Works

1. The program generates a random number between 1 and 100.
2. The player is prompted to enter a guess.
3. The input is validated (must be a number between 1 and 100).
4. The program compares the guess to the target and gives feedback.
5. Steps 2–4 repeat until the guess matches the target.
6. The program announces the win along with the number of attempts.

## Getting Started

**Prerequisites:** A modern web browser (this project uses `alert()` / `prompt()`, which run in a browser console).

```bash
git clone <your-repo-url>
cd "01 - Guessing Game"
```

Open `project.js`, copy its contents into your browser's developer console, and press Enter to play.

## Example Output

```
23 is too high! Try again.
50 is too low! Try again.
Congratulations! You guessed the number 37 in 4 attempts.
```

## Technical Highlights

- Clean exit condition for an otherwise infinite loop
- Defensive input validation before comparison logic runs
- Minimal, readable control flow with no unnecessary complexity

## Limitations

- No GUI, runs entirely through browser `alert`/`prompt` dialogs
- No persistent score history between sessions
- No difficulty levels or configurable number range

## Future Improvements

- Add a difficulty selector (range size, max attempts)
- Track and display best score across sessions
- Add a hint system (e.g., "getting warmer")

## Skills Demonstrated

- JavaScript Fundamentals
- Control Flow
- Input Validation
- Problem Solving

#### License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
