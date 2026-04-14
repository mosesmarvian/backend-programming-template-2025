const { Books } = require('../../../models');

async function getBooks() {
  return Books.find({});
}

async function getBook(id) {
  return Books.getBook(id);
}

async function getBookByTitle(title) {
  return Books.findONe({ title });
}

async function updateBook(id, title) {
  return Books.updateOne({ _id: id }, { $set: { title } });
}

async function create(title) {
  return Books.create({ title });
}

async function deleteBook(id) {
  return Books.deleteONe({ _id: id });
}

module.exports = {
  getBooks,
  getBook,
  getBookByTitle,
  updateBook,
  create,
  deleteBook,
};
