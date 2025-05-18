const mongoose = require("mongoose");
const connectDB = require("../MongoDb");
const User = require("../model/userSchema/userModel");

const runCronJob = async () => {
  try {
    await connectDB();

    const now = new Date();

    const guestUser = await User.findOne({
      cronAccessToken: token,
      isGuest: true,
      isGuestLoggedIn: true,
      guestSessionExpiresAt: { $gt: new Date() },
    });

    for (let guest of expiredGuests) {
      guest.isGuestLoggedIn = false;
      guest.guestSessionExpiresAt = null;
      guestUser.cronAccessToken = null;
      await guest.save();
      console.log(`Guest logged-out auto.`);
    }

    console.log("Cronjob successfully.");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error with Cronjob:", error);
  }
};

if (require.main === module) {
  runCronJob();
}
