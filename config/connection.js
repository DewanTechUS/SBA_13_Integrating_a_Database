const mongoose = require("mongoose");
// https://stackoverflow.com/questions/59649056/mongoose-error-when-trying-to-connect-to-mongo-db
// Function to connect to MongoDB
// also learned from: https://www.bezkoder.com/node-js-mongodb-atlas-connection/
const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in environment variables meaning the app cannot connect to the database");
  }
  // Connecting to MongoDB // Atlas//
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

module.exports = connectDB;
