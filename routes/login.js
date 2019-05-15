const express = require("express");
const router = new express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
// user model
const User = require("../models/usermodel");

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    res.json({ message: "Provide username and password" });
    return;
  }

  // if (password.length < 7) {
  //   res.json({
  //     message:
  //       "Please make your password at least 7 characters long for secutiry purposes."
  //   });
  //   return;
  // }

  User.findOne({ username: username }, "_id", (err, foundUser) => {
    if (foundUser) {
      res.json({ message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const theUser = new User({
      username,
      password: hashPass
    });

    theUser.save(err => {
      if (err) {
        res.json({ message: "Something went wrong saving user to Database" });
        return;
      }

      req.login(theUser, err => {
        if (err) {
          res.json({
            message: "Something went wrong with automatic login after signup"
          });
          return;
        }

        res.status(200).json(req.user);
      });
    });
  });
});

router.post("/login", (req, res, next) => {
  console.log("ici login", req.body);
  passport.authenticate("local", (err, theUser, failureDetails) => {
    console.log(err);
    if (err) {
      res.json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      res.json({ message: "sorry, we coun't find that account" });
      return;
    }

    req.login(theUser, err => {
      if (err) {
        res.json({ message: "Something went wrong logging in" });
        return;
      }
      // We are now logged in (notice req.user)
      res.status(200).json(req.user);
    });
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  req.logout();
  res.json({ message: "Success" });
});

// router.get("/loggedin", (req, res, next) => {
//   if (req.user) {
//     res.status(200).json(req.user);
//     return;
//   }
//   res.status(403).json({ message: "Unauthorized" });
// });

module.exports = router;
