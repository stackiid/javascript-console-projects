let superMartItems = [
  "Apples",
  "Bananas",
  "Oranges",
  "Grapes",
  "Pineapple",
  "Watermelon",
  "Strawberries",
  "Blueberries",
  "Raspberry",
  "Mango",
  "Peach",
  "Kiwi",
  "Pears",
  "Lemons",
  "Limes",
  "Avocado",
  "Tomatoes",
  "Cucumbers",
  "Carrots",
  "Broccoli",
  "Cauliflower",
  "Spinach",
  "Kala Jamun",
  "Mushrooms",
  "Onions",
  "Potatoes",
  "Sweet Potatoes",
  "Chicken Breasts",
  "Ground Beef",
  "Pork Chops",
  "Salmon Fillets",
  "Eggs",
  "Milk",
  "Almond Milk",
  "Soy Milk",
  "Bread",
  "Whole Wheat Bread",
  "Bagels",
  "Croissants",
  "Pasta",
  "Rice",
  "Quinoa",
  "Oats",
  "Cereals",
  "Granola",
  "Yogurt",
  "Cheese",
  "Butter",
  "Almonds",
  "Walnuts",
  "Pistachios",
  "Cashews",
  "Peanuts",
  "Olive Oil",
  "Coconut Oil",
  "Avocado Oil",
  "Salt",
  "Pepper",
  "Sugar",
  "Honey",
  "Maple Syrup",
  "Soy Sauce",
  "Hot Sauce",
  "Ketchup",
  "Mayonnaise",
  "Mustard",
  "Pickles",
  "Coffee",
  "Tea",
  "Juice",
  "Soda",
  "Water",
  "Bottled Water",
  "Toilet Paper",
  "Shampoo",
  "Conditioner",
  "Toothpaste",
  "Toothbrush",
  "Deodorant",
  "Shaving Cream",
  "Razors",
  "Makeup",
  "Lip Balm",
  "Hand Soap",
  "Body Wash",
  "Lotion",
  "Sunscreen",
  "Insect Repellent",
  "First Aid Kit",
  "Pain Relievers",
  "Vitamins",
  "Medications",
  "Band-Aids",
  "Grazing Table",
  "Gift Cards",
  "Newspaper",
  "Magazines",
  "Batteries",
  "Phone Chargers",
  "Headphones",
];

let userCart = [];
let removedItem = [];
let tableData = [];
for (let i = 0; i < superMartItems.length; i += 6) {
  tableData.push({
    Column1: superMartItems[i],
    Column2: superMartItems[i + 1],
    Column3: superMartItems[i + 2],
    Column4: superMartItems[i + 3],
    Column5: superMartItems[i + 4],
    Column6: superMartItems[i + 5],
  });
}
console.table(tableData);
while (true) {
  let storeOption = prompt(
    "Choose an option: \n   1. Browse Store & Add to Cart \n   2. View Cart \n   3. Remove Item from Cart \n   4. View Removed Item \n   5. Quit",
  );
  let itemName;
  if (storeOption === "1") {
    itemName = prompt("Enter the item name to add to cart:");
    if (superMartItems.includes(itemName)) {
      userCart.push(itemName);
      alert(`${itemName} has been added to your cart.`);
    } else {
      alert(`Sorry! ${itemName} is not available in our store.`);
      console.error("ERROR! Item not found in store.");
    }
  } else if (storeOption === "2") {
    if (userCart.length > 0) {
      alert(`Displaying your cart...`);
      console.log("Here are the are items in your cart:");
      for (let i = 0; i < userCart.length; i++) {
        console.log(`${i + 1} - ${userCart[i]}`);
      }
    } else {
      alert(`Your cart is empty. Please add some items first.`);
      console.error(`ERROR: Your cart is empty.`);
    }
  } else if (storeOption === "3") {
    if (userCart.length > 0) {
      let removeItem = prompt("Enter the item name to remove from cart:");
      if (userCart.includes(removeItem)) {
        removedItem.push(removeItem);
        let itemIndex = userCart.indexOf(removeItem);
        userCart.splice(itemIndex, 1);
        alert(`${removeItem} has been removed from your cart.`);
        console.log("Item Removed.");
      } else {
        alert(`Sorry! ${removeItem} is not in your cart.`);
        console.error("ERROR: Item not found in your cart.");
      }
    } else {
      alert(`Your cart is empty. Please add some items first before removing.`);
      console.error(`ERROR: Cannot remove item from an empty cart.`);
    }
  } else if (storeOption === "4") {
    if (removedItem.length > 0) {
      alert(`Displaying removed items...`);
      console.log("Here are the are removed items from your cart:");
      for (let i = 0; i < removedItem.length; i++) {
        console.log(`${i + 1} - ${removedItem[i]}`);
      }
    } else {
      alert(`No items have been removed from your cart yet.`);
      console.error("ERROR: No removed items to display.");
    }
  } else if (storeOption === "5") {
    alert(`Thank You for shopping with us! Have a great day.`);
    console.log("User has quit the store.");
    break;
  }
}
