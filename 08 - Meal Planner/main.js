// Recipes data
const recipes = [
  {
    name: "Chicken Curry",
    ingredients: ["chicken", "curry powder", "onion", "tomato"],
    prepTime: 30,
    type: "non-veg",
  },
  {
    name: "Veggie Stir Fry",
    ingredients: ["broccoli", "carrot", "soy sauce", "ginger"],
    prepTime: 20,
    type: "veg",
  },
  {
    name: "Pasta Alfredo",
    ingredients: ["pasta", "alfredo sauce", "parmesan", "chicken"],
    prepTime: 25,
    type: "non-veg",
  },
  {
    name: "Chana Masala",
    ingredients: ["chickpeas", "onion", "tomato", "masala"],
    prepTime: 35,
    type: "veg",
  },
  {
    name: "Fish Tacos",
    ingredients: ["fish", "tortilla", "cabbage", "salsa"],
    prepTime: 15,
    type: "non-veg",
  },
  {
    name: "Quinoa Salad",
    ingredients: ["quinoa", "cucumber", "tomato", "lemon"],
    prepTime: 10,
    type: "veg",
  },
  {
    name: "Beef Stew",
    ingredients: ["beef", "potato", "carrot", "onion"],
    prepTime: 45,
    type: "non-veg",
  },
  {
    name: "Paneer Tikka",
    ingredients: ["paneer", "yogurt", "spices", "bell pepper"],
    prepTime: 25,
    type: "veg",
  },
  {
    name: "Egg Fried Rice",
    ingredients: ["rice", "egg", "soy sauce", "vegetables"],
    prepTime: 20,
    type: "non-veg",
  },
  {
    name: "Lentil Soup",
    ingredients: ["lentils", "carrot", "celery", "onion"],
    prepTime: 30,
    type: "veg",
  },
  {
    name: "Shrimp Scampi",
    ingredients: ["shrimp", "garlic", "butter", "pasta"],
    prepTime: 20,
    type: "non-veg",
  },
  {
    name: "Mushroom Risotto",
    ingredients: ["mushrooms", "rice", "onion", "parmesan"],
    prepTime: 35,
    type: "veg",
  },
  {
    name: "Chicken Fajitas",
    ingredients: ["chicken", "bell pepper", "onion", "tortilla"],
    prepTime: 25,
    type: "non-veg",
  },
  {
    name: "Greek Salad",
    ingredients: ["cucumber", "tomato", "feta", "olives"],
    prepTime: 10,
    type: "veg",
  },
  {
    name: "Turkey Chili",
    ingredients: ["ground turkey", "beans", "tomato", "chili powder"],
    prepTime: 40,
    type: "non-veg",
  },
  {
    name: "Spinach Artichoke Dip",
    ingredients: ["spinach", "artichoke", "cream cheese", "parmesan"],
    prepTime: 20,
    type: "veg",
  },
  {
    name: "Salmon Teriyaki",
    ingredients: ["salmon", "teriyaki sauce", "rice", "broccoli"],
    prepTime: 25,
    type: "non-veg",
  },
  {
    name: "Veggie Burger",
    ingredients: ["black beans", "onion", "carrot", "bun"],
    prepTime: 30,
    type: "veg",
  },
  {
    name: "Chicken Noodle Soup",
    ingredients: ["chicken", "noodles", "carrot", "celery"],
    prepTime: 35,
    type: "non-veg",
  },
  {
    name: "Caprese Salad",
    ingredients: ["tomato", "mozzarella", "basil", "olive oil"],
    prepTime: 10,
    type: "veg",
  },
  {
    name: "Beef Tacos",
    ingredients: ["ground beef", "tortilla", "lettuce", "cheese"],
    prepTime: 20,
    type: "non-veg",
  },
  {
    name: "Ratatouille",
    ingredients: ["eggplant", "zucchini", "tomato", "onion"],
    prepTime: 40,
    type: "veg",
  },
  {
    name: "Chicken Parmesan",
    ingredients: ["chicken", "parmesan", "marinara", "pasta"],
    prepTime: 35,
    type: "non-veg",
  },
  {
    name: "Falafel Wrap",
    ingredients: ["chickpeas", "tortilla", "lettuce", "tahini"],
    prepTime: 25,
    type: "veg",
  },
  {
    name: "Pork Chops",
    ingredients: ["pork chops", "apple", "onion", "spices"],
    prepTime: 30,
    type: "non-veg",
  },
  {
    name: "Veggie Lasagna",
    ingredients: ["noodles", "spinach", "ricotta", "marinara"],
    prepTime: 45,
    type: "veg",
  },
  {
    name: "Chicken Caesar Salad",
    ingredients: ["chicken", "romaine", "caesar dressing", "croutons"],
    prepTime: 15,
    type: "non-veg",
  },
  {
    name: "Minestrone Soup",
    ingredients: ["vegetables", "beans", "pasta", "tomato"],
    prepTime: 35,
    type: "veg",
  },
  {
    name: "Lamb Kebabs",
    ingredients: ["lamb", "onion", "spices", "skewers"],
    prepTime: 30,
    type: "non-veg",
  },
  {
    name: "Fruit Salad",
    ingredients: ["apple", "banana", "orange", "grapes"],
    prepTime: 10,
    type: "veg",
  },
];

// Meal types
const mealTypes = {
  breakfast: ["Pancakes", "Omelette", "Toast", "Cereal"],
  lunch: ["Sandwich", "Salad", "Soup", "Burger"],
  dinner: ["Steak", "Pasta", "Rice", "Noodles"],
};

// Capitalize function
const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// Get random index
const getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Prep time message
const getPrepTimeMessage = (time) => `Prep time: ${time} minutes`;

// Function to generate meal plan
function generateMealPlan(days, recipeType) {
  try {
    if (typeof days !== "number" || days <= 0) {
      throw new Error("Days must be a positive number.");
    }

    let mealPlan = [];
    let availableRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
      if (recipeType === "any" || recipes[i].type === recipeType) {
        availableRecipes.push(recipes[i]);
      }
    }

    if (availableRecipes.length === 0) {
      throw new Error("No recipes available for selected type.");
    }

    // Generate meal plan
    for (let day = 1; day <= days; day++) {
      let dailyMeals = {};
      let randomBreakfast =
        mealTypes.breakfast[getRandomIndex(mealTypes.breakfast.length)];
      let randomLunch = mealTypes.lunch[getRandomIndex(mealTypes.lunch.length)];
      let randomDinner =
        mealTypes.dinner[getRandomIndex(mealTypes.dinner.length)];
      let randomRecipe =
        availableRecipes[getRandomIndex(availableRecipes.length)];

      let prepTimeCategory;
      if (randomRecipe.prepTime <= 15) {
        prepTimeCategory = "Quick";
      } else if (randomRecipe.prepTime <= 30) {
        prepTimeCategory = "Medium";
      } else {
        prepTimeCategory = "Long";
      }

      // Meal type suggestion
      let mealTypeSuggestion;
      switch (prepTimeCategory) {
        case "Quick":
          mealTypeSuggestion = "Perfect for a busy day!";
          break;
        case "Medium":
          mealTypeSuggestion = "Good for a normal day.";
          break;
        case "Long":
          mealTypeSuggestion = "Great for a leisurely day.";
          break;
        default:
          mealTypeSuggestion = "Enjoy your meal!";
      }

      // Build daily meal object
      dailyMeals.day = `Day ${day}`;
      dailyMeals.breakfast = randomBreakfast;
      dailyMeals.lunch = randomLunch;
      dailyMeals.dinner = randomDinner;
      dailyMeals.specialRecipe = capitalize(randomRecipe.name);
      dailyMeals.ingredients = randomRecipe.ingredients.join(", ");
      dailyMeals.prepTimeMessage = getPrepTimeMessage(randomRecipe.prepTime);
      dailyMeals.prepTimeCategory = prepTimeCategory;
      dailyMeals.suggestion = mealTypeSuggestion;

      mealPlan.push(dailyMeals);
    }

    // Display meal plan with setInterval
    console.log("Your Weekly Meal Plan:");
    let index = 0;
    const displayInterval = setInterval(() => {
      if (index < mealPlan.length) {
        console.log(`
${mealPlan[index].day}:
Breakfast: ${mealPlan[index].breakfast}
Lunch: ${mealPlan[index].lunch}
Dinner: ${mealPlan[index].dinner}
Special Recipe: ${mealPlan[index].specialRecipe}
Ingredients: ${mealPlan[index].ingredients}
${mealPlan[index].prepTimeMessage} (${mealPlan[index].prepTimeCategory})
Suggestion: ${mealPlan[index].suggestion}
        `);
        index++;
      } else {
        clearInterval(displayInterval);

        setTimeout(() => {
          console.log("Meal plan generation complete! Enjoy your meals.");
        }, 500);
      }
    }, 1000);
  } catch (error) {
    alert(`Error: ${error.message}`);
    console.error(`Error: ${error.message}`);
  }
}

console.log("Welcome to Weekly Meal Planner!");
console.warn("This is a demo version.");
const userName = prompt("Enter your name: ");
alert(`Hello, ${userName}! Let's plan your meals.`);

let daysInput = prompt("How many days to plan for? (Enter a number)");
let days = parseInt(daysInput);

let recipeType = prompt(
  "Enter recipe type (veg, non-veg, any): ",
).toLowerCase();
while (
  recipeType !== "veg" &&
  recipeType !== "non-veg" &&
  recipeType !== "any"
) {
  recipeType = prompt(
    "Invalid type. Enter recipe type (veg, non-veg, any): ",
  ).toLowerCase();
}

generateMealPlan(days, recipeType);
