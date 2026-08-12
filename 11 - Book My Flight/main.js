//! ===================================================
//!    BOOKMYFLIGHT - Complete Flight Booking System
//! ===================================================

//! ============================================
//!               ID GENERATORS
//! ============================================

//& --- Sequential counters prevent duplicate IDs ---
let flightSequence = 1;
let userSequence = 1;
let bookingSequence = 1;
let adminSequence = 1;

//* Generate unique Flight ID
const generateFlightID = () =>
  `BMF-FLT-${String(flightSequence++).padStart(3, "0")}`;

//* Generate unique User ID
const generateUserID = () =>
  `BMF-USR-${String(userSequence++).padStart(3, "0")}`;

//* Generate unique Booking ID
const generateBookingID = () =>
  `BMF-BKG-${String(bookingSequence++).padStart(3, "0")}`;

//* Generate unique Admin ID
const generateAdminID = () =>
  `BMF-ADM-${String(adminSequence++).padStart(3, "0")}`;

//! ============================================
//!               SOURCE DATA
//! ============================================
//? Small, compact configuration arrays used to dynamically
//? generate the runtime databases below. These are NOT databases.

//* International airports (50 countries, Pakistan excluded)
const internationalAirports = [
  {
    country: "United Arab Emirates",
    city: "Dubai",
    airport: "Dubai International Airport",
    code: "DXB",
  },
  {
    country: "United States",
    city: "New York",
    airport: "John F. Kennedy International Airport",
    code: "JFK",
  },
  {
    country: "United Kingdom",
    city: "London",
    airport: "Heathrow Airport",
    code: "LHR",
  },
  {
    country: "France",
    city: "Paris",
    airport: "Charles de Gaulle Airport",
    code: "CDG",
  },
  {
    country: "Germany",
    city: "Frankfurt",
    airport: "Frankfurt Airport",
    code: "FRA",
  },
  {
    country: "Japan",
    city: "Tokyo",
    airport: "Narita International Airport",
    code: "NRT",
  },
  {
    country: "China",
    city: "Beijing",
    airport: "Beijing Capital International Airport",
    code: "PEK",
  },
  {
    country: "India",
    city: "New Delhi",
    airport: "Indira Gandhi International Airport",
    code: "DEL",
  },
  {
    country: "Australia",
    city: "Sydney",
    airport: "Sydney Kingsford Smith Airport",
    code: "SYD",
  },
  {
    country: "Canada",
    city: "Toronto",
    airport: "Toronto Pearson International Airport",
    code: "YYZ",
  },
  {
    country: "Singapore",
    city: "Singapore",
    airport: "Changi Airport",
    code: "SIN",
  },
  {
    country: "South Korea",
    city: "Seoul",
    airport: "Incheon International Airport",
    code: "ICN",
  },
  {
    country: "Turkey",
    city: "Istanbul",
    airport: "Istanbul Airport",
    code: "IST",
  },
  {
    country: "Qatar",
    city: "Doha",
    airport: "Hamad International Airport",
    code: "DOH",
  },
  {
    country: "Saudi Arabia",
    city: "Riyadh",
    airport: "King Khalid International Airport",
    code: "RUH",
  },
  {
    country: "Egypt",
    city: "Cairo",
    airport: "Cairo International Airport",
    code: "CAI",
  },
  {
    country: "South Africa",
    city: "Johannesburg",
    airport: "O.R. Tambo International Airport",
    code: "JNB",
  },
  {
    country: "Brazil",
    city: "São Paulo",
    airport: "São Paulo–Guarulhos International Airport",
    code: "GRU",
  },
  {
    country: "Mexico",
    city: "Mexico City",
    airport: "Mexico City International Airport",
    code: "MEX",
  },
  {
    country: "Spain",
    city: "Madrid",
    airport: "Adolfo Suárez Madrid–Barajas Airport",
    code: "MAD",
  },
  {
    country: "Italy",
    city: "Rome",
    airport: "Leonardo da Vinci–Fiumicino Airport",
    code: "FCO",
  },
  {
    country: "Netherlands",
    city: "Amsterdam",
    airport: "Amsterdam Airport Schiphol",
    code: "AMS",
  },
  {
    country: "Switzerland",
    city: "Zurich",
    airport: "Zurich Airport",
    code: "ZRH",
  },
  {
    country: "Russia",
    city: "Moscow",
    airport: "Sheremetyevo International Airport",
    code: "SVO",
  },
  {
    country: "Thailand",
    city: "Bangkok",
    airport: "Suvarnabhumi Airport",
    code: "BKK",
  },
  {
    country: "Malaysia",
    city: "Kuala Lumpur",
    airport: "Kuala Lumpur International Airport",
    code: "KUL",
  },
  {
    country: "Indonesia",
    city: "Jakarta",
    airport: "Soekarno–Hatta International Airport",
    code: "CGK",
  },
  {
    country: "Philippines",
    city: "Manila",
    airport: "Ninoy Aquino International Airport",
    code: "MNL",
  },
  {
    country: "Vietnam",
    city: "Ho Chi Minh City",
    airport: "Tan Son Nhat International Airport",
    code: "SGN",
  },
  {
    country: "Kuwait",
    city: "Kuwait City",
    airport: "Kuwait International Airport",
    code: "KWI",
  },
  {
    country: "Bahrain",
    city: "Manama",
    airport: "Bahrain International Airport",
    code: "BAH",
  },
  {
    country: "Oman",
    city: "Muscat",
    airport: "Muscat International Airport",
    code: "MCT",
  },
  {
    country: "Jordan",
    city: "Amman",
    airport: "Queen Alia International Airport",
    code: "AMM",
  },
  {
    country: "Lebanon",
    city: "Beirut",
    airport: "Beirut–Rafic Hariri International Airport",
    code: "BEY",
  },
  {
    country: "Nigeria",
    city: "Lagos",
    airport: "Murtala Muhammed International Airport",
    code: "LOS",
  },
  {
    country: "Kenya",
    city: "Nairobi",
    airport: "Jomo Kenyatta International Airport",
    code: "NBO",
  },
  {
    country: "Morocco",
    city: "Casablanca",
    airport: "Mohammed V International Airport",
    code: "CMN",
  },
  {
    country: "Greece",
    city: "Athens",
    airport: "Athens International Airport",
    code: "ATH",
  },
  {
    country: "Portugal",
    city: "Lisbon",
    airport: "Humberto Delgado Airport",
    code: "LIS",
  },
  {
    country: "Sweden",
    city: "Stockholm",
    airport: "Stockholm Arlanda Airport",
    code: "ARN",
  },
  {
    country: "Norway",
    city: "Oslo",
    airport: "Oslo Airport, Gardermoen",
    code: "OSL",
  },
  {
    country: "Denmark",
    city: "Copenhagen",
    airport: "Copenhagen Airport",
    code: "CPH",
  },
  {
    country: "Poland",
    city: "Warsaw",
    airport: "Warsaw Chopin Airport",
    code: "WAW",
  },
  {
    country: "Austria",
    city: "Vienna",
    airport: "Vienna International Airport",
    code: "VIE",
  },
  {
    country: "Ireland",
    city: "Dublin",
    airport: "Dublin Airport",
    code: "DUB",
  },
  {
    country: "New Zealand",
    city: "Auckland",
    airport: "Auckland Airport",
    code: "AKL",
  },
  {
    country: "Argentina",
    city: "Buenos Aires",
    airport: "Ministro Pistarini International Airport",
    code: "EZE",
  },
  {
    country: "Israel",
    city: "Tel Aviv",
    airport: "Ben Gurion Airport",
    code: "TLV",
  },
  {
    country: "Sri Lanka",
    city: "Colombo",
    airport: "Bandaranaike International Airport",
    code: "CMB",
  },
  {
    country: "Bangladesh",
    city: "Dhaka",
    airport: "Hazrat Shahjalal International Airport",
    code: "DAC",
  },
];

//* Pakistan airports (20 major/representative airports)
const pakistanAirports = [
  {
    city: "Islamabad",
    airport: "Islamabad International Airport",
    code: "ISB",
  },
  { city: "Karachi", airport: "Jinnah International Airport", code: "KHI" },
  {
    city: "Lahore",
    airport: "Allama Iqbal International Airport",
    code: "LHE",
  },
  {
    city: "Peshawar",
    airport: "Bacha Khan International Airport",
    code: "PEW",
  },
  { city: "Quetta", airport: "Quetta International Airport", code: "UET" },
  { city: "Multan", airport: "Multan International Airport", code: "MUX" },
  {
    city: "Faisalabad",
    airport: "Faisalabad International Airport",
    code: "LYP",
  },
  { city: "Sialkot", airport: "Sialkot International Airport", code: "SKT" },
  { city: "Gwadar", airport: "Gwadar International Airport", code: "GWD" },
  { city: "Sukkur", airport: "Sukkur Airport", code: "SKZ" },
  { city: "Turbat", airport: "Turbat International Airport", code: "TUK" },
  { city: "Panjgur", airport: "Panjgur Airport", code: "PJG" },
  { city: "Zhob", airport: "Zhob Airport", code: "PZH" },
  { city: "Dera Ghazi Khan", airport: "Dera Ghazi Khan Airport", code: "DEA" },
  { city: "Bahawalpur", airport: "Bahawalpur Airport", code: "BHV" },
  {
    city: "Rahim Yar Khan",
    airport: "Shaikh Zayed International Airport",
    code: "RYK",
  },
  { city: "Skardu", airport: "Skardu International Airport", code: "KDU" },
  { city: "Gilgit", airport: "Gilgit Airport", code: "GIL" },
  { city: "Chitral", airport: "Chitral Airport", code: "CJL" },
  { city: "Moenjodaro", airport: "Moenjodaro Airport", code: "MJD" },
];

//* Airlines used for generated flights
const airlineNames = [
  "Pakistan International Airlines",
  "Serene Air",
  "Emirates",
  "Qatar Airways",
  "Turkish Airlines",
  "Saudia Airlines",
  "Gulf Air",
  "Kuwait Airways",
  "Etihad Airways",
  "Oman Air",
  "Singapore Airlines",
  "Cathay Pacific",
  "Air France",
  "Lufthansa",
  "British Airways",
];

//* Flight classes used for generated flights
const flightClasses = ["Economy", "Business", "First Class"];

//* Minimum admin seed information - full admin objects are generated below
const adminSeedConfig = [
  {
    name: "Luciana Leigh Rawlings",
    username: "lucianaleigh",
    password: "Raw$lings",
    email: "luci@bookmyflight.com",
  },
  {
    name: "John Smith",
    username: "johnsmith",
    password: "Dollar853",
    email: "john.smith@bookmyflight.com",
  },
  {
    name: "Emily Chen",
    username: "emilychen",
    password: "viremont098",
    email: "emily.chen@bookmyflight.com",
  },
  {
    name: "David Lee",
    username: "davidlee",
    password: "Devil#675",
    email: "david.lee@bookmyflight.com",
  },
];

//* Minimum default-user seed information - full user objects are generated below
const defaultUserProfiles = [
  {
    name: "Aisha Khan",
    username: "aishakhan",
    email: "aishakhan@gmail.com",
    password: "Nourishing$95",
    dateOfBirth: "1995-02-12",
    gender: "Female",
    contact: "+92 300 1234567",
  },
  {
    name: "Muhammad Ali",
    username: "muhammadali",
    email: "muhammadali@hotmail.com",
    password: "Watermelon#3",
    dateOfBirth: "1992-08-25",
    gender: "Male",
    contact: "+1 202 1234567",
  },
  {
    name: "Sofia Patel",
    username: "sofia",
    email: "sofia@protonmail.com",
    password: "Movement&Support",
    dateOfBirth: "1998-01-01",
    gender: "Female",
    contact: "+44 20 12345678",
  },
  {
    name: "Ahmed Hassan",
    username: "ahmedhassan",
    email: "ahmedhassan@yahoo.com",
    password: "Sparkle!Fusion",
    dateOfBirth: "1991-05-15",
    gender: "Male",
    contact: "+61 2 12345678",
  },
  {
    name: "Fatima Javed",
    username: "fatima",
    email: "fatima@outlook.com",
    password: "FreshBreeze2023",
    dateOfBirth: "1996-10-20",
    gender: "Female",
    contact: "+33 1 12345678",
  },
  {
    name: "Rahul Kumar",
    username: "rahulkumar",
    email: "rahulkumar@zoho.com",
    password: "Galaxy@Dawn",
    dateOfBirth: "1993-03-18",
    gender: "Male",
    contact: "+91 11 12345678",
  },
  {
    name: "Liam Chen",
    username: "liamchen",
    email: "liamchen@icloud.com",
    password: "Harmony*Peace",
    dateOfBirth: "1997-11-05",
    gender: "Male",
    contact: "+86 10 12345678",
  },
  {
    name: "Sana Malik",
    username: "sanamalik",
    email: "sanamalik@gmail.com",
    password: "Velvet&Piano",
    dateOfBirth: "1994-09-22",
    gender: "Female",
    contact: "+60 3 12345678",
  },
  {
    name: "Ethan Lee",
    username: "ethanlee",
    email: "ethanlee@protonmail.com",
    password: "OceanicVoyage",
    dateOfBirth: "1996-04-01",
    gender: "Male",
    contact: "+82 2 12345678",
  },
  {
    name: "Ava Morales",
    username: "avamorales",
    email: "avamorales@yahoo.com",
    password: "Mystic&Wonder",
    dateOfBirth: "1992-07-15",
    gender: "Female",
    contact: "+52 55 12345678",
  },
  {
    name: "Maya Singh",
    username: "mayasingh",
    email: "mayasingh@zoho.com",
    password: "Firefly$Light",
    dateOfBirth: "1991-06-10",
    gender: "Female",
    contact: "+27 11 1234567",
  },
  {
    name: "Khalid Ali",
    username: "khalidali",
    email: "khalidali@gmail.com",
    password: "Silent&Strong",
    dateOfBirth: "1993-01-25",
    gender: "Male",
    contact: "+20 2 12345678",
  },
  {
    name: "Lara Croft",
    username: "laracroft",
    email: "laracroft@protonmail.com",
    password: "BloomingGardens",
    dateOfBirth: "1998-03-12",
    gender: "Female",
    contact: "+34 91 1234567",
  },
  {
    name: "Rohan Mehta",
    username: "rohanmehta",
    email: "rohanmehta@yahoo.com",
    password: "Rhythm&Guitar",
    dateOfBirth: "1995-09-01",
    gender: "Male",
    contact: "+65 6 1234567",
  },
  {
    name: "Zara Saeed",
    username: "zarasaeed",
    email: "zarasaeed@icloud.com",
    password: "Sunshine&Rainbow",
    dateOfBirth: "1992-11-20",
    gender: "Female",
    contact: "+41 22 1234567",
  },
  {
    name: "Daniel Okafor",
    username: "danielokafor",
    email: "danielokafor@gmail.com",
    password: "Thunder#88",
    dateOfBirth: "1994-05-19",
    gender: "Male",
    contact: "+234 1 1234567",
  },
  {
    name: "Hana Yamamoto",
    username: "hanayamamoto",
    email: "hanayamamoto@yahoo.co.jp",
    password: "Blossom!22",
    dateOfBirth: "1997-02-08",
    gender: "Female",
    contact: "+81 3 12345678",
  },
  {
    name: "Carlos Rivera",
    username: "carlosrivera",
    email: "carlosrivera@outlook.com",
    password: "Volcano&Fire",
    dateOfBirth: "1990-12-03",
    gender: "Male",
    contact: "+54 11 12345678",
  },
  {
    name: "Noor Abbas",
    username: "noorabbas",
    email: "noorabbas@hotmail.com",
    password: "Crescent$Moon",
    dateOfBirth: "1999-06-27",
    gender: "Female",
    contact: "+971 4 1234567",
  },
  {
    name: "Marcus Webb",
    username: "marcuswebb",
    email: "marcuswebb@icloud.com",
    password: "Ironclad77",
    dateOfBirth: "1993-10-14",
    gender: "Male",
    contact: "+44 161 1234567",
  },
];

//! ============================================
//!          RANDOM / DATA GENERATORS
//! ============================================

//* Pick a random element from an array
const pickRandom = (array) => array[Math.floor(Math.random() * array.length)];

//* Generate random date within next 30 days
function generateRandomDate() {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * 30) + 1;
  today.setDate(today.getDate() + randomDays);
  return today.toLocaleDateString();
}

//* Generate random time
function generateRandomTime() {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

//* Generate random arrival time based on departure
const generateArrivalTime = (departureTime, duration) => {
  const [hours, minutes] = departureTime.split(":").map(Number);
  const durationHours = parseFloat(duration);
  const totalMinutes = hours * 60 + minutes + durationHours * 60;
  const arrivalHours = Math.floor(totalMinutes / 60) % 24;
  const arrivalMinutes = totalMinutes % 60;
  return `${arrivalHours.toString().padStart(2, "0")}:${arrivalMinutes.toString().padStart(2, "0")}`;
};

//* Generate a realistic travel duration - shorter for domestic routes
function generateTravelDuration(isDomestic) {
  const baseHours = isDomestic
    ? Math.floor(Math.random() * 3) + 1
    : Math.floor(Math.random() * 12) + 2;
  const half = Math.random() < 0.5 ? 0 : 0.5;
  const duration = baseHours + half;
  return `${duration} hour${duration === 1 ? "" : "s"}`;
}

//* Generate economy class price
const generateEconomyPrice = () => `$${Math.floor(Math.random() * 1001) + 500}`;

//* Generate business class price
const generateBusinessPrice = () =>
  `$${Math.floor(Math.random() * 6501) + 1500}`;

//* Generate first class price
const generateFirstClassPrice = () =>
  `$${Math.floor(Math.random() * 12001) + 8000}`;

//* Generate price for a given flight class
function generatePriceForClass(flightClass) {
  switch (flightClass) {
    case "Business":
      return generateBusinessPrice();
    case "First Class":
      return generateFirstClassPrice();
    default:
      return generateEconomyPrice();
  }
}

//* Generate baggage allowance for a given flight class
function generateBaggageAllowance(flightClass) {
  switch (flightClass) {
    case "Business":
      return "30kg";
    case "First Class":
      return "40kg";
    default:
      return "20kg";
  }
}

//* Randomly pick a realistic origin/destination airport pair.
//? Mixes Pakistan-Pakistan, Pakistan-International, and International-International routes.
function getRandomAirportPair() {
  const routeType = Math.random();
  let origin;
  let destination;
  let isDomestic;

  if (routeType < 0.3) {
    //? Pakistan -> Pakistan
    origin = pickRandom(pakistanAirports);
    do {
      destination = pickRandom(pakistanAirports);
    } while (destination.code === origin.code);
    isDomestic = true;
  } else if (routeType < 0.7) {
    //? Pakistan <-> International
    const pkAirport = pickRandom(pakistanAirports);
    const intlAirport = pickRandom(internationalAirports);
    if (Math.random() < 0.5) {
      origin = pkAirport;
      destination = intlAirport;
    } else {
      origin = intlAirport;
      destination = pkAirport;
    }
    isDomestic = false;
  } else {
    //? International -> International
    origin = pickRandom(internationalAirports);
    do {
      destination = pickRandom(internationalAirports);
    } while (destination.code === origin.code);
    isDomestic = false;
  }

  return { origin, destination, isDomestic };
}

//! ============================================
//!              FACTORY FUNCTIONS
//! ============================================

//* Tracks generated route/date/time combinations to avoid duplicate flights
const generatedFlightKeys = new Set();

//* Build and return one complete, unique flight object
function createFlight() {
  let origin;
  let destination;
  let isDomestic;
  let departureDate;
  let departureTime;
  let routeKey;
  let attempts = 0;

  //? Regenerate on collision until a unique route/date/time combo is found
  do {
    ({ origin, destination, isDomestic } = getRandomAirportPair());
    departureDate = generateRandomDate();
    departureTime = generateRandomTime();
    routeKey = `${origin.code}-${destination.code}-${departureDate}-${departureTime}`;
    attempts++;
  } while (generatedFlightKeys.has(routeKey) && attempts < 50);

  generatedFlightKeys.add(routeKey);

  const flightClass = pickRandom(flightClasses);
  const travelDuration = generateTravelDuration(isDomestic);
  const totalSeats = pickRandom([120, 150, 180, 200, 250, 300]);

  return {
    flightID: generateFlightID(),
    airline: pickRandom(airlineNames),
    origin: origin.city,
    destination: destination.city,
    departureDate,
    departureTime,
    arrivalTime: generateArrivalTime(departureTime, travelDuration),
    totalSeats,
    availableSeats: totalSeats,
    price: generatePriceForClass(flightClass),
    flightClass,
    baggageAllowance: generateBaggageAllowance(flightClass),
    travelDuration,
    departureAirport: origin.airport,
    arrivalAirport: destination.airport,
  };
}

//* Build and return one complete user object from a source profile
function createUser(profile) {
  return {
    userID: generateUserID(),
    ...profile,
    registrationDate: new Date().toLocaleDateString(),
    registrationTime: new Date().toLocaleTimeString(),
  };
}

//* Build and return one complete admin object from a source profile
function createAdmin(profile) {
  return {
    adminID: generateAdminID(),
    ...profile,
    role: "admin",
  };
}

//! ============================================
//!               DATABASE ARRAYS
//! ============================================
//? Databases start empty. Sample data is generated at runtime below.

//* Flight data storage (Array of Objects)
const flightDatabase = [];

//* User database (Array of Objects)
const userDatabase = [];

//* Admin database (Array of Objects)
const adminDatabase = [];

//* Booking database (Array of Objects)
const bookingDatabase = [];

//* Cancelled bookings database (Array of Objects)
const cancelledBookings = [];

//* Current logged-in user (Object)
let currentUser = null;

//* Current logged-in admin (Object)
let currentAdmin = null;

//! ============================================
//!               DATABASE SEEDING
//! ============================================

//* Seed all admins from the compact admin seed config
function seedAdmins() {
  adminSeedConfig.forEach((profile) =>
    adminDatabase.push(createAdmin(profile)),
  );
}

//* Seed all default users from the compact user profile config
function seedUsers() {
  defaultUserProfiles.forEach((profile) =>
    userDatabase.push(createUser(profile)),
  );
}

//* Seed `count` unique flights, generated on the fly via the flight factory
function seedFlights(count = 60) {
  for (let i = 0; i < count; i++) {
    flightDatabase.push(createFlight());
  }
}

//! ============================================
//!               INITIALIZATION
//! ============================================

//* Guards against accidental double-initialization
let initializationStarted = false;

//* Prepares empty databases and populates them immediately
function initializeDatabase() {
  if (initializationStarted) {
    return;
  }
  initializationStarted = true;

  console.log("BookMyFlight initialization started...");

  seedAdmins();
  seedUsers();
  seedFlights();

  console.log(`Admins: ${adminDatabase.length} loaded`);
  console.log(
    `Users: ${userDatabase.length}/${defaultUserProfiles.length} loaded`,
  );
  console.log(`Flights: ${flightDatabase.length}/60 loaded`);
  console.log("Database initialization complete.");
}

//! ============================================
//!               UTILITY FUNCTIONS
//! ============================================

//* Validate email format using string methods
const validateEmail = (email) => {
  return email.includes("@") && email.includes(".") && email.length > 5;
};

//* Validate password strength
function validatePassword(password) {
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters" };
  }
  return { valid: true, message: "Password is valid" };
}

//* Find user by email (Higher order function with filter)
const findUserByEmail = (email) =>
  userDatabase.filter((user) => user.email === email)[0];

//* Find user by username
const findUserByUsername = (username) =>
  userDatabase.filter((user) => user.username === username)[0];

//* Find admin by username
const findAdminByUsername = (username) =>
  adminDatabase.filter((admin) => admin.username === username)[0];

//* Display formatted message with delay using setTimeout
function displayMessage(message, delay = 1000) {
  setTimeout(() => {
    console.log(`\n${"=".repeat(50)}`);
    console.log(message);
    console.log(`${"=".repeat(50)}\n`);
  }, delay);
}

//* Log error with both alert and console
const logError = (shortMsg, longMsg) => {
  console.error(`ERROR: ${shortMsg}`);
  alert(`ERROR:\n\n${longMsg}`);
};

//* Log warning
const logWarning = (shortMsg, longMsg) => {
  console.warn(`WARNING: ${shortMsg}`);
  alert(`WARNING:\n\n${longMsg}`);
};

//* Validate date format (using string methods)
function isValidDate(dateString) {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}

//! ============================================
//!               GUEST FUNCTIONS
//! ============================================

//* Search flights by origin and destination
function searchFlights() {
  try {
    console.log("\nSearch Flights");

    const origin = prompt("Enter origin city:");
    if (!origin) {
      throw new Error("Origin city is required");
    }

    const destination = prompt("Enter destination city:");
    if (!destination) {
      throw new Error("Destination city is required");
    }

    //? Use filter to find matching flights
    const matchingFlights = flightDatabase.filter(
      (flight) =>
        flight.origin.toLowerCase() === origin.toLowerCase() &&
        flight.destination.toLowerCase() === destination.toLowerCase(),
    );

    if (matchingFlights.length === 0) {
      logWarning(
        "No flights found",
        `No flights available from ${origin} to ${destination}`,
      );
      return;
    }

    console.log(`\nFlights from ${origin} to ${destination}:\n`);

    //? Use forEach to display each flight
    matchingFlights.forEach((flight, index) => {
      console.log(`${index + 1}. Flight ID: ${flight.flightID}`);
      console.log(`   Airline: ${flight.airline}`);
      console.log(`   Class: ${flight.flightClass}`);
      console.log(`   Price: ${flight.price}`);
      console.log(
        `   Departure: ${flight.departureDate} at ${flight.departureTime}`,
      );
      console.log(`   Available Seats: ${flight.availableSeats}`);
      console.log(`   Duration: ${flight.travelDuration}`);
      console.log("-".repeat(50));
    });

    alert(
      `Found ${matchingFlights.length} flight(s) from ${origin} to ${destination}. Check console for details.`,
    );
  } catch (error) {
    logError(error.message, `Failed to search flights:\n${error.message}`);
  }
}

//* View all available flights
function viewAllFlights() {
  try {
    if (flightDatabase.length === 0) {
      throw new Error("No flights available in the system");
    }

    console.log("\nAll Available Flights:\n");

    //? Use for...of loop to iterate
    for (const flight of flightDatabase) {
      console.log(`Flight ID: ${flight.flightID}`);
      console.log(`${flight.origin} → ${flight.destination}`);
      console.log(`Airline: ${flight.airline}`);
      console.log(`Class: ${flight.flightClass}`);
      console.log(`Price: ${flight.price}`);
      console.log(`Date: ${flight.departureDate}`);
      console.log(
        `Departure: ${flight.departureTime} | Arrival: ${flight.arrivalTime}`,
      );
      console.log(
        `Available: ${flight.availableSeats}/${flight.totalSeats} seats`,
      );
      console.log("=".repeat(50));
    }

    alert(
      `Total ${flightDatabase.length} flights available. Check console for details.`,
    );
  } catch (error) {
    logError(error.message, `Failed to view flights:\n${error.message}`);
  }
}

//! ============================================
//!      USER REGISTRATION & AUTHENTICATION
//! ============================================

//* User registration function
function userRegistration() {
  try {
    console.log("\nUser Registration");

    //? Get and validate username
    let username;
    while (true) {
      username = prompt("Enter username (min 3 characters):");
      if (!username) {
        throw new Error("Username is required");
      }
      if (username.length < 3) {
        logWarning(
          "Invalid username",
          "Username must be at least 3 characters",
        );
        continue;
      }
      if (findUserByUsername(username)) {
        logWarning("Username exists", "This username is already taken");
        continue;
      }
      break;
    }

    //? Get and validate email
    let email;
    while (true) {
      email = prompt("Enter email address:");
      if (!email) {
        throw new Error("Email is required");
      }
      if (!validateEmail(email)) {
        logWarning("Invalid email", "Please enter a valid email address");
        continue;
      }
      if (findUserByEmail(email)) {
        logWarning("Email exists", "This email is already registered");
        continue;
      }
      break;
    }

    //? Get and validate password
    let password;
    while (true) {
      password = prompt("Enter password (min 6 characters):");
      if (!password) {
        throw new Error("Password is required");
      }
      const validation = validatePassword(password);
      if (!validation.valid) {
        logWarning("Weak password", validation.message);
        continue;
      }
      break;
    }

    //? Get additional user information
    const name = prompt("Enter your full name:") || "N/A";
    const dateOfBirth =
      prompt("Enter your date of birth (DD/MM/YYYY):") || "N/A";
    const gender = prompt("Enter your gender (Male/Female/Other):") || "N/A";
    const contact = prompt("Enter your contact number:") || "N/A";

    //? Create user object
    const newUser = {
      userID: generateUserID(),
      username,
      password,
      email,
      name,
      dateOfBirth,
      gender,
      contact,
      registrationDate: new Date().toLocaleDateString(),
      registrationTime: new Date().toLocaleTimeString(),
    };

    //? Add to database using push
    userDatabase.push(newUser);

    console.log("\nRegistration Successful!");
    console.log(`User ID: ${newUser.userID}`);
    console.log(`Username: ${newUser.username}`);
    console.log(`Email: ${newUser.email}`);

    alert(
      `Registration Successful!\n\nUser ID: ${newUser.userID}\nWelcome, ${name}!`,
    );

    return true;
  } catch (error) {
    logError(error.message, `Registration failed:\n${error.message}`);
    return false;
  }
}

//* User login function
function userLogin() {
  try {
    console.log("\nUser Login");

    const username = prompt("Enter username:");
    if (!username) {
      throw new Error("Username is required");
    }

    const password = prompt("Enter password:");
    if (!password) {
      throw new Error("Password is required");
    }

    //? Find user
    const user = findUserByUsername(username);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Incorrect password");
    }

    //? Set current user
    currentUser = { ...user }; //? Using spread operator

    console.log(`\nLogin Successful! Welcome, ${user.name}!`);
    alert(`Welcome back, ${user.name}!`);

    return true;
  } catch (error) {
    logError(error.message, `Login failed:\n${error.message}`);
    return false;
  }
}

//* Admin login function
function adminLogin() {
  try {
    console.log("\nAdmin Login");

    const username = prompt("Enter admin username:");
    if (!username) {
      throw new Error("Username is required");
    }

    const password = prompt("Enter admin password:");
    if (!password) {
      throw new Error("Password is required");
    }

    //? Find admin
    const admin = findAdminByUsername(username);

    if (!admin) {
      throw new Error("Admin not found");
    }

    if (admin.password !== password) {
      throw new Error("Incorrect password");
    }

    //? Set current admin
    currentAdmin = { ...admin }; //? Using spread operator

    console.log(`\nAdmin Login Successful! Welcome, ${admin.name}!`);
    alert(`Welcome, Admin ${admin.name}!`);

    return true;
  } catch (error) {
    logError(error.message, `Admin login failed:\n${error.message}`);
    return false;
  }
}

//! ============================================
//!               USER FUNCTIONS
//! ============================================

//* View full details of a specific flight
function viewFlightDetails() {
  try {
    const flightID = prompt("Enter Flight ID to view details:");
    if (!flightID) {
      throw new Error("Flight ID is required");
    }

    //? Use find method
    const flight = flightDatabase.find((f) => f.flightID === flightID);

    if (!flight) {
      throw new Error("Flight not found");
    }

    //? Destructuring the flight object
    const {
      airline,
      origin,
      destination,
      departureDate,
      departureTime,
      arrivalTime,
      flightClass,
      price,
      availableSeats,
      totalSeats,
      baggageAllowance,
      travelDuration,
      departureAirport,
      arrivalAirport,
    } = flight;

    console.log("\nFlight Details:");
    console.log(`Flight ID: ${flightID}`);
    console.log(`Airline: ${airline}`);
    console.log(`Route: ${origin} → ${destination}`);
    console.log(`Departure Airport: ${departureAirport}`);
    console.log(`Arrival Airport: ${arrivalAirport}`);
    console.log(`Departure: ${departureDate} at ${departureTime}`);
    console.log(`Arrival: ${arrivalTime}`);
    console.log(`Duration: ${travelDuration}`);
    console.log(`Class: ${flightClass}`);
    console.log(`Price: ${price} per seat`);
    console.log(`Seats: ${availableSeats}/${totalSeats} available`);
    console.log(`Baggage Allowance: ${baggageAllowance}`);

    alert("Flight details displayed in console.");
  } catch (error) {
    logError(error.message, `Failed to view flight details:\n${error.message}`);
  }
}

//* Book a flight
function bookFlight() {
  try {
    console.log("\nBook a Flight");

    //? Check if user is logged in
    if (!currentUser) {
      throw new Error("Please login to book a flight");
    }

    //? Get origin and destination
    const origin = prompt("Enter origin city:");
    const destination = prompt("Enter destination city:");

    if (!origin || !destination) {
      throw new Error("Origin and destination are required");
    }

    //? Find matching flights
    const matchingFlights = flightDatabase.filter(
      (flight) =>
        flight.origin.toLowerCase() === origin.toLowerCase() &&
        flight.destination.toLowerCase() === destination.toLowerCase() &&
        flight.availableSeats > 0,
    );

    if (matchingFlights.length === 0) {
      throw new Error(`No flights available from ${origin} to ${destination}`);
    }

    //? Display available flights
    console.log("\nAvailable Flights:");
    matchingFlights.forEach((flight, index) => {
      console.log(
        `${index + 1}. ${flight.flightID} - ${flight.airline} - ${flight.flightClass} - ${flight.price} - ${flight.availableSeats} seats`,
      );
    });

    const flightChoice = parseInt(prompt("Select flight number:")) - 1;

    if (flightChoice < 0 || flightChoice >= matchingFlights.length) {
      throw new Error("Invalid flight selection");
    }

    const selectedFlight = matchingFlights[flightChoice];

    //? Check available seats
    if (selectedFlight.availableSeats <= 0) {
      throw new Error("No seats available on this flight");
    }

    //? Get passport and identity details
    const passportNumber = prompt("Enter passport number:");
    const identityNumber = prompt("Enter identity number:");

    if (!passportNumber || !identityNumber) {
      throw new Error("Passport and identity numbers are required");
    }

    //? Get baggage details
    let baggageSpace = 0;
    let baggagePrice = 0;

    const needsBaggage = prompt(
      `Extra baggage? (yes/no)\nIncluded: ${selectedFlight.baggageAllowance}`,
    );

    if (needsBaggage && needsBaggage.toLowerCase() === "yes") {
      baggageSpace = parseInt(prompt("Enter extra baggage (kg):"));

      if (isNaN(baggageSpace) || baggageSpace <= 0) {
        throw new Error("Invalid baggage amount");
      }

      //? Calculate baggage price using switch
      switch (selectedFlight.flightClass) {
        case "Economy":
          baggagePrice = baggageSpace * 35;
          break;
        case "Business":
          baggagePrice = baggageSpace * 75;
          break;
        case "First Class":
          baggagePrice = baggageSpace * 115;
          break;
        default:
          baggagePrice = baggageSpace * 35;
      }
    }

    //? Get number of seats
    let numSeats = 1;
    const travelType = prompt("Travel type? (alone/couple/family):");

    //? Use if-else to determine seats
    if (travelType && travelType.toLowerCase() === "alone") {
      numSeats = 1;
    } else if (travelType && travelType.toLowerCase() === "couple") {
      numSeats = 2;
    } else if (travelType && travelType.toLowerCase() === "family") {
      numSeats = parseInt(prompt("Enter number of seats:"));
      if (isNaN(numSeats) || numSeats <= 0) {
        throw new Error("Invalid number of seats");
      }
    }

    if (numSeats > selectedFlight.availableSeats) {
      throw new Error(`Only ${selectedFlight.availableSeats} seats available`);
    }

    //? Calculate total price
    const pricePerSeat = parseFloat(
      selectedFlight.price.slice(1, selectedFlight.price.length),
    );
    const totalPrice = pricePerSeat * numSeats + baggagePrice;

    //? Confirm booking
    const confirmMsg = `Confirm Booking?\n\nFlight: ${selectedFlight.origin} → ${selectedFlight.destination}\nDate: ${selectedFlight.departureDate}\nDeparture: ${selectedFlight.departureTime}\nArrival: ${selectedFlight.arrivalTime}\nClass: ${selectedFlight.flightClass}\nSeats: ${numSeats}\nPrice per seat: ${selectedFlight.price}\nBaggage: ${baggageSpace}kg ($${baggagePrice})\nTotal: $${totalPrice}`;

    const confirm = prompt(`${confirmMsg}\n\nType 'yes' to confirm:`);

    if (!confirm || confirm.toLowerCase() !== "yes") {
      throw new Error("Booking cancelled by user");
    }

    //? Create booking object
    const booking = {
      bookingID: generateBookingID(),
      flightID: selectedFlight.flightID,
      userID: currentUser.userID,
      ...currentUser, //? Spread operator
      passportNumber,
      identityNumber,
      bookingDate: new Date().toLocaleDateString(),
      bookingTime: new Date().toLocaleTimeString(),
      origin: selectedFlight.origin,
      destination: selectedFlight.destination,
      departureDate: selectedFlight.departureDate,
      departureTime: selectedFlight.departureTime,
      arrivalTime: selectedFlight.arrivalTime,
      airline: selectedFlight.airline,
      flightClass: selectedFlight.flightClass,
      baggageSpace,
      baggagePrice,
      totalPrice,
      numSeats,
    };

    //? Add booking to database
    bookingDatabase.push(booking);

    //? Update available seats
    selectedFlight.availableSeats -= numSeats;

    //? Display confirmation
    console.log("\nBooking Confirmed!");
    console.log(`Booking ID: ${booking.bookingID}`);
    console.log(`Flight: ${booking.origin} → ${booking.destination}`);
    console.log(`Total: $${totalPrice}`);

    alert(
      `Booking Confirmed!\n\nBooking ID: ${booking.bookingID}\nTotal: $${totalPrice}`,
    );
  } catch (error) {
    logError(error.message, `Booking failed:\n${error.message}`);
  }
}

//* View user's booked flights
function viewBookedFlights() {
  try {
    if (!currentUser) {
      throw new Error("Please login to view bookings");
    }

    //? Filter bookings for current user
    const userBookings = bookingDatabase.filter(
      (booking) => booking.userID === currentUser.userID,
    );

    if (userBookings.length === 0) {
      alert("You have no booked flights.");
      return;
    }

    console.log("\nYour Booked Flights:");

    //? Use map to create summary
    const bookingSummaries = userBookings.map((booking, index) => {
      return `${index + 1}. Booking ID: ${booking.bookingID} | ${booking.origin} → ${booking.destination} | Date: ${booking.departureDate} | Seats: ${booking.numSeats} | Total: $${booking.totalPrice}`;
    });

    //? Display using forEach
    bookingSummaries.forEach((summary) => console.log(summary));

    alert(
      `You have ${userBookings.length} booking(s). Check console for details.`,
    );
  } catch (error) {
    logError(error.message, `Failed to view bookings:\n${error.message}`);
  }
}

//* Cancel a booking
function cancelBooking() {
  try {
    if (!currentUser) {
      throw new Error("Please login to cancel bookings");
    }

    const bookingID = prompt("Enter Booking ID to cancel:");
    if (!bookingID) {
      throw new Error("Booking ID is required");
    }

    //? Find booking index
    const bookingIndex = bookingDatabase.findIndex(
      (b) => b.bookingID === bookingID && b.userID === currentUser.userID,
    );

    if (bookingIndex === -1) {
      throw new Error("Booking not found or doesn't belong to you");
    }

    //? Get booking details using destructuring
    const [cancelledBooking] = bookingDatabase.splice(bookingIndex, 1);

    //? Restore seats
    const flight = flightDatabase.find(
      (f) => f.flightID === cancelledBooking.flightID,
    );
    if (flight) {
      flight.availableSeats += cancelledBooking.numSeats;
    }

    //? Add to cancelled bookings
    cancelledBookings.push({
      ...cancelledBooking,
      cancellationDate: new Date().toLocaleDateString(),
      cancellationTime: new Date().toLocaleTimeString(),
    });

    console.log(`\nBooking ${bookingID} cancelled successfully`);
    alert(
      `Booking ${bookingID} cancelled!\nRefund will be processed within 5-7 business days.`,
    );
  } catch (error) {
    logError(error.message, `Cancellation failed:\n${error.message}`);
  }
}

//* View cancelled flights
function viewCancelledFlights() {
  try {
    if (!currentUser) {
      throw new Error("Please login to view cancelled bookings");
    }

    //? Filter cancelled bookings
    const userCancelled = cancelledBookings.filter(
      (booking) => booking.userID === currentUser.userID,
    );

    if (userCancelled.length === 0) {
      alert("You have no cancelled bookings.");
      return;
    }

    console.log("\nYour Cancelled Bookings:");

    //? Display using for loop
    for (let i = 0; i < userCancelled.length; i++) {
      const booking = userCancelled[i];
      console.log(`${i + 1}. Booking ID: ${booking.bookingID}`);
      console.log(`   Route: ${booking.origin} → ${booking.destination}`);
      console.log(`   Cancelled on: ${booking.cancellationDate}`);
      console.log("-".repeat(50));
    }

    alert(
      `You have ${userCancelled.length} cancelled booking(s). Check console.`,
    );
  } catch (error) {
    logError(
      error.message,
      `Failed to view cancelled bookings:\n${error.message}`,
    );
  }
}

//* Delete user account
function deleteAccount() {
  try {
    if (!currentUser) {
      throw new Error("Please login to delete account");
    }

    const confirm = prompt(
      `WARNING: This will permanently delete your account.\n\nType '${currentUser.username}' to confirm:`,
    );

    if (confirm !== currentUser.username) {
      throw new Error("Account deletion cancelled");
    }

    //? Find and remove user
    const userIndex = userDatabase.findIndex(
      (u) => u.userID === currentUser.userID,
    );

    if (userIndex !== -1) {
      userDatabase.splice(userIndex, 1);
    }

    //? Cancel all user bookings
    const userBookingIndices = [];
    for (let i = bookingDatabase.length - 1; i >= 0; i--) {
      if (bookingDatabase[i].userID === currentUser.userID) {
        userBookingIndices.push(i);
      }
    }

    //? Remove bookings and restore seats
    userBookingIndices.forEach((index) => {
      const booking = bookingDatabase[index];
      const flight = flightDatabase.find(
        (f) => f.flightID === booking.flightID,
      );
      if (flight) {
        flight.availableSeats += booking.numSeats;
      }
      bookingDatabase.splice(index, 1);
    });

    console.log("\nAccount deleted successfully");
    alert("Your account has been deleted. We're sorry to see you go!");

    currentUser = null; //? Logout user
    return true;
  } catch (error) {
    logError(error.message, `Account deletion failed:\n${error.message}`);
    return false;
  }
}

//! ============================================
//!                ADMIN FUNCTIONS
//! ============================================

//* Add a new flight
function addFlight() {
  try {
    if (!currentAdmin) {
      throw new Error("Admin access required");
    }

    console.log("\nAdd New Flight");

    //? Get flight details
    const airline = prompt("Enter airline name:");
    const origin = prompt("Enter origin city:");
    const destination = prompt("Enter destination city:");
    const departureDate = prompt("Enter departure date (MM/DD/YYYY):");
    const departureTime = prompt("Enter departure time (HH:MM):");
    const travelDuration = prompt("Enter travel duration (e.g., 2 hours):");
    const totalSeats = parseInt(prompt("Enter total seats:"));
    const flightClass = prompt("Enter class (Economy/Business/First Class):");
    const baggageAllowance = prompt("Enter baggage allowance (e.g., 20kg):");

    //? Validate inputs
    if (
      !airline ||
      !origin ||
      !destination ||
      !departureDate ||
      !departureTime ||
      !travelDuration ||
      isNaN(totalSeats)
    ) {
      throw new Error("All fields are required and must be valid");
    }

    //? Generate price based on class
    const price = generatePriceForClass(flightClass);

    //? Create flight object
    const newFlight = {
      flightID: generateFlightID(),
      airline,
      origin,
      destination,
      departureDate,
      departureTime,
      arrivalTime: generateArrivalTime(departureTime, travelDuration),
      totalSeats,
      availableSeats: totalSeats,
      price,
      flightClass,
      baggageAllowance,
      travelDuration,
      departureAirport: `${origin} International Airport`,
      arrivalAirport: `${destination} International Airport`,
    };

    //? Add flight to database
    flightDatabase.push(newFlight);

    console.log(`\nFlight added successfully! ID: ${newFlight.flightID}`);
    alert(
      `Flight Added!\n\nFlight ID: ${newFlight.flightID}\n${origin} → ${destination}`,
    );
  } catch (error) {
    logError(error.message, `Failed to add flight:\n${error.message}`);
  }
}

//* Remove a flight
function removeFlight() {
  try {
    if (!currentAdmin) {
      throw new Error("Admin access required");
    }

    const flightID = prompt("Enter Flight ID to remove:");
    if (!flightID) {
      throw new Error("Flight ID is required");
    }

    //? Find flight index
    const flightIndex = flightDatabase.findIndex(
      (f) => f.flightID === flightID,
    );

    if (flightIndex === -1) {
      throw new Error("Flight not found");
    }

    //? Check if flight has bookings
    const hasBookings = bookingDatabase.some((b) => b.flightID === flightID);

    if (hasBookings) {
      const confirm = prompt(
        "This flight has active bookings!\nType 'REMOVE' to force remove:",
      );
      if (confirm !== "REMOVE") {
        throw new Error("Flight removal cancelled");
      }
    }

    //? Remove flight
    const removedFlight = flightDatabase.splice(flightIndex, 1)[0];

    console.log(`\nFlight ${flightID} removed successfully`);
    alert(
      `Flight Removed!\n\nFlight: ${removedFlight.origin} → ${removedFlight.destination}`,
    );
  } catch (error) {
    logError(error.message, `Failed to remove flight:\n${error.message}`);
  }
}

//* Edit a flight
function editFlight() {
  try {
    if (!currentAdmin) {
      throw new Error("Admin access required");
    }

    const flightID = prompt("Enter Flight ID to edit:");
    if (!flightID) {
      throw new Error("Flight ID is required");
    }

    //? Find flight
    const flight = flightDatabase.find((f) => f.flightID === flightID);

    if (!flight) {
      throw new Error("Flight not found");
    }

    //? Show current details
    console.log("\nCurrent Flight Details:");
    console.log(`Origin: ${flight.origin}`);
    console.log(`Destination: ${flight.destination}`);
    console.log(`Price: ${flight.price}`);
    console.log(`Available Seats: ${flight.availableSeats}`);

    //? Edit menu
    const editOptions = `What to edit?\n1. Origin\n2. Destination\n3. Price\n4. Seats\n5. Date\n6. Time\n7. Cancel`;
    const choice = prompt(editOptions);

    switch (choice) {
      case "1":
        flight.origin = prompt("New origin:", flight.origin) || flight.origin;
        break;
      case "2":
        flight.destination =
          prompt("New destination:", flight.destination) || flight.destination;
        break;
      case "3":
        const newPrice = prompt("New price (number only):");
        if (newPrice && !isNaN(newPrice)) {
          flight.price = `$${newPrice}`;
        }
        break;
      case "4":
        const newSeats = prompt("New total seats:");
        if (newSeats && !isNaN(newSeats)) {
          const seatsBooked = flight.totalSeats - flight.availableSeats;
          flight.totalSeats = parseInt(newSeats);
          flight.availableSeats = flight.totalSeats - seatsBooked;
        }
        break;
      case "5":
        flight.departureDate =
          prompt("New date:", flight.departureDate) || flight.departureDate;
        break;
      case "6":
        flight.departureTime =
          prompt("New time:", flight.departureTime) || flight.departureTime;
        flight.arrivalTime = generateArrivalTime(
          flight.departureTime,
          flight.travelDuration,
        );
        break;
      default:
        throw new Error("Edit cancelled");
    }

    console.log("\nFlight updated successfully!");
    alert("Flight details updated!");
  } catch (error) {
    logError(error.message, `Failed to edit flight:\n${error.message}`);
  }
}

//* View all bookings (Admin)
function viewAllBookings() {
  try {
    if (!currentAdmin) {
      throw new Error("Admin access required");
    }

    if (bookingDatabase.length === 0) {
      alert("No bookings in the system.");
      return;
    }

    console.log("\nAll Bookings:\n");

    //? Use reduce to calculate total revenue
    const totalRevenue = bookingDatabase.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0,
    );

    //? Display bookings
    bookingDatabase.forEach((booking, index) => {
      console.log(`${index + 1}. Booking ID: ${booking.bookingID}`);
      console.log(`   User: ${booking.name} (${booking.email})`);
      console.log(`   Flight: ${booking.origin} → ${booking.destination}`);
      console.log(`   Date: ${booking.departureDate}`);
      console.log(`   Seats: ${booking.numSeats}`);
      console.log(`   Total: $${booking.totalPrice}`);
      console.log("-".repeat(50));
    });

    console.log(`\nTotal Revenue: $${totalRevenue}`);
    alert(
      `Total Bookings: ${bookingDatabase.length}\nTotal Revenue: $${totalRevenue}\n\nCheck console for details.`,
    );
  } catch (error) {
    logError(error.message, `Failed to view bookings:\n${error.message}`);
  }
}

//* View specific booking details
function viewBookingDetails() {
  try {
    if (!currentAdmin) {
      throw new Error("Admin access required");
    }

    const bookingID = prompt("Enter Booking ID:");
    if (!bookingID) {
      throw new Error("Booking ID is required");
    }

    //? Find booking
    const booking = bookingDatabase.find((b) => b.bookingID === bookingID);

    if (!booking) {
      throw new Error("Booking not found");
    }

    //? Display all details
    console.log("\nBooking Details:");
    console.log(`Booking ID: ${booking.bookingID}`);
    console.log(`User ID: ${booking.userID}`);
    console.log(`Name: ${booking.name}`);
    console.log(`Email: ${booking.email}`);
    console.log(`Contact: ${booking.contact}`);
    console.log(`Passport: ${booking.passportNumber}`);
    console.log(`Identity: ${booking.identityNumber}`);
    console.log(`Flight: ${booking.origin} → ${booking.destination}`);
    console.log(`Airline: ${booking.airline}`);
    console.log(`Class: ${booking.flightClass}`);
    console.log(
      `Departure: ${booking.departureDate} at ${booking.departureTime}`,
    );
    console.log(`Arrival: ${booking.arrivalTime}`);
    console.log(`Seats: ${booking.numSeats}`);
    console.log(
      `Baggage: ${booking.baggageSpace}kg ($${booking.baggagePrice})`,
    );
    console.log(`Total: $${booking.totalPrice}`);
    console.log(`Booked on: ${booking.bookingDate} at ${booking.bookingTime}`);

    alert("Booking details displayed in console.");
  } catch (error) {
    logError(error.message, `Failed to view booking:\n${error.message}`);
  }
}

//! ============================================
//!             MAIN MENU FUNCTIONS
//! ============================================

//* Guest menu
function guestMenu() {
  let guestActive = true;

  while (guestActive) {
    const choice = prompt(
      "GUEST MENU\n1. Search Flights\n2. View All Flights\n3. Sign Up\n4. Back to Main Menu\nEnter choice:",
    );

    switch (choice) {
      case "1":
      case "search":
        searchFlights();
        break;
      case "2":
      case "view":
        viewAllFlights();
        break;
      case "3":
      case "signup":
        if (userRegistration()) {
          //? Use setInterval to show a message for 3 seconds
          let counter = 3;
          const intervalID = setInterval(() => {
            console.log(`Redirecting to main menu in ${counter}...`);
            counter--;
            if (counter < 0) {
              clearInterval(intervalID);
            }
          }, 1000);
          setTimeout(() => {
            guestActive = false;
          }, 3000);
        }
        break;
      case "4":
      case "back":
        guestActive = false;
        break;
      default:
        logWarning("Invalid choice", "Please select a valid option (1-4)");
    }
  }
}

//* User menu
function userMenu() {
  let userActive = true;

  while (userActive) {
    const choice = prompt(
      `USER MENU - Welcome ${currentUser.name}\n\n1. Search Flights\n2. View All Flights\n3. View Flight Details\n4. Book Flight\n5. View My Bookings\n6. Cancel Booking\n7. View Cancelled Bookings\n8. Delete Account\n9. Logout\n\nEnter choice:`,
    );

    switch (choice) {
      case "1":
        searchFlights();
        break;
      case "2":
        viewAllFlights();
        break;
      case "3":
        viewFlightDetails();
        break;
      case "4":
        bookFlight();
        break;
      case "5":
        viewBookedFlights();
        break;
      case "6":
        cancelBooking();
        break;
      case "7":
        viewCancelledFlights();
        break;
      case "8":
        if (deleteAccount()) {
          userActive = false;
        }
        break;
      case "9":
      case "logout":
        currentUser = null;
        console.log("\nLogged out successfully!");
        alert("Logged out successfully!");
        userActive = false;
        break;
      default:
        logWarning("Invalid choice", "Please select a valid option (1-9)");
    }
  }
}

//* Admin menu
function adminMenu() {
  let adminActive = true;

  while (adminActive) {
    const choice = prompt(
      `ADMIN PANEL - ${currentAdmin.name}\n\n1. Add Flight\n2. Remove Flight\n3. Edit Flight\n4. View All Flights\n5. View All Bookings\n6. View Booking Details\n7. Logout\n\nEnter choice:`,
    );

    switch (choice) {
      case "1":
        addFlight();
        break;
      case "2":
        removeFlight();
        break;
      case "3":
        editFlight();
        break;
      case "4":
        viewAllFlights();
        break;
      case "5":
        viewAllBookings();
        break;
      case "6":
        viewBookingDetails();
        break;
      case "7":
      case "logout":
        currentAdmin = null;
        console.log("\nAdmin logged out successfully!");
        alert("Admin logged out!");
        adminActive = false;
        break;
      default:
        logWarning("Invalid choice", "Please select a valid option (1-7)");
    }
  }
}

//! ============================================
//!               MAIN APPLICATION
//! ============================================

//* Main application function
function main() {
  console.log("Welcome to BookMyFlight!");
  console.log("=".repeat(50));

  let appRunning = true;

  //^ Main application loop
  while (appRunning) {
    const mainChoice = prompt(
      "BOOKMYFLIGHT - Main Menu\n\n1. Guest Mode\n2. User Login\n3. User Registration\n4. Admin Panel\n5. Delete Account\n6. Exit\n\nEnter choice:",
    );

    switch (mainChoice) {
      case "1":
      case "guest":
        guestMenu();
        break;

      case "2":
      case "login":
        if (userLogin()) {
          userMenu();
        }
        break;

      case "3":
      case "register":
      case "signup":
        userRegistration();
        break;

      case "4":
      case "admin":
        if (adminLogin()) {
          adminMenu();
        }
        break;

      case "5":
      case "delete":
        if (userLogin()) {
          deleteAccount();
        }
        break;

      case "6":
      case "exit":
        const confirmExit = prompt("Are you sure you want to exit? (yes/no)");
        if (confirmExit && confirmExit.toLowerCase() === "yes") {
          console.log("\nThank you for using BookMyFlight!");
          console.log("Have a safe flight!");
          alert("Thank you for using BookMyFlight!\nHave a safe flight!");
          appRunning = false;
        }
        break;

      default:
        logWarning("Invalid option", "Please select a valid option (1-6)");
    }
  }
}

//! ============================================
//!               START APPLICATION
//! ============================================

//* Seed the database, then start the application
initializeDatabase();
main();
