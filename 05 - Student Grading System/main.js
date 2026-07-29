// Certificate Generator Program

// Introduction & Prompts
alert("Welcome to the Certificate Generator!");

let fullName = prompt("Enter your full name:").trim();
let fatherName = prompt("Enter your father's name:").trim();
let rollNo = prompt("Enter your roll number:").trim();
let level = parseInt(prompt("Enter your class (9, 10, 11, or 12):"));
let session = prompt("Enter your academic session (e.g., 2024):").trim();
let examSession = prompt(
  "Enter the month and year of the exam (e.g., March/April 2024):",
).trim();
let appearance = prompt("Are you appearing for the first time? (yes/no)")
  .toLowerCase()
  .trim();
let academiaName = prompt("Enter your institution's name:").trim();
let boardName = prompt("Enter your board's name:").trim();

let certificate = "";
let english,
  urdu,
  islamicStudies,
  quranStudies,
  pakStudies,
  maths,
  physics,
  biology,
  chemistry,
  computerScience;
let totalMarks = 600;
let obtMarks = 0;
let avg = 0;
let grade = "";
let representation = "";
let condition = "";

// Appearance Status
if (appearance === "yes") {
  appearance = "Regular";
} else if (appearance === "no") {
  appearance = "Private";
} else {
  appearance = "---";
}

// SSC (Class 9 or 10)
if (level === 9 || level === 10) {
  alert("Please enter your subject marks (max marks shown):");

  english = parseFloat(prompt("English (75):")) || 0;
  urdu = parseFloat(prompt("Urdu (75):")) || 0;
  islamicStudies = parseFloat(prompt("Islamic Studies (50):")) || 0;
  quranStudies = parseFloat(prompt("Quran Studies (50):")) || 0;
  pakStudies = parseFloat(prompt("Pakistan Studies (50):")) || 0;
  maths = parseFloat(prompt("Mathematics (75):")) || 0;
  physics = parseFloat(prompt("Physics (75):")) || 0;
  biology = parseFloat(prompt("Biology (75):")) || 0;
  chemistry = parseFloat(prompt("Chemistry (75):")) || 0;

  obtMarks =
    english +
    urdu +
    islamicStudies +
    quranStudies +
    pakStudies +
    maths +
    physics +
    biology +
    chemistry;
  avg = (obtMarks * 100) / totalMarks;

  if (avg >= 80) {
    grade = "A-ONE";
    representation = "Outstanding";
    condition = "passed";
  } else if (avg >= 70) {
    grade = "A";
    representation = "Excellent";
    condition = "passed";
  } else if (avg >= 60) {
    grade = "B";
    representation = "Very Good";
    condition = "passed";
  } else if (avg >= 50) {
    grade = "C";
    representation = "Good";
    condition = "passed";
  } else if (avg >= 40) {
    grade = "D";
    representation = "Fair";
    condition = "passed";
  } else if (avg >= 33) {
    grade = "E";
    representation = "Satisfactory";
    condition = "passed";
  } else {
    grade = "F";
    representation = "Fail";
    condition = "failed";
  }

  certificate = `Secondary School Certificate Examination - Annual ${session}`;

  console.log(
    `\nBoard of Intermediate and Secondary Education ${boardName}, Khyber Pakhtunkhwa, Pakistan`,
  );
  console.log(`\n${certificate}`);
  console.log(`\nRoll Number: ${rollNo}`);
  console.log(
    `\nThis is to certify that ${fullName.toUpperCase()}, son of ${fatherName.toUpperCase()}, a student of ${academiaName.toUpperCase()}, has ${condition} the Secondary School Certificate Examination conducted by the Board of Intermediate and Secondary Education, ${boardName}, held in ${examSession}, as a ${appearance} candidate.`,
  );
  console.log(
    `He/She secured ${obtMarks} marks out of ${totalMarks}, achieving a Grade '${grade}' which represents an '${representation}' performance.`,
  );
}

// HSSC (Class 11 or 12)
else if (level === 11 || level === 12) {
  let group = prompt(
    "Enter your group (Medical / Engineering / Computer Science):",
  )
    .toLowerCase()
    .trim();

  alert("Please enter your subject marks (max marks shown):");

  english = parseFloat(prompt("English (75):")) || 0;
  urdu = parseFloat(prompt("Urdu (75):")) || 0;
  quranStudies = parseFloat(prompt("Quran Studies (50):")) || 0;
  physics = parseFloat(prompt("Physics (75):")) || 0;
  chemistry = parseFloat(prompt("Chemistry (75):")) || 0;

  if (group === "medical" || group === "med") {
    biology = parseFloat(prompt("Biology (75):")) || 0;
    if (level === 11) {
      islamicStudies = parseFloat(prompt("Islamic Studies (50):")) || 0;
      obtMarks =
        english +
        urdu +
        islamicStudies +
        quranStudies +
        physics +
        biology +
        chemistry;
    } else {
      pakStudies = parseFloat(prompt("Pakistan Studies (50):")) || 0;
      obtMarks =
        english +
        urdu +
        quranStudies +
        pakStudies +
        physics +
        biology +
        chemistry;
    }
  } else if (group === "engineering" || group === "eng") {
    maths = parseFloat(prompt("Mathematics (75):")) || 0;
    if (level === 11) {
      islamicStudies = parseFloat(prompt("Islamic Studies (50):")) || 0;
      obtMarks =
        english +
        urdu +
        islamicStudies +
        quranStudies +
        physics +
        maths +
        chemistry;
    } else {
      pakStudies = parseFloat(prompt("Pakistan Studies (50):")) || 0;
      obtMarks =
        english +
        urdu +
        quranStudies +
        pakStudies +
        physics +
        maths +
        chemistry;
    }
  } else if (group === "computer science" || group === "cs") {
    computerScience = parseFloat(prompt("Computer Science (75):")) || 0;
    if (level === 11) {
      islamicStudies = parseFloat(prompt("Islamic Studies (50):")) || 0;
      obtMarks =
        english +
        urdu +
        islamicStudies +
        quranStudies +
        physics +
        computerScience +
        chemistry;
    } else {
      pakStudies = parseFloat(prompt("Pakistan Studies (50):")) || 0;
      obtMarks =
        english +
        urdu +
        quranStudies +
        pakStudies +
        physics +
        computerScience +
        chemistry;
    }
  }

  avg = (obtMarks * 100) / totalMarks;

  if (avg >= 80) {
    grade = "A-ONE";
    representation = "Outstanding";
    condition = "passed";
  } else if (avg >= 70) {
    grade = "A";
    representation = "Excellent";
    condition = "passed";
  } else if (avg >= 60) {
    grade = "B";
    representation = "Very Good";
    condition = "passed";
  } else if (avg >= 50) {
    grade = "C";
    representation = "Good";
    condition = "passed";
  } else if (avg >= 40) {
    grade = "D";
    representation = "Fair";
    condition = "passed";
  } else if (avg >= 33) {
    grade = "E";
    representation = "Satisfactory";
    condition = "passed";
  } else {
    grade = "F";
    representation = "Fail";
    condition = "failed";
  }

  certificate = `Higher Secondary School Certificate Examination – Annual ${session}`;

  console.log(
    `\nBoard of Intermediate and Secondary Education ${boardName}, Khyber Pakhtunkhwa, Pakistan`,
  );
  console.log(`\n${certificate}`);
  console.log(`\nRoll Number: ${rollNo}`);
  console.log(
    `\nThis is to certify that ${fullName.toUpperCase()}, son of ${fatherName.toUpperCase()}, a student of ${academiaName.toUpperCase()}, has ${condition} the Higher Secondary School Certificate Examination conducted by the Board of Intermediate and Secondary Education, ${boardName}, held in ${examSession}, as a ${appearance} candidate.`,
  );
  console.log(
    `He/She secured ${obtMarks} marks out of ${totalMarks}, achieving a Grade '${grade}' which represents an '${representation}' performance.`,
  );
  console.log(`The examination was taken as a whole.`);
}

// Invalid Class
else {
  alert("Invalid class entered. Please enter 9, 10, 11, or 12.");
}
