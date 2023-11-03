let myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
  const book = new Book(title, author, pages, status);
  myLibrary.push(book);
  return book;
}

function displayBooks() {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';

  myLibrary.forEach((book) => {
    const li = document.createElement('li');
    li.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.status}`;
    bookList.appendChild(li);
  });
}

const newBookForm = document.getElementById('new-book-form');
let booksRead = 0;
let booksUnread = 0;
let totalBooks = 0;

const totalBooksElement = document.getElementById('total-books');
const booksUnreadElement = document.getElementById('books-unread');
const booksReadElement = document.getElementById('books-read');

newBookForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const bookTitle = document.getElementById('title').value;
  const bookAuthor = document.getElementById('author').value;
  const bookPages = document.getElementById('pages').value;
  const bookStatus = document.getElementById('status').value;

  const newBook = addBookToLibrary(
    bookTitle,
    bookAuthor,
    bookPages,
    bookStatus
  );
  if (bookStatus === 'read') {
    booksRead++;
    totalBooks = booksRead + booksUnread;
    const totalBooksElement = document.getElementById('total-books');
    totalBooksElement.textContent = 'TOTAL BOOKS: ' + totalBooks;

    booksReadElement.textContent = 'BOOKS READ: ' + booksRead;
  } else {
    booksUnread++;
    totalBooks = booksRead + booksUnread;
    totalBooksElement.textContent = 'TOTAL BOOKS: ' + totalBooks;
    booksUnreadElement.textContent = 'BOOKS UNREAD: ' + booksUnread;
  }

  displayBooks();

  newBookForm.reset();
});
const deleteAllElement = document.getElementById('delete-all');
deleteAllElement.addEventListener('click', () => {
  myLibrary = [];
  booksRead = 0;
  booksUnread = 0;
  totalBooks = 0;
  booksReadElement.textContent = 'BOOKS READ: ' + booksRead;
  booksUnreadElement.textContent = 'BOOKS UNREAD: ' + booksUnread;
  totalBooksElement.textContent = 'TOTAL BOOKS: ' + totalBooks;
});