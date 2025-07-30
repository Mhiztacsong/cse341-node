// routes/authors.js
const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authorsController');
const ensureAuthenticated = require('../middleware/authMiddleware');
const { authorValidationRules, validate } = require('../validators/authorValidator');

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     responses:
 *       200:
 *         description: A list of authors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   age:
 *                     type: integer
 *                   bio:
 *                     type: string
 */
router.get('/', authorsController.getAllAuthors);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get a single author by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single author.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 bio:
 *                   type: string
 */
router.get('/:id', authorsController.getAuthorById);

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - bio
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               bio:
 *                 type: string
 *     responses:
 *       201:
 *         description: Author created successfully.
 *       422:
 *         description: Validation error.
 */
router.post('/', ensureAuthenticated, authorValidationRules(), validate, authorsController.createAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author by ID
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
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Author updated successfully.
 *       422:
 *         description: Validation error.
 */
router.put('/:id', ensureAuthenticated, authorValidationRules(), validate, authorsController.updateAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author deleted successfully.
 */
router.delete('/:id', ensureAuthenticated, authorsController.deleteAuthor);

module.exports = router;
