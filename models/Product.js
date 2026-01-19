const mongoose = require("mongoose");
// Define the Product schema
// with fields: name, description, price, category, inStock, tags, createdAt and we can add more fields as needed
// what is schema = a blueprint defining the structure, fields, data types, and rules for documents in a MongoDB collection //
// check mongoose documentation and lessons for reference
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],

  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0.01, "Price must be greater than 0"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],

  },
  inStock: {
    type: Boolean,
    default: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
