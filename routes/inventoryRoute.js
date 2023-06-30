// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");
const invValidate = require("../utilities/inventory-validation");

// Route to build inventory by classification view
router.get(
  "/type/:classification_id",
  utilities.handleErrors(invController.buildByClassificationId)
);

// Route to build inventory item details by inv id view
router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildDetailsByInvId)
);

// Route to build vehicle management view
router.get("/", utilities.handleErrors(invController.buildVehicleManagement));

// Route to build add new classification view
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildNewClassification)
);

// Post route to add new classification
router.post(
  "/add-classification",
  invValidate.addClassificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);

// Route to build add new inventory item view
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildNewInventory)
);

// Post route to add new inventory item
router.post(
  "/add-inventory",
  invValidate.addInventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
);

// Get inventory for AJAX route
router.get(
  "/getInventory/:classification_id",
  // utilities.checkAccountType,
  utilities.handleErrors(invController.getInventoryJSON)
);

// route to build edit inventory by inventory id view
router.get(
  "/edit/:inv_id",
  utilities.handleErrors(invController.editInventoryView)
);

module.exports = router;
