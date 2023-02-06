const Vehicle = require("../models/vehicle");
const responseStatus = require("../helpers/status");

// Create-Vehicle
const createVehicle = async (req, res) => {
  try {
    const createVehicle = await new Vehicle(req.body).save();
    res
      .status(201)
      .json(responseStatus(true, "created", "Vehicle", createVehicle));
  } catch (error) {
    res.status(404).json(responseStatus(false, "not-found", `${error}`));
  }
};

module.exports = { createVehicle };
