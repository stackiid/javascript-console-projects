# Book My Flight ✈️

A full console-based flight booking platform with guest browsing, user accounts, and an admin back office — backed by a runtime database that generates its own sample data on startup.

## Overview

BookMyFlight simulates a complete airline booking system. Guests can search and view flights without an account; registered users can log in to book, view, and cancel flights; and admins can log in separately to add, edit, and remove flights and view all bookings across the system.

Rather than shipping with hundreds of lines of hard-coded flights and users, the app starts with empty databases and populates them itself: 60 flights and 20 users are generated from compact source data and pushed into the database in one pass the moment the program runs.

## Why I Built This Project

I built this as a capstone-style project to combine everything from smaller exercises - CRUD operations, authentication, validation, and menu systems - into one cohesive, multi-role application with realistic data relationships between users, flights, and bookings. I later refactored the data layer to replace a large block of hard-coded sample records with a small, reusable generation pipeline, as an exercise in separating configuration from runtime state.

## Features

- Guest flight search (by origin/destination) and full flight listing
- User registration and login with password validation
- Separate admin login and admin menu
- View detailed flight information
- Book a flight (with seat availability checks)
- View and cancel a user's own bookings
- View cancelled flight history
- Delete a user account
- Admin: add, edit, and remove flights
- Admin: view all bookings across all users and view individual booking details
- Self-seeding runtime database: 60 flights and 20 users generated from compact source data the moment the program runs

## Technologies Used

- JavaScript (Browser Console)
- `prompt()` / `alert()` for I/O
- `setTimeout()` / `setInterval()` for delayed and countdown-style messages

## JavaScript Concepts Demonstrated

- Arrays of objects as in-memory databases (flights, users, bookings, admins) that start empty and are populated at runtime
- Factory functions (`createFlight`, `createUser`, `createAdmin`) that build complete objects from compact source/configuration data
- `Set`-based collision checking to guarantee unique flight route/date/time combinations
- Sequential counter-based ID generation (`BMF-FLT-001`, `BMF-USR-001`, ...) to prevent duplicate IDs
- Higher-order functions (`filter`, `map`, `reduce`, `find`) for lookups and calculations
- Arrow functions and regular function declarations
- `try` / `catch` error handling
- Input validation (email format, password strength, date format)
- Multi-role menu routing (guest / user / admin)

## Learning Outcomes

This project demonstrates:

- Designing relationships between multiple data collections (users, flights, bookings) that reference each other by ID
- Separating small, hand-authored **source/configuration data** (airports, airlines, seed profiles) from **runtime databases** that are built dynamically from it
- Using higher-order array methods (`filter`) to implement lookup functions like `findUserByEmail`
- Structuring an application around distinct user roles, each with its own menu and permissions
- Validating real-world input formats (email, password, date) before accepting it

## Project Structure

```
11 - Book My Flight/
│
├── main.js
└── README.md
```

`main.js` is organized top to bottom as: ID generators → source data → random/data generators → factory functions → database arrays → database seeding → initialization → utility functions → guest/user/admin functions → menus → the `main()` entry point that routes to the correct menu.

## How It Works

1. On load, `initializeDatabase()` seeds the four admin accounts, 20 users, and 60 flights in a single synchronous pass, then logs a short summary to the console.
2. `main()` presents a role selection: guest, user, or admin.
3. Guests can search or view flights without logging in.
4. Users register or log in, then access booking, cancellation, and account management.
5. Admins log in separately and access flight and booking management tools.
6. Every action validates its input and reports success or failure via `alert`/`console`.

## Getting Started

**Prerequisites:** A modern web browser.

```bash
git clone <your-repo-url>
cd "11 - Book My Flight"
```

Open `main.js`, copy its contents into your browser's developer console, and press Enter to run. The sample database (admins, users, flights) is generated immediately, and the main menu appears right away.

## Example Output

```
BookMyFlight initialization started...
Admins: 4 loaded
Users: 20/20 loaded
Flights: 60/60 loaded
Database initialization complete.

==================================================
Flight BMF-FLT-042 booked successfully!
Airline: Emirates | Route: Dubai → Islamabad
==================================================
```

## Technical Highlights

- ID-referenced relationships between users, flights, and bookings instead of flat, disconnected data
- Dynamic sample-data generation: 60 unique flights drawn from 50 international airports (one representative airport per country, Pakistan excluded) plus 20 Pakistani airports, and 20 default users built from compact seed profiles
- Reusable validation helpers (`validateEmail`, `validatePassword`, `isValidDate`) applied consistently
- Clear separation between guest, user, and admin capabilities within one codebase

## Limitations

- No persistent storage - all data (including the freshly-generated sample database) resets when the console session ends
- No real payment processing
- Admin seed credentials are hardcoded rather than securely managed

## Future Improvements

- Add persistent storage or a backend database
- Add seat selection instead of a simple availability check
- Add email confirmation simulation for bookings

## Skills Demonstrated

- JavaScript Fundamentals
- Multi-Role Application Design
- Data Relationships (Users/Flights/Bookings)
- Input Validation
- Function Decomposition
- Dynamic Sample-Data Generation

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
