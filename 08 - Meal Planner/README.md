# Meal Planner

![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E)
![Runtime](https://img.shields.io/badge/runtime-browser%20console-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

A meal plan generator for the browser console. After the user chooses a number of days and a recipe type, the program builds a randomized plan with breakfast, lunch, dinner, and a featured recipe for each day, and prints the days one second apart.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Data](#data)
- [How It Works](#how-it-works)
- [Example Output](#example-output)
- [Known Limitations](#known-limitations)
- [License](#license)

## Features

- 30 recipes (15 vegetarian and 15 non-vegetarian), each with ingredients, a preparation time, and a type
- Plan for any positive number of days
- Recipe filter: `veg`, `non-veg`, or `any`, re-asked until the input is valid
- Random breakfast, lunch, and dinner choices for each day
- Featured recipe for each day with its ingredients and preparation time
- Preparation-time category (Quick, Medium, or Long) with a matching suggestion
- Days printed one at a time with `setInterval()`, followed by a completion message

## Tech Stack

| Category | Details |
| --- | --- |
| Language | JavaScript |
| Runtime | Browser developer console |
| Input and output | `prompt()`, `alert()`, `console.log()`, `console.warn()`, `console.error()` |
| Techniques | Arrow functions, function expressions, `try`/`catch`, `switch`, `setInterval()`, `clearInterval()`, `setTimeout()` |

## Project Structure

```text
08 - Meal Planner/
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

1. Enter your name when asked.
2. Enter the number of days to plan.
3. Enter the recipe type: `veg`, `non-veg`, or `any`.
4. Watch the console as each day appears.

## Data

| Source | Contents |
| --- | --- |
| `recipes` | 30 objects with `name`, `ingredients` (four items), `prepTime` in minutes, and `type` |
| `mealTypes.breakfast` | Pancakes, Omelette, Toast, Cereal |
| `mealTypes.lunch` | Sandwich, Salad, Soup, Burger |
| `mealTypes.dinner` | Steak, Pasta, Rice, Noodles |

## How It Works

- `generateMealPlan(days, recipeType)` checks that `days` is a positive number, then collects the recipes that match the chosen type.
- For each day it picks random meals, picks a random matching recipe, and assigns a category from the preparation time: 15 minutes or less is Quick, up to 30 is Medium, and above 30 is Long.
- Helper functions handle the details: `getRandomIndex()` for random picks, `capitalize()` for the recipe name, and `getPrepTimeMessage()` for the preparation-time text.
- The finished plan is printed by a `setInterval()` timer that logs one day per second, clears itself when the list is exhausted, and then uses `setTimeout()` to print a completion message half a second later.
- Errors are reported with `alert()` and `console.error()`.

## Example Output

The shape of one day's output (the values are random):

```text
Day 1:
Breakfast: Toast
Lunch: Soup
Dinner: Pasta
Special Recipe: Quinoa salad
Ingredients: quinoa, cucumber, tomato, lemon
Prep time: 10 minutes (Quick)
Suggestion: Perfect for a busy day!
```

## Known Limitations

- The program announces a "Weekly" plan, but the number of days is whatever the user enters.
- A non-numeric day count is not rejected: the plan is empty and only the opening and completion messages appear.
- `capitalize()` lowercases everything after the first letter, so recipe names appear as "Quinoa salad" rather than "Quinoa Salad".
- Days are chosen independently at random, so meals and recipes can repeat.
- Clicking Cancel on the recipe-type prompt raises an error and stops the script.
- The script prints a "demo version" warning when it starts.

## License

This project is part of a repository licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

Copyright (c) 2026 Ubaid Ahmad

Return to the [repository index](../README.md).
