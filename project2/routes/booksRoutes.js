const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const ensureAuthenticated = require('../middleware/authMiddleware');
const { bookValidationRules, validate } = require('../validators/bookValidator');

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: A list of books.
 */
router.get('/', booksController.getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a single book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single book.
 */
router.get('/:id', booksController.getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - genre
 *               - year
 *               - pages
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               year:
 *                 type: integer
 *               pages:
 *                 type: integer
 *               publisher:
 *                 type: string
 *               summary:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created successfully.
 *       422:
 *         description: Validation error.
 */
router.post('/', ensureAuthenticated, bookValidationRules(), validate, booksController.createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - genre
 *               - year
 *               - pages
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               year:
 *                 type: integer
 *               pages:
 *                 type: integer
 *               publisher:
 *                 type: string
 *               summary:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully.
 *       422:
 *         description: Validation error.
 */
router.put('/:id', ensureAuthenticated, bookValidationRules(), validate, booksController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully.
 */
router.delete('/:id', ensureAuthenticated, booksController.deleteBook);

module.exports = router;
