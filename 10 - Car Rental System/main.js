const cars = [
  {
    carId: 1,
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    isRented: false,
    rentalDays: 0,
    dailyRate: 5000,
    type: "Sedan",
  },
  {
    carId: 2,
    make: "Honda",
    model: "Civic",
    year: 2019,
    isRented: false,
    rentalDays: 0,
    dailyRate: 5500,
    type: "Sedan",
  },
  {
    carId: 3,
    make: "Suzuki",
    model: "Alto",
    year: 2018,
    isRented: false,
    rentalDays: 0,
    dailyRate: 3000,
    type: "Hatchback",
  },
  {
    carId: 4,
    make: "Hyundai",
    model: "Tucson",
    year: 2021,
    isRented: false,
    rentalDays: 0,
    dailyRate: 7000,
    type: "SUV",
  },
  {
    carId: 5,
    make: "BMW",
    model: "3 Series",
    year: 2020,
    isRented: false,
    rentalDays: 0,
    dailyRate: 12000,
    type: "Luxury Sedan",
  },
  {
    carId: 6,
    make: "Audi",
    model: "A4",
    year: 2017,
    isRented: false,
    rentalDays: 0,
    dailyRate: 10000,
    type: "Luxury Sedan",
  },
  {
    carId: 7,
    make: "Nissan",
    model: "Dayz",
    year: 2019,
    isRented: false,
    rentalDays: 0,
    dailyRate: 4000,
    type: "Hatchback",
  },
  {
    carId: 8,
    make: "Kia",
    model: "Sportage",
    year: 2020,
    isRented: false,
    rentalDays: 0,
    dailyRate: 6000,
    type: "SUV",
  },
  {
    carId: 9,
    make: "Volkswagen",
    model: "Golf",
    year: 2016,
    isRented: false,
    rentalDays: 0,
    dailyRate: 4500,
    type: "Hatchback",
  },
  {
    carId: 10,
    make: "Mercedes",
    model: "C-Class",
    year: 2021,
    isRented: false,
    rentalDays: 0,
    dailyRate: 15000,
    type: "Luxury Sedan",
  },
  {
    carId: 11,
    make: "Mitsubishi",
    model: "Lancer",
    year: 2015,
    isRented: false,
    rentalDays: 0,
    dailyRate: 3500,
    type: "Sedan",
  },
  {
    carId: 12,
    make: "Ford",
    model: "Focus",
    year: 2018,
    isRented: false,
    rentalDays: 0,
    dailyRate: 4800,
    type: "Sedan",
  },
  {
    carId: 13,
    make: "Chevrolet",
    model: "Cruze",
    year: 2017,
    isRented: false,
    rentalDays: 0,
    dailyRate: 5200,
    type: "Sedan",
  },
  {
    carId: 14,
    make: "Jeep",
    model: "Compass",
    year: 2020,
    isRented: false,
    rentalDays: 0,
    dailyRate: 8000,
    type: "SUV",
  },
  {
    carId: 15,
    make: "Land Rover",
    model: "Discovery",
    year: 2021,
    isRented: false,
    rentalDays: 0,
    dailyRate: 18000,
    type: "Luxury SUV",
  },
  {
    carId: 16,
    make: "Porsche",
    model: "Cayenne",
    year: 2020,
    isRented: false,
    rentalDays: 0,
    dailyRate: 20000,
    type: "Luxury SUV",
  },
  {
    carId: 17,
    make: "Mazda",
    model: "3",
    year: 2019,
    isRented: false,
    rentalDays: 0,
    dailyRate: 5500,
    type: "Sedan",
  },
  {
    carId: 18,
    make: "Subaru",
    model: "Impreza",
    year: 2018,
    isRented: false,
    rentalDays: 0,
    dailyRate: 6000,
    type: "Sedan",
  },
  {
    carId: 19,
    make: "Tesla",
    model: "Model 3",
    year: 2021,
    isRented: false,
    rentalDays: 0,
    dailyRate: 10000,
    type: "Electric Sedan",
  },
  {
    carId: 20,
    make: "Lexus",
    model: "ES",
    year: 2020,
    isRented: false,
    rentalDays: 0,
    dailyRate: 13000,
    type: "Luxury Sedan",
  },
];

function generateCarNumber() {
  const alphabetPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let carNumberPrefix = "";
  let carNumberSuffix = "";
  let carNumber = "";
  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * alphabetPool.length);
    carNumberPrefix += alphabetPool[randomIndex];
  }
  for (let i = 0; i < 3; i++) {
    carNumberSuffix += Math.floor(Math.random() * 10);
  }
  carNumber = carNumberPrefix + carNumberSuffix;
  return carNumber;
}
for (let i = 0; i < cars.length; i++) {
  let carNumber = generateCarNumber();
  cars[i].carId = carNumber;
}

let carRentalFunctions = {
  displayCars: function () {
    alert("Loading our exquisite collection of vehicles... Please hold on!");
    console.log("==== Premium Cars Available for Rent ====".toUpperCase());
    for (let i = 0; i < cars.length; i++) {
      let status = cars[i].isRented ? "On Rent" : "Available";
      console.log(
        `Car ID: ${cars[i].carId}, Make: ${cars[i].make}, Model: ${cars[i].model}, Year: ${cars[i].year}, Status: ${status}`,
      );
    }
    console.log("Cars displayed successfully!");
  },
  getCarDetails: function (carLocator) {
    let carFound = false;
    for (let i = 0; i < cars.length; i++) {
      if (
        cars[i].make.toLowerCase() === carLocator.toLowerCase() ||
        cars[i].carId.toString() === carLocator
      ) {
        carFound = true;
        alert(`Fetching details of ${cars[i].make}... Please wait!`);
        console.log(`=== Details of ${cars[i].make} ====`);
        let keys = Object.keys(cars[i]);
        for (key of keys) {
          let printableKey = key.charAt(0).toUpperCase() + key.slice(1);
          console.log(`${printableKey}: ${cars[i][key]}`);
        }
        console.log("Car details fetched successfully!");
        break;
      }
    }
    if (!carFound) {
      alert(`Car not found. Please check the name or ID and try again.`);
      console.log("Error: Car not found or invalid name/ID.");
    }
  },
  getRentalStatus: function (carLocator) {
    let carFound = false;
    for (let i = 0; i < cars.length; i++) {
      if (
        cars[i].make.toLowerCase() === carLocator.toLowerCase() ||
        cars[i].carId.toString() === carLocator
      ) {
        carFound = true;
        let status = cars[i].isRented ? "On Rent" : "Available";
        alert(`Rental Status: ${cars[i].make} is ${status}`);
        console.log(`Rental Status: ${cars[i].make} is ${status}`);
        console.log("Rental status fetched successfully!");
        break;
      }
    }
    if (!carFound) {
      alert(`Car not found. Please check the name or ID and try again.`);
      console.log("Error: Car not found or invalid name/ID.");
    }
  },
  rentCar: function (carLocator, days) {
    let carFound = false;
    for (let i = 0; i < cars.length; i++) {
      if (
        cars[i].make.toLowerCase() === carLocator.toLowerCase() ||
        cars[i].carId.toString() === carLocator
      ) {
        carFound = true;
        if (!cars[i].isRented) {
          let totalCost = cars[i].dailyRate * days;
          let discountResult = applyRandomDiscount(totalCost);
          let amountToPayNow = (discountResult.discountedPrice * 75) / 100;
          alert(
            `${cars[i].make} ${cars[i].model} is available for rent.\n` +
              `Rent Days: ${days}\n` +
              `Daily Rate: PKR ${cars[i].dailyRate}\n` +
              `Total Amount: PKR ${cars[i].dailyRate} x ${days} = PKR ${totalCost}\n` +
              `Discount: ${discountResult.discount}\n` +
              `Discount Amount: PKR ${discountResult.discountAmount}\n` +
              `Discounted Price: PKR ${discountResult.discountedPrice}\n` +
              `Amount to pay now (75%): PKR ${amountToPayNow}`,
          );
          let choice = prompt(
            `Do you agree to rent ${cars[i].make} ${cars[i].model} for PKR ${discountResult.discountedPrice}? (Type Yes/No)`,
          ).toLowerCase();
          if (choice === "yes") {
            let paymentMade = false;
            while (!paymentMade) {
              let paymentChoice = prompt(
                `Please pay PKR ${amountToPayNow} (75% of total cost). Type 'Pay' to proceed.`,
              ).toLowerCase();
              if (paymentChoice === "pay") {
                cars[i].isRented = true;
                cars[i].rentalDays = days;
                cars[i].totalRentalCost = totalCost;
                cars[i].discountPercentage = discountResult.discount;
                cars[i].discountAmount = discountResult.discountAmount;
                cars[i].discountedCost = discountResult.discountedPrice;
                cars[i].amountPaid = amountToPayNow;
                cars[i].remainingCost =
                  (discountResult.discountedPrice * 25) / 100;
                alert(
                  `${cars[i].make} ${cars[i].model} is rented to you for ${days} days.\n` +
                    `Total cost: PKR ${discountResult.discountedPrice}\n` +
                    `Remaining cost (25%): PKR ${cars[i].remainingCost} (payable at return)`,
                );
                console.log(
                  `${cars[i].make} ${cars[i].model} is rented for ${days} days.`,
                );
                paymentMade = true;
              } else {
                alert(
                  "Invalid option. You must pay 75% of the total cost at the time of rental as per our Terms & Conditions. Type 'pay' to proceed...",
                );
              }
            }
          } else if (choice === "no") {
            alert(
              "Rental request cancelled. Thank you for considering our service.",
            );
          } else {
            alert("Invalid input. Please type 'Yes' or 'No' to proceed.");
          }
        } else {
          alert(
            `${cars[i].make} ${cars[i].model} is already rented. Contact admin for more info or try another car.`,
          );
        }
        console.log("Car rental process completed!");
        break;
      }
    }
    if (!carFound) {
      alert(`Car not found. Please check the name or ID and try again.`);
      console.log("Error: Car not found or invalid name/ID.");
    }

    function applyRandomDiscount(price) {
      const discounts = [0, 2, 5, 8, 12, 14, 16, 18, 20];
      const randomDiscount =
        discounts[Math.floor(Math.random() * discounts.length)];
      const discountAmount = (price * randomDiscount) / 100;
      const discountedPrice = price - discountAmount;
      return {
        originalPrice: price,
        discount: `${randomDiscount}%`,
        discountAmount,
        discountedPrice,
      };
    }
  },
  returnCar: function (carLocator) {
    let carFound = false;
    for (let i = 0; i < cars.length; i++) {
      if (
        cars[i].make.toLowerCase() === carLocator.toLowerCase() ||
        cars[i].carId.toString() === carLocator
      ) {
        carFound = true;
        if (cars[i].isRented) {
          alert(
            `Car Details:\n` +
              `Car ID: ${cars[i].carId}\n` +
              `Make: ${cars[i].make}\n` +
              `Model: ${cars[i].model}\n` +
              `Year: ${cars[i].year}\n` +
              `Type: ${cars[i].type}\n` +
              `Daily Rate: PKR ${cars[i].dailyRate}\n` +
              `Rental Days: ${cars[i].rentalDays}\n` +
              `Total Cost: PKR ${cars[i].totalRentalCost}\n` +
              `Discount: ${cars[i].discountPercentage}\n` +
              `Discount Amount: PKR ${cars[i].discountAmount}\n` +
              `Discounted Cost: PKR ${cars[i].discountedCost}\n` +
              `Amount Paid: PKR ${cars[i].amountPaid}\n` +
              `Remaining Cost (25%): PKR ${cars[i].remainingCost}`,
          );
          let fineAmount = calculateFine();
          let totalAmountToPay = cars[i].remainingCost + fineAmount;
          alert(
            `Fine Amount: PKR ${fineAmount}\n` +
              `Remaining (25%): PKR ${cars[i].remainingCost}\n` +
              `Total Amount to Pay (along with fines): PKR ${totalAmountToPay}`,
          );
          let paymentMade = false;
          while (!paymentMade) {
            let paymentChoice = prompt(
              `Please pay PKR ${totalAmountToPay}. Type 'Pay' to proceed.`,
            ).toLowerCase();
            if (paymentChoice === "pay") {
              cars[i].isRented = false;
              cars[i].rentalDays = 0;
              cars[i].totalRentalCost = 0;
              cars[i].discountPercentage = "";
              cars[i].discountAmount = 0;
              cars[i].discountedCost = 0;
              cars[i].amountPaid = 0;
              cars[i].remainingCost = 0;
              alert("Car returned successfully. Thank you!");
              paymentMade = true;
            } else {
              alert("Invalid option. Please type 'Pay' to proceed.");
            }
          }
        } else {
          alert("Car is not rented.");
        }
        console.log("Car return process completed!");
        break;
      }
    }
    if (!carFound) {
      alert(`Car not found. Please check the name or ID and try again.`);
      console.log("Error: Car not found or invalid name/ID.");
    }

    function calculateFine() {
      let fineAmount = 0;
      let fineOptions =
        "Select fine options (comma separated numbers):\n1. Damage to car - PKR 5000\n2. Late return - PKR 2000\n3. Missing documents - PKR 1000\n4. Mileage exceeded - PKR 3000\n5. Traffic violation - PKR 4000\n6. Cleaning required - PKR 1500\n7. Fuel not filled - PKR 2500\n8. Other - Enter custom fine";
      let fineChoices = prompt(fineOptions).split(",");
      for (let choice of fineChoices) {
        let fineIndex = parseInt(choice.trim()) - 1;
        switch (fineIndex) {
          case 0:
            fineAmount += 5000;
            break;
          case 1:
            fineAmount += 2000;
            break;
          case 2:
            fineAmount += 1000;
            break;
          case 3:
            fineAmount += 3000;
            break;
          case 4:
            fineAmount += 4000;
            break;
          case 5:
            fineAmount += 1500;
            break;
          case 6:
            fineAmount += 2500;
            break;
          case 7:
            let customFine = prompt("Enter custom fine amount:");
            fineAmount += parseInt(customFine);
            break;
          default:
            alert("Invalid option. Please try again.");
        }
      }
      return fineAmount;
    }
  },
};

function main() {
  while (true) {
    let options = "Welcome to Car Rental System\n";
    options += "1. Display Cars\n";
    options += "2. Get Car Details\n";
    options += "3. Get Rental Status\n";
    options += "4. Rent a Car\n";
    options += "5. Return a Car\n";
    options += "6. Exit\n";

    let choice = prompt(options);
    switch (choice) {
      case "1":
        carRentalFunctions.displayCars();
        break;
      case "2":
        let carLocator = prompt("Enter car make or car ID:");
        carRentalFunctions.getCarDetails(carLocator);
        break;
      case "3":
        let carLocator2 = prompt("Enter car make or car ID:");
        carRentalFunctions.getRentalStatus(carLocator2);
        break;
      case "4":
        let carLocator3 = prompt("Enter car make or car ID:");
        let days = parseInt(prompt("Enter rental days:"));
        carRentalFunctions.rentCar(carLocator3, days);
        break;
      case "5":
        let carLocator4 = prompt("Enter car make or car ID:");
        carRentalFunctions.returnCar(carLocator4);
        break;
      case "6":
        alert("Thank you for using Car Rental System!");
        return;
      default:
        alert("Invalid option. Please try again.");
    }
  }
}

main();
