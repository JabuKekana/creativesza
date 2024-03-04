// shops.js
const express = require("express");
const router = express.Router();
const pool = require("./db");

// SHOP - ENDPOINT: CREATE NEW SHOP
router.post("/", async (req, res) => {
  try {
    const {
      shop_name,
      shop_about,
      shop_description,
      owner_name,
      owner_email,
      owner_phone,
      shop_address,
      shop_image,
      shop_background,
    } = req.body;

    const newShop = await pool.query(
      "INSERT INTO shops (shop_name, shop_description, shop_about, owner_name, owner_email, owner_phone, shop_address, shop_image, shop_background) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        shop_name,
        shop_description,
        shop_about,
        owner_name,
        owner_email,
        owner_phone,
        shop_address,
        shop_image,
        shop_background,
      ]
    );

    res.json(newShop.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to create a new shop" });
  }
});

// SHOP - ENDPOINT: DELETE SHOP
router.delete("/:shop_id", async (req, res) => {
  try {
    const { shop_id } = req.params;
    console.log("Deleting shop with ID:", shop_id);

    // Check if the shop with the given ID exists before deleting
    const shop = await pool.query("SELECT * FROM shops WHERE shop_id = $1", [shop_id]);
    if (shop.rows.length === 0) {
      return res.status(404).json({ error: "Shop not found" });
    }

    // Delete associated products first
    await pool.query("DELETE FROM products WHERE shop_id = $1", [shop_id]);

    // Delete associated reviews
    await pool.query("DELETE FROM reviews WHERE shop_id = $1", [shop_id]);

    // Then delete the shop
    const deletedShop = await pool.query(
      "DELETE FROM shops WHERE shop_id = $1 RETURNING *",
      [shop_id]
    );

    console.log("Shop deleted successfully!");
    res.json({ message: "Shop deleted successfully!", deletedShop: deletedShop.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete shop" });
  }
});


// SHOP - ENDPOINT:  GET ALL SHOPS
router.get("/", async (req, res) => {
  try {
    const shops = await pool.query("SELECT * FROM shops");
    res.json(shops.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve shops" });
  }
});

// SHOP - ENDPOINT:  Get shop details by shop ID
router.get("/:shop_id", async (req, res) => {
  try {
    const { shop_id } = req.params;
    console.log("Received shop ID:", shop_id);
    const shop = await pool.query("SELECT * FROM shops WHERE shop_id = $1", [
      shop_id,
    ]);
    console.log("Retrieved shop details:", shop.rows[0]);
    res.json(shop.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve shop details" });
  }
});

// SHOP - ENDPOINT: UPDATE SHOPS DETAILS:
router.put("/:shop_id", async (req, res) => {
  try {
    const { shop_id } = req.params;
    console.log("Updating shop details for shop ID:", shop_id);

    const {
      shop_name,
      shop_description,
      owner_name,
      owner_email,
      shop_about,
      owner_phone,
      shop_address,
      shop_image,
      shop_background,
    } = req.body;

    console.log("Received update data:", req.body);

    console.log("Before update query");
    const updatedShop = await pool.query(
      "UPDATE shops SET shop_name = $1, shop_description = $2, owner_name = $3, owner_email = $4, shop_about = $5, owner_phone = $6, shop_address = $7, shop_image = $8, shop_background = $9 WHERE shop_id = $10 RETURNING *",
      [
        shop_name,
        shop_description,
        owner_name,
        owner_email,
        shop_about,
        owner_phone,  
        shop_address,
        shop_image,
        shop_background,
        shop_id,
      ]
    );

    console.log("After update query", updatedShop.rows[0]);
    
    res.json({ message: "Shop details updated successfully!", updatedShop: updatedShop.rows[0] });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update shop details" });
  }
});

module.exports = router;
