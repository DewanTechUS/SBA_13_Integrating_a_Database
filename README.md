# Zenith Product API (SBA 13 - Integrating a Database)

# Author
Dewan Mahmud (Rocky)
Software Engineering Trainee - Per Scholas

# Description
The Zenith Product API is a RESTful backend service built with Node.js, Express, and MongoDB using Mongoose.
It allows an e-commerce company to manage product inventory through full CRUD operations and advanced querying features such as filtering, sorting, and pagination.

This project was built to demonstrate backend development fundamentals, database modeling, and efficient API design.

# Technologies Used
-	Node.js
-	Express.js
-	MongoDB Atlas
-	Mongoose
-	dotenv

Environment Setup
1.	Clone the repository
2.	Install dependencies
npm init -y && npm install express mongoose dotenv
3.	Create a .env file in the root directory
PORT=3000
MONGO_URI= _string
4.	Start the server
npm run dev

# API Base URL
http://localhost:3000/api/products

# How to Test the API
I tested all endpoints using Postman.
1. Create Product (POST)
POST /api/products
•	Sends product data in JSON format
•	Returns status 201 with the created product
•	Returns status 400 for validation errors
2. Get All Products (GET)
GET /api/products
•	Returns an array of products
•	Status 200
3. Get Single Product (GET by ID)
GET /api/products/:id
•	Returns product if ID exists
•	Returns 404 if not found
4. Update Product (PUT)
PUT /api/products/:id
•	Updates product data
•	Returns updated product with status 200
•	Returns 404 if product does not exist
5. Delete Product (DELETE)
DELETE /api/products/:id
•	Deletes the product
•	Returns success message
•	Confirmed deletion by re-fetching and receiving 404

# Advanced Querying
The GET /api/products endpoint supports advanced querying and was tested in Postman using:
-	Category filtering
-	Minimum and maximum price filtering
-	Sorting by price (ascending and descending)
-	Pagination using page and limit
-	Combined filtering, sorting, and pagination in a single request

# Example TEST:
GET /api/products?category=Electronics&minPrice=10&maxPrice=100&sortBy=price_desc&page=1&limit=5

Notes
-	Environment variables and node_modules are excluded from GitHub
-	Database connection is handled securely using dotenv
-	All routes include proper error handling and status codes

# Reflection
This SBA helped me better understand how a real backend API is structured and how MongoDB, Mongoose, and Express work together. Building full CRUD functionality and implementing advanced querying with filtering, sorting, and pagination strengthened my confidence in backend development. Testing everything in Postman also helped me see how APIs are used in real-world applications.

# Special Thank You
Special thanks to the Per Scholas instructors and team for their guidance, patience, and continuous support throughout this module. The hands-on labs and clear explanations made learning backend development with MongoDB and Mongoose both engaging and practical.

