const booksRepository = require('./books-repository');

async function getBooks() {
  return booksRepository.getBooks();
}

async function getBook(id) {
  return booksRepository.getBook(id);
}

async function bookExists(title) {
  const bookId = await booksRepository.getBookByTitle(title);
  return !!bookId;
}

async function updateBook(id, title) {
  return booksRepository.updateBook(id, title);
}

async function create(title) {
  return booksRepository.create(title);
}

async function deleteBook(id) {
  return booksRepository.deleteBook(id);
}

module.exports = {
  getBooks,
  getBook,
  bookExists,
  updateBook,
  create,
  deleteBook,
};
