let books = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    ISBN: "9780061120081",
    borrowed: false,
  },
  {
    title: "1984",
    author: "George Orwell",
    ISBN: "9781940177173",
    borrowed: false,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    ISBN: "9781801837481",
    borrowed: false,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    ISBN: "9781853260505",
    borrowed: false,
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    ISBN: "9780241950432",
    borrowed: false,
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    ISBN: "9780261102384",
    borrowed: false,
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    ISBN: "9780439023511",
    borrowed: false,
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    ISBN: "9780062315002",
    borrowed: false,
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    ISBN: "9780307474278",
    borrowed: false,
  },
  {
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    ISBN: "9780307949486",
    borrowed: false,
  },
  {
    title: "The Notebook",
    author: "Nicholas Sparks",
    ISBN: "9781455582877",
    borrowed: false,
  },
  {
    title: "The Fault in Our Stars",
    author: "John Green",
    ISBN: "9780525478812",
    borrowed: true,
  },
];

// Display all books
function displayBooks() {
  alert("All books are now visible on your screen...");
  console.log(
    "========== THESE ARE THE AVAILABLE BOOKS ==========".toUpperCase(),
  );
  console.log("\n");

  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    console.log(`● Title      : ${book.title}`);
    console.log(`● Author     : ${book.author}`);
    console.log(`● ISBN       : ${book.ISBN}`);
    console.log(`● Status     : ${book.borrowed ? "Borrowed" : "Available"}`);
    console.log("\n");
  }
}

// Generate random ISBN
function generateISBN() {
  let isbn = "978";
  for (let i = 0; i < 10; i++) {
    isbn += Math.floor(Math.random() * 10);
  }
  return isbn;
}

// Add a new book
function addBook() {
  let title = prompt("Enter the book title:");
  let author = prompt("Enter the author's name:");
  let isbn = generateISBN();

  books.push({ title, author, ISBN: isbn, borrowed: false });
  alert(
    `✅ Book added successfully!\nTitle: ${title}\nAuthor: ${author}\nISBN: ${isbn}\nStatus: Available`,
  );
}

// Borrow a book
function borrowBook() {
  let isbn = prompt("Enter the ISBN of the book you want to borrow:");
  let bookFound = false;

  for (let i = 0; i < books.length; i++) {
    if (books[i].ISBN === isbn) {
      bookFound = true;
      if (!books[i].borrowed) {
        books[i].borrowed = true;
        alert(`"${books[i].title}" has been checked out to you.`);
      } else {
        alert(
          "This book is already borrowed. Please contact the admin for details.",
        );
      }
      break;
    }
  }

  if (!bookFound) {
    alert("ISBN not recognized or book not found!");
  }
}

// Return a book
function returnBook() {
  let isbn = prompt("Enter the ISBN of the book you want to return:");
  let bookFound = false;

  for (let i = 0; i < books.length; i++) {
    if (books[i].ISBN === isbn) {
      bookFound = true;
      if (books[i].borrowed) {
        books[i].borrowed = false;
        alert(`"${books[i].title}" has been returned. Thank you!`);
      } else {
        alert("This book is already available in the library.");
      }
      break;
    }
  }

  if (!bookFound) {
    alert("ISBN not recognized or book not found!");
  }
}

// Start the library system
function systemStart() {
  let running = true;
  while (running) {
    let choice = prompt(
      `--- LIBRARY SYSTEM ---
1. Search/Borrow Book
2. Return Book
3. Add Book
4. View Catalog
5. Shutdown System`,
    );

    switch (choice) {
      case "1":
        borrowBook();
        break;
      case "2":
        returnBook();
        break;
      case "3":
        addBook();
        break;
      case "4":
        displayBooks();
        break;
      case "5":
        running = false;
        alert("System shutting down. Goodbye!");
        break;
      default:
        alert("Invalid option! Please try again.");
    }
  }
}

systemStart();
