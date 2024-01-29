class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
  remove() {
    const index = library.books.indexOf(this);
    if (index !== -1) {
      library.books.splice(index, 1);
      displayBooks();
    }
  }
}

class Library {
  constructor() {
    this.books = [];
    this.booksRead = 0;
    this.booksUnread = 0;
  }
  addBookToLibrary(title, author, pages, status) {
    const book = new Book(title, author, pages, status);
    this.books.push(book);
    return book;
  }
  deleteAllBooks() {
    this.books = [];
    this.booksRead = 0;
    this.booksUnread = 0;
    displayBookCounts();
  }
  updateBookCount() {
    library.booksRead = library.books.filter(
      (book) => book.status === "Read"
    ).length;
    library.booksUnread = library.books.length - library.booksRead;
    displayBookCounts();
  }
}

const library = new Library();

const totalBooksElement = document.getElementById("total-books");
const booksUnreadElement = document.getElementById("books-unread");
const booksReadElement = document.getElementById("books-read");

const displayBookCounts = () => {
  totalBooksElement.textContent = "TOTAL BOOKS: " + library.books.length;
  booksReadElement.textContent = "BOOKS READ: " + library.booksRead;
  booksUnreadElement.textContent = "BOOKS UNREAD: " + library.booksUnread;
};

const checkStatus = () => {
  const status = document.getElementById("status").value;
  if (status === "") {
    alert("Please select a valid status");
    return false;
  }
  return true;
};

const newBookForm = document.getElementById("new-book-form");
newBookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (checkStatus()) {
    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const bookPages = document.getElementById("pages").value;
    const bookStatus = document.getElementById("status").value;

    library.addBookToLibrary(bookTitle, bookAuthor, bookPages, bookStatus);
    library.updateBookCount();
    displayBooks();
    newBookForm.reset();
  } else return;
});

const deleteAllElement = document.getElementById("delete-all");
deleteAllElement.addEventListener("click", () => {
  library.deleteAllBooks();
  displayBookCounts();
  displayBooks();
});

function displayBooks() {
  const bookDetailElement = document.getElementById("detail-three");
  bookDetailElement.innerHTML = "";

  library.books.forEach((book) => {
    const bookDetail = document.createElement("div");
    bookDetail.classList.add("book-details");

    const titleOfBook = document.createElement("p");
    titleOfBook.textContent = `Title: ${book.title}`;

    const authorOfBook = document.createElement("p");
    authorOfBook.textContent = `Author: ${book.author}`;

    const pagesOfBook = document.createElement("p");
    pagesOfBook.textContent = `Pages: ${book.pages}`;

    const statusOfBook = document.createElement("img");
    statusOfBook.src = book.status === "Read" ? "checkmark.png" : "close.png";
    statusOfBook.style.width = book.status === "Read" ? "25px" : "25px";

    statusOfBook.addEventListener("click", () => {
      book.status = book.status === "Read" ? "Unread" : "Read";
      library.booksRead += book.status === "Read" ? 1 : -1;
      library.booksUnread += book.status === "Unread" ? 1 : -1;

      statusOfBook.src = book.status === "Read" ? "checkmark.png" : "close.png";
      statusOfBook.style.width = book.status === "Read" ? "25px" : "25px";

      totalBooks = library.booksRead + library.booksUnread;
      displayBookCounts();
    });

    const deleteBook = document.createElement("img");
    deleteBook.src = "delete.png";
    deleteBook.style.width = "20px";
    deleteBook.addEventListener("click", () => {
      book.remove();
      deleteBook.textContent = "";
      library.updateBookCount();
    });
    bookDetail.append(
      titleOfBook,
      authorOfBook,
      pagesOfBook,
      statusOfBook,
      deleteBook
    );

    bookDetailElement.appendChild(bookDetail);
  });
}
