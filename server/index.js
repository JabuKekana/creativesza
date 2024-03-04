const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Import routes
const shopsRoutes = require("./shops");
const productsRoutes = require("./products");
const reviewsRoutes = require("./reviews");
const blogRoutes = require("./blog");

app.use(cors());
app.use(express.json());

// Use routes
app.use("/shops", shopsRoutes);
app.use("/products", productsRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/blog", blogRoutes);

app.listen(5000, '0.0.0.0', () => {
  console.log("Server has started on port 5000");
});

