# Meal Planner 🍽️

A console-based weekly meal plan generator that builds a randomized, categorized meal schedule and reveals it with a timed console animation.

## Overview

The program asks for a number of days and a dietary preference (veg, non-veg, or any), then generates a meal plan for each day - breakfast, lunch, dinner, and a "special recipe" pulled from a recipe dataset. Instead of printing the whole plan at once, it reveals one day at a time using `setInterval`.

## Why I Built This Project

I built this to practice working with arrow functions, array filtering against a dataset, and asynchronous-style timing behavior (`setInterval` / `setTimeout`) instead of purely synchronous console output.

## Features

- Filter recipes by dietary type (veg, non-veg, any)
- Generate a randomized meal plan for a user-specified number of days
- Categorize each recipe's prep time as Quick, Medium, or Long
- Reveal the plan one day at a time with a timed console animation
- Input validation with a retry loop for invalid dietary type

## Technologies Used

- JavaScript (Browser Console)
- `prompt()` / `alert()` for I/O
- `setInterval()` / `setTimeout()` for timed output

## JavaScript Concepts Demonstrated

- Arrow functions
- Array filtering and random selection
- `switch` statements
- `try` / `catch` / `throw` for input validation
- Closures (index tracked inside `setInterval` callback)
- Timing functions (`setInterval`, `setTimeout`, `clearInterval`)

## Learning Outcomes

This project demonstrates:

- Filtering a dataset based on dynamic user input
- Using `setInterval` with a closure-tracked index to reveal output over time
- Cleanly stopping a repeating timer with `clearInterval` once work is done
- Mapping a numeric value (prep time) into a descriptive category via conditional branching

## Project Structure

```
08 - Meal Planner/
│
├── main.js
└── README.md
```

`main.js` contains the recipe dataset, helper arrow functions, the `generateMealPlan()` function, and the input-gathering flow that calls it.

## How It Works

1. The user enters their name and is greeted.
2. The user enters the number of days to plan for.
3. The user enters a dietary preference, validated in a retry loop.
4. `generateMealPlan()` filters recipes by type and builds a day-by-day plan.
5. The plan is revealed one day at a time via `setInterval`, then the timer clears and a completion message prints.

## Getting Started

**Prerequisites:** A modern web browser.

```bash
git clone <your-repo-url>
cd "08 - Meal Planner"
```

Open `main.js`, copy its contents into your browser's developer console, and press Enter to run.

## Example Output

```
Day 1:
Breakfast: Pancakes
Lunch: Salad
Dinner: Pasta
Special Recipe: Chicken Curry
Ingredients: chicken, curry powder, onion, tomato
Prep time: 30 minutes (Medium)
Suggestion: Good for a normal day.
```

## Technical Highlights

- Closure-based index tracking inside a repeating `setInterval` callback
- Clean separation between data (recipes/meal types) and logic (plan generation)
- Defensive validation loop for dietary type before generation begins

## Limitations

- No persistent storage - plan isn't saved between sessions
- Meal selection is fully random, with no repeat-avoidance across days
- No ingredient shopping list aggregation across the whole week

## Future Improvements

- Avoid repeating the same special recipe within one plan
- Aggregate a full shopping list from all selected recipes
- Add calorie or nutrition estimates per meal

## Skills Demonstrated

- JavaScript Fundamentals
- Asynchronous Timing (setInterval/setTimeout)
- Array Manipulation
- Error Handling

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
