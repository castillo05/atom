import { body, param } from 'express-validator';

export const userValidators = {
  findByEmail: [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address'),
  ],
  create: [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address'),
  ],
};

export const taskValidators = {
  getTasks: [
    param('userId')
      .isString()
      .withMessage('User ID must be a string'),
  ],
  create: [
    body('userId')
      .isString()
      .withMessage('User ID must be a string'),
    body('title')
      .isString()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Title must be between 1 and 100 characters'),
    body('description')
      .isString()
      .trim()
      .isLength({ min: 1, max: 500 })
      .withMessage('Description must be between 1 and 500 characters'),
  ],
  update: [
    param('id')
      .isString()
      .withMessage('Task ID must be a string'),
    body('title')
      .optional()
      .isString()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Title must be between 1 and 100 characters'),
    body('description')
      .optional()
      .isString()
      .trim()
      .isLength({ min: 1, max: 500 })
      .withMessage('Description must be between 1 and 500 characters'),
    body('completed')
      .optional()
      .isBoolean()
      .withMessage('Completed must be a boolean'),
  ],
  delete: [
    param('id')
      .isString()
      .withMessage('Task ID must be a string'),
  ],
};
