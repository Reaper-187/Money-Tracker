if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const connectDB = require("./MongoDb");
const transactionRoutes = require("./routes/transactionRoute");
const authRoutes = require("./routes/authRoute");
const socialAuthRoutes = require("./routes/authRoute");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./config/initializePassport");
const initializeGoogleAuth = require("./config/passport-google-oauth");
const initializeGhubAuth = require("./config/passport-ghub-oauth");
const flash = require("express-flash");
const MongoStore = require("connect-mongo");
const crypto = require("crypto");
const User = require("./model/userSchema/userModel");

// muss du setzten wenn du mit vercel arbeitest sonst
// werden keine cookies gespeichert
app.set("trust proxy", 1);

// CORS-Konfiguration
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

const SECRET_RANDOM_KEY = crypto.randomBytes(32).toString("hex");

// Session-Konfiguration
app.use(
  session({
    name: "connect.sid",
    secret: process.env.SECRET_KEY || SECRET_RANDOM_KEY,
    resave: false,
    saveUninitialized: false, // Muss false sein, sonst wird leere Session gespeichert
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: true, // Falls HTTPS genutzt wird, auf true setzen.
      sameSite: "none", // Falls Frontend auf anderer Domain, 'none' verwenden
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport(
  passport,
  async (email) => await User.findOne({ email }),
  async (id) => await User.findById(id)
);

initializeGoogleAuth(passport);
initializeGhubAuth(passport);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routen
app.use("/api", transactionRoutes); // Route für transcations

// Route für User
app.use("/api/auth", authRoutes); // Route für userAuthen

app.use("/", socialAuthRoutes); // Route für socialAuthen

// DB-Verbindung herstellen
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is on PORT " + PORT);
});
