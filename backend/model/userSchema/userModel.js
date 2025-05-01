const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String, default: false },
  tokenExpires: { type: Date, default: false },
  createdOn: { type: Date, default: Date.now },
  otpSent: { type: Number, default: null },
});

module.exports = mongoose.model("User", userModel);
