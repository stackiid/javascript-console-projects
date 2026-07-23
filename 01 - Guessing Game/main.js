let radNum = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

alert("Welcome to the Number Guessing Game!");
alert("I'm thinking of a number between 1 and 100.");

while (true) {
  let inNum = parseInt(prompt("Enter your guess:"));
  attempts++;

  if (isNaN(inNum)) {
    alert("Invalid input! Please enter a number.");
    continue;
  }

  if (inNum < 1 || inNum > 100) {
    alert("Please enter a number between 1 and 100.");
    continue;
  }

  if (radNum < inNum) {
    console.log(`${inNum} is too high! Try again.`);
    alert(`${inNum} is too high! Try again.`);
  } else if (radNum > inNum) {
    console.log(`${inNum} is too low! Try again.`);
    alert(`${inNum} is too low! Try again.`);
  } else {
    console.log(
      `Congratulations! You guessed the number ${radNum} in ${attempts} attempts.`,
    );
    alert(
      `Congratulations! You guessed the number ${radNum} in ${attempts} attempts.`,
    );
    break;
  }
}
