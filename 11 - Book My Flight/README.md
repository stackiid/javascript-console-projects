# Book My Flight

![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E)
![Runtime](https://img.shields.io/badge/runtime-browser%20console-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

BookMyFlight is a flight booking platform for the browser console with three kinds of users: guests, registered users, and administrators. It generates a database of flights at startup, then lets guests browse, users register and book, and administrators manage flights and review bookings. All data lives in memory.

## Table of Contents

- [Features](#features)
- [Roles and Menus](#roles-and-menus)
- [Seed Data](#seed-data)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Running the Project](#running-the-project)
- [Data Model](#data-model)
- [How It Works](#how-it-works)
- [Validation Rules](#validation-rules)
- [JavaScript Concepts Used](#javascript-concepts-used)
- [Known Limitations](#known-limitations)
- [License](#license)

## Features

- Sixty flights generated at startup from 50 international airports (one per country) and 20 Pakistani airports, with domestic, mixed, and international-only routes
- Search flights by origin and destination city, and view all flights
- User registration with unique username and email checks, and login
- Flight booking with passport and identity details, optional extra baggage, and a travel type that sets the number of seats
- Booking cancellation that restores the seats and records the cancellation
- Viewing of a user's own bookings and cancelled bookings
- Account deletion that removes the account and its active bookings
- Administrator tools to add, remove, and edit flights, view all bookings with total revenue, and view individual booking details
- Sequential, prefixed IDs for flights, users, bookings, and admins (for example `BMF-FLT-001`)

## Roles and Menus

The main menu accepts a number or a keyword (for example `guest`, `login`, `register`, `admin`, `delete`, `exit`).

| Role | Menu options |
| --- | --- |
| Main menu | 1 Guest Mode, 2 User Login, 3 User Registration, 4 Admin Panel, 5 Delete Account, 6 Exit |
| Guest | 1 Search Flights, 2 View All Flights, 3 Sign Up, 4 Back to Main Menu |
| User | 1 Search Flights, 2 View All Flights, 3 View Flight Details, 4 Book Flight, 5 View My Bookings, 6 Cancel Booking, 7 View Cancelled Bookings, 8 Delete Account, 9 Logout |
| Admin | 1 Add Flight, 2 Remove Flight, 3 Edit Flight, 4 View All Flights, 5 View All Bookings, 6 View Booking Details, 7 Logout |

## Seed Data

When the script starts, `initializeDatabase()` loads four administrator accounts, 20 default user accounts, and 60 generated flights, and prints the counts to the console. The account details are defined in `adminSeedConfig` and `defaultUserProfiles` near the top of `main.js`. They are demo values in the source code and are not repeated here.

Each generated flight gets:

| Property | How it is generated |
| --- | --- |
| Route | Random airport pair, with the combination of Pakistan and international routes varying |
| Airline | One of 15 airlines |
| Date and time | A random date within the next 30 days and a random departure time |
| Class | Economy, Business, or First Class |
| Price | Economy $500 to $1,500, Business $1,500 to $8,000, First Class $8,000 to $20,000 |
| Baggage allowance | 20 kg (Economy), 30 kg (Business), 40 kg (First Class) |
| Seats | One of 120, 150, 180, 200, 250, or 300 |
| Duration | 1 to 3.5 hours for domestic routes and 2 to 13.5 hours for others, with the arrival time calculated from it |

Duplicate route, date, and time combinations are avoided for up to 50 attempts per flight. Flights are random on every run.

## Tech Stack

| Category | Details |
| --- | --- |
| Language | JavaScript |
| Runtime | Browser developer console |
| Input and output | `prompt()`, `alert()`, `console.log()`, `console.warn()`, `console.error()` |
| Storage | In-memory arrays: `flightDatabase`, `userDatabase`, `adminDatabase`, `bookingDatabase`, `cancelledBookings` |

## Project Structure

```text
11 - Book My Flight/
|-- main.js
`-- README.md
```

`main.js` is organized in labeled sections: ID generators, source data, random data generators, database arrays, seeding, utility functions, guest functions, registration and authentication, user functions, admin functions, menus, and the application start.

## Running the Project

1. Open any modern desktop browser.
2. Open the developer tools console (press `F12`, then choose the Console tab).
3. Copy the full contents of `main.js`, paste them into the console, and press Enter.
4. Respond to the `prompt()` dialogs and read the `alert()` dialogs. Additional output is written to the console.

Some browsers ask you to type `allow pasting` before the console accepts pasted code.

The program calls `prompt()` and `alert()`, which are browser functions, so it is meant to run in a browser console rather than in Node.js. There is no package manifest, installation step, build step, or test suite in this project. All data lives in memory and is reset every time the script is run again.

## Data Model

| Record | Fields |
| --- | --- |
| Flight | `flightID`, `airline`, `origin`, `destination`, `departureDate`, `departureTime`, `arrivalTime`, `totalSeats`, `availableSeats`, `price` (text such as `$850`), `flightClass`, `baggageAllowance`, `travelDuration`, `departureAirport`, `arrivalAirport` |
| User | `userID`, `username`, `password`, `email`, `name`, `dateOfBirth`, `gender`, `contact`, `registrationDate`, `registrationTime` |
| Admin | `adminID`, `name`, `username`, `password`, `email`, `role` |
| Booking | `bookingID`, `flightID`, `userID`, the user's fields, `passportNumber`, `identityNumber`, booking date and time, route and schedule details, `flightClass`, `baggageSpace`, `baggagePrice`, `totalPrice`, `numSeats` |
| Cancelled booking | A booking plus `cancellationDate` and `cancellationTime` |

## How It Works

### Booking a flight

1. The user must be logged in.
2. The user enters an origin and a destination, and the program lists matching flights that still have seats.
3. The user selects a flight number and enters a passport number and an identity number.
4. The user may add extra baggage in kilograms, priced per kilogram by class: $35 for Economy, $75 for Business, and $115 for First Class.
5. The travel type decides the seat count: `alone` is 1, `couple` is 2, and `family` asks for a number. Any other answer keeps one seat.
6. The total is the seat price multiplied by the seat count, plus the baggage price. The user must type `yes` to confirm.
7. The booking is stored, a booking ID is shown, and the flight's available seats are reduced.

### Cancelling and deleting

- Cancelling asks for a booking ID that belongs to the logged-in user, returns the seats to the flight, and adds the booking to the cancelled list. The refund message is informational, and no refund is calculated.
- Deleting an account requires typing the username, removes the user, and removes that user's active bookings while restoring their seats.

### Administrator actions

- Adding a flight asks for the airline, route, date, time, duration, seats, class, and baggage allowance. The price is generated from the class.
- Removing a flight that has bookings requires typing `REMOVE`.
- Editing a flight can change the origin, destination, price, total seats, date, or time. Changing the time recalculates the arrival time.
- Viewing all bookings lists each booking and calculates total revenue with `reduce()`.

## Validation Rules

| Field | Rule |
| --- | --- |
| Username | At least 3 characters and not already taken |
| Email | Contains `@` and `.`, is longer than 5 characters, and is not already registered |
| Password | At least 6 characters |
| Other registration fields | Optional, stored as `N/A` when left blank |
| Baggage and seat counts | Must be positive numbers |

## JavaScript Concepts Used

Arrays of objects, `filter()`, `find()`, `findIndex()`, `some()`, `reduce()`, `forEach()`, the spread operator, object destructuring, `Set`, template literals, `try`/`catch` with `throw`, `setTimeout()`, `setInterval()`, and arrow functions.

## Known Limitations

- Everything is stored in memory and is lost when the script is run again. Flights are regenerated at random every time.
- Passwords are stored and compared as plain text. Booking records copy the logged-in user's fields, including the password field, although the console output does not print it.
- The date of birth, the flight date, and the flight time are not checked for format when entered.
- Dates are produced with `toLocaleDateString()`, so their format depends on the browser's locale.
- The guest sign-up flow schedules a delayed return to the main menu with `setTimeout()`, but the menu loop is synchronous, so in practice the guest menu stays open until option 4 is chosen.
- Removing a flight does not remove its existing bookings.
- There is no real payment or refund processing.

## License

This project is part of a repository licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

Copyright (c) 2026 Ubaid Ahmad

Return to the [repository index](../README.md).
