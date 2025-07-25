const { body, validationResult } = require('express-validator');

const authorValidationRules = () => {
  return [
    body('name')
      .trim()
      .isString().withMessage('Name must be a string')
      .notEmpty().withMessage('Name is required'),

    body('age')
      .notEmpty().withMessage('Age is required')
      .isInt({ min: 1 }).withMessage('Age must be a positive number'),
    
    body('bio')
      .isString().withMessage('Bio must be a string')
      .notEmpty().withMessage('Bio is required')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
  return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
  authorValidationRules,
  validate
};

