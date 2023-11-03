const myLibrary = [];

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
  displayBooks();

  newBookForm.reset();
});
