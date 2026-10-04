# Student Grading System

![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E)
![Runtime](https://img.shields.io/badge/runtime-browser%20console-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

A certificate generator for the browser console. The program collects a student's details and subject marks for class 9, 10, 11, or 12, calculates a percentage and a letter grade, and prints a formatted examination certificate to the console.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Running the Project](#running-the-project)
- [Inputs](#inputs)
- [Subjects and Marks](#subjects-and-marks)
- [Grading Scale](#grading-scale)
- [Example Output](#example-output)
- [Known Limitations](#known-limitations)
- [License](#license)

## Features

- Collects nine details: full name, father's name, roll number, class, academic session, exam month and year, regular or private status, institution name, and board name
- Subject lists that depend on the class level, with an additional group choice for classes 11 and 12
- Total, percentage, grade, and performance description calculated from the entered marks
- Printed certificate text that states whether the student passed or failed
- Input handling that treats a blank or non-numeric mark as 0 and reports an invalid class

## Tech Stack

| Category | Details |
| --- | --- |
| Language | JavaScript |
| Runtime | Browser developer console |
| Input and output | `prompt()`, `alert()`, `console.log()` |
| Techniques | Conditional branching, string methods (`trim()`, `toLowerCase()`, `toUpperCase()`), template literals, `parseInt()`, `parseFloat()` |

## Project Structure

```text
05 - Student Grading System/
|-- main.js
`-- README.md
```

## Running the Project

1. Open any modern desktop browser.
2. Open the developer tools console (press `F12`, then choose the Console tab).
3. Copy the full contents of `main.js`, paste them into the console, and press Enter.
4. Respond to the `prompt()` dialogs and read the `alert()` dialogs. Additional output is written to the console.

Some browsers ask you to type `allow pasting` before the console accepts pasted code.

The program calls `prompt()` and `alert()`, which are browser functions, so it is meant to run in a browser console rather than in Node.js. There is no package manifest, installation step, build step, or test suite in this project. All data lives in memory and is reset every time the script is run again.

## Inputs

| Prompt | Notes |
| --- | --- |
| Full name, father's name, roll number | Trimmed text |
| Class | `9`, `10`, `11`, or `12`. Any other value shows an error and ends the program |
| Academic session | For example `2024` |
| Exam month and year | For example `March/April 2024` |
| First-time appearance | `yes` is recorded as Regular, `no` as Private, anything else as `---` |
| Institution and board names | Used in the certificate text |
| Group (classes 11 and 12 only) | `medical` or `med`, `engineering` or `eng`, `computer science` or `cs` |

## Subjects and Marks

Maximum marks for each subject are shown in the prompts.

| Class | Subjects asked |
| --- | --- |
| 9 and 10 | English (75), Urdu (75), Islamic Studies (50), Quran Studies (50), Pakistan Studies (50), Mathematics (75), Physics (75), Biology (75), Chemistry (75) |
| 11 and 12 | English (75), Urdu (75), Quran Studies (50), Physics (75), Chemistry (75), plus one group subject: Biology (Medical), Mathematics (Engineering), or Computer Science (75) |
| 11 only | Islamic Studies (50) in addition |
| 12 only | Pakistan Studies (50) in addition |

The subject maximums for classes 9 and 10 add up to 600. The program uses 600 as the total marks for every class.

## Grading Scale

The percentage is `obtained marks * 100 / 600`.

| Percentage | Grade | Description |
| --- | --- | --- |
| 80 and above | A-ONE | Outstanding |
| 70 to below 80 | A | Excellent |
| 60 to below 70 | B | Very Good |
| 50 to below 60 | C | Good |
| 40 to below 50 | D | Fair |
| 33 to below 40 | E | Satisfactory |
| Below 33 | F | Fail |

Every grade except F is reported as passed.

## Example Output

For a class 10 student who scored 446 marks in total, the certificate looks like this (names are illustrative):

```text
Board of Intermediate and Secondary Education Peshawar, Khyber Pakhtunkhwa, Pakistan

Secondary School Certificate Examination - Annual 2024

Roll Number: 1234

This is to certify that ALI RAZA, son of RAZA KHAN, a student of EXAMPLE PUBLIC SCHOOL, has passed the Secondary School Certificate Examination conducted by the Board of Intermediate and Secondary Education, Peshawar, held in March/April 2024, as a Regular candidate.
He/She secured 446 marks out of 600, achieving a Grade 'A' which represents an 'Excellent' performance.
```

For classes 11 and 12 the heading reads Higher Secondary School Certificate Examination, and an extra line states that the examination was taken as a whole.

## Known Limitations

- The total is fixed at 600 for every class. The class 11 and 12 subject maximums add up to 475, so their percentage and grade are calculated against 600.
- The certificate header always includes "Khyber Pakhtunkhwa, Pakistan", regardless of the board name entered.
- Marks are not checked against each subject's maximum, and an entry that is not a number is counted as 0.
- An unrecognized group for class 11 or 12 leaves the obtained marks at 0, which produces a failing certificate.
- Clicking Cancel on a text prompt that is followed by `trim()` raises an error and stops the script.
- The program handles one student per run.

## License

This project is part of a repository licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

Copyright (c) 2026 Ubaid Ahmad

Return to the [repository index](../README.md).
