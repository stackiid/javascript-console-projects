# Guessing Game

![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E)
![Runtime](https://img.shields.io/badge/runtime-browser%20console-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

A number-guessing game for the browser console. The program picks a random whole number from 1 to 100 and keeps asking for guesses, reporting whether each guess is too high or too low, until the player finds the number.

## Features

- Random target number between 1 and 100, generated with `Math.random()`
- Guessing loop that runs until the correct number is entered
- "Too high" and "too low" feedback after every valid guess, shown through both `console.log()` and `alert()`
- Input validation that rejects non-numeric guesses and numbers outside the 1 to 100 range
- Attempt counter that is reported in the winning message

## Tech Stack

| Category | Details |
| --- | --- |
| Language | JavaScript |
| Runtime | Browser developer console |
| Input and output | `prompt()`, `alert()`, `console.log()` |

## Project Structure

```text
01 - Guessing Game/
|-- main.js
`-- README.md
```

The whole game is in `main.js`: number generation, the guessing loop, validation, and feedback.

## Running the Project

1. Open any modern desktop browser.
2. Open the developer tools console (press `F12`, then choose the Console tab).
3. Copy the full contents of `main.js`, paste them into the console, and press Enter.
4. Respond to the `prompt()` dialogs and read the `alert()` dialogs. Additional output is written to the console.

Some browsers ask you to type `allow pasting` before the console accepts pasted code.

The program calls `prompt()` and `alert()`, which are browser functions, so it is meant to run in a browser console rather than in Node.js. There is no package manifest, installation step, build step, or test suite in this project. All data lives in memory and is reset every time the script is run again.

## How It Works

1. `radNum` is set to a random integer from 1 to 100 and `attempts` starts at 0.
2. Two `alert()` dialogs welcome the player and explain the range.
3. A `while (true)` loop asks for a guess with `prompt()` and converts it with `parseInt()`.
4. If the value is not a number, or is outside 1 to 100, an `alert()` explains the problem and the loop continues.
5. If the guess is higher than the target, the player is told it is too high. If it is lower, the player is told it is too low.
6. If the guess matches, the congratulations message includes the number of attempts and the loop ends with `break`.

## Example Session

The target in this example is 62.

```text
Enter your guess: 50
50 is too low! Try again.
Enter your guess: 75
75 is too high! Try again.
Enter your guess: 62
Congratulations! You guessed the number 62 in 3 attempts.
```

## Known Limitations

- The attempt counter is incremented before validation, so invalid or out-of-range entries count as attempts.
- Clicking Cancel on the guess dialog returns `null`, which is treated as invalid input, so the dialog reappears. To stop the game early, reload the page.
- There is no replay option. Run the script again to get a new target number.

## License

This project is part of a repository licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

Copyright (c) 2026 Ubaid Ahmad

Return to the [repository index](../README.md).
