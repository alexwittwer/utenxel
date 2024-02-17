const express = require("express");
const supertest = require("supertest");
const mongoose = require("mongoose");
const authRouter = require("../routes/auth");
const userRouter = require("../routes/user");
const pantryRouter = require("../routes/pantry");
const ingredientRouter = require("../routes/ingredient");
const recipeRouter = require("../routes/recipe");
const cors = require("cors");
const passport = require("passport");
const logger = require("morgan");

const app = express();

// Configure MongoDB connection
mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/users/:userid/pantry", pantryRouter);
app.use("/api/ingredients", ingredientRouter);
app.use("/api/recipes", recipeRouter);

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("dev"));
app.use(passport.initialize());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/pantry", pantryRouter);
app.use("/ingredient", ingredientRouter);
app.use("/recipe", recipeRouter);

// Export the app for testing
module.exports = app;

// Start the server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
