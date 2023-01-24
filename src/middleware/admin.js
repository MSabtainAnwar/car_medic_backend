const Admin = require("../models/admin");
// status-helper
const responseStatus = require("../helpers/status");
const bcrypt = require("Bcrypt");

const registerMiddle = async (req, res, next) => {
  try {
    const { phone, password, confirmPassword } = req.body;
    const findPhone = await Admin.findOne({ phone });
    if (findPhone) {
      res
        .status(409)
        .json(responseStatus(false, "conflict", "Phone No already exist."));
    } else if (password !== confirmPassword) {
      res
        .status(409)
        .json(
          responseStatus(
            false,
            "conflict",
            "Password and confirm password must be same."
          )
        );
    } else {
      next();
    }
  } catch (error) {
    res.status(404).json(responseStatus(false, "not-found", `${error}`));
  }
};

const loginMiddle = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const findAdmin = await Admin.findOne({ phone });
    if (findAdmin) {
      if (await bcrypt.compare(password, findAdmin.password)) {
        req.body = findAdmin;
        next();
      } else {
        res
          .status(401)
          .json(responseStatus(false, "unauthorized", `Invalid Credentials.`));
      }
    } else {
      res
        .status(404)
        .json(responseStatus(false, "not-found", `Admin not found.`));
    }
  } catch (error) {
    res.status(404).json(responseStatus(false, "not-found", `${error}`));
  }
};

module.exports = { registerMiddle, loginMiddle };
