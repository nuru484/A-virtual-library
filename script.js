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
      (book) => book.status === "read"
    ).length;
    library.booksUnread = library.books.length - library.booksRead;
    displayBookCounts();
  }
}
function displayBookCounts() {
  totalBooksElement.textContent = "TOTAL BOOKS: " + library.books.length;
  booksReadElement.textContent = "BOOKS READ: " + library.booksRead;
  booksUnreadElement.textContent = "BOOKS UNREAD: " + library.booksUnread;
}

const bookTitleDataElement = document.getElementById("book-title-data");
const bookAuthorDataElement = document.getElementById("book-author-data");
const bookPageDataElement = document.getElementById("book-pages-data");
const bookStatusDataElement = document.getElementById("book-status-data");
const bookRemovalDataElement = document.getElementById("removal-data");

const totalBooksElement = document.getElementById("total-books");
const booksUnreadElement = document.getElementById("books-unread");
const booksReadElement = document.getElementById("books-read");

const library = new Library();
const newBookForm = document.getElementById("new-book-form");

const checkStatus = () => {
  const status = document.getElementById("status").value;

  if (status === "") {
    alert("Please select a valid status");
    return false;
  }
  return true;
};

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
    titleOfBook.textContent = book.title;

    const authorOfBook = document.createElement("p");
    authorOfBook.textContent = book.author;

    const pagesOfBook = document.createElement("p");
    pagesOfBook.textContent = book.pages;

    const statusOfBook = document.createElement("p");
    statusOfBook.textContent = book.status;
    statusOfBook.addEventListener("click", () => {
      book.status = book.status === "Read" ? "Unread" : "Read";
      library.booksRead += book.status === "Read" ? 1 : -1;
      library.booksUnread += book.status === "Unread" ? 1 : -1;
      statusOfBook.textContent = book.status;
      totalBooks = library.booksRead + library.booksUnread;
      displayBookCounts();
    });

    const deleteBook = document.createElement("p");
    deleteBook.textContent = "Remove";
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
