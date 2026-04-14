const booksService = require('./books-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getBooks(request, response, next) {
  try {
    const books = await booksService.getBooks();

    return response.status(200).json(books);
  } catch (error) {
    return next(error);
  }
}

async function getBook(request, response, next) {
  try {
    const books = await booksService.getBook(request.params.id);

    if (!books) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Book not found');
    }
    return response.status(200).json(books);
  } catch (error) {
    return next(error);
  }
}

async function createBook(request, response, next) {
  try {
    const { title } = request.body;

    if (!title) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Title is required');
    }

    if (await booksService.emailExists(title)) {
      throw errorResponder(
        errorTypes.BOOK_ALREADY_TAKEN,
        'Book already exists'
      );
    }

    const success = await booksService.create(title);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create book'
      );
    }

    return response.status(200).json({ message: 'Book created successfully' });
  } catch (error) {
    return next(error);
  }
}

async function updateBook(request, response, next) {
  try {
    const { title } = request.body;

    const bookId = await booksService.getBook(request.params.id);
    if (!bookId) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Book not found');
    }
    const success = await booksService.updateUser(request.params.id, title);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update book'
      );
    }
    return response.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    return next(error);
  }
}

async function deleteBook(request, response, next) {
  try {
    const success = await booksService.deleteBook(request.params.id);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete book'
      );
    }

    return response.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
