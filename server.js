const express = require("express");
require("dotenv").config(); // Load env variables
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const messageRouter = require("./routers/messageRouter");
const userRouter = require("./routers/userRouter");

app.use(express.json());

const PORT = process.env.PORT || 5001;
const DB_URI = process.env.DB_URI;
const CLIENT_URL_PROD = process.env.CLIENT_URL_PROD; // Get client URL from env
const CLIENT_URL_STAGE = process.env.CLIENT_URL_STAGE; // Get client URL from env
const CLIENT_URL_DEV = process.env.CLIENT_URL_DEV; // Get client URL from env

console.log(`DB_URI: ${DB_URI}`);
console.log(`CLIENT_URL_PROD: ${CLIENT_URL_PROD}`);
console.log(`CLIENT_URL_STAGE: ${CLIENT_URL_STAGE}`);
console.log(`CLIENT_URL_DEV: ${CLIENT_URL_DEV}`);

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: [CLIENT_URL_PROD, CLIENT_URL_STAGE, CLIENT_URL_DEV], // Dynamically allow requests from the correct client
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Custom headers if needed
  })
);

// Database connection
mongoose 
  .connect(DB_URI)
  .then(() => {
    console.log("Connection to MongoDB is established!");
  })
  .catch((err) => {
    console.log("Something went wrong with DB connection", err);
  });

// Routers
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

// Fallback for 404 errors
app.use(function (req, res) {
  res.status(404).send("404 Not Found!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
