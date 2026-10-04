# CineMax Cinema

![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E)
![Runtime](https://img.shields.io/badge/runtime-browser%20console-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

CineMax Galaxy is a cinema booking system for the browser console, with a customer side and an administrator side. Customers browse 30 movies, pick seats from a 60-seat map, order food, apply coupons, pay by cash, card, or wallet, and manage a wallet and reward points. Administrators manage movies, users, coupons, and reports. All data lives in memory.

## Table of Contents

- [Features](#features)
- [Menus](#menus)
- [Seed Data](#seed-data)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Running the Project](#running-the-project)
- [Booking Flow](#booking-flow)
- [Pricing and Billing](#pricing-and-billing)
- [Accounts and Security Rules](#accounts-and-security-rules)
- [Wallet and Rewards](#wallet-and-rewards)
- [Data Model](#data-model)
- [JavaScript Concepts Used](#javascript-concepts-used)
- [Known Limitations](#known-limitations)
- [License](#license)

## Features

- Thirty movies across six categories (Action, SciFi, Horror, Comedy, Thriller, and Animation, five each) with year, duration, rating, age restriction, show timings, and ticket price
- Movie browsing, a Trending list, and search by name, genre, minimum rating, or language, plus sorting by rating, price, or number of bookings
- Movie details with reviews, favorites, and booking
- A 10 by 6 seat map (rows A to J, columns 1 to 6) drawn in the console, with booked, selected, and available seats
- Dynamic ticket pricing based on how full a show is and on the show time
- Food ordering from a menu of 30 items in 11 categories, plus nine combo deals
- Six coupon codes, each usable once per customer
- Three payment methods: cash, card, and a wallet
- A formatted bill for every booking
- Cancellation with a refund to the wallet
- Wallet top-ups, reward points, and automatic VIP status
- Recommendations based on booking history
- Customer accounts with registration, login, password reset by security question, account lockout, profile editing, and account deletion
- Administrator dashboard with movie management, user management, coupon management, a waiting list view, and six reports

## Menus

The first screen offers Login, Sign Up (new member), Reset Password, and Exit. After login, administrators and customers see different dashboards.

| Role | Menu options |
| --- | --- |
| Customer | 1 Browse All Movies, 2 Trending Movies, 3 Search and Filter Movies, 4 Recommendations, 5 My Booking History, 6 Cancel a Booking, 7 My Wallet, 8 My Favorites, 9 My Profile, 10 Edit Profile, 11 Delete My Account, 0 Logout |
| Administrator | 1 Add New Movie, 2 Delete Movie, 3 Update Ticket Price, 4 View All Movies, 5 View All Users, 6 Ban or Unban User, 7 User Details, 8 Unlock User Account, 9 Revenue Dashboard, 10 All Bookings Report, 11 Seat Occupancy Chart, 12 Food Sales Report, 13 Movie-wise Statistics, 14 Activity Log, 15 Manage Coupons, 16 Waiting List, 17 Blacklisted Users, 0 Logout |

## Seed Data

Two accounts are created at startup: a System Admin account and a demo customer (username `ali`) with a wallet balance and some reward points. Their details are in the "Seed Admin" and "Seed Demo Customer" blocks of `main.js` and are not repeated here. Anyone can also create a new customer account from the first menu.

The six coupon codes are `WELCOME10` (10 percent), `MOVIE20` (20 percent), `FOOD15` (15 percent), `VIP25` (25 percent), `FLAT500` (flat PKR 500), and `WEEKEND15` (15 percent). The percentage coupons are applied to the booking subtotal.

## Tech Stack

| Category | Details |
| --- | --- |
| Language | JavaScript, with `"use strict"` enabled |
| Runtime | Browser developer console |
| Input and output | `prompt()` (through a small `ask()` wrapper), `alert()`, `console.log()` |
| Storage | In-memory structures: the `cinema` object, `foodDB`, `dealsDB`, `couponsDB`, `usersDB`, `bookingsDB`, `activityLog`, `waitingList` |

## Project Structure

```text
12 - CineMax Cinema/
|-- main.js
`-- README.md
```

`main.js` is split into numbered sections: display utilities, ID generators, the seat map engine, the database layer, the activity logger, authentication, movie browsing and search, seat selection, dynamic pricing, food, coupons, payment, billing, booking and cancellation, the wallet, recommendations, the customer dashboard, and the administrator functions and dashboard.

## Running the Project

1. Open any modern desktop browser.
2. Open the developer tools console (press `F12`, then choose the Console tab).
3. Copy the full contents of `main.js`, paste them into the console, and press Enter.
4. Respond to the `prompt()` dialogs and read the `alert()` dialogs. Additional output is written to the console.

Some browsers ask you to type `allow pasting` before the console accepts pasted code.

The program calls `prompt()` and `alert()`, which are browser functions, so it is meant to run in a browser console rather than in Node.js. There is no package manifest, installation step, build step, or test suite in this project. All data lives in memory and is reset every time the script is run again.

## Booking Flow

1. The customer opens a movie from the browse, trending, search, or recommendation lists and chooses Book This Movie.
2. The program checks that the account is not banned, that fewer than five bookings were made in the current session, and that the customer's registered age meets the movie's age restriction.
3. If the movie is full, the customer can join the waiting list. Otherwise they enter the number of people (up to 6, or fewer if fewer seats remain).
4. The customer picks each seat by label (for example `B3`). Cancel returns the chosen seats to available.
5. The customer selects a show time and sees the price per seat.
6. The customer can order food, entering item commands or deal commands `D1` to `D9`.
7. A coupon code can be applied, and the bill summary is displayed for confirmation.
8. The customer chooses a payment method. Cash requires an amount at least equal to the total and shows the change. Card checks that the number has 16 digits, the CVV has 3 digits, and the expiry date (MM/YY) has not passed. Wallet payment requires a sufficient balance.
9. The booking is saved, reward points are added, a bill is printed, and the activity is logged.

Customers can leave a review (rating 1 to 10) only for movies they have booked.

## Pricing and Billing

| Step | Rule |
| --- | --- |
| Base price | The movie's ticket price |
| Surge pricing | Plus 10 percent when 80 percent or more of the seats are booked |
| Peak hour | Plus 5 percent for shows starting from 6 PM to 10 PM |
| Subtotal | Ticket total plus food total |
| Coupon | Percent or flat discount, once per customer per coupon |
| VIP discount | 5 percent of the subtotal for VIP members |
| Service charge | 3 percent of the amount after discounts |
| Tax (GST) | 13 percent of the amount after discounts |

Prices are in PKR.

## Accounts and Security Rules

| Area | Rule |
| --- | --- |
| Username | At least 3 characters, unique, stored in lowercase |
| Password | At least 6 characters, with at least one uppercase letter and one digit |
| Age | Between 5 and 120 |
| Contact number | At least 7 characters |
| Email | Must contain `@` |
| Lockout | The account locks after 5 failed logins |
| Unlocking | Reset Password (answer the security question) or an administrator unlock |
| Bans | An administrator can ban or unban a customer, and banned users are listed under Blacklisted Users |
| Profile edits and deletion | Require the account password |

## Wallet and Rewards

- Top up the wallet with at least PKR 100.
- Each booking earns one reward point for every PKR 100 of the total.
- Points can be redeemed from 100 upward, at 100 points for PKR 100.
- A customer with 1,000 or more points becomes a VIP member.
- Cancelling a booking asks the customer to pick a refund option: full (100 percent), half (50 percent), or none. The refund goes to the wallet and the seats are released.

## Data Model

| Record | Main fields |
| --- | --- |
| Movie | `id`, `title`, `year`, `category`, `language`, `duration`, `rating`, `ageRestriction`, `timings`, `ticketPrice`, `totalSeats` (60), `tags`, `revenue`, `reviews`, `totalBookings`, `seatMap` |
| Seat | `label` (for example `C4`) and `status` (`available`, `selected`, or `booked`) |
| User | `id`, `name`, `username`, `password`, `gender`, `age`, `contact`, `email`, `cnic`, security question and answer, `walletBalance`, `rewardPoints`, `isVIP`, `isBanned`, `isLocked`, `failedAttempts`, `role`, history lists, `favorites`, `activityLog` |
| Booking | Booking ID, movie, seats, timing, price breakdown, payment method, status, refund amount, and coupon code |
| Food item and deal | `id`, `name`, `category`, `price`, and for deals a list of included items |

## JavaScript Concepts Used

Two-dimensional arrays, factory functions, `Set`, `Object.entries()`, `sort()`, `filter()`, `find()`, `reduce()`, regular expressions for password and card validation, optional chaining, default parameters, template literals, and small reusable helpers such as `ask()`, `sumBy()`, and `fmtPKR()`.

## Known Limitations

- Everything is stored in memory and is lost when the script is run again. Initial seat availability for each movie is randomized each run.
- Passwords and security answers are stored as plain text.
- Card payment checks the format of the details only. No payment is processed, and the card details are not stored.
- The refund option is chosen by the customer and is not calculated from the show time.
- All 30 movies are in English, and the language search only matches that value.
- Joining the waiting list requires typing exactly `yes`.
- Coupon descriptions mention tickets, food, first bookings, VIP members, and weekends, but every coupon is applied to the whole subtotal. The only restriction enforced is one use per customer.
- The waiting list is only recorded and displayed in the administrator's Waiting List view and the revenue dashboard count. Customers are not notified when seats free up.

## License

This project is part of a repository licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

Copyright (c) 2026 Ubaid Ahmad

Return to the [repository index](../README.md).
