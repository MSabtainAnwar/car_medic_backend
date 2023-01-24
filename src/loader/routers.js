const express = require("express");
const bodyParser = require("body-parser");

// Routes
const adminRoute = require("../routes/admin");

module.exports = (app) => {
  // bodyParser
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.json());

  // Routes
  app.use("/admin", adminRoute);
};
