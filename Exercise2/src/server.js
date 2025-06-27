import sequelize from "./db/database.js";
import { Author, Book } from './models/index.js';

try {
  await sequelize.authenticate();
  console.log(" Database connection established successfully.");

  // Sync models
  await sequelize.sync({ force: true }); 
  console.log("Database synchronized successfully.");

  // Create authors
  const ronan = await Author.create({ name: "Ronan The Best", birthYear: 1990 });
  const kim = await Author.create({ name: "Kim Ang", birthYear: 1995 });
  const hok = await Author.create({ name: "Hok Tim", birthYear: 2015 });

  // Create books
  await ronan.createBook({ title: "Sky Fire", publicationYear: 2020, pages: 300 });
  await ronan.createBook({ title: "Ocean Deep", publicationYear: 2021, pages: 250 });

  await kim.createBook({ title: "Dream State", publicationYear: 2019, pages: 200 });
  await kim.createBook({ title: "Night Shift", publicationYear: 2022, pages: 280 });

  await hok.createBook({ title: "Tiny World", publicationYear: 2023, pages: 150 });
  await hok.createBook({ title: "Big Ideas", publicationYear: 2024, pages: 100 });

  console.log("Sample data inserted.");
} catch (error) {
  console.error(" Error during DB setup:", error);
}

const author = await Author.findOne({ where: { name: 'Ronan The Best' } });

if (author) {
  const books = await author.getBooks();
  console.log('Books by', author.name, ':');
  books.forEach(book => console.log(book.title));
} else {
  console.log('Author not found.');
}

const kim = await Author.findOne({ where: { name: 'Kim Ang' } });

if (kim) {
  const newBook = await kim.createBook({
    title: 'Final Dawn',
    publicationYear: 2025,
    pages: 310,
  });
  console.log('New book added:', newBook.title);
}


const authorsWithBooks = await Author.findAll({
  include: Book,
});

authorsWithBooks.forEach(author => {
  console.log(`\nAuthor: ${author.name}`);
  author.Books.forEach(book => {
    console.log(` - ${book.title} (${book.publicationYear}, ${book.pages} pages)`);
  });
});
