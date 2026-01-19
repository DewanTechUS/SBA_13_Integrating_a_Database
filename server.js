require("dotenv").config();

const express = require("express");
const connectDB = require("./config/connection");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //industrial strength parsing
// app.use(express.urlencoded()); // deprecated

// Routes
app.get("/", (req, res) => {
 res.send(`
  <h1>Zenith Product API</h1>

  <h2>How to Test the API</h2>
  <p>I tested all endpoints using <strong>Postman</strong>.</p>

  <p><strong>Base URL:</strong><br/>
  http://localhost:3000/api/products
  </p>

  <h3>1. Create Product (POST)</h3>
  <p>
    POST /api/products<br/>
    I sent valid product data and received a 201 status with the created product.<br/>
    I also tested validation errors and confirmed it returns 400 for invalid input.
  </p>

  <h3>2. Get All Products (GET)</h3>
  <p>
    GET /api/products<br/>
    Returns an array of all products with status 200.
  </p>

  <h3>3. Get Single Product (GET by ID)</h3>
  <p>
    GET /api/products/:id<br/>
    Returns the product when a valid ID is provided.<br/>
    Returns 404 when the product does not exist.
  </p>

  <h3>4. Update Product (PUT)</h3>
  <p>
    PUT /api/products/:id<br/>
    Successfully updates product data and returns the updated product with status 200.<br/>
    Returns 404 if the product is not found.
  </p>

  <h3>5. Delete Product (DELETE)</h3>
  <p>
    DELETE /api/products/:id<br/>
    Deletes the product and returns a success message.<br/>
    Confirmed deletion by requesting the same ID again and receiving 404.
  </p>

  <h3>Advanced Query Testing</h3>
  <p>I tested advanced querying using Postman with the following parameters:</p>
  <ul>
    <li>Category filter</li>
    <li>minPrice and maxPrice filtering</li>
    <li>Sorting by price (ascending and descending)</li>
    <li>Pagination using page and limit</li>
    <li>Combined filtering, sorting, and pagination in a single request</li>
  </ul>

  <p><strong>Try the API:</strong> <a href="/api/products">/api/products</a></p>
`);

  
});

app.use("/api/products", productRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Zenith Product API Server running at http://localhost:${PORT}`);
  });
});
