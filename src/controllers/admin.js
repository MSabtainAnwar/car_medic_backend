const Admin = require("../models/admin");
// status-helper
const responseStatus = require("../helpers/status");
//config
const config = require("../config/config");

// Register-Admin
const registerAdmin = async (req, res) => {
  try {
    const createAdmin = await new Admin(req.body).save();
    res.status(201).json(responseStatus(true, "created", "Admin", createAdmin));
  } catch (error) {
    res.status(404).json(responseStatus(false, "not-found", `${error}`));
  }
};

// Login-Admin
const loginAdmin = async (req, res) => {
  try {
    const data = req.body;
    let updateAdmin = await data.createToken(config.jwtSecretKey);
    if (updateAdmin) {
      const adminData = await Admin.findOne({
        _id: data._id.toString(),
      }).select("-token -password");
      console.log(adminData);
      res.status(200).json(responseStatus(true, "ok", "Success", adminData));
      res.cookie("jwt", updateAdmin.token, {
        expires: new Date(Date.now() + 50000),
        httpOnly: true,
        // secure:true
      });
    }
  } catch (error) {
    res.status(404).json(responseStatus(false, "not-found", `${error}`));
  }
};

module.exports = { registerAdmin, loginAdmin };






