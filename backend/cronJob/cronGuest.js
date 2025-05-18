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
    console.log("Cronjob erfolgreich abgeschlossen.");
    res.status(200).send("Cronjob erfolgreich ausgeführt.");
  } catch (error) {
    console.error("Fehler im Cronjob:", error);
    res.status(500).send("Fehler im Cronjob.");
  }
};
