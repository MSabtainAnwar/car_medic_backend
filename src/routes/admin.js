const express = require("express");
const router = express.Router();

// MiddleWares
const { registerMiddle, loginMiddle } = require("../middleware/admin");
// Controllers
const { registerAdmin, loginAdmin } = require("../controllers/admin");

// register-admin
router.post("/register", registerMiddle, registerAdmin);
// login-admin
router.post("/login", loginMiddle, loginAdmin);

module.exports = router;
