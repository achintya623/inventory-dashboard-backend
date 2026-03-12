const { body } = require("express-validator");

exports.categoryCreateRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ max: 100 })
    .withMessage("category name must be at most 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage("Description must be at most 300 characters"),
];

exports.categoryUpdateRules = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category name cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Category name must be at most 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be at most 500 characters"),
];
