const express = require("express");
const router = express.Router();
const pool = require("./db");

// BLOGS - ENDPOINT: ADD NEW BLOG
router.post("/", async (req, res) => {
  try {
    const { blog_heading, blog_description, blog_date, blog_img } = req.body;

    const newBlog = await pool.query(
      "INSERT INTO blog (blog_heading, blog_description, blog_date, blog_img) VALUES($1, $2, $3, $4) RETURNING *",
      [blog_heading, blog_description, blog_date, blog_img]
    );

    res.json(newBlog.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to create a new blog" });
  }
});

// BLOGS - ENDPOINT: GET ALL BLOGS
router.get("/", async (req, res) => {
  try {
    const blogs = await pool.query("SELECT * FROM blog");
    res.json(blogs.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve blogs" });
  }
});

// BLOGS - ENDPOINT: UPDATE BLOG
router.put("/:blog_id", async (req, res) => {
  try {
    const { blog_id } = req.params; 
    console.log("Updating blog details for blog ID:", blog_id);

    const { blog_heading, blog_description, blog_date, blog_img } = req.body;

    console.log("Received update data:", req.body);

    console.log("Before update query");
    const updatedBlog = await pool.query(
      "UPDATE blog SET blog_heading = $1, blog_description = $2, blog_date = $3, blog_img = $4 WHERE blog_id = $5 RETURNING *",
      [blog_heading, blog_description, blog_date, blog_img, blog_id]
    );

    console.log("After update query", updatedBlog.rows[0]);

    res.json({ message: "Blog details updated successfully!", updatedBlog: updatedBlog.rows[0] });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update blog details" });
  }
});

// BLOGS - ENDPOINT: DELETE BLOG
router.delete("/:blog_id", async (req, res) => {
  try {
    const { blog_id } = req.params;
    console.log("Deleting blog with ID:", blog_id);

    await pool.query("DELETE FROM blog WHERE blog_id = $1", [blog_id]);

    console.log("Blog deleted successfully!");
    res.json({ message: "Blog deleted successfully!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

module.exports = router;