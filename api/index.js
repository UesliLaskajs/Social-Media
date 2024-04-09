const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config(); // Call config() to load environment variables
const app = express();
const port = 3000;
const cors = require("cors")
const UserRouter = require('./UserRoutes/UserRoutes')
const AuthRouter = require("./UserRoutes/AuthRoutes")
// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express())
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/apiusers", UserRouter)
app.use("/apiauth", AuthRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const messageError = err.message || "Internal Server";
  res.status(statusCode).json({
    success: false,
    statusCode,
    messageError
  });
  next();
});