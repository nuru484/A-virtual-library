console.log('hello world');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.bookInfo = function () {
    return (
      this.title +
      ' by ' +
      this.author +
      ', ' +
      this.pages +
      ' pages, ' +
      this.read
    );
  };
}
const book1 = new Book('Ego is the enemy', 'Nurudeen', 100, 'Read');
console.log(book1.title);
console.log(book1.bookInfo());
