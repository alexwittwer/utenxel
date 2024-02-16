const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const pantryRouter = require("./routes/pantry");
const ingredientRouter = require("./routes/ingredient");
const recipeRouter = require("./routes/recipe");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const logger = require("morgan");

const port = 3000 || process.env.PORT;

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("dev"));
app.use(passport.initialize());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/pantry", pantryRouter);
app.use("/api/ingredient", ingredientRouter);
app.use("/api/recipe", recipeRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
