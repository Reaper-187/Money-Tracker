const mongoose = require("mongoose");
const connectDB = require("../MongoDb");
const User = require("../model/userSchema/userModel");

exports.runCron = async (req, res) => {
  try {
    await connectDB();

    const now = new Date();

    const expiredGuests = await User.find({
      isGuest: true,
      isGuestLoggedIn: true,
      guestSessionExpiresAt: { $lt: now },
    });

    for (let guest of expiredGuests) {
      guest.isGuestLoggedIn = false;
      guest.guestSessionExpiresAt = null;
      await guest.save();
    }
    res.send("ok");
  } catch (error) {
    console.error("Error in cronjob:", error);
    res.status(500).send("Error occurred during cronjob execution.");
  }
};
