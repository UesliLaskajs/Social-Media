const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

const cors = require("cors");
const UserRouter = require('./UserRoutes/UserRoutes');
const AuthRouter = require("./UserRoutes/AuthRoutes");
const cookieParser = require("cookie-parser");

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true // Allow cookies to be sent with requests
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
    process.exit(1); // Exit the process if unable to connect to the database
  });

// Middleware to verify token


// Routes
app.use("/apiauth", AuthRouter);
app.use("/apiusers", UserRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const messageError = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message: messageError
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
