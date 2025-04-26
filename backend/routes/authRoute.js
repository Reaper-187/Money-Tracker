const express = require("express");
const router = express.Router();
const authController = require("../controller/authController/authController");

router.post("/register", authController.creatUser);

// router.post("/Login", authController.existingUser);

router.get("/verify", authController.verifyUser);

module.exports = router;
