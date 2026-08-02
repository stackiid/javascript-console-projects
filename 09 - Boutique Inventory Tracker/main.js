// Product Data

const products = [
  {
    id: 1,
    name: "Levis Denim Jeans",
    price: 2500,
    stock: 10,
    restockThreshold: 5,
    category: "Clothing",
  },
  {
    id: 2,
    name: "Nike Air Max",
    price: 3500,
    stock: 8,
    restockThreshold: 3,
    category: "Shoes",
  },
  {
    id: 3,
    name: "Raymonds Blazer",
    price: 1800,
    stock: 12,
    restockThreshold: 6,
    category: "Clothing",
  },
  {
    id: 4,
    name: "Fossil Watch",
    price: 4200,
    stock: 6,
    restockThreshold: 2,
    category: "Accessories",
  },
  {
    id: 5,
    name: "Pashmina Shawl",
    price: 800,
    stock: 20,
    restockThreshold: 10,
    category: "Accessories",
  },
  {
    id: 6,
    name: "Adidas T-Shirt",
    price: 3200,
    stock: 9,
    restockThreshold: 4,
    category: "Clothing",
  },
  {
    id: 7,
    name: "Converse Shoes",
    price: 2800,
    stock: 11,
    restockThreshold: 5,
    category: "Shoes",
  },
  {
    id: 8,
    name: "Rolex Watch",
    price: 5500,
    stock: 4,
    restockThreshold: 2,
    category: "Accessories",
  },
  {
    id: 9,
    name: "Tommy Hilfiger Jacket",
    price: 3800,
    stock: 7,
    restockThreshold: 3,
    category: "Clothing",
  },
  {
    id: 10,
    name: "Gucci Handbag",
    price: 2200,
    stock: 10,
    restockThreshold: 5,
    category: "Accessories",
  },
  {
    id: 11,
    name: "Levis Shirt",
    price: 4000,
    stock: 5,
    restockThreshold: 2,
    category: "Clothing",
  },
  {
    id: 12,
    name: "Nike Running Shoes",
    price: 3200,
    stock: 8,
    restockThreshold: 4,
    category: "Shoes",
  },
  {
    id: 13,
    name: "Oakley Sunglasses",
    price: 1200,
    stock: 15,
    restockThreshold: 8,
    category: "Accessories",
  },
  {
    id: 14,
    name: "Calvin Klein Jacket",
    price: 4800,
    stock: 3,
    restockThreshold: 1,
    category: "Clothing",
  },
  {
    id: 15,
    name: "Puma T-Shirt",
    price: 2800,
    stock: 12,
    restockThreshold: 6,
    category: "Clothing",
  },
  {
    id: 16,
    name: "Vans Shoes",
    price: 4000,
    stock: 6,
    restockThreshold: 3,
    category: "Shoes",
  },
  {
    id: 17,
    name: "Prada Handbag",
    price: 3500,
    stock: 9,
    restockThreshold: 4,
    category: "Accessories",
  },
  {
    id: 18,
    name: "Tag Heuer Watch",
    price: 6500,
    stock: 2,
    restockThreshold: 1,
    category: "Accessories",
  },
  {
    id: 19,
    name: "Tommy Hilfiger Jacket",
    price: 5200,
    stock: 4,
    restockThreshold: 2,
    category: "Clothing",
  },
  {
    id: 20,
    name: "Levis Jeans",
    price: 3800,
    stock: 8,
    restockThreshold: 4,
    category: "Clothing",
  },
  {
    id: 21,
    name: "Adidas Shoes",
    price: 4500,
    stock: 5,
    restockThreshold: 2,
    category: "Shoes",
  },
  {
    id: 22,
    name: "Cashmere Shawl",
    price: 1000,
    stock: 18,
    restockThreshold: 9,
    category: "Accessories",
  },
  {
    id: 23,
    name: "Gucci Belt",
    price: 2800,
    stock: 11,
    restockThreshold: 5,
    category: "Accessories",
  },
  {
    id: 24,
    name: "Calvin Klein Jacket",
    price: 5800,
    stock: 3,
    restockThreshold: 1,
    category: "Clothing",
  },
  {
    id: 25,
    name: "Puma Shirt",
    price: 4200,
    stock: 6,
    restockThreshold: 3,
    category: "Clothing",
  },
  {
    id: 26,
    name: "Nike Shoes",
    price: 3800,
    stock: 9,
    restockThreshold: 4,
    category: "Shoes",
  },
  {
    id: 27,
    name: "Ray-Ban Sunglasses",
    price: 7500,
    stock: 1,
    restockThreshold: 1,
    category: "Accessories",
  },
  {
    id: 28,
    name: "Prada Wallet",
    price: 3200,
    stock: 10,
    restockThreshold: 5,
    category: "Accessories",
  },
  {
    id: 29,
    name: "Tommy Hilfiger Blazer",
    price: 6200,
    stock: 2,
    restockThreshold: 1,
    category: "Clothing",
  },
  {
    id: 30,
    name: "Levis T-Shirt",
    price: 4800,
    stock: 7,
    restockThreshold: 3,
    category: "Clothing",
  },
];

// Utility Functions

function generateCode() {
  let productCode = "7";
  for (let i = 1; i <= 3; i++) {
    productCode += Math.floor(Math.random() * 9);
  }
  return productCode;
}

for (let i = 0; i < products.length; i++) {
  products[i].code = generateCode();
}

// displayInventory(): Displays the current state of the inventory.

function displayInventory() {
  let shoesCount = 0;
  let clothesCount = 0;
  let accessoriesCount = 0;
  for (let i = 0; i < products.length; i++) {
    if (products[i].category === "Shoes") {
      shoesCount++;
    } else if (products[i].category === "Clothing") {
      clothesCount++;
    } else if (products[i].category === "Accessories") {
      accessoriesCount++;
    }
  }
  let choice =
    prompt(`Welcome to our store! We've got an awesome inventory waiting for you:
• ${shoesCount} kick-ass shoe categories to step up your style game
• ${clothesCount} fab clothing categories to dress to impress
• ${accessoriesCount} cool accessory categories to add that finishing touch
Type 'shoes', 'clothes', or 'accessories' to dive into the collection!`);
  if (choice === "shoes") {
    console.log("=== OUR SICK SHOE COLLECTION ===");
    for (let i = 0; i < products.length; i++) {
      if (products[i].category === "Shoes") {
        console.log(`- ${products[i].name} ¦ C#: ${products[i].code}`);
      }
    }
  } else if (choice === "clothes") {
    console.log("=== OUR FLY CLOTHING COLLECTION ===");
    for (let i = 0; i < products.length; i++) {
      if (products[i].category === "Clothing") {
        console.log(`- ${products[i].name} ¦ C#: ${products[i].code}`);
      }
    }
  } else if (choice === "accessories") {
    console.log("=== OUR DOPE ACCESSORIES COLLECTION ===");
    for (let i = 0; i < products.length; i++) {
      if (products[i].category === "Accessories") {
        console.log(`- ${products[i].name} ¦ C#: ${products[i].code}`);
      }
    }
  } else {
    console.error(`Invalid choice: "${choice}".`);
    alert(
      `Invalid choice: "${choice}". Please type 'shoes', 'clothes', or 'accessories' to view the corresponding collection.`,
    );
  }
}

// getProductDetails(): Retrieves and displays details of a specific product.

function getProductDetails() {
  let productIdentifier = prompt(
    "Please enter the product name or 4-digit code to retrieve its details.",
  );
  let productFound = false;
  for (let i = 0; i < products.length; i++) {
    if (
      products[i].name === productIdentifier ||
      products[i].code === productIdentifier
    ) {
      productFound = true;
      if (products[i].name === productIdentifier) {
        console.log(`Product details for "${productIdentifier}" retrieved:`);
      } else {
        console.log(
          `Product details for code "${productIdentifier}" retrieved:`,
        );
      }
      let keys = Object.keys(products[i]);
      for (key of keys) {
        let printableKey = key.charAt(0).toUpperCase() + key.slice(1);
        console.log(`${printableKey}: ${products[i][key]}`);
      }
    }
  }
  if (!productFound) {
    console.log(
      `Error: Product "${productIdentifier}" not found. Please check the name or code and try again.`,
    );
  }
}

// updateStockLevel(product, quantity): Updates the stock level of a product.

function updateStockLevel(productLocator, quantity) {
  let productFound = false;
  for (let i = 0; i < products.length; i++) {
    if (
      products[i].name === productLocator ||
      products[i].code === productLocator
    ) {
      productFound = true;
      let oldStock = products[i].stock;
      products[i].stock = quantity;
      alert(
        `Stock level for ${products[i].name} updated from ${oldStock} to ${quantity}.`,
      );
      console.log("Stock update successful.");
      break;
    }
  }
  if (!productFound) {
    alert(
      `Error: Product "${productLocator}" not found. Please check the name or code and try again.`,
    );
    console.log(`Error: Product "${productLocator}" not found.`);
  }
}

// updatePrice(product, newPrice): Updates the price of a product.

function updatePrice(productLocator, newPrice) {
  let productFound = false;
  for (let i = 0; i < products.length; i++) {
    if (
      products[i].name === productLocator ||
      products[i].code === productLocator
    ) {
      productFound = true;
      let oldPrice = products[i].price;
      products[i].price = newPrice;
      alert(
        `Price for ${products[i].name} updated from $${oldPrice} to $${newPrice}.`,
      );
      console.log(`Price update successful for ${products[i].name}.`);
      break;
    }
  }
  if (!productFound) {
    alert(
      `Error: Product "${productLocator}" not found. Please check the name or code and try again.`,
    );
    console.log(`Error: Product "${productLocator}" not found.`);
  }
}

// isProductAvailable(product): Checks if a product is in stock.

function isProductAvailable(productLocator) {
  let productFound = false;
  for (let i = 0; i < products.length; i++) {
    if (
      products[i].name === productLocator ||
      products[i].code === productLocator
    ) {
      productFound = true;
      if (products[i].stock > 0) {
        alert(
          `${products[i].name} is available at the store and the available stock is ${products[i].stock}.`,
        );
      } else {
        alert(`${products[i].name} is currently out of stock.`);
      }
    }
  }
  if (!productFound) {
    alert(
      `Error: Product "${productLocator}" not found. Please check the name or code and try again.`,
    );
    console.log(`Error: Product "${productLocator}" not found.`);
  }
}

// checkRestockAlert(product): Checks if a product needs restocking and triggers an alert.

function checkRestockAlert(productLocator) {
  let productFound = false;
  for (let i = 0; i < products.length; i++) {
    if (
      products[i].name === productLocator ||
      products[i].code === productLocator
    ) {
      productFound = true;
      if (products[i].stock <= products[i].restockThreshold) {
        alert(
          `Restock alert: ${products[i].name} (Code: ${products[i].code}) is running low (stock: ${products[i].stock}).`,
        );
        console.log("Stock is running low.");
        return true;
      } else {
        return false;
      }
    }
  }
  if (!productFound) {
    console.log(
      `Error: Product "${productLocator}" not found. Please check the name or code and try again.`,
    );
    return false;
  }
}

// simulateSale(product): Simulates a sale by reducing the product's stock level.

function simulateSale(productLocator) {
  for (let i = 0; i < products.length; i++) {
    if (
      products[i].name === productLocator ||
      products[i].code === productLocator
    ) {
      if (products[i].stock > 0) {
        products[i].stock -= 1;
        console.log(
          `Sold: ${products[i].name} (remaining stock: ${products[i].stock})`,
        );
        return products[i];
      } else {
        console.log(`Out of stock: ${products[i].name}`);
        return null;
      }
    }
  }
  console.log(`Error: Product "${productLocator}" not found.`);
  return null;
}

// processDailySales(): Simulates daily sales for all products in the inventory.

function processDailySales(products) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].stock > 0) {
      let soldProduct = simulateSale(products[i].name);
      if (soldProduct !== null) {
        checkRestockAlert(soldProduct.name);
      }
    } else {
      console.log(`Skipping ${products[i].name} (out of stock)`);
    }
  }
}

// Main Program Flow

function main() {
  let productLocator;
  while (true) {
    let choice = prompt(`Welcome to our store! What would you like to do?
1. Display Inventory
2. Get Product Details
3. Update Stock Level
4. Update Price
5. Check Product Availability
6. Check Restock Alert
7. Simulate Sale
8. Process Daily Sales
9. Exit
Enter your choice:`);
    switch (choice) {
      case "1":
        displayInventory();
        break;
      case "2":
        getProductDetails();
        break;
      case "3":
        productLocator = prompt("Enter product name or code:");
        let quantity = parseInt(prompt("Enter new stock quantity:"));
        updateStockLevel(productLocator, quantity);
        break;
      case "4":
        productLocator = prompt("Enter product name or code:");
        let newPrice = parseFloat(prompt("Enter new price:"));
        updatePrice(productLocator, newPrice);
        break;
      case "5":
        productLocator = prompt("Enter product name or code:");
        isProductAvailable(productLocator);
        break;
      case "6":
        productLocator = prompt("Enter product name or code:");
        checkRestockAlert(productLocator);
        break;
      case "7":
        productLocator = prompt("Enter product name or code:");
        simulateSale(productLocator);
        break;
      case "8":
        processDailySales(products);
        break;
      case "9":
        console.log("Exiting program. Goodbye!");
        return;
      default:
        console.log("Invalid choice. Please try again.");
    }
  }
}

main();
