// Needed Resources
const regValidate = require("../utilities/account-validation");
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities");

// Route to build account login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route to build login view
router.get(
  "/registration",
  utilities.handleErrors(accountController.buildRegister)
);

// Process Registration Data
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

module.exports = router;
