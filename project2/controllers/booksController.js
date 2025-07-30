const { ObjectId } = require('mongodb');
const connectToDb = require('../models/db');

// GET all books
exports.getAllBooks = async (req, res) => {
  try {
    const db = await connectToDb();
    const books = await db.collection('books').find().toArray();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error: error.message });
  }
};

// GET one book by ID
exports.getBookById = async (req, res) => {
  try {
    const db = await connectToDb();
    const book = await db.collection('books').findOne({ _id: new ObjectId(req.params.id) });

    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving book', error: error.message });
  }
};

// CREATE a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, year, pages, publisher, summary } = req.body;
    const db = await connectToDb();
    const result = await db.collection('books').insertOne({ title, author, genre, year, pages, publisher, summary });
    res.status(201).json({ _id: result.insertedId, title, author, genre, year, pages, publisher, summary });
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
};

// UPDATE a book by ID
exports.updateBook = async (req, res) => {
  try {
    const { title, author, genre, year, pages, publisher, summary } = req.body;
    const db = await connectToDb();
    const result = await db.collection('books').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { title, author, genre, year, pages, publisher, summary } }
    );

    if (result.matchedCount === 0) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
};

// DELETE a book
exports.deleteBook = async (req, res) => {
  try {
    const db = await connectToDb();
    const result = await db.collection('books').deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
};
