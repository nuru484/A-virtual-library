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

document.getElementById('add-book').addEventListener('click', () => {
  const title = prompt('Enter the book title:');
  const author = prompt('Enter the author:');
  const pages = prompt('Number of pages');
  const status = prompt('Read or Not read?');
  const newBook = addBookToLibrary(title, author, pages, status);
  displayBooks();
});

displayBooks();
