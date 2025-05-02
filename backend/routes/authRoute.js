const express = require("express");
const router = express.Router();
const authController = require("../controller/authController/authController");

router.post("/logout", authController.logout);

router.get("/getUserInfo", authController.getUserInfo);

router.get("/authChecking", authController.authStatus);

router.post("/login", authController.existingUser);

router.post("/register", authController.createUser);

router.get("/verifyUser", authController.verifySession);

router.post("/forgotPw", authController.forgotPw);

router.post("/verifyReset", authController.verifyReset);

router.post("/resetPw", authController.resetPw);

module.exports = router;
