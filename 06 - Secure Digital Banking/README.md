# Secure Digital Banking

![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E)
![Runtime](https://img.shields.io/badge/runtime-browser%20console-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

A simulated banking portal for the browser console. The user must pass a three-step login (username, password, and a one-time passcode) before reaching a menu for checking the balance, depositing money, and withdrawing money.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Running the Project](#running-the-project)
- [Login Flow](#login-flow)
- [Account Menu](#account-menu)
- [Credentials](#credentials)
- [Known Limitations](#known-limitations)
- [License](#license)

## Features

- Username check with up to three attempts and a remaining-attempts message after each failure
- Password check with up to three attempts
- Six-digit one-time passcode (OTP) generated at random for each login
- Account menu with Check Balance, Deposit Money, Withdraw Money, and Exit
- Starting balance of Rs. 50,000, formatted with `toLocaleString()`
- Validation of deposit and withdrawal amounts, including an insufficient-balance warning
- Nested loops and early exits that model account lockout messages

## Tech Stack

| Category | Details |
| --- | --- |
| Language | JavaScript |
| Runtime | Browser developer console |
| Input and output | `prompt()`, `alert()`, `console.log()`, `console.error()`, `console.warn()` |
| Techniques | Nested `while` loops, `const` configuration values, `Math.random()`, `parseInt()` |

## Project Structure

```text
06 - Secure Digital Banking/
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

## Login Flow

1. The username is compared with the stored value. Three wrong attempts show a "permanently locked" message and end the login.
2. After a correct username, the password is checked the same way, with three attempts.
3. After a correct password, a six-digit OTP is generated and shown in an `alert()`, which stands in for a text message.
4. The user types the OTP. A match sets `isAuthenticated` to `true` and opens the account menu.
5. A wrong OTP shows a "temporarily locked for 48 hours" message and the script ends. The OTP stage is attempted once per run.

The lock messages are informational only. No lock state is stored, so running the script again starts a fresh login.

## Account Menu

| Option | Action |
| --- | --- |
| 1 | Check Balance |
| 2 | Deposit Money (positive whole number) |
| 3 | Withdraw Money (positive whole number that does not exceed the balance) |
| 4 | Exit |

## Credentials

The login values are constants at the top of `main.js` (`correctUsername` and `correctPassword`). They are demo values in the source code, and they are not repeated here.

## Known Limitations

- Credentials are stored in plain text in the script, so this is a demonstration of control flow and not a real authentication system.
- The OTP is displayed on screen and is never sent anywhere.
- The code includes a second, "72 hours or more" lock message for a repeated OTP failure, but it cannot be reached in a single run because the script ends after the first OTP failure.
- Amounts are read with `parseInt()`, so decimals are cut off (100.75 becomes 100).
- Balance changes are not saved between runs.

## License

This project is part of a repository licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

Copyright (c) 2026 Ubaid Ahmad

Return to the [repository index](../README.md).
