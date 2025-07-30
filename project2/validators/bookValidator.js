const { body, validationResult } = require('express-validator');

const bookValidationRules = () => [
  body('title').isString().notEmpty().withMessage('Title is required'),
  body('author').isString().notEmpty().withMessage('Author is required'),
  body('genre').isString().notEmpty().withMessage('Genre is required'),
  body('year').isInt({ min: 0 }).withMessage('Year must be a valid number'),
  body('pages').isInt({ min: 1 }).withMessage('Pages must be a positive integer'),
  body('publisher').optional().isString().withMessage('Publisher must be a string'),
  body('summary').optional().isString().withMessage('Summary must be a string')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
  return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
  bookValidationRules,
  validate
};
