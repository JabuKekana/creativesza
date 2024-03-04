// products.js
const express = require("express");
const router = express.Router();
const pool = require("./db");

// PRODUCTS - ENDPOINT: ADD NEW PRODUCTS
router.post("/", async (req, res) => {
  try {
    const {
      shop_id,
      product_name,
      product_description,
      price,
      productimg_1,
      productimg_2,
      productimg_3,
      is_on_sale = false,
    } = req.body;

    const newProduct = await pool.query(
      "INSERT INTO products (shop_id, product_name, product_description, price, productimg_1, productimg_2, productimg_3, is_on_sale) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [shop_id, product_name, product_description, price, productimg_1, productimg_2, productimg_3, is_on_sale]
    );

    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to create a new product" });
  }
});

// PRODUCTS - ENDPOINT: GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM products");
    res.json(products.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

// PRODUCTS - ENDPOINT: GET PRODUCTS FOR A SPECIFIC SHOP
router.get("/:shop_id", async (req, res) => {
  try {
    const { shop_id } = req.params;
    const products = await pool.query(
      "SELECT * FROM products WHERE shop_id = $1",
      [shop_id]
    );
    res.json(products.rows);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "Failed to retrieve products for the specified shop" });
  }
});

// PRODUCTS - ENDPOINT: UPDATE PRODUCTS
router.put("/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params; 
    console.log("Updating product details for product ID:", product_id);

    const {
      product_name,
      product_description,
      productimg_1,
      productimg_2,
      productimg_3,
      price,
      is_on_sale,
    } = req.body;

    console.log("Received update data:", req.body);

    console.log("Before update query");
    const updatedProduct = await pool.query(
      "UPDATE products SET product_name = $1, product_description = $2, productimg_1 = $3, productimg_2 = $4, productimg_3 = $5, price = $6, is_on_sale = $7 WHERE product_id = $8 RETURNING *",
      [
        product_name,
        product_description,
        productimg_1,
        productimg_2,
        productimg_3,
        price,
        is_on_sale,
        product_id,
      ]
    );

    console.log("After update query", updatedProduct.rows[0]);

    res.json({ message: "Product details updated successfully!", updatedProduct: updatedProduct.rows[0] });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update product details" });
  }
});

// PRODUCTS - ENDPOINT: DELETE PRODUCTS
router.delete("/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    console.log("Deleting product with ID:", product_id);

    await pool.query("DELETE FROM products WHERE product_id = $1", [
      product_id,
    ]);

    console.log("Product deleted successfully!");
    res.json({ message: "Product deleted successfully!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
