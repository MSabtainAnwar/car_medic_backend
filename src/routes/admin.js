const express = require("express");
const router = express.Router();

// MiddleWares
const {
  registerMiddle,
  loginMiddle,
  verifyTokenMiddle,
} = require("../middleware/admin");
// Controllers
const {
  registerAdmin,
  loginAdmin,
  verifyAdminToken,
} = require("../controllers/admin");

// register-admin
router.post("/register", registerMiddle, registerAdmin);
// login-admin
router.post("/login", loginMiddle, loginAdmin);
// verify-admin-by-Id
router.post("/verify/:id", verifyTokenMiddle, verifyAdminToken);

module.exports = router;
