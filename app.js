require("dotenv").config();
require("./Config/passport-setup");
const cors = require("cors");
const express = require("express");
const passport = require("passport");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
console.log(process.env.REACT_URL);

const app = express();

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(x => {
    console.log("yay connected to mongo");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

app.use(
  cors({
    credentials: true,
    origin: process.env.REACT_URL
  })
);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const index = require("./routes/index");
app.use("/", index);

const calendar = require("./routes/calendar");
app.use("/", calendar);

const auth = require("./routes/login");
app.use("/auth", auth);

// catch 404 and forward to error handler : MUST BE PLACED AFTER ALL OTHERS ROUTES
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = app;

// test deploy 2
