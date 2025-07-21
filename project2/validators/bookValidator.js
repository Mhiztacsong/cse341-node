const { body, validationResult } = require('express-validator');

const bookValidationRules = () => {
  return [
    body('title')
      .isString().withMessage('Title must be a string')
      .trim()
      .notEmpty().withMessage('Title is required')
      .isLength({ min: 5 }).withMessage('Title must be at least 5 characters long'),

    body('author')
      .isString().withMessage('Author must be a string')
      .trim()
      .notEmpty().withMessage('Author is required')
      .isLength({ min: 3 }).withMessage('Author must be at least 3 characters long')
  ];
};

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
