const express = require("express");
const router = express.Router();
const eventModel = require("../models/eventmodel");
const longEventModel = require("../models/longeventmodel");

router.post("/create-event", (req, res) => {
  eventModel
    .create(req.body)
    .then(dbRes => {
      console.log("eventcreated successfully", dbRes);
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
});
router.get("/my-events", (req, res) => {
  console.log(req.query);
  eventModel
    .find({ date: req.query.date })
    .then(dbRes => {
      console.log(" here are my events", dbRes);
      res.json(dbRes);
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
});
router.post("/create-long-event", (req, res) => {
  longEventModel
    .create(req.body)
    .then(dbRes => {
      console.log("long event created successfully", dbRes);
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
});
router.get("/my-long-events", (req, res) => {
  longEventModel
    .find()
    .then(dbRes => {
      console.log(" here are my long events", dbRes);
      res.json(dbRes);
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
});

module.exports = router;
