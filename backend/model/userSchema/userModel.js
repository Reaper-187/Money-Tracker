const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
      return !this.googleId && !this.githubId;
    },
  }, // Passwort nur erforderlich, wenn kein Google oder GitHub Login
  googleId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String, default: false },
  tokenExpires: { type: Date },
  createdOn: { type: Date, default: Date.now },
  otpSent: { type: Number, default: null },
  resetCodeExpires: { type: Date },
});

module.exports = mongoose.model("User", userModel);
