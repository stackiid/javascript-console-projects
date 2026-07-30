# Secure Digital Banking 🏦

A console-based banking portal simulation with multi-step authentication and core account operations.

## Overview

This program simulates a secure login flow - username, password, and a generated one-time password (OTP) - with attempt limits and lockout messaging at each stage. Once authenticated, the user can check their balance, deposit funds, and withdraw funds.

## Why I Built This Project

I built this to practice multi-stage validation flows with attempt tracking, nested loops that gate access to further functionality, and simulating a real-world security pattern (username → password → OTP).

## Features

- Username verification with a limited number of attempts
- Password verification with a limited number of attempts
- Randomly generated 6-digit OTP verification
- Lockout messaging after failed attempts
- Check balance
- Deposit funds (with input validation)
- Withdraw funds (with balance and input validation)

## Technologies Used

- JavaScript (Browser Console)
- `prompt()` / `alert()` for I/O
- `Math.random()` for OTP generation

## JavaScript Concepts Demonstrated

- Nested loops (`while` inside `while`)
- Conditionals and early-exit logic
- Constants vs. mutable state (`const` vs `let`)
- Number formatting with `.toLocaleString()`
- Basic simulated security workflow (multi-factor style authentication)

## Learning Outcomes

This project demonstrates:

- Gating access to a feature set behind a multi-step, attempt-limited authentication flow
- Coordinating state across nested loops (breaking out of both when authentication resolves)
- Validating numeric input for financial operations (deposits/withdrawals)
- Communicating account state clearly and safely to the user

## Project Structure

```
06 - Secure Digital Banking/
│
├── main.js
└── README.md
```

`main.js` contains the full authentication flow followed by the banking operations menu, gated behind a successful login.

## How It Works

1. The user is prompted for a username, with up to 3 attempts.
2. On success, the user is prompted for a password, with up to 3 attempts.
3. On success, a 6-digit OTP is generated and shown, then the user must re-enter it.
4. On successful OTP verification, `isAuthenticated` is set to `true`.
5. If authenticated, the user enters a banking menu: check balance, deposit, withdraw, or exit.

## Getting Started

**Prerequisites:** A modern web browser.

```bash
git clone <your-repo-url>
cd "06 - Secure Digital Banking"
```

Open `main.js`, copy its contents into your browser's developer console, and press Enter to run. Use username `admin` and password `hello123456` to log in.

## Example Output

```
Your current balance is Rs. 50,000
Rs. 5,000 deposited successfully.
New balance: Rs. 55,000
```

## Technical Highlights

- Attempt-limited authentication at three separate stages
- Coordinated loop exits across nested `while` loops
- Consistent input validation before any balance mutation

## Limitations

- Credentials are hardcoded in the source - not a real security implementation
- No persistent storage - balance resets each session
- OTP is displayed directly via `alert`, which wouldn't happen in a real system

## Future Improvements

- Move credential checks to a backend with hashed passwords
- Add transaction history logging
- Add support for multiple accounts/users

## Skills Demonstrated

- JavaScript Fundamentals
- Control Flow
- Input Validation
- Simulated Security Workflows

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
