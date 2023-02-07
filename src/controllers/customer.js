const Vehicle = require("../models/vehicle");
const Customer = require("../models/customer");
const responseStatus = require("../helpers/status");

// Create-Customer
const createCustomer = async (req, res) => {
  try {
    const { customerId, vehicleNo, vehicleBrand, vehicleModel } = req.body;
    if (vehicleNo !== "" && vehicleBrand !== "" && vehicleModel !== "") {
      const createVehicle = await new Vehicle({
        customerId,
        vehicleNo,
        vehicleBrand,
        vehicleModel,
      }).save();
    }
    res.status(201).json(responseStatus(true, "created", "Customer", ""));
  } catch (error) {
    res.status(404).json(responseStatus(false, "not-found", `${error}`));
  }
};

// get-customer-list
const getCustomerList = async (req, res) => {
  try {
    const customerList = await Customer.aggregate([
      {
        $match: {
          status: "active",
        },
      },
      {
        $lookup: {
          from: "vehicles",
          localField: "_id",
          foreignField: "customerId",
          as: "vehicles",
        },
      },
    ]);
    res.status(200).json(responseStatus(true, "ok", "Success", customerList));
    console.log(customerList);
  } catch (error) {
    res.status(404).json(responseStatus(false, "not-found", `${error}`));
  }
};


module.exports = { createCustomer, getCustomerList };
