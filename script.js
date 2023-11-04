let myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;

  this.remove = function () {
    const index = myLibrary.indexOf(this);

    if (index !== -1) {
      myLibrary.splice(index, 1);
      displayBooks();
    }
  };
}
const removalElement = document.getElementById('removal');

function addBookToLibrary(title, author, pages, status) {
  const book = new Book(title, author, pages, status);
  myLibrary.push(book);

  return book;
}

const bookTitleDataElement = document.getElementById('book-title-data');
const bookAuthorDataElement = document.getElementById('book-author-data');
const bookPageDataElement = document.getElementById('book-pages-data');
const bookStatusDataElement = document.getElementById('book-status-data');
const bookRemovalDataElement = document.getElementById('removal-data');

function displayBooks() {
  bookTitleDataElement.innerHTML = '';
  bookAuthorDataElement.innerHTML = '';
  bookPageDataElement.innerHTML = '';
  bookStatusDataElement.innerHTML = '';
  bookRemovalDataElement.innerHTML = '';
  myLibrary.forEach((book) => {
    const deleteButtonElement = document.createElement('p');
    deleteButtonElement.classList.add('book-title-data-script');
    deleteButtonElement.id = 'delete-button-id';
    deleteButtonElement.textContent = 'Remove';
    deleteButtonElement.addEventListener('click', () => {
      book.remove();
      deleteButtonElement.textContent = '';
      if (book.status === 'read') {
        booksRead--;
        totalBooks = booksRead + booksUnread;
        totalBooksElement.textContent = 'TOTAL BOOKS: ' + totalBooks;
        booksReadElement.textContent = 'BOOKS READ: ' + booksRead;
      } else {
        booksUnread--;
        totalBooks = booksRead + booksUnread;
        totalBooksElement.textContent = 'TOTAL BOOKS: ' + totalBooks;
        booksUnreadElement.textContent = 'BOOKS UNREAD: ' + booksUnread;
      }
    });
    const titleOfBook = document.createElement('p');
    titleOfBook.classList.add('book-title-data-script');
    titleOfBook.textContent = book.title;
    bookTitleDataElement.appendChild(titleOfBook);

    const authorOfBook = document.createElement('p');
    authorOfBook.classList.add('book-title-data-script');
    authorOfBook.textContent = book.author;
    bookAuthorDataElement.appendChild(authorOfBook);

    const pagesOfBook = document.createElement('p');
    pagesOfBook.classList.add('book-title-data-script');
    pagesOfBook.textContent = book.pages;
    bookPageDataElement.appendChild(pagesOfBook);

    const statusOfBook = document.createElement('p');
    statusOfBook.classList.add('book-title-data-script');
    statusOfBook.textContent = book.status;
    bookStatusDataElement.appendChild(statusOfBook);

    bookRemovalDataElement.appendChild(deleteButtonElement);
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
  bookTitleDataElement.textContent = '';
  bookAuthorDataElement.textContent = '';
  bookPageDataElement.textContent = '';
  bookStatusDataElement.textContent = '';
  bookRemovalDataElement.textContent = '';
});
