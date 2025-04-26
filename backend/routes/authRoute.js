const express = require("express");
const router = express.Router();
const authController = require("../controller/authController/authController");

router.post("/register", authController.creatUser);

router.post("/login", authController.existingUser);

router.post("/forgotPw", authController.forgotPw);

router.post("/verifyReset", authController.verifyReset);

router.post("/resetPw", authController.resetPw);

router.get("/verify", authController.verifyUser);

router.get("/authChecking", authController.authChecking);

module.exports = router;
