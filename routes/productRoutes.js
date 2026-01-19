const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const router = express.Router();

// CREATE: POST /api/products
router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    console.log("Created Product:", newProduct);
    return res.status(201).json(newProduct);
  } catch (error) {
    // Validation errors from Mongoose
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: Object.values(error.errors).map((e) => e.message),
      });
    }
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// READ ALL + FILTER + SORT + PAGINATION: GET /api/products
// paningation learned from: https://www.bezkoder.com/node-js-mongodb-pagination/
// Pagination means breaking a large list of data into smaller pages instead of returning everything at once.
router.get("/", async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sortBy, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Sorting
    let sortOption = {};
    if (sortBy === "price_asc") sortOption = { price: 1 };
    if (sortBy === "price_desc") sortOption = { price: -1 };
    if (sortBy === "newest") sortOption = { createdAt: -1 };
    if (sortBy === "oldest") sortOption = { createdAt: 1 };

    // Pagination calculation // Pagination means breaking a large list of data into smaller pages instead of returning everything at once.
    const pageNum = Math.max(Number(page), 1);
    const limitNum = Math.max(Number(limit), 1);
    const skip = (pageNum - 1) * limitNum;

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    console.log("Retrieved Products:", products);

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// READ ONE: GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Retrieved Product:", product);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// UPDATE: PUT /api/products/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Updated Product:", updated);

    return res.status(200).json(updated);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: Object.values(error.errors).map((e) => e.message),
      });
    }
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE: DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log("Deleted Product:", deleted);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
