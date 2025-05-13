const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: function () {
      return !this.githubId && !this.googleId && !this.isGuest;
    },
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId && !this.githubId && !this.isGuest;
    },
  }, // Passwort nur erforderlich, wenn kein Google oder GitHub Login
  googleId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true },
  isVerified: {
    type: Boolean,
    default: function () {
      return !!(this.googleId || this.githubId);
    },
  },
  verificationToken: {
    type: String,
    default: function () {
      return this.googleId || this.githubId ? null : undefined;
    },
  },
  tokenExpires: { type: Date },
  createdOn: { type: Date, default: Date.now },
  otpSent: { type: Number, default: null },
  resetCodeExpires: { type: Date },
  isGuest: { type: Boolean, default: false },
  isGuestLoggedIn: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userModel);
