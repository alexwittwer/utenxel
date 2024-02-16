const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/auth_controller");

router.route("/login").post(authController.login);

module.exports = router;
