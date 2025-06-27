import Author from './AuthorModel.js';
import Book from './BookModel.js';

Author.hasMany(Book);
Book.belongsTo(Author);

export { Author, Book };

