const express = require("express");
const router = express.Router();
const authController = require("../controller/authController/authController");

router.post("/register", authController.createUser);

router.post("/login", authController.existingUser);

router.post("/forgotPw", authController.forgotPw);

router.post("/verifyReset", authController.verifyReset);

router.post("/resetPw", authController.resetPw);

router.post("/logout", authController.logout);

router.get("/verifyUser", authController.verifySession);

router.get("/authChecking", authController.authStatus);

module.exports = router;
