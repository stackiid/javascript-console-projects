const correctUsername = "admin";
const correctPassword = "hello123456";
const maxUsernameAttempts = 3;
const maxPasswordAttempts = 3;

let usernameAttempts = 0;
let passwordAttempts = 0;
let otpAttempts = 0;
let isAuthenticated = false;
let balance = 50000;

alert(
  "Welcome to Your Secure Digital Banking Portal!\n\nPlease follow the instructions carefully to access your account.\n\n Multiple failed attempts may result in temporary or permanent account lockout for your safety.",
);

// Username verification loop
while (usernameAttempts < maxUsernameAttempts) {
  const enteredUsername = prompt(
    "Username Verification\n\nPlease enter your username to proceed:",
  );

  if (enteredUsername === correctUsername) {
    alert(
      "Username verified successfully.\n\nProceeding to password authentication...",
    );

    // Password verification loop
    while (passwordAttempts < maxPasswordAttempts) {
      const enteredPassword = prompt(
        "Password Authentication\n\nPlease enter your password:",
      );

      if (enteredPassword === correctPassword) {
        alert(
          "Password accepted.\n\nInitiating final step: OTP verification for enhanced security...",
        );

        // OTP generation
        const generatedOTP = Math.floor(100000 + Math.random() * 900000);
        alert(
          `One-Time Password (OTP) Sent\n\nYour 6-digit OTP is: ${generatedOTP}\n\nNote: This code has been sent to your registered mobile number ending in ********607.`,
        );

        const enteredOTP = prompt(
          "OTP Verification\n\nPlease enter the 6-digit OTP to complete your login:",
        );

        if (parseInt(enteredOTP) === generatedOTP) {
          alert(
            "Login Successful!\n\nWelcome back! You have successfully logged into your account.",
          );
          console.log("Login successful.");
          isAuthenticated = true;
        } else {
          otpAttempts++;

          if (otpAttempts === 1) {
            alert(
              "Incorrect OTP Entered\n\nYour account has been temporarily locked for 48 hours due to a failed OTP verification attempt.\n\nPlease wait 48 hours before trying again. The system will automatically unlock your account after this period.",
            );
            console.error(
              "ERROR: OTP verification failed. Account locked for 48 hours.",
            );
          } else {
            alert(
              "Multiple OTP Failures Detected\n\nYour account has been locked for 72 hours or more due to repeated failed OTP attempts.\n\nWe are reviewing the situation. Please try again later or contact support for assistance.",
            );
            console.error(
              "ERROR: OTP verification failed again. Account locked for 72+ hours.",
            );
          }
        }

        // Exit both loops after OTP stage
        usernameAttempts = maxUsernameAttempts;
        passwordAttempts = maxPasswordAttempts;
        break;
      } else {
        passwordAttempts++;
        const attemptsLeft = maxPasswordAttempts - passwordAttempts;

        if (attemptsLeft > 0) {
          alert(
            `Incorrect Password\n\nYou have entered an invalid password.\n\nAttempts remaining: ${attemptsLeft}\n\nPlease try again carefully.`,
          );
          console.error("ERROR: Invalid password attempt.");
        } else {
          alert(
            "Password Attempt Limit Reached\n\nYou have exceeded the maximum number of allowed password attempts.\n\nYour account has been permanently locked for security reasons.\n\nTo regain access, please visit your nearest branch with valid identification.",
          );
          console.error(
            "ERROR: Password attempts exceeded. Account permanently locked.",
          );
          usernameAttempts = maxUsernameAttempts;
        }
      }
    }

    break; // Exit username loop if password loop completes
  } else {
    usernameAttempts++;
    const attemptsLeft = maxUsernameAttempts - usernameAttempts;

    if (attemptsLeft > 0) {
      alert(
        `Invalid Username\n\nThe username you entered does not match our records.\n\nAttempts remaining: ${attemptsLeft}\n\nPlease double-check and try again.`,
      );
      console.error("ERROR: Invalid username attempt.");
    } else {
      alert(
        "Username Attempt Limit Reached\n\nYou have exceeded the maximum number of allowed username attempts.\n\nYour account has been permanently locked for security reasons.\n\nTo regain access, please visit your nearest branch with valid identification.",
      );
      console.error(
        "ERROR: Username attempts exceeded. Account permanently locked.",
      );
    }
  }
}

// Banking operations menu
if (isAuthenticated) {
  alert("Welcome to Your Digital Bank Account!");

  while (true) {
    const userChoice = prompt(
      "Please choose an option:\n" +
        "1. Check Balance\n" +
        "2. Deposit Money\n" +
        "3. Withdraw Money\n" +
        "4. Exit",
    );

    if (userChoice === "1") {
      alert(`Your current balance is Rs. ${balance.toLocaleString()}`);
      console.log("User checked account balance.");
    } else if (userChoice === "2") {
      let depositInput = prompt(
        "Deposit Funds\n\nEnter the amount you want to deposit:",
      );
      let depositAmount = parseInt(depositInput);

      if (!isNaN(depositAmount) && depositAmount > 0) {
        balance += depositAmount;
        alert(
          `Rs. ${depositAmount.toLocaleString()} deposited successfully.\n\nNew balance: Rs. ${balance.toLocaleString()}`,
        );
        console.log(`Deposited Rs. ${depositAmount}`);
      } else {
        alert("Invalid amount. Please enter a positive number.");
        console.error("Deposit failed due to invalid input.");
      }
    } else if (userChoice === "3") {
      let withdrawInput = prompt(
        "Withdraw Funds\n\nEnter the amount you want to withdraw:",
      );
      let withdrawAmount = parseInt(withdrawInput);

      if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
        alert("Invalid amount. Please enter a positive number.");
        console.error("Withdrawal failed due to invalid input.");
      } else if (withdrawAmount > balance) {
        alert(
          `Insufficient balance.\n\nYou only have Rs. ${balance.toLocaleString()}`,
        );
        console.warn("Withdrawal attempt exceeded available balance.");
      } else {
        balance -= withdrawAmount;
        alert(
          `Rs. ${withdrawAmount.toLocaleString()} withdrawn successfully.\n\nRemaining balance: Rs. ${balance.toLocaleString()}`,
        );
        console.log(`Withdrew Rs. ${withdrawAmount}`);
      }
    } else if (userChoice === "4") {
      alert("Logging out of your account...");
      alert(
        "Thank you for banking with us!\n\n For support, email: support@yourbank.com\nOr call our helpline: 0800-777-077",
      );
      console.log("User logged out.");
      break;
    } else {
      alert("Invalid option. Please select 1, 2, 3, or 4.");
      console.warn("User entered an invalid menu option.");
    }
  }
}
