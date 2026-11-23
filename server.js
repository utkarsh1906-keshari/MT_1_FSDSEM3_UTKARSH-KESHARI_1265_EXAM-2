const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'Malformed JSON payload. Please verify your request body.'
    });
  }
  next();
});


let books = [
  {
    id: 101,
    title: "Wings of Fire",
    author: "A.P.J. Abdul Kalam",
    genre: "Autobiography",
    publishedYear: 1999,
    available: true
  },
  {
    id: 102,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    publishedYear: 1988,
    available: true
  },
  {
    id: 103,
    title: "Harry Potter",
    author: "J.K. Rowling",
    genre: "Fantasy",
    publishedYear: 1997,
    available: false
  }
];


function validateBook(data) {
  if (!data || typeof data !== 'object') {
    return { isValid: false, message: "Request body cannot be empty." };
  }

  const { title, author, genre, publishedYear, available } = data;

  if (typeof title !== 'string' || title.trim() === '') {
    return { isValid: false, message: "Field 'title' is required and must be a non-empty string." };
  }

  if (typeof author !== 'string' || author.trim() === '') {
    return { isValid: false, message: "Field 'author' is required and must be a non-empty string." };
  }

  if (typeof genre !== 'string' || genre.trim() === '') {
    return { isValid: false, message: "Field 'genre' is required and must be a non-empty string." };
  }

  if (typeof publishedYear !== 'number' || isNaN(publishedYear) || !Number.isInteger(publishedYear)) {
    return { isValid: false, message: "Field 'publishedYear' is required and must be a valid numeric integer year." };
  }

  if (typeof available !== 'boolean') {
    return { isValid: false, message: "Field 'available' is required and must be a boolean (true or false)." };
  }

  return { isValid: true };
}


app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to the Library Book Management API (SET A)",
    endpoints: {
      getAllBooks: "GET /api/books",
      createBook: "POST /api/books",
      filterByAuthor: "GET /api/books/filter?author=value",
      getBookById: "GET /api/books/:id",
      updateBook: "PUT /api/books/:id",
      deleteBook: "DELETE /api/books/:id"
    }
  });
});


app.get('/api/books', (req, res) => {
  return res.status(200).json(books);
});


app.post('/api/books', (req, res) => {
  const validation = validateBook(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.message });
  }

  const newId = books.length > 0 
    ? Math.max(...books.map(book => book.id)) + 1 
    : 101;

  const newBook = {
    id: newId,
    title: req.body.title.trim(),
    author: req.body.author.trim(),
    genre: req.body.genre.trim(),
    publishedYear: req.body.publishedYear,
    available: req.body.available
  };

  books.push(newBook);

  return res.status(201).json(newBook);
});


app.get('/api/books/filter', (req, res) => {
  const authorQuery = req.query.author;

  if (!authorQuery || typeof authorQuery !== 'string' || authorQuery.trim() === '') {
    return res.status(400).json({
      error: "Query parameter 'author' is required. Example: /api/books/filter?author=Paulo"
    });
  }

  const searchKey = authorQuery.trim().toLowerCase();
  const matchingBooks = books.filter(book =>
    book.author.toLowerCase().includes(searchKey)
  );

  return res.status(200).json(matchingBooks);
});


app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);

  if (isNaN(bookId)) {
    return res.status(400).json({ error: "Invalid book ID. ID must be a numeric integer." });
  }

  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).json(book);
});


app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);

  if (isNaN(bookId)) {
    return res.status(400).json({ error: "Invalid book ID. ID must be a numeric integer." });
  }

  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const validation = validateBook(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.message });
  }

  books[bookIndex] = {
    id: bookId, 
    title: req.body.title.trim(),
    author: req.body.author.trim(),
    genre: req.body.genre.trim(),
    publishedYear: req.body.publishedYear,
    available: req.body.available
  };

  return res.status(200).json(books[bookIndex]);
});


app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);

  if (isNaN(bookId)) {
    return res.status(400).json({ error: "Invalid book ID. ID must be a numeric integer." });
  }

  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = books.splice(bookIndex, 1)[0];

  return res.status(200).json({
    message: "Book deleted successfully",
    deletedBook: deletedBook
  });
});


app.use((req, res) => {
  return res.status(404).json({ error: "Route not found" });
});


if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
