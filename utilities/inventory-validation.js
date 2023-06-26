const inventoryModel = require("../models/inventory-model");
const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validate = {};

/* **************************************
 * Add Classification Validation Rules
 * ************************************ */
validate.addClassificationRules = () => {
  return [
    // classification_name is required and must be string using only alphabetic characters
    body("classification_name")
      .trim()
      .isLength({ min: 1 })
      .isAlpha()
      .withMessage("Please provide a valid classification name."),
    
  ];
};

/* ******************************
 * Check data and return errors or continue to add classification
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      errors,
      title: "Add New Classification",
      nav,
      classification_name,
    });
    return;
  }
  next();
};

module.exports = validate;
