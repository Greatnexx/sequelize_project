import { validationResult, body } from 'express-validator';

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

// Registration Validation
export const validateRegister = [
  body('full_name')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2 })
    .withMessage('Full name must be at least 2 characters'),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  body('phone')
    .notEmpty()
    .withMessage('Phone number is required'),

  handleValidationErrors,
];

// Login Validation
export const validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  handleValidationErrors,
];
