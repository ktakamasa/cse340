const utilities = require("../utilities/index.js");
const baseController = {};

baseController.buildHome = async (req, res) => {
  const nav = await utilities.getNav();
  // req.flash("notice", "This is a flash message.")
  res.render("index", {
    title: "Home",
    nav,
    errors: null,
  });
};

module.exports = baseController;
