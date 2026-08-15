"use strict";

// ================================================================
//  SECTION 1 - DISPLAY UTILITIES
// ================================================================
const W = 65;
const SEP = "=".repeat(W);
const DIV = "-".repeat(W);

const box = (t) => {
  const pad = " ".repeat(Math.max(0, Math.floor((W - t.length - 4) / 2)));
  console.log("\n" + SEP);
  console.log(pad + `★  ${t}  ★`);
  console.log(SEP);
};
const sub = (t) => {
  console.log("\n" + DIV + `\n  » ${t}\n` + DIV);
};
const ok = (m) => console.log(`  ✔  ${m}`);
const er = (m) => console.log(`  ✘  ${m}`);
const inf = (m) => console.log(`  ℹ  ${m}`);
const wrn = (m) => console.log(`  ⚠  ${m}`);
const lbl = (l, v) => console.log(`  ${String(l).padEnd(24, ".")} ${v}`);
const fmtPKR = (n) => `PKR ${Number(n).toLocaleString()}`;
const nowStr = () => new Date().toLocaleString();
const dateStr = () => new Date().toLocaleDateString();
const uid = (p) => `${p}-${Date.now()}-${((Math.random() * 9000) | 0) + 1000}`;
const ask = (q) => {
  const r = prompt(q);
  return r === null ? "" : r.trim();
};
const askLower = (q) => ask(q).toLowerCase();
const parseAge = (s) => {
  if (!s || s === "PG") return 0;
  if (s === "PG-13") return 13;
  return parseInt(s) || 0;
};
// Sum an array by a mapping function - replaces repeated .reduce((s,x)=>s+expr,0) call sites
const sumBy = (arr, fn) => arr.reduce((s, x) => s + fn(x), 0);
// Case-insensitive "yes"/"y" confirmation check - replaces repeated toLowerCase() === "yes" || === "y" chains
const isYes = (s) => {
  const v = s.toLowerCase();
  return v === "yes" || v === "y";
};

// ================================================================
//  SECTION 2 - ID GENERATORS
// ================================================================
const generateMovieID = () => uid("CMG-MV");
const generateFoodID = () => uid("CMG-FD");
const generateDealID = () => uid("CMG-DL");
const generateBookingID = () => uid("CMG-BK");
const generateUserID = () => uid("CMG-US");

// ================================================================
//  SECTION 3 - SEAT MAP ENGINE (2D Array 10×6 = 60 seats)
// ================================================================
function generateSeatMap(preBooked = 0) {
  const ROWS = 10,
    COLS = 6;
  const map = [],
    all = [];
  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < COLS; c++) {
      const label = `${String.fromCharCode(65 + r)}${c + 1}`;
      row.push({ label, status: "available" });
      all.push({ r, c });
    }
    map.push(row);
  }
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  for (let i = 0; i < Math.min(preBooked, 58); i++) {
    map[shuffled[i].r][shuffled[i].c].status = "booked";
  }
  return map;
}

// Count booked seats in a single pass (no .flat()/.filter() array allocation) - used across
// movie cards, pricing, booking, and every admin report that shows occupancy.
function bookedCount(movie) {
  let n = 0;
  for (const row of movie.seatMap) {
    for (const s of row) if (s.status === "booked") n++;
  }
  return n;
}
const availableCount = (movie) => movie.totalSeats - bookedCount(movie);

// Seat label (e.g. "C4") <-> seat map row/column index, shared by seat selection and cancellation.
const seatRowIndex = (s) => s.charCodeAt(0) - 65;
const seatColIndex = (s) => parseInt(s.slice(1)) - 1;

function displaySeatMap(seatMap) {
  console.log("\n" + DIV);
  console.log("                    ★  SCREEN  ★");
  console.log(DIV);
  console.log("        Col:   1      2      3      4      5      6");
  console.log(DIV);
  seatMap.forEach((row, r) => {
    const rowLabel = String.fromCharCode(65 + r);
    const cells = row.map((s) => {
      if (s.status === "booked") return "[XX]";
      if (s.status === "selected") return "[>>]";
      return `[${s.label.padEnd(2)}]`;
    });
    console.log(`  Row ${rowLabel}    ${cells.join("   ")}`);
  });
  console.log(DIV);
  console.log("  [XX]=Booked  [>>]=Selected  [A1]=Available");
  console.log(DIV);
}

// ================================================================
//  SECTION 4 - DATABASE LAYER
// ================================================================

// Factory functions - build a full entity from just the fields that vary,
// filling in the constants every instance shares. This keeps the seed data
// below compact and is the single place that defines each entity's shape.
function makeMovie({
  title,
  year,
  category,
  language,
  duration,
  rating,
  ageRestriction,
  timings,
  ticketPrice,
  bookedSeats,
  tags,
}) {
  return {
    id: generateMovieID(),
    title,
    year,
    category,
    language,
    duration,
    rating,
    ageRestriction,
    timings,
    ticketPrice,
    totalSeats: 60,
    bookedSeats,
    tags,
    revenue: 0,
    reviews: [],
    totalBookings: 0,
  };
}
const food = (name, category, price) => ({
  id: generateFoodID(),
  name,
  category,
  price,
});
const deal = (name, items, price) => ({
  id: generateDealID(),
  name,
  items,
  price,
});
const coupon = (code, discount, type, desc) => ({
  code,
  discount,
  type,
  desc,
  used: [],
});
function makeUser({
  name,
  username,
  password,
  gender,
  age,
  contact,
  email,
  cnic,
  secQuestion,
  secAnswer,
  walletBalance = 0,
  rewardPoints = 0,
  isVIP = false,
  role = "customer",
}) {
  return {
    id: generateUserID(),
    name,
    username,
    password,
    gender,
    age,
    contact,
    email,
    cnic,
    secQuestion,
    secAnswer,
    walletBalance,
    rewardPoints,
    isVIP,
    isBanned: false,
    isLocked: false,
    failedAttempts: 0,
    role,
    memberSince: dateStr(),
    loginHistory: [],
    bookingHistory: [],
    favorites: [],
    activityLog: [],
  };
}

const cinema = {
  name: "CineMax Galaxy",
  movies: [
    // ------- ACTION -------
    makeMovie({
      title: "John Wick 4",
      year: 2023,
      category: "Action",
      language: "English",
      duration: "2h 49m",
      rating: 8.4,
      ageRestriction: "18+",
      timings: ["11:00 AM", "3:00 PM", "7:00 PM", "10:00 PM"],
      ticketPrice: 1800,
      bookedSeats: 16,
      tags: ["Hitman", "Gunfight", "Action"],
    }),
    makeMovie({
      title: "Extraction 3",
      year: 2026,
      category: "Action",
      language: "English",
      duration: "2h 11m",
      rating: 7.9,
      ageRestriction: "16+",
      timings: ["12:00 PM", "5:00 PM", "10:00 PM"],
      ticketPrice: 1600,
      bookedSeats: 22,
      tags: ["Military", "Rescue", "Combat"],
    }),
    makeMovie({
      title: "Mission Impossible 8",
      year: 2025,
      category: "Action",
      language: "English",
      duration: "2h 36m",
      rating: 8.2,
      ageRestriction: "13+",
      timings: ["1:00 PM", "6:00 PM", "9:00 PM"],
      ticketPrice: 2200,
      bookedSeats: 50,
      tags: ["Spy", "Stunts", "Adventure"],
    }),
    makeMovie({
      title: "The Equalizer 4",
      year: 2026,
      category: "Action",
      language: "English",
      duration: "2h 08m",
      rating: 7.5,
      ageRestriction: "16+",
      timings: ["10:00 AM", "2:00 PM", "8:00 PM"],
      ticketPrice: 1500,
      bookedSeats: 10,
      tags: ["Crime", "Thriller", "Revenge"],
    }),
    makeMovie({
      title: "Mad Max Fury Road",
      year: 2015,
      category: "Action",
      language: "English",
      duration: "2h 00m",
      rating: 8.1,
      ageRestriction: "18+",
      timings: ["11:00 AM", "4:00 PM", "9:00 PM"],
      ticketPrice: 2000,
      bookedSeats: 38,
      tags: ["Cars", "Desert", "Chaos"],
    }),
    // ------- SCIFI -------
    makeMovie({
      title: "Interstellar",
      year: 2014,
      category: "SciFi",
      language: "English",
      duration: "2h 49m",
      rating: 8.9,
      ageRestriction: "13+",
      timings: ["10:00 AM", "2:00 PM", "8:00 PM"],
      ticketPrice: 2000,
      bookedSeats: 40,
      tags: ["Space", "NASA", "Time"],
    }),
    makeMovie({
      title: "Dune Part Two",
      year: 2024,
      category: "SciFi",
      language: "English",
      duration: "2h 46m",
      rating: 8.7,
      ageRestriction: "13+",
      timings: ["11:00 AM", "4:00 PM", "10:00 PM"],
      ticketPrice: 2300,
      bookedSeats: 44,
      tags: ["Desert", "Future", "Epic"],
    }),
    makeMovie({
      title: "Blade Runner 2049",
      year: 2017,
      category: "SciFi",
      language: "English",
      duration: "2h 44m",
      rating: 8.0,
      ageRestriction: "16+",
      timings: ["1:00 PM", "5:00 PM", "9:00 PM"],
      ticketPrice: 1700,
      bookedSeats: 24,
      tags: ["Cyberpunk", "AI", "Future"],
    }),
    makeMovie({
      title: "Avatar Way of Water",
      year: 2022,
      category: "SciFi",
      language: "English",
      duration: "3h 02m",
      rating: 7.8,
      ageRestriction: "13+",
      timings: ["12:00 PM", "6:00 PM"],
      ticketPrice: 2500,
      bookedSeats: 55,
      tags: ["Ocean", "Aliens", "Pandora"],
    }),
    makeMovie({
      title: "The Matrix Resurrections",
      year: 2021,
      category: "SciFi",
      language: "English",
      duration: "2h 28m",
      rating: 7.2,
      ageRestriction: "16+",
      timings: ["11:00 AM", "3:00 PM", "8:00 PM"],
      ticketPrice: 2100,
      bookedSeats: 18,
      tags: ["Simulation", "Hackers", "AI"],
    }),
    // ------- HORROR -------
    makeMovie({
      title: "The Conjuring",
      year: 2013,
      category: "Horror",
      language: "English",
      duration: "1h 52m",
      rating: 8.0,
      ageRestriction: "18+",
      timings: ["6:00 PM", "10:00 PM"],
      ticketPrice: 1400,
      bookedSeats: 31,
      tags: ["Ghost", "Haunted", "Paranormal"],
    }),
    makeMovie({
      title: "Insidious Red Door",
      year: 2023,
      category: "Horror",
      language: "English",
      duration: "1h 47m",
      rating: 7.0,
      ageRestriction: "18+",
      timings: ["5:00 PM", "11:00 PM"],
      ticketPrice: 1350,
      bookedSeats: 25,
      tags: ["Demons", "Fear", "Dark"],
    }),
    makeMovie({
      title: "Smile 2",
      year: 2024,
      category: "Horror",
      language: "English",
      duration: "2h 12m",
      rating: 7.3,
      ageRestriction: "18+",
      timings: ["7:00 PM", "10:30 PM"],
      ticketPrice: 1300,
      bookedSeats: 10,
      tags: ["Psychological", "Curse", "Mystery"],
    }),
    makeMovie({
      title: "The Nun 2",
      year: 2023,
      category: "Horror",
      language: "English",
      duration: "1h 50m",
      rating: 6.9,
      ageRestriction: "18+",
      timings: ["6:00 PM", "9:00 PM"],
      ticketPrice: 1200,
      bookedSeats: 5,
      tags: ["Church", "Demon", "Scary"],
    }),
    makeMovie({
      title: "Talk To Me",
      year: 2023,
      category: "Horror",
      language: "English",
      duration: "1h 35m",
      rating: 7.4,
      ageRestriction: "18+",
      timings: ["8:00 PM", "11:30 PM"],
      ticketPrice: 1450,
      bookedSeats: 27,
      tags: ["Spirits", "Teen", "Dark"],
    }),
    // ------- COMEDY -------
    makeMovie({
      title: "Free Guy",
      year: 2021,
      category: "Comedy",
      language: "English",
      duration: "1h 55m",
      rating: 7.1,
      ageRestriction: "13+",
      timings: ["1:00 PM", "6:00 PM"],
      ticketPrice: 1200,
      bookedSeats: 14,
      tags: ["Funny", "Gaming", "Adventure"],
    }),
    makeMovie({
      title: "The Mask",
      year: 1994,
      category: "Comedy",
      language: "English",
      duration: "1h 41m",
      rating: 7.0,
      ageRestriction: "13+",
      timings: ["2:00 PM", "8:00 PM"],
      ticketPrice: 1000,
      bookedSeats: 28,
      tags: ["Classic", "Comedy", "Funny"],
    }),
    makeMovie({
      title: "Hangover",
      year: 2009,
      category: "Comedy",
      language: "English",
      duration: "1h 40m",
      rating: 7.7,
      ageRestriction: "18+",
      timings: ["5:00 PM", "10:00 PM"],
      ticketPrice: 1300,
      bookedSeats: 40,
      tags: ["Friends", "Party", "Chaos"],
    }),
    makeMovie({
      title: "Central Intelligence",
      year: 2016,
      category: "Comedy",
      language: "English",
      duration: "1h 47m",
      rating: 6.3,
      ageRestriction: "13+",
      timings: ["12:00 PM", "7:00 PM"],
      ticketPrice: 1100,
      bookedSeats: 10,
      tags: ["Spy", "Funny", "Action"],
    }),
    makeMovie({
      title: "Rush Hour",
      year: 1998,
      category: "Comedy",
      language: "English",
      duration: "1h 38m",
      rating: 7.0,
      ageRestriction: "13+",
      timings: ["3:00 PM", "9:00 PM"],
      ticketPrice: 1250,
      bookedSeats: 18,
      tags: ["Police", "Funny", "Buddy"],
    }),
    // ------- THRILLER -------
    makeMovie({
      title: "Gone Girl",
      year: 2014,
      category: "Thriller",
      language: "English",
      duration: "2h 29m",
      rating: 8.1,
      ageRestriction: "18+",
      timings: ["7:00 PM", "10:00 PM"],
      ticketPrice: 1700,
      bookedSeats: 25,
      tags: ["Mystery", "Crime", "Dark"],
    }),
    makeMovie({
      title: "Se7en",
      year: 1995,
      category: "Thriller",
      language: "English",
      duration: "2h 07m",
      rating: 8.6,
      ageRestriction: "18+",
      timings: ["8:00 PM", "11:00 PM"],
      ticketPrice: 1800,
      bookedSeats: 35,
      tags: ["Detective", "Serial Killer", "Dark"],
    }),
    makeMovie({
      title: "Prisoners",
      year: 2013,
      category: "Thriller",
      language: "English",
      duration: "2h 33m",
      rating: 8.2,
      ageRestriction: "18+",
      timings: ["9:00 PM"],
      ticketPrice: 1600,
      bookedSeats: 21,
      tags: ["Kidnapping", "Mystery", "Crime"],
    }),
    makeMovie({
      title: "Shutter Island",
      year: 2010,
      category: "Thriller",
      language: "English",
      duration: "2h 18m",
      rating: 8.2,
      ageRestriction: "16+",
      timings: ["6:00 PM", "9:30 PM"],
      ticketPrice: 1500,
      bookedSeats: 17,
      tags: ["Mind Twist", "Mystery", "Psychological"],
    }),
    makeMovie({
      title: "The Girl on the Train",
      year: 2016,
      category: "Thriller",
      language: "English",
      duration: "1h 52m",
      rating: 6.5,
      ageRestriction: "16+",
      timings: ["8:00 PM"],
      ticketPrice: 1400,
      bookedSeats: 15,
      tags: ["Mystery", "Crime", "Drama"],
    }),
    // ------- ANIMATION -------
    makeMovie({
      title: "Toy Story 4",
      year: 2019,
      category: "Animation",
      language: "English",
      duration: "1h 40m",
      rating: 7.8,
      ageRestriction: "PG",
      timings: ["10:00 AM", "1:00 PM", "4:00 PM"],
      ticketPrice: 1000,
      bookedSeats: 25,
      tags: ["Kids", "Adventure", "Fun"],
    }),
    makeMovie({
      title: "Frozen 2",
      year: 2019,
      category: "Animation",
      language: "English",
      duration: "1h 43m",
      rating: 6.8,
      ageRestriction: "PG",
      timings: ["11:00 AM", "2:00 PM"],
      ticketPrice: 950,
      bookedSeats: 31,
      tags: ["Princess", "Magic", "Family"],
    }),
    makeMovie({
      title: "Spider-Man Spider-Verse",
      year: 2023,
      category: "Animation",
      language: "English",
      duration: "2h 20m",
      rating: 8.7,
      ageRestriction: "PG-13",
      timings: ["4:00 PM", "8:00 PM"],
      ticketPrice: 1700,
      bookedSeats: 55,
      tags: ["Marvel", "Multiverse", "Hero"],
    }),
    makeMovie({
      title: "Finding Nemo",
      year: 2003,
      category: "Animation",
      language: "English",
      duration: "1h 40m",
      rating: 8.2,
      ageRestriction: "PG",
      timings: ["12:00 PM", "5:00 PM"],
      ticketPrice: 900,
      bookedSeats: 13,
      tags: ["Ocean", "Family", "Adventure"],
    }),
    makeMovie({
      title: "Kung Fu Panda 4",
      year: 2024,
      category: "Animation",
      language: "English",
      duration: "1h 34m",
      rating: 7.3,
      ageRestriction: "PG",
      timings: ["3:00 PM", "7:00 PM"],
      ticketPrice: 1200,
      bookedSeats: 36,
      tags: ["Comedy", "Martial Arts", "Kids"],
    }),
  ],
};
// Attach seat maps
cinema.movies.forEach((m) => {
  m.seatMap = generateSeatMap(m.bookedSeats);
});

// ------- Food DB -------
const foodDB = [
  food("Small Popcorn", "Popcorn", 350),
  food("Medium Popcorn", "Popcorn", 500),
  food("Large Popcorn", "Popcorn", 700),
  food("Zinger Burger", "Burger", 850),
  food("Beef Burger", "Burger", 950),
  food("Double Patty Burger", "Burger", 1250),
  food("Cheese Pizza", "Pizza", 1400),
  food("Pepperoni Pizza", "Pizza", 1700),
  food("Fajita Pizza", "Pizza", 1600),
  food("French Fries", "Fries", 400),
  food("Loaded Fries", "Fries", 750),
  food("Masala Fries", "Fries", 500),
  food("Pepsi", "Drink", 250),
  food("Coca Cola", "Drink", 250),
  food("Mountain Dew", "Drink", 300),
  food("Mint Margarita", "Drink", 450),
  food("Cheese Nachos", "Nachos", 700),
  food("Loaded Nachos", "Nachos", 1100),
  food("Classic Hotdog", "Hotdog", 650),
  food("Cheese Hotdog", "Hotdog", 850),
  food("Club Sandwich", "Sandwich", 950),
  food("Grilled Sandwich", "Sandwich", 800),
  food("Choc Ice Cream", "Dessert", 450),
  food("Vanilla Ice Cream", "Dessert", 400),
  food("Oreo Sundae", "Dessert", 700),
  food("Chicken Wrap", "Wrap", 850),
  food("BBQ Wrap", "Wrap", 950),
  food("Cappuccino", "Coffee", 500),
  food("Latte", "Coffee", 550),
  food("Espresso", "Coffee", 450),
];

// ------- Combo Deals -------
const dealsDB = [
  deal("Solo Movie Deal", ["Medium Popcorn", "Pepsi"], 599),
  deal("Couple Combo", ["Large Popcorn", "2x Pepsi"], 950),
  deal("Family Bucket", ["Large Popcorn", "4x Drinks"], 1800),
  deal("Burger Combo", ["Zinger Burger", "French Fries", "Pepsi"], 1250),
  deal("Pizza Combo", ["Fajita Pizza", "2x Drinks"], 1750),
  deal("Nachos Combo", ["Loaded Nachos", "Mint Margarita"], 1300),
  deal("Kids Deal", ["Small Popcorn", "Vanilla Ice Cream"], 550),
  deal("Coffee Time", ["Latte", "Club Sandwich"], 1200),
  deal(
    "Mega Feast",
    ["Pepperoni Pizza", "Loaded Fries", "Large Popcorn", "4x Drinks"],
    3499,
  ),
];

// ------- Coupons -------
const couponsDB = [
  coupon("WELCOME10", 10, "percent", "10% off first booking"),
  coupon("MOVIE20", 20, "percent", "20% off ticket price"),
  coupon("FOOD15", 15, "percent", "15% off food order"),
  coupon("VIP25", 25, "percent", "25% VIP discount"),
  coupon("FLAT500", 500, "flat", "Flat PKR 500 off"),
  coupon("WEEKEND15", 15, "percent", "15% weekend discount"),
];

// ------- Runtime DBs -------
const usersDB = [];
const bookingsDB = [];
const activityLog = [];
const waitingList = [];

// ------- Session -------
const session = { user: null, loginTime: null, sessionBookings: 0 };

// ------- Seed Admin -------
usersDB.push(
  makeUser({
    name: "System Admin",
    username: "admin",
    password: "Admin@123",
    gender: "N/A",
    age: 30,
    contact: "0300-0000000",
    email: "admin@cinemamax.pk",
    cnic: "00000-0000000-0",
    secQuestion: "First school?",
    secAnswer: "cinemax",
    isVIP: true,
    role: "admin",
  }),
);

// ------- Seed Demo Customer -------
usersDB.push(
  makeUser({
    name: "Ali Hassan",
    username: "ali",
    password: "123456",
    gender: "Male",
    age: 25,
    contact: "0311-1234567",
    email: "ali@gmail.com",
    cnic: "42101-1234567-1",
    secQuestion: "Mother's name?",
    secAnswer: "sana",
    walletBalance: 15000,
    rewardPoints: 250,
  }),
);

// ================================================================
//  SECTION 5 - ACTIVITY LOGGER
// ================================================================
function logActivity(userId, action, detail = "") {
  const e = { userId, action, detail, timestamp: nowStr() };
  activityLog.push(e);
  const u = usersDB.find((x) => x.id === userId);
  if (u) u.activityLog.push(e);
}

// ================================================================
//  SECTION 6 - AUTH MODULE
// ================================================================
function signup() {
  box("CREATE NEW ACCOUNT");
  const name = ask("Full Name:");
  if (!name) {
    er("Name cannot be empty.");
    return;
  }

  const username = askLower("Username (min 3 chars):");
  if (username.length < 3) {
    er("Username must be at least 3 characters.");
    return;
  }
  if (usersDB.find((u) => u.username === username)) {
    er("Username already taken. Try another.");
    return;
  }

  const password = ask("Password (min 6 chars, 1 uppercase, 1 digit):");
  if (password.length < 6) {
    er("Password too short.");
    return;
  }
  if (!/[A-Z]/.test(password)) {
    er("Password needs at least 1 uppercase letter.");
    return;
  }
  if (!/[0-9]/.test(password)) {
    er("Password needs at least 1 digit.");
    return;
  }

  const gender = ask("Gender (Male/Female/Other):");
  const age = parseInt(ask("Age:"));
  if (isNaN(age) || age < 5 || age > 120) {
    er("Invalid age.");
    return;
  }

  const contact = ask("Contact Number:");
  if (!contact || contact.length < 7) {
    er("Invalid contact number.");
    return;
  }

  const email = ask("Email Address:");
  if (!email.includes("@")) {
    er("Invalid email.");
    return;
  }

  const cnic = ask("CNIC / ID Number:");
  const wallet = Math.max(
    0,
    parseFloat(ask("Initial Wallet Balance (PKR) - enter 0 if none:")) || 0,
  );
  const secQ = ask("Security Question (e.g. Mother's name?):");
  const secA = askLower("Security Answer:");
  if (!secQ || !secA) {
    er("Security Q&A cannot be empty.");
    return;
  }

  const newUser = makeUser({
    name,
    username,
    password,
    gender,
    age,
    contact,
    email,
    cnic,
    secQuestion: secQ,
    secAnswer: secA,
    walletBalance: wallet,
  });
  usersDB.push(newUser);
  logActivity(newUser.id, "SIGNUP", "New account created");
  ok(`Welcome to CineMax Galaxy, ${name}!`);
  inf(`Username: ${username} | Wallet: ${fmtPKR(wallet)}`);
  inf("You can now login with your credentials.");
}

function login() {
  box("MEMBER LOGIN");
  const username = askLower("Username:");
  const password = ask("Password:");

  const user = usersDB.find((u) => u.username === username);
  if (!user) {
    er("No account found with that username.");
    return false;
  }
  if (user.isBanned) {
    er("ACCOUNT BANNED. Contact support.");
    return false;
  }
  if (user.isLocked) {
    er("ACCOUNT LOCKED (too many failed attempts). Use Reset Password.");
    return false;
  }

  if (user.password !== password) {
    user.failedAttempts++;
    logActivity(user.id, "FAILED_LOGIN", `Attempt #${user.failedAttempts}`);
    if (user.failedAttempts >= 5) {
      user.isLocked = true;
      er(
        "Account LOCKED after 5 failed attempts. Reset your password to unlock.",
      );
    } else {
      er(
        `Wrong password. ${5 - user.failedAttempts} attempt(s) remaining before lock.`,
      );
    }
    return false;
  }

  user.failedAttempts = 0;
  user.loginHistory.push({ time: nowStr() });
  session.user = user;
  session.loginTime = nowStr();
  session.sessionBookings = 0;
  logActivity(user.id, "LOGIN", `Session started at ${nowStr()}`);

  ok(`Welcome back, ${user.name}!`);
  inf(
    `Role: ${user.role.toUpperCase()} | Wallet: ${fmtPKR(user.walletBalance)} | Points: ${user.rewardPoints}`,
  );
  if (user.isVIP) inf("⭐ VIP MEMBER - 5% discount on every booking!");
  return true;
}

function logout() {
  if (!session.user) return;
  logActivity(session.user.id, "LOGOUT", `Session ended at ${nowStr()}`);
  ok(`Goodbye, ${session.user.name}! See you at CineMax Galaxy. 🎬`);
  session.user = null;
  session.loginTime = null;
}

function resetPassword() {
  box("RESET PASSWORD");
  const username = askLower("Username:");
  const user = usersDB.find((u) => u.username === username);
  if (!user) {
    er("User not found.");
    return;
  }

  const secA = askLower(`Security Answer for: "${user.secQuestion}":`);
  if (secA !== user.secAnswer) {
    er("Wrong security answer.");
    return;
  }

  const newPass = ask("New Password (min 6 chars, 1 uppercase, 1 digit):");
  if (newPass.length < 6 || !/[A-Z]/.test(newPass) || !/[0-9]/.test(newPass)) {
    er("Password does not meet requirements.");
    return;
  }
  user.password = newPass;
  user.isLocked = false;
  user.failedAttempts = 0;
  logActivity(
    user.id,
    "PASSWORD_RESET",
    "Password reset via security question",
  );
  ok("Password reset! Account unlocked. You can now login.");
}

function editProfile() {
  const u = session.user;
  box("EDIT PROFILE");
  console.log("  [Leave blank to keep current value]");
  lbl("Current Name", u.name);
  lbl("Current Email", u.email);
  lbl("Current Contact", u.contact);

  const confPass = ask("Enter current password to authorise changes:");
  if (confPass !== u.password) {
    er("Wrong password. No changes made.");
    return;
  }

  const name = ask(`New Full Name [${u.name}]:`);
  const email = ask(`New Email [${u.email}]:`);
  const contact = ask(`New Contact [${u.contact}]:`);

  if (name) u.name = name;
  if (email && email.includes("@")) u.email = email;
  if (contact && contact.length >= 7) u.contact = contact;

  logActivity(u.id, "PROFILE_EDIT", "Profile updated");
  ok("Profile updated successfully!");
}

function deleteAccount() {
  const u = session.user;
  box("DELETE ACCOUNT");
  wrn("This is PERMANENT and cannot be undone.");
  const conf = ask("Type your password to confirm account deletion:");
  if (conf !== u.password) {
    er("Wrong password. Account NOT deleted.");
    return false;
  }
  usersDB.splice(
    usersDB.findIndex((x) => x.id === u.id),
    1,
  );
  session.user = null;
  ok("Account deleted. We are sorry to see you go.");
  return true;
}

// ================================================================
//  SECTION 7 - MOVIE MODULE
// ================================================================
function movieCard(m, idx) {
  const avail = availableCount(m);
  const status =
    avail === 0 ? "FULL" : avail <= 8 ? "ALMOST FULL" : "AVAILABLE";
  const n = idx !== null ? `  ${String(idx + 1).padStart(2)}. ` : "     ";
  console.log(`${n}${m.title} (${m.year})`);
  console.log(
    `       Genre: ${m.category.padEnd(12)} | ${m.language} | ${m.duration}`,
  );
  console.log(
    `       ⭐ ${m.rating} | Age: ${m.ageRestriction.padEnd(5)} | ${fmtPKR(m.ticketPrice)}/seat | Seats: ${avail}/${m.totalSeats} [${status}]`,
  );
  console.log(`       Timings: ${m.timings.join(" | ")}`);
  console.log(`       Tags: ${m.tags.join(", ")}`);
  console.log();
}

function displayAllMovies() {
  box("ALL MOVIES - CINEMAX GALAXY");
  cinema.movies.forEach((m, i) => movieCard(m, i));
  const ch = parseInt(
    ask(
      `Select a movie number (1-${cinema.movies.length}) for details, 0 to go back:`,
    ),
  );
  if (ch < 1 || ch > cinema.movies.length || isNaN(ch)) return;
  movieDetailsMenu(cinema.movies[ch - 1]);
}

function displayTrendingMovies() {
  box("TRENDING MOVIES 🔥");
  inf("Ranked by: bookings x 3 + rating x 5 + demand");
  console.log();
  const sorted = [...cinema.movies]
    .map((m) => ({
      ...m,
      score: m.totalBookings * 3 + m.rating * 5 + bookedCount(m),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  sorted.forEach((m, i) => movieCard(m, i));
  const ch = parseInt(ask(`Select number to view details, 0 to back:`));
  if (ch >= 1 && ch <= sorted.length) movieDetailsMenu(sorted[ch - 1]);
}

function searchMovies() {
  box("");
  const ch = ask(`Choice:
    1. Search by Name
    2. Search by Genre
    3. Minimum Rating
    4. Search by Language
    5. Sort: Highest Rating
    6. Sort: Lowest Price
    7. Sort: Most Booked
    0. Back
    `);
  let results = [];

  if (ch === "1") {
    const q = askLower("Movie name keyword:");
    results = cinema.movies.filter((m) => m.title.toLowerCase().includes(q));
  } else if (ch === "2") {
    const q = askLower(
      "Genre (Action/SciFi/Horror/Comedy/Thriller/Animation):",
    );
    results = cinema.movies.filter((m) => m.category.toLowerCase().includes(q));
  } else if (ch === "3") {
    const r = parseFloat(ask("Minimum rating (e.g. 7.5):"));
    results = cinema.movies.filter((m) => m.rating >= r);
  } else if (ch === "4") {
    const q = askLower("Language:");
    results = cinema.movies.filter((m) => m.language.toLowerCase().includes(q));
  } else if (ch === "5") {
    results = [...cinema.movies].sort((a, b) => b.rating - a.rating);
  } else if (ch === "6") {
    results = [...cinema.movies].sort((a, b) => a.ticketPrice - b.ticketPrice);
  } else if (ch === "7") {
    results = [...cinema.movies].sort(
      (a, b) => b.totalBookings - a.totalBookings,
    );
  } else return;

  if (results.length === 0) {
    er("No movies found matching your search.");
    return;
  }

  sub(`Found ${results.length} result(s)`);
  results.forEach((m, i) => movieCard(m, i));
  const sel = parseInt(ask(`Select movie number for details, 0 to back:`));
  if (sel >= 1 && sel <= results.length) movieDetailsMenu(results[sel - 1]);
}

function movieDetailsMenu(movie) {
  while (true) {
    box(`MOVIE DETAILS`);
    lbl("Title", movie.title);
    lbl("Year", movie.year);
    lbl("Genre", movie.category);
    lbl("Language", movie.language);
    lbl("Duration", movie.duration);
    lbl("IMDb Rating", `⭐ ${movie.rating}`);
    lbl("Age Rating", movie.ageRestriction);
    lbl("Ticket Price", fmtPKR(movie.ticketPrice));
    lbl("Timings", movie.timings.join(" | "));
    lbl("Seats Available", `${availableCount(movie)} / ${movie.totalSeats}`);
    lbl("Total Bookings", movie.totalBookings);
    if (movie.reviews.length > 0) {
      sub("Latest Reviews");
      movie.reviews
        .slice(-3)
        .forEach((r) => inf(`"${r.comment}" - ${r.username} (${r.rating}★)`));
    }
    const ch = ask(`Choice:
      1. Book This Movie
      2. Add to Favorites
      3. Leave a Review
      0. Back
      `);
    if (ch === "1") {
      bookMovie(movie);
      return;
    } else if (ch === "2") {
      addToFavorites(movie);
    } else if (ch === "3") {
      leaveReview(movie);
    } else if (ch === "0") return;
    else er("Invalid choice.");
  }
}

function addToFavorites(movie) {
  const u = session.user;
  if (u.favorites.find((f) => f.id === movie.id)) {
    inf(`"${movie.title}" is already in favorites.`);
    return;
  }
  u.favorites.push({ id: movie.id, title: movie.title, addedOn: dateStr() });
  logActivity(u.id, "FAVORITE", `Added "${movie.title}"`);
  ok(`"${movie.title}" added to your favorites!`);
}

function leaveReview(movie) {
  const u = session.user;
  const watched = u.bookingHistory.some(
    (b) => b.movieId === movie.id && b.status === "confirmed",
  );
  if (!watched) {
    er("You can only review movies you have booked.");
    return;
  }

  const rating = parseFloat(ask("Your Rating (1–10):"));
  if (isNaN(rating) || rating < 1 || rating > 10) {
    er("Rating must be 1–10.");
    return;
  }
  const comment = ask("Your Review Comment:");
  if (!comment) {
    er("Review cannot be empty.");
    return;
  }

  movie.reviews.push({
    username: u.username,
    rating,
    comment,
    date: dateStr(),
  });
  const avg = sumBy(movie.reviews, (r) => r.rating) / movie.reviews.length;
  movie.rating = parseFloat(avg.toFixed(1));
  logActivity(u.id, "REVIEW", `Reviewed "${movie.title}" - ${rating}★`);
  ok("Review submitted! Thank you.");
}

// ================================================================
//  SECTION 8 - SEAT SELECTION MODULE
// ================================================================
function selectSeats(movie, peopleCount) {
  const selected = [];

  while (selected.length < peopleCount) {
    displaySeatMap(movie.seatMap);
    const remaining = peopleCount - selected.length;
    inf(
      `Selected so far: ${selected.map((s) => s.label).join(", ") || "none"}`,
    );
    inf(`Still need to pick: ${remaining} seat(s)`);

    const input = ask(
      `Enter seat (e.g. A1, B3 - rows A-J, cols 1-6). Type CANCEL to abort:`,
    ).toUpperCase();
    if (input === "CANCEL" || input === "") {
      // Revert
      selected.forEach((s) => (s.status = "available"));
      return null;
    }

    const rowChar = input[0];
    const rowIdx = rowChar ? seatRowIndex(rowChar) : -1;
    const colIdx = seatColIndex(input);

    if (rowIdx < 0 || rowIdx > 9 || isNaN(colIdx) || colIdx < 0 || colIdx > 5) {
      er("Invalid seat. Use format A1 to J6.");
      continue;
    }
    const seat = movie.seatMap[rowIdx][colIdx];
    if (seat.status === "booked") {
      er(`Seat ${seat.label} is already BOOKED.`);
      continue;
    }
    if (seat.status === "selected") {
      er(`Seat ${seat.label} already selected.`);
      continue;
    }

    seat.status = "selected";
    selected.push(seat);
    ok(`Seat ${seat.label} selected! (${selected.length}/${peopleCount})`);
  }
  return selected;
}

// ================================================================
//  SECTION 9 - DYNAMIC PRICING ENGINE
// ================================================================
function calcDynamicPrice(movie, timing) {
  let price = movie.ticketPrice;
  const occupancy = bookedCount(movie) / movie.totalSeats;

  if (occupancy >= 0.8) {
    price *= 1.1;
    inf("⚡ Surge Pricing: +10% (high demand - 80%+ full)");
  }
  const match = timing.match(/(\d+):.*?(AM|PM)/i);
  if (match) {
    let hr = parseInt(match[1]);
    if (match[2].toUpperCase() === "PM" && hr !== 12) hr += 12;
    if (hr >= 18 && hr <= 22) {
      price *= 1.05;
      inf("🕐 Peak Hour: +5% (6PM–10PM evening show)");
    }
  }
  return Math.round(price);
}

// ================================================================
//  SECTION 10 - FOOD MODULE
// ================================================================
function orderFood() {
  const cart = [];

  while (true) {
    box("FOOD & BEVERAGES");
    const cats = [...new Set(foodDB.map((f) => f.category))];
    cats.forEach((cat) => {
      console.log(`\n  ------- ${cat} -------`);
      foodDB
        .filter((f) => f.category === cat)
        .forEach((f, i) => {
          console.log(
            `     [F${foodDB.indexOf(f) + 1}] ${f.name.padEnd(22)} ${fmtPKR(f.price)}`,
          );
        });
    });

    sub("COMBO DEALS ★");
    dealsDB.forEach((d, i) => {
      console.log(`  [D${i + 1}] ${d.name.padEnd(22)} ${fmtPKR(d.price)}`);
      console.log(`       Includes: ${d.items.join(", ")}`);
    });

    if (cart.length > 0) {
      sub("YOUR CART");
      cart.forEach((i) =>
        console.log(
          `  • ${i.name.padEnd(24)} x${i.qty}  ${fmtPKR(i.price * i.qty)}`,
        ),
      );
      lbl("  SUBTOTAL", fmtPKR(sumBy(cart, (i) => i.price * i.qty)));
    }

    console.log("\n  Commands:");
    console.log("  • Type item number e.g. F3 to add food");
    console.log("  • Type D1-D9 for combo deals");
    console.log("  • Type REMOVE then number to remove item");
    console.log("  • Type DONE to finish food order");

    const input = ask("Command (Check Console):").toUpperCase();
    if (input === "DONE" || input === "") break;

    if (input.startsWith("REMOVE")) {
      const num = parseInt(input.replace("REMOVE", "").trim()) - 1;
      if (num >= 0 && num < cart.length) {
        ok(`Removed: ${cart[num].name}`);
        cart.splice(num, 1);
      } else er("Invalid cart item number.");
      continue;
    }

    if (/^D\d+$/.test(input)) {
      const idx = parseInt(input.slice(1)) - 1;
      if (idx >= 0 && idx < dealsDB.length) {
        const d = dealsDB[idx];
        cart.push({ name: d.name, price: d.price, qty: 1, isDeal: true });
        ok(`Deal added: ${d.name} - ${fmtPKR(d.price)}`);
      } else er("Invalid deal number.");
      continue;
    }

    if (/^F\d+$/.test(input)) {
      const idx = parseInt(input.slice(1)) - 1;
      if (idx >= 0 && idx < foodDB.length) {
        const f = foodDB[idx];
        const qty = parseInt(ask(`Quantity for ${f.name}:`));
        if (isNaN(qty) || qty < 1) {
          er("Invalid quantity.");
          continue;
        }
        const ex = cart.find((c) => c.name === f.name);
        if (ex) ex.qty += qty;
        else cart.push({ name: f.name, price: f.price, qty });
        ok(`Added: ${f.name} x${qty} - ${fmtPKR(f.price * qty)}`);
      } else er("Invalid food item number.");
      continue;
    }
  }
  return cart;
}

// ================================================================
//  SECTION 11 - COUPON ENGINE
// ================================================================
function applyCoupon(subtotal) {
  const code = ask(
    "Enter coupon code (or press Enter/Cancel to skip):",
  ).toUpperCase();
  if (!code) return { discount: 0, couponCode: null };

  const coupon = couponsDB.find((c) => c.code === code);
  if (!coupon) {
    er("Invalid coupon code.");
    return { discount: 0, couponCode: null };
  }
  if (coupon.used.includes(session.user.id)) {
    er("You have already used this coupon.");
    return { discount: 0, couponCode: null };
  }

  const amount =
    coupon.type === "percent"
      ? Math.round((subtotal * coupon.discount) / 100)
      : coupon.discount;
  ok(`Coupon "${code}" applied! You save ${fmtPKR(amount)}`);
  inf(coupon.desc);
  return { discount: amount, couponCode: code };
}

// ================================================================
//  SECTION 12 - PAYMENT MODULE
// ================================================================
function processPayment(grandTotal) {
  box("PAYMENT");
  lbl("Amount Due", fmtPKR(grandTotal));

  const method = ask(`Select payment method:
    1. Cash
    2. Credit / Debit Card
    3. CineMax Wallet
    0. Cancel
    `);
  const u = session.user;

  if (method === "0") return null;

  if (method === "1") {
    const cash = parseFloat(
      ask(`Cash tendered (minimum ${fmtPKR(grandTotal)}):`),
    );
    if (isNaN(cash) || cash < grandTotal) {
      er(`Insufficient cash. Needed: ${fmtPKR(grandTotal)}`);
      return null;
    }
    ok(`Cash received! Change: ${fmtPKR(cash - grandTotal)}`);
    logActivity(u.id, "PAYMENT_CASH", fmtPKR(grandTotal));
    return "Cash";
  } else if (method === "2") {
    sub("CARD VERIFICATION");
    const card = ask("Card Number (16 digits, no spaces):").replace(/\s/g, "");
    if (!/^\d{16}$/.test(card)) {
      er("Invalid card number. Must be 16 digits.");
      return null;
    }
    const cvv = ask("CVV (3 digits):");
    if (!/^\d{3}$/.test(cvv)) {
      er("Invalid CVV.");
      return null;
    }
    const exp = ask("Expiry Date (MM/YY):");
    if (!/^\d{2}\/\d{2}$/.test(exp)) {
      er("Invalid expiry format. Use MM/YY");
      return null;
    }
    const [mm, yy] = exp.split("/").map(Number);
    const now = new Date();
    const nowYY = now.getFullYear() % 100,
      nowMM = now.getMonth() + 1;
    if (yy < nowYY || (yy === nowYY && mm < nowMM)) {
      er("Card has expired.");
      return null;
    }
    ok(`Card ending ${card.slice(-4)} verified!`);
    ok(`Card payment of ${fmtPKR(grandTotal)} processed successfully.`);
    logActivity(u.id, "PAYMENT_CARD", fmtPKR(grandTotal));
    return "Card";
  } else if (method === "3") {
    if (u.walletBalance < grandTotal) {
      er(`Insufficient wallet balance.`);
      lbl("Your Balance", fmtPKR(u.walletBalance));
      lbl("Amount Needed", fmtPKR(grandTotal));
      inf("Top up your wallet via the Wallet menu.");
      return null;
    }
    u.walletBalance -= grandTotal;
    ok(
      `Wallet payment successful! Remaining balance: ${fmtPKR(u.walletBalance)}`,
    );
    logActivity(u.id, "PAYMENT_WALLET", fmtPKR(grandTotal));
    return "Wallet";
  } else {
    er("Invalid payment method.");
    return null;
  }
}

// ================================================================
//  SECTION 13 - BILLING / RECEIPT GENERATOR
// ================================================================
function generateBill(b) {
  console.log("\n" + SEP);
  console.log("        ★  CINEMAX GALAXY - OFFICIAL BOOKING RECEIPT  ★");
  console.log(SEP);
  lbl("Booking ID", b.id);
  lbl("Date & Time", b.date);
  lbl("Customer", b.customerName);
  lbl("Username", "@" + b.username);
  console.log(DIV);
  lbl("Movie", b.movieTitle);
  lbl("Timing", b.timing);
  lbl("Seats", b.seats.join(", "));
  lbl("No. of Seats", b.seats.length);
  lbl("Price / Seat", fmtPKR(b.pricePerSeat));
  lbl("Tickets Total", fmtPKR(b.ticketsTotal));
  if (b.foodItems.length > 0) {
    console.log(DIV);
    console.log("  FOOD ITEMS:");
    b.foodItems.forEach((f) =>
      lbl(`  ${f.name} x${f.qty}`, fmtPKR(f.price * f.qty)),
    );
    lbl("Food Subtotal", fmtPKR(b.foodTotal));
  }
  console.log(DIV);
  lbl("Subtotal", fmtPKR(b.subtotal));
  if (b.couponDiscount > 0)
    lbl("Coupon Discount", `-${fmtPKR(b.couponDiscount)}`);
  if (b.vipDiscount > 0) lbl("VIP Discount (5%)", `-${fmtPKR(b.vipDiscount)}`);
  lbl("Service Charge (3%)", fmtPKR(b.serviceCharge));
  lbl("Tax GST (13%)", fmtPKR(b.tax));
  console.log(SEP);
  lbl("★ GRAND TOTAL", fmtPKR(b.grandTotal));
  lbl("Payment Method", b.paymentMethod);
  lbl(
    "Reward Points Earned",
    `+${b.rewardEarned} pts  (Total: ${session.user?.rewardPoints ?? 0} pts)`,
  );
  console.log(SEP);
  console.log("      Thank you for choosing CineMax Galaxy! 🎬");
  console.log("      Enjoy your movie. Please arrive 15 mins early.");
  console.log(SEP);
}

// ================================================================
//  SECTION 14 - BOOKING MODULE
// ================================================================
function bookMovie(movie) {
  const u = session.user;
  if (u.isBanned) {
    er("Your account is banned.");
    return;
  }

  // Fraud guard
  if (session.sessionBookings >= 5) {
    er("FRAUD ALERT: Booking limit reached for this session. Contact support.");
    logActivity(u.id, "FRAUD_ALERT", "Session booking limit exceeded");
    return;
  }

  // Age check
  const minAge = parseAge(movie.ageRestriction);
  if (minAge > 0 && u.age < minAge) {
    er(`AGE RESTRICTED: "${movie.title}" requires ${movie.ageRestriction}.`);
    er(`Your registered age is ${u.age}. Booking denied.`);
    return;
  }

  // Seat availability
  const available = availableCount(movie);
  if (available === 0) {
    er(`"${movie.title}" is FULL.`);
    const w = ask("Add yourself to the waiting list? (yes/no):");
    if (w === "yes") {
      waitingList.push({
        userId: u.id,
        movieId: movie.id,
        movieTitle: movie.title,
        addedOn: nowStr(),
      });
      ok("Added to waiting list!");
    }
    return;
  }

  // People count
  const people = parseInt(
    ask(`How many people? (1–${Math.min(available, 6)}):`),
  );
  if (isNaN(people) || people < 1 || people > Math.min(available, 6)) {
    er("Invalid number. Must be between 1 and 6.");
    return;
  }

  // Seat selection
  const selectedSeats = selectSeats(movie, people);
  if (!selectedSeats) {
    movie.seatMap
      .flat()
      .filter((s) => s.status === "selected")
      .forEach((s) => (s.status = "available"));
    er("Booking cancelled during seat selection.");
    return;
  }

  // Timing selection
  sub("SELECT SHOW TIMING");
  movie.timings.forEach((t, i) => {
    const dp = calcDynamicPrice(movie, t);
    console.log(`  ${i + 1}. ${t.padEnd(14)} → ${fmtPKR(dp)}/seat`);
  });
  const timingIdx = parseInt(ask("Select timing number:")) - 1;
  if (isNaN(timingIdx) || timingIdx < 0 || timingIdx >= movie.timings.length) {
    er("Invalid timing.");
    selectedSeats.forEach((s) => (s.status = "available"));
    return;
  }
  const timing = movie.timings[timingIdx];
  const pricePerSeat = calcDynamicPrice(movie, timing);
  const ticketsTotal = pricePerSeat * people;

  // Food
  let foodItems = [],
    foodTotal = 0;
  const wantFood = ask("Do you want to order food? (yes/no):");
  if (isYes(wantFood)) {
    foodItems = orderFood();
    foodTotal = sumBy(foodItems, (f) => f.price * f.qty);
  }

  // Coupon
  const subtotal = ticketsTotal + foodTotal;
  const { discount: couponDiscount, couponCode } = applyCoupon(subtotal);

  // VIP discount
  const vipDiscount = u.isVIP ? Math.round(subtotal * 0.05) : 0;
  if (vipDiscount > 0) inf(`VIP Discount applied: -${fmtPKR(vipDiscount)}`);

  const afterDisc = subtotal - couponDiscount - vipDiscount;
  const serviceCharge = Math.round(afterDisc * 0.03);
  const tax = Math.round(afterDisc * 0.13);
  const grandTotal = afterDisc + serviceCharge + tax;

  // Summary before payment
  sub("BOOKING SUMMARY - PLEASE REVIEW");
  lbl("Movie", movie.title);
  lbl("Timing", timing);
  lbl("Seats", selectedSeats.map((s) => s.label).join(", "));
  lbl("Price/Seat", fmtPKR(pricePerSeat));
  lbl("Tickets Total", fmtPKR(ticketsTotal));
  if (foodTotal > 0) lbl("Food Total", fmtPKR(foodTotal));
  lbl("Subtotal", fmtPKR(subtotal));
  if (couponDiscount > 0) lbl("Coupon Discount", `-${fmtPKR(couponDiscount)}`);
  if (vipDiscount > 0) lbl("VIP Discount", `-${fmtPKR(vipDiscount)}`);
  lbl("Service Charge (3%)", fmtPKR(serviceCharge));
  lbl("Tax GST (13%)", fmtPKR(tax));
  console.log("  " + DIV);
  lbl("★ GRAND TOTAL", fmtPKR(grandTotal));

  const confirm = ask("Confirm booking? (yes/no):");
  if (!isYes(confirm)) {
    selectedSeats.forEach((s) => (s.status = "available"));
    er("Booking cancelled by user.");
    return;
  }

  // Payment
  const payMethod = processPayment(grandTotal);
  if (!payMethod) {
    selectedSeats.forEach((s) => (s.status = "available"));
    return;
  }

  // Finalise seats
  selectedSeats.forEach((s) => (s.status = "booked"));

  // Mark coupon used
  if (couponCode) couponsDB.find((c) => c.code === couponCode)?.used.push(u.id);

  // Reward points
  const rewardEarned = Math.floor(grandTotal / 100);
  u.rewardPoints += rewardEarned;
  if (u.rewardPoints >= 1000 && !u.isVIP) {
    u.isVIP = true;
    ok("🎉 Congratulations! You are now a VIP MEMBER! (1000+ reward points)");
  }

  // Build & store booking
  const booking = {
    id: generateBookingID(),
    userId: u.id,
    customerName: u.name,
    username: u.username,
    movieId: movie.id,
    movieTitle: movie.title,
    timing,
    seats: selectedSeats.map((s) => s.label),
    pricePerSeat,
    ticketsTotal,
    foodItems,
    foodTotal,
    subtotal,
    couponDiscount,
    vipDiscount,
    serviceCharge,
    tax,
    grandTotal,
    paymentMethod: payMethod,
    rewardEarned,
    date: nowStr(),
    status: "confirmed",
    refundAmount: 0,
    couponCode,
  };
  bookingsDB.push(booking);
  u.bookingHistory.push(booking);
  session.sessionBookings++;

  // Update movie stats
  movie.totalBookings += people;
  movie.revenue += grandTotal;

  logActivity(
    u.id,
    "BOOKING",
    `"${movie.title}" x${people} seats - ${fmtPKR(grandTotal)}`,
  );
  generateBill(booking);
}

function cancelBooking() {
  const u = session.user;
  box("CANCEL A BOOKING");

  const active = u.bookingHistory.filter((b) => b.status === "confirmed");
  if (active.length === 0) {
    inf("No active bookings to cancel.");
    return;
  }

  active.forEach((b, i) => {
    console.log(`\n  ${i + 1}. [${b.id}]`);
    lbl("     Movie", b.movieTitle);
    lbl("     Timing", b.timing);
    lbl("     Seats", b.seats.join(", "));
    lbl("     Paid", fmtPKR(b.grandTotal));
  });

  const ch = parseInt(
    ask(`Select booking to cancel (1–${active.length}), 0 to back:`),
  );
  if (isNaN(ch) || ch === 0 || ch < 1 || ch > active.length) return;
  const booking = active[ch - 1];

  sub("REFUND POLICY");
  inf("1. Full Refund   - cancel > 24 hrs before show (100%)");
  inf("2. Half Refund   - cancel < 24 hrs before show (50%)");
  inf("3. No Refund     - same-day cancellation (0%)");

  const pol = ask("Select refund option (1/2/3), 0 to abort:");
  if (pol === "0") return;
  const pct = pol === "1" ? 100 : pol === "2" ? 50 : pol === "3" ? 0 : -1;
  if (pct === -1) {
    er("Invalid refund option.");
    return;
  }

  const refund = Math.round((booking.grandTotal * pct) / 100);
  booking.status = "cancelled";
  booking.refundAmount = refund;
  u.walletBalance += refund;

  // Free up seats
  const mv = cinema.movies.find((m) => m.id === booking.movieId);
  if (mv) {
    booking.seats.forEach((label) => {
      const ri = seatRowIndex(label);
      const ci = seatColIndex(label);
      if (mv.seatMap[ri]?.[ci]) mv.seatMap[ri][ci].status = "available";
    });
    mv.totalBookings = Math.max(0, mv.totalBookings - booking.seats.length);
  }

  logActivity(
    u.id,
    "CANCELLATION",
    `Cancelled ${booking.id}, refund ${fmtPKR(refund)}`,
  );
  ok(`Booking cancelled. Refund: ${fmtPKR(refund)} added to your wallet.`);
  lbl("New Wallet Balance", fmtPKR(u.walletBalance));
}

function viewBookingHistory() {
  const u = session.user;
  box("MY BOOKING HISTORY");
  if (u.bookingHistory.length === 0) {
    inf("No bookings yet.");
    return;
  }

  u.bookingHistory.forEach((b, i) => {
    const status = b.status === "confirmed" ? "✔ CONFIRMED" : "✘ CANCELLED";
    console.log(`\n  ${i + 1}. [${status}]`);
    lbl("   Booking ID", b.id);
    lbl("   Movie", b.movieTitle);
    lbl("   Timing", b.timing);
    lbl("   Seats", b.seats.join(", "));
    lbl("   Total Paid", fmtPKR(b.grandTotal));
    lbl("   Payment", b.paymentMethod);
    lbl("   Date", b.date);
    if (b.status === "cancelled") lbl("   Refund", fmtPKR(b.refundAmount));
  });
}

// ================================================================
//  SECTION 15 - WALLET MODULE
// ================================================================
function walletMenu() {
  while (true) {
    const u = session.user;
    box("MY WALLET");
    lbl("Balance", fmtPKR(u.walletBalance));
    lbl("Reward Points", `${u.rewardPoints} pts`);
    lbl("VIP Status", u.isVIP ? "⭐ VIP MEMBER" : "Standard");
    console.log("\n  1. Top Up Wallet");
    console.log("  2. Redeem Reward Points (100 pts = PKR 100)");
    console.log("  3. Transaction History");
    console.log("  0. Back");

    const ch = ask("Choice:");
    if (ch === "0") return;

    if (ch === "1") {
      const amt = parseFloat(ask("Top-up amount (min PKR 100):"));
      if (isNaN(amt) || amt < 100) {
        er("Minimum top-up is PKR 100.");
        continue;
      }
      u.walletBalance += amt;
      logActivity(u.id, "WALLET_TOPUP", fmtPKR(amt));
      ok(`Wallet topped up! New balance: ${fmtPKR(u.walletBalance)}`);
    } else if (ch === "2") {
      if (u.rewardPoints < 100) {
        er("Need at least 100 points to redeem.");
        continue;
      }
      const pts = parseInt(
        ask(`Points to redeem (available: ${u.rewardPoints}, min 100):`),
      );
      if (isNaN(pts) || pts < 100 || pts > u.rewardPoints) {
        er("Invalid amount.");
        continue;
      }
      const cashVal = Math.floor(pts / 100) * 100;
      u.rewardPoints -= pts;
      u.walletBalance += cashVal;
      logActivity(u.id, "POINTS_REDEEM", `${pts} pts → ${fmtPKR(cashVal)}`);
      ok(
        `Redeemed ${pts} pts for ${fmtPKR(cashVal)}. Wallet: ${fmtPKR(u.walletBalance)}`,
      );
    } else if (ch === "3") {
      sub("Transaction History (last 10)");
      const txns = u.activityLog.filter((l) =>
        [
          "PAYMENT_CASH",
          "PAYMENT_CARD",
          "PAYMENT_WALLET",
          "WALLET_TOPUP",
          "POINTS_REDEEM",
          "CANCELLATION",
        ].includes(l.action),
      );
      if (txns.length === 0) {
        inf("No transactions yet.");
      } else
        txns
          .slice(-10)
          .reverse()
          .forEach((t) => inf(`[${t.timestamp}] ${t.action} - ${t.detail}`));
    } else er("Invalid choice.");
  }
}

// ================================================================
//  SECTION 16 - AI RECOMMENDATION ENGINE
// ================================================================
function getRecommendations(user) {
  if (user.bookingHistory.length === 0) {
    return [...cinema.movies].sort((a, b) => b.rating - a.rating).slice(0, 5);
  }
  const genreFreq = {};
  user.bookingHistory.forEach((b) => {
    const mv = cinema.movies.find((m) => m.id === b.movieId);
    if (mv) genreFreq[mv.category] = (genreFreq[mv.category] || 0) + 1;
  });
  const topGenre = Object.entries(genreFreq).sort(
    (a, b) => b[1] - a[1],
  )[0]?.[0];
  const bookedIds = new Set(user.bookingHistory.map((b) => b.movieId));

  let recs = cinema.movies
    .filter((m) => m.category === topGenre && !bookedIds.has(m.id))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  const extra = cinema.movies
    .filter((m) => !bookedIds.has(m.id) && !recs.find((r) => r.id === m.id))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5 - recs.length);
  return [...recs, ...extra];
}

function showRecommendations() {
  box("AI MOVIE RECOMMENDATIONS ✨");
  inf("Personalised based on your watch history & preferences:\n");
  const recs = getRecommendations(session.user);
  recs.forEach((m, i) => movieCard(m, i));
  const ch = parseInt(ask("Select number to view details, 0 to back:"));
  if (ch >= 1 && ch <= recs.length) movieDetailsMenu(recs[ch - 1]);
}

// ================================================================
//  SECTION 17 - PROFILE MODULE
// ================================================================
function viewProfile() {
  const u = session.user;
  box("MY PROFILE");
  lbl("Full Name", u.name);
  lbl("Username", "@" + u.username);
  lbl("Gender", u.gender);
  lbl("Age", u.age);
  lbl("Email", u.email);
  lbl("Contact", u.contact);
  lbl("CNIC", u.cnic);
  lbl("Member Since", u.memberSince);
  lbl("Role", u.role.toUpperCase());
  lbl(
    "VIP Status",
    u.isVIP
      ? "⭐ YES - 5% discount every booking"
      : "Standard (1000 pts for VIP)",
  );
  lbl("Wallet Balance", fmtPKR(u.walletBalance));
  lbl("Reward Points", u.rewardPoints + " pts");
  lbl(
    "Confirmed Bookings",
    u.bookingHistory.filter((b) => b.status === "confirmed").length,
  );
  lbl(
    "Cancelled Bookings",
    u.bookingHistory.filter((b) => b.status === "cancelled").length,
  );
  lbl("Favorite Movies", u.favorites.length);
  lbl("Login Count", u.loginHistory.length);
}

function viewFavorites() {
  const u = session.user;
  box("MY FAVORITES");
  if (u.favorites.length === 0) {
    inf("No favorites yet. Browse movies and add some!");
    return;
  }
  u.favorites.forEach((f, i) =>
    console.log(`  ${i + 1}. ${f.title} (added ${f.addedOn})`),
  );
  const ch = parseInt(ask("Enter number to view movie, 0 to back:"));
  if (ch >= 1 && ch <= u.favorites.length) {
    const mv = cinema.movies.find((m) => m.id === u.favorites[ch - 1].id);
    if (mv) movieDetailsMenu(mv);
  }
}

// ================================================================
//  SECTION 18 - CUSTOMER DASHBOARD
// ================================================================
function customerDashboard() {
  while (true) {
    const u = session.user;
    box(`CUSTOMER DASHBOARD - ${u.name.toUpperCase()}`);
    lbl("Wallet Balance", fmtPKR(u.walletBalance));
    lbl("Reward Points", `${u.rewardPoints} pts${u.isVIP ? " | ⭐ VIP" : ""}`);
    lbl(
      "Active Bookings",
      u.bookingHistory.filter((b) => b.status === "confirmed").length,
    );

    const ch = ask(`Choice:
      ------- Movies -------
      1. Browse All Movies
      2. Trending Movies 🔥
      3. Search & Filter Movies
      4. AI Recommendations ✨
      ------- Bookings -------
      5. My Booking History
      6. Cancel a Booking
      ------- Account -------
      7. My Wallet
      8. My Favorites
      9. My Profile
      10. Edit Profile
      11. Delete My Account
      0.  Logout 
      `);
    switch (ch) {
      case "1":
        displayAllMovies();
        break;
      case "2":
        displayTrendingMovies();
        break;
      case "3":
        searchMovies();
        break;
      case "4":
        showRecommendations();
        break;
      case "5":
        viewBookingHistory();
        break;
      case "6":
        cancelBooking();
        break;
      case "7":
        walletMenu();
        break;
      case "8":
        viewFavorites();
        break;
      case "9":
        viewProfile();
        break;
      case "10":
        editProfile();
        break;
      case "11":
        if (deleteAccount()) return;
        break;
      case "0":
        logout();
        return;
      default:
        er("Invalid option. Please choose from the menu.");
    }
  }
}

// ================================================================
//  SECTION 19 - ADMIN MODULE
// ================================================================
function adminAddMovie() {
  box("ADD NEW MOVIE");
  const title = ask("Title:");
  if (!title) {
    er("Title required.");
    return;
  }
  const year = parseInt(ask("Release Year:"));
  const category = ask(
    "Genre (Action/SciFi/Horror/Comedy/Thriller/Animation):",
  );
  const language = ask("Language:");
  const duration = ask("Duration (e.g. 2h 10m):");
  const rating = parseFloat(ask("IMDb Rating (1-10):"));
  const ageR = ask("Age Restriction (PG / PG-13 / 13+ / 16+ / 18+):");
  const timRaw = ask("Timings (comma-separated e.g. 10:00 AM,3:00 PM):");
  const timings = timRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const price = parseFloat(ask("Ticket Price (PKR):"));
  const tagsRaw = ask("Tags (comma-separated):");
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (!category || !language || isNaN(price)) {
    er("Missing required fields.");
    return;
  }

  const mv = {
    id: generateMovieID(),
    title,
    year,
    category,
    language,
    duration,
    rating: isNaN(rating) ? 7.0 : rating,
    ageRestriction: ageR || "13+",
    timings: timings.length ? timings : ["3:00 PM", "7:00 PM"],
    ticketPrice: price,
    totalSeats: 60,
    bookedSeats: 0,
    tags: tags.length ? tags : ["New"],
    revenue: 0,
    reviews: [],
    totalBookings: 0,
  };
  mv.seatMap = generateSeatMap(0);
  cinema.movies.push(mv);
  logActivity(session.user.id, "ADMIN_ADD_MOVIE", `Added "${title}"`);
  ok(`Movie "${title}" added to the system!`);
}

function adminDeleteMovie() {
  box("DELETE MOVIE");
  cinema.movies.forEach((m, i) =>
    console.log(`  ${i + 1}. ${m.title.padEnd(38)} ${m.category}`),
  );
  const ch = parseInt(ask("Movie number to delete, 0 to cancel:"));
  if (!ch || ch < 1 || ch > cinema.movies.length) return;
  const mv = cinema.movies[ch - 1];
  const conf = ask(`Type YES to confirm permanent deletion of "${mv.title}":`);
  if (conf !== "YES") {
    inf("Deletion cancelled.");
    return;
  }
  cinema.movies.splice(ch - 1, 1);
  logActivity(session.user.id, "ADMIN_DELETE_MOVIE", `Deleted "${mv.title}"`);
  ok(`"${mv.title}" removed from system.`);
}

function adminUpdateMovie() {
  box("UPDATE MOVIE PRICE");
  cinema.movies.forEach((m, i) =>
    console.log(`  ${i + 1}. ${m.title.padEnd(38)} ${fmtPKR(m.ticketPrice)}`),
  );
  const ch = parseInt(ask("Movie number to update, 0 to cancel:"));
  if (!ch || ch < 1 || ch > cinema.movies.length) return;
  const mv = cinema.movies[ch - 1];
  const newPrice = parseFloat(
    ask(`New price for "${mv.title}" (current: ${fmtPKR(mv.ticketPrice)}):`),
  );
  if (isNaN(newPrice) || newPrice < 0) {
    er("Invalid price.");
    return;
  }
  mv.ticketPrice = newPrice;
  logActivity(
    session.user.id,
    "ADMIN_UPDATE_PRICE",
    `"${mv.title}" → ${fmtPKR(newPrice)}`,
  );
  ok(`Price updated to ${fmtPKR(newPrice)}.`);
}

function adminViewAllMovies() {
  box("ALL MOVIES IN SYSTEM");
  cinema.movies.forEach((m, i) => {
    console.log(
      `\n  ${String(i + 1).padStart(2, "0")}. ${m.title} (${m.year})`,
    );
    lbl("     Genre", m.category);
    lbl("     Price", fmtPKR(m.ticketPrice));
    lbl("     Rating", `⭐ ${m.rating}`);
    lbl("     Seats", `${bookedCount(m)}/${m.totalSeats} booked`);
    lbl("     Revenue", fmtPKR(m.revenue));
    lbl("     Bookings", m.totalBookings);
  });
}

function adminViewAllUsers() {
  box("ALL REGISTERED USERS");
  const customers = usersDB.filter((u) => u.role === "customer");
  if (customers.length === 0) {
    inf("No customers registered yet.");
    return;
  }
  customers.forEach((u, i) => {
    const flags = [
      u.isBanned ? "⛔BANNED" : null,
      u.isLocked ? "🔒LOCKED" : null,
      u.isVIP ? "⭐VIP" : null,
    ]
      .filter(Boolean)
      .join(" ");
    console.log(`\n  ${i + 1}. ${u.name.padEnd(22)} @${u.username}`);
    lbl("     Age", u.age);
    lbl("     Email", u.email);
    lbl("     Wallet", fmtPKR(u.walletBalance));
    lbl("     Points", u.rewardPoints);
    lbl("     Bookings", u.bookingHistory.length);
    lbl("     Status", flags || "✔ Active");
  });
}

function adminBanUser() {
  box("BAN / UNBAN USER");
  const customers = usersDB.filter((u) => u.role === "customer");
  customers.forEach((u, i) =>
    console.log(
      `  ${i + 1}. ${u.name.padEnd(22)} @${u.username} [${u.isBanned ? "⛔ BANNED" : "✔ Active"}]`,
    ),
  );
  const ch = parseInt(ask("User number, 0 to back:"));
  if (!ch || ch < 1 || ch > customers.length) return;
  const u = customers[ch - 1];
  u.isBanned = !u.isBanned;
  const action = u.isBanned ? "BANNED" : "UNBANNED";
  logActivity(session.user.id, "ADMIN_BAN", `${action} @${u.username}`);
  ok(`@${u.username} has been ${action}.`);
}

function adminUserDetails() {
  box("USER DETAILS");
  const uname = askLower("Enter username:");
  const u = usersDB.find((x) => x.username === uname);
  if (!u) {
    er("User not found.");
    return;
  }
  lbl("Name", u.name);
  lbl("Username", "@" + u.username);
  lbl("Email", u.email);
  lbl("Age", u.age);
  lbl("Contact", u.contact);
  lbl("CNIC", u.cnic);
  lbl("Member Since", u.memberSince);
  lbl("Role", u.role);
  lbl("VIP", u.isVIP ? "Yes" : "No");
  lbl("Banned", u.isBanned ? "YES ⛔" : "No");
  lbl("Locked", u.isLocked ? "YES 🔒" : "No");
  lbl("Failed Logins", u.failedAttempts);
  lbl("Wallet", fmtPKR(u.walletBalance));
  lbl("Reward Points", u.rewardPoints);
  lbl("Total Bookings", u.bookingHistory.length);
  lbl(
    "Active Bookings",
    u.bookingHistory.filter((b) => b.status === "confirmed").length,
  );
  lbl("Favorites", u.favorites.length);
  lbl("Login Sessions", u.loginHistory.length);
}

function adminUnlockUser() {
  box("UNLOCK USER");
  const uname = askLower("Username to unlock:");
  const u = usersDB.find((x) => x.username === uname);
  if (!u) {
    er("User not found.");
    return;
  }
  u.isLocked = false;
  u.failedAttempts = 0;
  logActivity(session.user.id, "ADMIN_UNLOCK", `Unlocked @${u.username}`);
  ok(`Account @${u.username} unlocked.`);
}

function adminRevenueDashboard() {
  box("REVENUE & ANALYTICS DASHBOARD");
  const confirmed = bookingsDB.filter((b) => b.status === "confirmed");
  const cancelled = bookingsDB.filter((b) => b.status === "cancelled");

  const totalRev = sumBy(confirmed, (b) => b.grandTotal);
  const ticketRev = sumBy(confirmed, (b) => b.ticketsTotal);
  const foodRev = sumBy(confirmed, (b) => b.foodTotal);
  const refunds = sumBy(cancelled, (b) => b.refundAmount);
  const taxRev = sumBy(confirmed, (b) => b.tax);
  const svcRev = sumBy(confirmed, (b) => b.serviceCharge);
  const customers = usersDB.filter((u) => u.role === "customer");
  const vips = customers.filter((u) => u.isVIP);
  const banned = customers.filter((u) => u.isBanned);

  sub("REVENUE BREAKDOWN");
  lbl("Total Revenue", fmtPKR(totalRev));
  lbl("Ticket Revenue", fmtPKR(ticketRev));
  lbl("Food Revenue", fmtPKR(foodRev));
  lbl("Tax Collected", fmtPKR(taxRev));
  lbl("Service Charges", fmtPKR(svcRev));
  lbl("Total Refunds Paid", fmtPKR(refunds));
  lbl("Net Revenue", fmtPKR(totalRev - refunds));

  sub("BOOKING STATS");
  lbl("Confirmed Bookings", confirmed.length);
  lbl("Cancelled Bookings", cancelled.length);

  sub("USER STATS");
  lbl("Total Customers", customers.length);
  lbl("VIP Members", vips.length);
  lbl("Banned Users", banned.length);
  lbl("Waiting List", waitingList.length);

  sub("TOP MOVIES");
  const sortedMov = [...cinema.movies].sort((a, b) => b.revenue - a.revenue);
  sortedMov.slice(0, 5).forEach((m, i) => {
    console.log(
      `  ${i + 1}. ${m.title.padEnd(36)} ${fmtPKR(m.revenue).padStart(12)} | ${m.totalBookings} bookings`,
    );
  });
}

function adminBookingReport() {
  box("ALL BOOKINGS REPORT");
  if (bookingsDB.length === 0) {
    inf("No bookings in the system yet.");
    return;
  }
  bookingsDB.forEach((b, i) => {
    const s = b.status === "confirmed" ? "✔" : "✘";
    console.log(
      `  ${s} [${b.id}]  ${b.movieTitle.padEnd(30)} @${b.username.padEnd(15)} ${fmtPKR(b.grandTotal).padStart(12)}`,
    );
    console.log(
      `       Date: ${b.date} | Timing: ${b.timing} | Seats: ${b.seats.join(",")}`,
    );
  });
}

function adminSeatOccupancy() {
  box("SEAT OCCUPANCY REPORT");
  cinema.movies.forEach((m) => {
    const booked = bookedCount(m);
    const pct = Math.round((booked / m.totalSeats) * 100);
    const bar =
      "▰".repeat(Math.round(pct / 5)) + "▱".repeat(20 - Math.round(pct / 5));
    console.log(
      `  ${m.title.padEnd(35)} [${bar}] ${String(pct).padStart(3)}%  (${booked}/${m.totalSeats})`,
    );
  });
}

function adminFoodReport() {
  box("FOOD SALES REPORT");
  const sales = {};
  bookingsDB
    .filter((b) => b.status === "confirmed")
    .forEach((b) => {
      b.foodItems.forEach((f) => {
        if (!sales[f.name]) sales[f.name] = { qty: 0, revenue: 0 };
        sales[f.name].qty += f.qty;
        sales[f.name].revenue += f.price * f.qty;
      });
    });
  if (!Object.keys(sales).length) {
    inf("No food sales recorded yet.");
    return;
  }
  const sorted = Object.entries(sales).sort(
    (a, b) => b[1].revenue - a[1].revenue,
  );
  sorted.forEach(([name, d]) => {
    console.log(
      `  ${name.padEnd(28)} Qty:${String(d.qty).padStart(4)}   Revenue: ${fmtPKR(d.revenue)}`,
    );
  });
  lbl("\n  TOTAL FOOD REVENUE", fmtPKR(sumBy(sorted, ([, d]) => d.revenue)));
}

function adminActivityLog() {
  box("SYSTEM ACTIVITY LOG (Last 30 Events)");
  if (!activityLog.length) {
    inf("No activity recorded yet.");
    return;
  }
  activityLog
    .slice(-30)
    .reverse()
    .forEach((l) => {
      console.log(`  [${l.timestamp}]  ${l.action.padEnd(20)} ${l.detail}`);
    });
}

function adminMovieStats() {
  box("MOVIE-WISE STATISTICS");
  [...cinema.movies]
    .sort((a, b) => b.revenue - a.revenue)
    .forEach((m) => {
      const booked = bookedCount(m);
      const pct = Math.round((booked / m.totalSeats) * 100);
      console.log(`\n  ► ${m.title} (${m.category})`);
      lbl("    Revenue", fmtPKR(m.revenue));
      lbl("    Bookings", m.totalBookings);
      lbl("    Occupancy", `${pct}% (${booked}/${m.totalSeats})`);
      lbl("    Rating", `⭐ ${m.rating} (${m.reviews.length} reviews)`);
    });
}

function adminManageCoupons() {
  box("COUPON MANAGEMENT");
  couponsDB.forEach((c, i) => {
    console.log(
      `  ${i + 1}. [${c.code.padEnd(12)}] ${c.desc.padEnd(36)} Used: ${c.used.length}x`,
    );
  });
  const ch = ask(`Choice:
    A. Add New Coupon
    B. Reset Coupon Usage
    0. Back
    `).toUpperCase();
  if (ch === "0") return;
  if (ch === "A") {
    const code = ask("Coupon Code (e.g. SUMMER20):").toUpperCase();
    const desc = ask("Description:");
    const type = ask("Type (percent/flat):");
    const discount = parseFloat(ask("Discount value (number):"));
    if (!code || isNaN(discount)) {
      er("Invalid coupon data.");
      return;
    }
    couponsDB.push({ code, discount, type, desc, used: [] });
    logActivity(session.user.id, "ADMIN_COUPON_ADD", `Added coupon "${code}"`);
    ok(`Coupon "${code}" created.`);
  } else if (ch === "B") {
    const code = ask("Coupon code to reset:").toUpperCase();
    const c = couponsDB.find((x) => x.code === code);
    if (!c) {
      er("Coupon not found.");
      return;
    }
    c.used = [];
    ok(`Usage reset for "${code}".`);
  }
}

function adminWaitingList() {
  box("WAITING LIST");
  if (!waitingList.length) {
    inf("No users on the waiting list.");
    return;
  }
  waitingList.forEach((w, i) => {
    const u = usersDB.find((x) => x.id === w.userId);
    console.log(
      `  ${i + 1}. ${(u?.name || "Unknown").padEnd(22)} → ${w.movieTitle.padEnd(30)} Added: ${w.addedOn}`,
    );
  });
}

function adminBlacklist() {
  box("BANNED / BLACKLISTED USERS");
  const banned = usersDB.filter((u) => u.isBanned);
  if (!banned.length) {
    inf("No banned users.");
    return;
  }
  banned.forEach((u, i) => {
    console.log(
      `  ${i + 1}. ${u.name.padEnd(22)} @${u.username.padEnd(15)} ${u.email}`,
    );
  });
}

// ================================================================
//  SECTION 20 - ADMIN DASHBOARD
// ================================================================
function adminDashboard() {
  while (true) {
    const ch = ask(`ADMIN CONTROL PANEL
      ------- Movie Management -------
      1. Add New Movie
      2. Delete Movie
      3. Update Ticket Price
      3. Update Ticket Price
      4. View All Movies
      ------- User Management -------s
      5. View All Users
      6. Ban / Unban User
      7. User Details
      8. Unlock User Account
      ------- Reports & Analytics -------
      9. Revenue Dashboard
      10. All Bookings Report
      11. Seat Occupancy Chart
      12. Food Sales Report
      13. Movie-wise Statistics
      14. Activity Log
      ------- System -------
      15. Manage Coupons
      16. Waiting List
      17. Blacklisted Users
      0. Logout
      `);
    switch (ch) {
      case "1":
        adminAddMovie();
        break;
      case "2":
        adminDeleteMovie();
        break;
      case "3":
        adminUpdateMovie();
        break;
      case "4":
        adminViewAllMovies();
        break;
      case "5":
        adminViewAllUsers();
        break;
      case "6":
        adminBanUser();
        break;
      case "7":
        adminUserDetails();
        break;
      case "8":
        adminUnlockUser();
        break;
      case "9":
        adminRevenueDashboard();
        break;
      case "10":
        adminBookingReport();
        break;
      case "11":
        adminSeatOccupancy();
        break;
      case "12":
        adminFoodReport();
        break;
      case "13":
        adminMovieStats();
        break;
      case "14":
        adminActivityLog();
        break;
      case "15":
        adminManageCoupons();
        break;
      case "16":
        adminWaitingList();
        break;
      case "17":
        adminBlacklist();
        break;
      case "0":
        logout();
        return;
      default:
        er("Invalid option.");
    }
  }
}

// ================================================================
//  SECTION 21 - MAIN ENTRY POINT
// ================================================================
function main() {
  while (true) {
    console.log("\n" + SEP);
    console.log(`    
     ██████╗██╗███╗  ██╗███████╗███╗   ███╗ █████╗ ██╗  ██╗
    ██╔════╝██║████╗ ██║██╔════╝████╗ ████║██╔══██╗╚██╗██╔╝
    ██║     ██║██╔██╗██║█████╗  ██╔████╔██║███████║ ╚███╔╝
    ██║     ██║██║╚████║██╔══╝  ██║╚██╔╝██║██╔══██║ ██╔██╗
    ╚██████╗██║██║ ╚███║███████╗██║ ╚═╝ ██║██║  ██║██╔╝╚██╗
     ╚═════╝╚═╝╚═╝  ╚══╝╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
              ★   G A L A X Y   C I N E M A   ★           
      `);
    console.log(SEP);
    console.log(
      `           ${cinema.name}  |  ${cinema.movies.length} Movies  |  ${usersDB.filter((u) => u.role === "customer").length} Members`,
    );

    // console.log("\n  💡 DEMO ACCOUNTS:");
    // console.log("     Admin    → username: admin   | password: Admin@123");
    // console.log("     Customer → username: ali     | password: Ali@1234\n");

    const ch = ask(`Enter your choice (1-4):
      1.  Login
      2.  Sign Up  (New Member)
      3.  Reset Password
      4.  Exit
    `);

    if (ch === "1") {
      const ok = login();
      if (ok) {
        if (session.user.role === "admin") adminDashboard();
        else customerDashboard();
      }
    } else if (ch === "2") {
      signup();
    } else if (ch === "3") {
      resetPassword();
    } else if (ch === "4") {
      console.log("\n" + SEP);
      console.log(
        "    Thank you for visiting CineMax Galaxy! See you soon. 🎬",
      );
      console.log(SEP);
      break;
    } else {
      er("Invalid choice. Enter 1, 2, 3, or 4.");
    }
  }
}

// ------- LAUNCH -------
main();
