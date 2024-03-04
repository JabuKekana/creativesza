// reviews.js
const express = require("express");
const router = express.Router();
const pool = require("./db");

// REVIEWS - ENDPOINT: ADD NEW REVIEW
router.post("/", async (req, res) => {
  try {
    const { shop_id, review_user, review_email, review_text, rating } = req.body;

    const newReview = await pool.query(
      "INSERT INTO reviews (shop_id, review_user, review_email, review_text, rating) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [shop_id, review_user, review_email, review_text, rating]
    );

    res.json(newReview.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to add a new review" });
  }
});

// REVIEWS - ENDPOINT: GET REVIEWS BY SHOP ID
router.get("/:shop_id", async (req, res) => {
  try {
    const { shop_id } = req.params;
    const reviews = await pool.query(
      "SELECT * FROM reviews WHERE shop_id = $1",
      [shop_id]
    );
    res.json(reviews.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve reviews for the specified shop" });
  }
});

// REVIEWS - ENDPOINT: DELETE REVIEW
router.delete("/:review_id", async (req, res) => {
  try {
    const { review_id } = req.params;
    console.log("Deleting review with ID:", review_id);

    const deletedReview = await pool.query(
      "DELETE FROM reviews WHERE review_id = $1 RETURNING *",
      [review_id]
    );

    console.log("Review deleted successfully!");
    res.json({ message: "Review deleted successfully!", deletedReview: deletedReview.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete review" });
  }
});

module.exports = router;
