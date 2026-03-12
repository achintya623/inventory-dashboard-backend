const { body } = require("express-validator");

exports.itemCreateRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Item name is required")
    .isLength({ max: 150 })
    .withMessage("Item name must be at most 150 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0"),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be an integer greater than or equal to 0"),

  body("categoryId")
    .notEmpty()
    .withMessage("categoryId is required")
    .isInt()
    .withMessage("categoryId must be an integer"),
];

exports.itemUpdateRules = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Item name cannot be empty")
    .isLength({ max: 150 })
    .withMessage("Item name must be at most 150 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be at most 500 characters"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0"),

  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be an integer greater than or equal to 0"),

  body("categoryId")
    .optional()
    .isInt()
    .withMessage("categoryId must be an integer"),
];
