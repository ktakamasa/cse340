const pool = require("../database/index.js");

/* ***************************
 *  Get all classification data - For Nav
 * ************************** */
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  );
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id - For classification views
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getInventoryByClassificationId error " + error);
  }
}

/* ***************************
 *  Get inventory item details by inv_id - For details view
 * ************************** */
async function getInventoryByInvId(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i
      WHERE i.inv_id = $1`,
      [inv_id]
    );
    return data.rows;
  } catch (err) {
    console.error("getInventoryByInvId error " + err);
  }
}

/* ***************************
 *  Add new to classification table
 * ************************** */
async function addClassification(classification_name) {
  try {
    const addClassificationQuery =
      "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *";
    return await pool.query(addClassificationQuery, [classification_name]);
  } catch (error) {
    return error.message;
  }
}

/* ***************************
 *  Add new vehicle to inventory table
 * ************************** */
async function addVehicleToInventory(
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
) {
  try {
    const addVehicleQuery =
      "INSERT INTO public.inventory (classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
    return await pool.query(addVehicleQuery, [
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
    ]);
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryByInvId,
  addClassification,
  addVehicleToInventory,
};
