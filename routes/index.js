const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/foo", (req, res, next) => {
  res.send("foo");
});

module.exports = router;
