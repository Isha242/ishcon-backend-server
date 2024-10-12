/**------Module imports -----------------------*/
const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const messageRouter = require("./routers/messageRouter");
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const { protectRoute, isAdmin } = require("./controllers/authController");
const cookieParser = require("cookie-parser");
/**---------------------------------------- */


/*--------Environment variables------------*/
const PORT = process.env.PORT || 5001;
const DB_URI = process.env.DB_URI;
const CLIENT_URL = process.env.CLIENT_URL;
const ENV=process.env.ENV;
// console.log(CLIENT_URL);
/*----------------------------------------*/


/**-------Middlewares----------------------*/
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: CLIENT_URL, // Allows  server to accept requests from different origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Custom headers if needed
  })
);
/**----------------------------------------*/


/**-------Database connection strings------*/
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log(`MongoDB connection in ${ENV} environment is established!`);
  })
  .catch((err) => {
    console.log("Something went wrong with DB connection", err);
  });
/*------------------------------------------*/


/** ------------Routes---------------------*/
app.use("/api/messages", messageRouter);
app.use("/api/users", protectRoute, userRouter);
app.use("/api/auth", authRouter);
/** ---------------------------------------*/


/**----Central Error Handling Middleware----*/
app.use((err, req, res) => {
  const statuCode = err.statusCode || 500;
  res.status(statuCode).json({
    status: statuCode,
    message: err.message,
  });
})
/** ---------------------------------------*/


/*------ Fallback middleware (When no route hits, this will be called)-----*/
app.use(function (req, res) {
  res.status(404).send("404 Not Found!");
});


/* -------Server connection string------- */
app.listen(PORT, () => {
  console.log(`Server is running in ${ENV} at http://localhost:${PORT}`);
});


/* -------------------------------------------------------------Ends----------------------------------------------------------------------------------------*/