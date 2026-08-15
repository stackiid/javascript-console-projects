# CineMax Cinema 🎬

An enterprise-style console cinema management system with seat maps, dynamic pricing, a wallet, coupons, and a genre-based recommendation engine.

## Overview

CineMax Galaxy simulates a full cinema booking platform. Customers sign up, browse and search movies, select seats from a generated seat map, order food, apply coupons, pay via cash/card/wallet, and receive personalized movie recommendations based on their booking history. Admins manage the movie catalog, monitor revenue, occupancy, and activity logs, and moderate users.

The movie, food, deal, coupon, and user records that seed the system are built through small factory functions rather than hand-written as one large block of repeated object literals, keeping the data layer compact and giving every entity of a given type a single, consistent shape.

## Why I Built This Project

I built this as my most advanced console project to bring together everything I'd learned - object-oriented state management, algorithmic seat-map generation, a simple recommendation engine, and a layered admin dashboard - into one system large enough to resemble a real production application. I later went through an optimization pass to cut duplication out of the data layer and consolidate repeated computations into shared helpers, without changing any user-facing behavior.

## Features

- User signup, login, logout, password reset, profile editing, and account deletion
- Browse all movies, trending movies, and search by title/genre
- Seat map generation and seat selection per showing
- Dynamic ticket pricing based on movie and timing
- Food ordering as part of checkout
- Coupon code application at checkout
- Multiple payment methods: cash, card, and in-app wallet
- Digital bill/receipt generation
- Booking history, cancellation, and favorites
- Wallet top-up and reward point redemption
- Genre-based movie recommendations from booking history
- Admin: add/update/delete movies, view all movies and users
- Admin: ban/unlock users, revenue dashboard, booking reports, seat occupancy, food reports
- Admin: activity log, movie stats, coupon management, waiting list, blacklist

## Technologies Used

- JavaScript (Browser Console, strict mode)
- `prompt()` / `alert()` for I/O
- `Date.now()` and `Math.random()` for unique ID generation

## JavaScript Concepts Demonstrated

- `"use strict"` mode
- Arrays of objects modeling multiple entities (users, movies, bookings, activity log)
- Factory functions (`makeMovie`, `makeUser`, `food`, `deal`, `coupon`) that build a full entity from just the fields that vary, keeping seed data compact and every entity of a type consistently shaped
- Higher-order functions: `filter`, `map`, `sort`, `find`, `forEach`, and a small reusable `sumBy` reducer used everywhere a total needed to be aggregated
- `Set` for tracking unique booked movie IDs
- `Object.entries()` for frequency analysis (genre popularity)
- Closures and reusable formatter/logger utility functions
- Algorithmic logic: seat map generation, dynamic pricing, recommendation scoring

## Learning Outcomes

This project demonstrates:

- Designing a simple recommendation algorithm: scoring genres by booking frequency and ranking unseen movies accordingly
- Using `Set` to efficiently check membership (already-booked movies) instead of repeated array scans
- Structuring a large application into clearly named sections (auth, browsing, booking, payments, wallet, recommendations, admin)
- Building an admin dashboard that reports on the same data customers generate (revenue, occupancy, activity)
- Writing small, composable utility functions (`box`, `sub`, `ok`, `er`, `fmtPKR`) that keep console output consistent across a large codebase
- Extracting factory functions and shared computation helpers (`bookedCount`, `sumBy`, `seatRowIndex`/`seatColIndex`, `isYes`) after noticing the same object shape or calculation repeated across many functions, without altering any observable behavior

## Project Structure

```
12 - CineMax Cinema/
│
├── main.js
└── README.md
```

`main.js` contains display utilities, factory functions and the movie/user/booking data model they build, seat-map and pricing algorithms, the full customer flow, the recommendation engine, and the admin dashboard, tied together by `main()`.

## How It Works

1. `main()` presents the entry menu: sign up, log in, or exit.
2. Authenticated customers reach `customerDashboard()`, from which they can browse movies, book seats, order food, pay, manage their wallet, and view recommendations.
3. `bookMovie()` walks through seat selection, dynamic pricing, food ordering, coupon application, and payment before generating a bill.
4. Admin accounts reach `adminDashboard()`, with tools for catalog management and system-wide reporting.
5. All significant actions are recorded via `logActivity()` for later review in the admin activity log.

## Getting Started

**Prerequisites:** A modern web browser.

```bash
git clone <your-repo-url>
cd "12 - CineMax Cinema"
```

Open `main.js`, copy its contents into your browser's developer console, and press Enter to run.

## Example Output

```
★  AI MOVIE RECOMMENDATIONS ✨  ★
ℹ  Personalised based on your watch history & preferences:

  Dune: Part Two ................ Sci-Fi | ⭐ 8.7
  Oppenheimer .................... Drama | ⭐ 8.9
```

## Technical Highlights

- Genre-frequency recommendation algorithm built from scratch using `Object.entries` and `sort`
- `Set`-based deduplication for already-booked movies during recommendation filtering
- Consistent, reusable console-formatting utilities (`box`, `sub`, `lbl`, `ok`, `er`, `inf`, `wrn`) used throughout every section
- Layered dashboard architecture separating customer-facing and admin-facing logic
- Factory-driven seed data: movies, food items, combo deals, coupons, and users are each built by a single function from a compact set of varying fields, instead of ~850 lines of repeated object literals
- Shared computation helpers (`bookedCount`/`availableCount`, `sumBy`, `seatRowIndex`/`seatColIndex`, `isYes`) replace duplicated seat-counting, summing, seat-label-parsing, and yes/no-check logic that had been copied across more than a dozen call sites

## Limitations

- No persistent storage - the entire system resets when the console session ends
- No real payment gateway integration; card/cash/wallet payments are simulated
- Single-session only - no multi-user concurrency handling

## Future Improvements

- Add persistent storage or a backend database for users, bookings, and activity logs
- Add real payment gateway integration
- Add showtime scheduling across multiple screens and days

## Skills Demonstrated

- JavaScript Fundamentals
- Algorithm Design (recommendations, seat maps, pricing)
- Large-Scale Code Organization
- Object-Oriented Thinking
- Data Analysis & Reporting
- Code Optimization & Refactoring (deduplication, shared helpers, behavior-preserving cleanup)

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
