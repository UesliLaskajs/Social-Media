const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config(); // Call config() to load environment variables
const app = express();
const port = 3000;

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

