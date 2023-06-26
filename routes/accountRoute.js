// Needed Resources
const accountValidate = require("../utilities/account-validation");
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
  accountValidate.registrationRules(),
  accountValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Process the login attempt
router.post(
  "/login",
  accountValidate.loginRules(),
  accountValidate.checkLoginData,
  (req, res) => {
    res.status(200).send("login process");
  }
);

module.exports = router;
