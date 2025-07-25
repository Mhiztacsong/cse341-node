const { ObjectId } = require('mongodb');
const connectToDb = require('../models/db');

// GET all authors
exports.getAllAuthors = async (req, res) => {
  try {
    const db = await connectToDb();
    const authors = await db.collection('authors').find().toArray();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch authors', error: error.message });
  }
};

// GET one author by ID
exports.getAuthorById = async (req, res) => {
  try {
    const db = await connectToDb();
    const author = await db.collection('authors').findOne({ _id: new ObjectId(req.params.id) });

    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving author', error: error.message });
  }
};

// CREATE a new author
exports.createAuthor = async (req, res) => {
  try {
    const { name, age, bio } = req.body;
    const db = await connectToDb();
    const result = await db.collection('authors').insertOne({ name, age, bio });

    res.status(201).json({ _id: result.insertedId, name, age, bio });
  } catch (error) {
    res.status(500).json({ message: 'Error creating author', error: error.message });
  }
};

// UPDATE an author by ID
exports.updateAuthor = async (req, res) => {
  try {
    const { name, age, bio } = req.body;
    const db = await connectToDb();
    const result = await db.collection('authors').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { name, age, bio } }
    );

    if (result.matchedCount === 0) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json({ message: 'Author updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating author', error: error.message });
  }
};

// DELETE an author
exports.deleteAuthor = async (req, res) => {
  try {
    const db = await connectToDb();
    const result = await db.collection('authors').deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting author', error: error.message });
  }
};
