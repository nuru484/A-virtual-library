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

newBookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const bookTitle = document.getElementById("title").value;
  const bookAuthor = document.getElementById("author").value;
  const bookPages = document.getElementById("pages").value;
  const bookStatus = document.getElementById("status").value;

  library.addBookToLibrary(bookTitle, bookAuthor, bookPages, bookStatus);
  library.updateBookCount();
  displayBooks();

  newBookForm.reset();
});

const deleteAllElement = document.getElementById("delete-all");

deleteAllElement.addEventListener("click", () => {
  library.deleteAllBooks();
  displayBookCounts();
  displayBooks();
});

function displayBooks() {
  bookTitleDataElement.innerHTML = "";
  bookAuthorDataElement.innerHTML = "";
  bookPageDataElement.innerHTML = "";
  bookStatusDataElement.innerHTML = "";
  bookRemovalDataElement.innerHTML = "";

  library.books.forEach((book) => {
    const deleteButtonElement = document.createElement("p");
    deleteButtonElement.classList.add("book-title-data-script");
    deleteButtonElement.id = "delete-button-id";
    deleteButtonElement.textContent = "Remove";
    deleteButtonElement.addEventListener("click", () => {
      book.remove();
      deleteButtonElement.textContent = "";

      library.updateBookCount();
    });

    const titleOfBook = document.createElement("p");
    titleOfBook.classList.add("book-title-data-script");
    titleOfBook.textContent = book.title;
    bookTitleDataElement.appendChild(titleOfBook);

    const authorOfBook = document.createElement("p");
    authorOfBook.classList.add("book-title-data-script");
    authorOfBook.textContent = book.author;
    bookAuthorDataElement.appendChild(authorOfBook);

    const pagesOfBook = document.createElement("p");
    pagesOfBook.classList.add("book-title-data-script");
    pagesOfBook.textContent = book.pages;
    bookPageDataElement.appendChild(pagesOfBook);

    const statusOfBook = document.createElement("p");
    statusOfBook.classList.add("book-status-data-script");
    statusOfBook.textContent = book.status;

    statusOfBook.addEventListener("click", () => {
      if (book.status === "read") {
        book.status = "unread";
        if (library.booksRead > 0) {
          library.booksRead--;
        }
        library.booksUnread++;
      } else {
        book.status = "read";
        library.booksRead++;
        if (library.booksUnread > 0) {
          library.booksUnread--;
        }
      }

      statusOfBook.textContent = book.status;

      totalBooks = library.booksRead + library.booksUnread;
      displayBookCounts();
    });

    bookStatusDataElement.appendChild(statusOfBook);
    bookRemovalDataElement.appendChild(deleteButtonElement);
  });
}
