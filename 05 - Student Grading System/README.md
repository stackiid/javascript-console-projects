# Student Grading System 🎓

A console-based certificate generator that calculates grades and prints a formatted academic certificate based on entered subject marks.

## Overview

The program collects a student's personal and academic details, then asks for subject marks appropriate to their class level (9–12, following the SSC/HSSC structure). It totals the marks, computes a percentage average, assigns a letter grade, and prints a formatted certificate to the console.

## Why I Built This Project

I built this to practice complex conditional branching driven by real-world rules - different subjects apply depending on class level and group (Medical, Engineering, Computer Science) - along with numeric grading logic and formatted string output.

## Features

- Collects student, parent, institution, and board details
- Supports SSC (class 9/10) and HSSC (class 11/12) mark entry
- Group-based subject selection for HSSC (Medical, Engineering, Computer Science)
- Calculates total marks, percentage average, and letter grade
- Generates a formatted pass/fail certificate in the console

## Technologies Used

- JavaScript (Browser Console)
- `prompt()` / `alert()` for I/O

## JavaScript Concepts Demonstrated

- Variables and data types
- Operators (arithmetic, comparison)
- Conditionals (`if` / `else if` / `else`, nested conditionals)
- String methods (`.trim()`, `.toLowerCase()`, `.toUpperCase()`)
- `parseInt()` / `parseFloat()` with fallback defaults

## Learning Outcomes

This project demonstrates:

- Structuring deeply nested conditional logic without losing track of program flow
- Deriving a grade from a numeric average using threshold-based branching
- Building dynamic, readable output with template literals
- Handling different input requirements based on earlier user answers

## Project Structure

```
05 - Student Grading System/
│
├── main.js
└── README.md
```

`main.js` runs top-to-bottom: it gathers input, branches on class level and group, computes the grade, and prints the certificate.

## How It Works

1. The program collects the student's personal and institutional details.
2. It asks for the class level (9, 10, 11, or 12).
3. Depending on the level (and group, for 11/12), it prompts for the relevant subject marks.
4. It totals the marks and calculates a percentage average.
5. It maps that average to a letter grade and pass/fail status.
6. It prints a formatted certificate with all details and the final result.

## Getting Started

**Prerequisites:** A modern web browser.

```bash
git clone <your-repo-url>
cd "05 - Student Grading System"
```

Open `main.js`, copy its contents into your browser's developer console, and press Enter to run.

## Example Output

```
Board of Intermediate and Secondary Education XYZ, Khyber Pakhtunkhwa, Pakistan

Secondary School Certificate Examination - Annual 2024

This is to certify that JOHN DOE... has passed the Secondary School Certificate Examination...
He/She secured 540 marks out of 600, achieving a Grade 'A' which represents an 'Excellent' performance.
```

## Technical Highlights

- Threshold-based grading logic reused consistently across both SSC and HSSC paths
- Group-aware subject selection (Medical / Engineering / Computer Science)
- Defensive `parseFloat(...) || 0` pattern to prevent `NaN` from breaking totals

## Limitations

- No persistent storage - results aren't saved between sessions
- No input validation beyond basic trimming and numeric parsing
- Certificate is console-only text, not a printable/exportable document

## Future Improvements

- Add stricter input validation (reject out-of-range marks)
- Export the certificate as a downloadable PDF
- Support additional class levels or grading scales

## Skills Demonstrated

- JavaScript Fundamentals
- Conditional Logic
- Data Processing
- String Formatting

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
