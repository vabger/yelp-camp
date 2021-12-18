require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");

const errorHandler = require("./utils/ErrorHandler");
const connectDB = require("./utils/ConnectDB");

const campgroundRoutes = require("./routes/campgrounds");
const userRoutes = require("./routes/users");
const reviewRoutes = require("./routes/reviews");
const ExpressError = require("./utils/ExpressError");

const app = express();
const server = app.listen(5000, () => {
  console.log(`Listening on Port 5000...`);
});

process.on("uncaughtException", (err) => {
  server.close(() => {
    console.log(err);
    process.exit(1);
  });
  // If server hasn't finished in 1000ms, shut down process
  setTimeout(() => {
    console.log(err);
    process.exit(1);
  }, 1000).unref(); // Prevents the timeout from registering on event loop
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  credentials: true,
};
app.use(cors(corsOptions));

app.use(morgan("tiny"));

app.use(express.static("images"));

const cookie_config = {
  secure: false,
  httpOnly: true,
  maxAge: process.env.SESSION_COOKIE_AGE_DAYS * 24 * 60 * 60 * 1000,
};
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: cookie_config,
  })
);

connectDB();

app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 2000);
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

process.on("unhandledRejection", (reason, promise) => {
  server.close(() => {
    console.log(`unhandledRejection Promise: ${promise}\nreason: ${reason}`);
    process.exit(1);
  });
  // If server hasn't finished in 1000ms, shut down process
  setTimeout(() => {
    console.log(`unhandledRejection Promise: ${promise}\nreason: ${reason}`);
    process.exit(1);
  }, 1000).unref(); // Prevents the timeout from registering on event loop
});
