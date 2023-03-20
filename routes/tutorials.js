const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var authenticate = require("../authenticate");

const Tutorials = require("../models/tutorial");

const tutorialsRouter = express.Router();

tutorialsRouter
  .route("/")
  .get((req, res, next) => {
    Tutorials.find({})
      .then(
        (tutorials) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(tutorials);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Tutorials.create(req.body)
      .then(
        (tutorial) => {
          console.log("Dish Created ", tutorial);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(tutorial);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /tutoriales");
  })
  .delete((req, res, next) => {
    Tutorials.remove({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

tutorialsRouter
  .route("/:tutorialId")
  .get((req, res, next) => {
    Tutorials.findById(req.params.tutorialId)
      .then(
        (tutorial) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(tutorial);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      "POST operation not supported on /tutoriales/" + req.params.tutorialId
    );
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Tutorials.findByIdAndUpdate(
      req.params.tutorialId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (tutorial) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(tutorial);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Tutorials.findByIdAndRemove(req.params.tutorialId)
        .then(
          (resp) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(resp);
          },
          (err) => next(err)
        )
        .catch((err) => next(err));
    }
  );

module.exports = tutorialsRouter;
