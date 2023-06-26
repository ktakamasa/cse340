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

/* **************************************
 * Add Inventory Validation Rules
 * ************************************ */
validate.addInventoryRules = () => {
  return [
    body("classification_id")
      .notEmpty()
      .withMessage("Please select a classification."),

    body("inv_make")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please provide a valid make."),

    body("inv_model")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please provide a valid model."),

    body("inv_description")
      .trim()
      .notEmpty()
      .withMessage("Please provide a description."),

    body("inv_image")
      .trim()
      .notEmpty()
      .withMessage("Please provide a valid image path."),

    body("inv_thumbnail")
      .trim()
      .notEmpty()
      .withMessage("Please provide a valid thumbnail path."),

    body("inv_price")
      .trim()
      .isNumeric()
      .withMessage("Please provide a valid price."),

    body("inv_year")
      .trim()
      .isNumeric()
      .isLength({ min: 4, max: 4 })
      .withMessage("Please provide a valid year."),

    body("inv_miles")
      .trim()
      .isNumeric()
      .isLength({ min: 1, max: 7 })     
      .withMessage("Please provide a valid mileage."),

    body("inv_color")
      .trim()
      .isAlpha()
      .withMessage("Please provide a valid color."),
  ];
};

/* **************************************
 * Check data and return errors or continue to add inventory
 * ************************************ */
validate.checkInventoryData = async (req, res, next) => {
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
  } = req.body;

  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("inventory/add-inventory", {
      errors,
      title: "Add New Vehicle",
      nav,
      classification_id,
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
    });
    return;
  }
  next();
};

module.exports = validate;
