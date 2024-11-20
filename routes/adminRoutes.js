const express = require("express");
const {
  login,
  Adminregister,
  deleteAdminByEmail,
} = require("../controllers/adminController");

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(Adminregister);
router.route("/delete").delete(deleteAdminByEmail);
module.exports = router;
