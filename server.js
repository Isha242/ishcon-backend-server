const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const messageRouter = require("./routers/messageRouter");
const userRouter = require("./routers/userRouter");

app.use(express.json());


const PORT = process.env.PORT || 5001;
const DB_URI = process.env.DB_URI;

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://ishcon.vercel.app", // Allow to server to accept request from different origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Custom headers if needed
  })
);

/** Database connection starts */
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connection to MongoDB is established!");
  })
  .catch((err) => {
    console.log("Something went wrong with DB connection", err);
  });

/** Routers */
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

// Fallback middleware for 404 errors
app.use(function (req, res) {
  res.status(404).send("404 Not Found!");
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

