const User = require("../../model/userSchema/userModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const passport = require("passport");
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

exports.logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Logout failed" });
      }
      res.status(200).json({ success: true, message: "Logout successful" });
    });
  } catch (err) {
    console.error("Error during logout:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error during logout" });
  }
};

// exports.authStatus = (req, res) => {
//   const isLoggedIn = req.session.passport?.user ? true : false;
//   res.status(200).json({ loggedIn: isLoggedIn, isVerified: user.isVerified,
//     otpSent: user.otpSent });
// };

exports.authStatus = async (req, res) => {
  const userId = req.session.passport?.user;

  if (!userId) {
    return res.status(200).json({ loggedIn: false });
  }

  try {
    const user = await User.findById(userId).select("isVerified");

    if (!user) {
      return res.status(404).json({ loggedIn: false });
    }

    res.status(200).json({
      loggedIn: true,
      isVerified: user.isVerified,
    });
  } catch (err) {
    console.error("AuthCheck Error:", err);
    res.status(500).json({ loggedIn: false, error: "Internal Server Error" });
  }
};

exports.existingUser = (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Servererror" });
    }
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "wrong login-data" });
    }

    // Überprüfung, ob der Benutzer verifiziert ist
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please confirm your Email, to Sign-in.",
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.log("Error with login:", err);
        return res
          .status(500)
          .json({ success: false, message: "sign-in unsuccessfully" });
      }
      req.session.loggedIn = true;
      res.status(200).json({
        success: true,
        message: "Login successfully",
        user: { email: user.email },
      });
    });
  })(req, res, next);
};

exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 Stunden gültig

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
      from: EMAIL_USER,
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

exports.verifySession = async (req, res) => {
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

exports.forgotPw = async (req, res) => {
  const { email } = req.body;

  // E-Mail Validierung
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Ungültige E-Mail-Adresse." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "E-Mail nicht gefunden." });
    }

    // Überprüfen, ob der Code noch nicht abgelaufen ist
    if (user.resetCodeExpires > Date.now()) {
      return res.status(400).json({
        message:
          "Ein Reset-Code wurde bereits gesendet. Bitte warte, bis der Code abläuft.",
      });
    }

    const otpSent = Math.floor(1000 + Math.random() * 9000); // 4-stelliger Code

    // Reset-Code und Ablaufdatum speichern
    user.otpSent = otpSent;
    user.resetCodeExpires = Date.now() + 600000; // Code 10 Minuten gültig

    await user.save();
    // Code per E-Mail senden
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
      from: EMAIL_USER,
      to: req.body.email,
      subject: "Passwort-Reset-OTP",
      text: `Dein 4-stelliger Code zum Zurücksetzen des Passworts lautet: ${otpSent}. Dieser Code ist 10 Minuten gültig.`,
    });

    res.json({ message: "Code zum Zurücksetzen gesendet." });
  } catch (error) {
    console.error("Fehler beim Senden des Codes:", error);
    res.status(500).json({ message: "Serverfehler" });
  }
};

exports.verifyReset = async (req, res) => {
  const { email, otpSent } = req.body;

  const resetCodeInt = Number(otpSent);
  if (isNaN(resetCodeInt)) {
    return res.status(400).json({ message: "Ungültiger Reset-Code." });
  }

  try {
    const user = await User.findOne({
      email,
      otpSent: resetCodeInt,
      resetCodeExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Ungültiger oder abgelaufener Code." });
    }

    res.status(200).json({
      message: "Code verifiziert. Du kannst nun dein Passwort ändern.",
    });
  } catch (error) {
    console.error("Fehler bei der Code-Verifikation:", error);
    res.status(500).json({ message: "Serverfehler" });
  }
};

exports.resetPw = async (req, res) => {
  const { email, otpSent, newPassword } = req.body;

  try {
    const user = await User.findOne({
      email,
      otpSent,
      resetCodeExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log("Code is invalid or expired.");
      return res
        .status(400)
        .json({ message: "Ungültiger oder abgelaufener Code." });
    }

    // Überprüfen, ob das neue Passwort mit dem alten übereinstimmt
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        message: "Das neue Passwort darf nicht mit dem alten übereinstimmen.",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otpSent = undefined;
    user.resetCodeExpires = undefined;

    await user.save();

    res.json({ message: "Passwort erfolgreich geändert." });
  } catch (error) {
    console.error("Fehler beim Zurücksetzen des Passworts:", error);
    res.status(500).json({ message: "Serverfehler" });
  }
};
