const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    errors: null,
  });
};

/* ***************************
 *  Build inventory item details by inv id view
 * ************************** */
invCont.buildDetailsByInvId = async function (req, res, next) {
  const invId = req.params.invId;
  const data = await invModel.getInventoryByInvId(invId);
  // console.log(data);
  const invDetailsView = await utilities.buildDetails(data[0]);
  let nav = await utilities.getNav();
  const yearMakeMod =
    data[0].inv_year + " " + data[0].inv_make + " " + data[0].inv_model;
  res.render("./inventory/details", {
    title: yearMakeMod,
    nav,
    invDetailsView,
    errors: null,
  });
};

/* ***************************
 *  Build Vehicle Management view
 * ************************** */
invCont.buildVehicleManagement = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
  });
};

/* ***************************
 *  Build Add New Classification view
 * ************************** */
invCont.buildNewClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  });
};

/* ******************************
 * Process add classification
 * ***************************** */
invCont.addClassification = async function (req, res) {
  let nav = await utilities.getNav();
  const { classification_name } = req.body;

  const classificationResult = await invModel.addClassification(
    classification_name
  );

  if (classificationResult) {
    let nav = await utilities.getNav();
    req.flash(
      "notice",
      `The "${classification_name}" classification was successfully added.`
    );
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    });
  } else {
    req.flash("notice", "Sorry, the classification was not added.");
    res.status(501).render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: null,
    });
  }
};

/* ******************************
 * Build add new inventory view
 * ***************************** */
invCont.buildNewInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("./inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    errors: null,
  });
};

/* ******************************
 * Process add inventory
 * ***************************** */
invCont.addInventory = async function (req, res) {
  let nav = await utilities.getNav();
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
    inv_color
  } = req.body;

  const inventoryResult = await invModel.addInventory(
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color
  );

  if (inventoryResult) {
    req.flash(
      "notice",
      `The ${inv_year} ${inv_model} ${inv_make} was successfully added.`
    );
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    });
  } else {
    req.flash("notice", "Sorry, the vehicle was not added.");
    res.status(501).render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      errors: null,
    });
  }
};

module.exports = invCont;
