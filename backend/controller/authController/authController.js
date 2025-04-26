const User = require("../../model/userSchema/userModel");

const nodemailer = require("nodemailer");
// const crypto = require('crypto');
const bcrypt = require("bcrypt");

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

exports.creatUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
      tokenExpires,
    });

    const saveRegistData = await newUser.save();
    const verifyLink = `${process.env.FRONTEND_URL_PROD}/verify?token=${verificationToken}`;

    // E-Mail versenden
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "abdulcheik3@gmail.com",
      to: req.body.email,
      subject: "E-Mail-Verification",
      text: `Please click on the current Link, to verify your E-Mail: ${verifyLink}`,
      html: `<p>Please click on the current Link, to verify your E-Mail:</p>
             <a href="${verifyLink}">${verifyLink}</a>`,
    });

    res.status(201).json({
      success: true,
      message:
        "Sign-up was successfully! Please check your inbox for the verification.",
      user: {
        id: saveRegistData.id,
        name: saveRegistData.name,
        email: saveRegistData.email,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message }); // Fehlerfall mit success: false
  }
};

exports.verifyUser = async (req, res) => {
  const { token } = req.query;

  try {
    // Benutzer mit dem Token finden
    const user = await User.findOne({
      verificationToken: token,
      tokenExpires: { $gt: Date.now() }, // Token darf nicht abgelaufen sein
    });

    if (!user) {
      return res.status(400).send("Token is wrong or expired.");
    }

    // Benutzer verifizieren
    user.isVerified = true;
    user.verificationToken = undefined; // Token entfernen
    user.tokenExpires = undefined; // Ablaufdatum entfernen
    await user.save();

    res.status(200).json({
      success: true,
      message: "E-Mail verified successfully! Now you can sign-in.",
    });
  } catch (err) {
    console.error("Error with the verification:", err);
    res.status(500).send("Intern ServerError.");
  }
};
