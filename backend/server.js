if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const connectDB = require("./MongoDb");
const transactionRoutes = require("./routes/transactionRoute");
const userRoute = require("./routes/userRoute");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
// const initializePassport = require("./routes/passportConfig");
// const User = require("./model/UserLogin/UserLoginSchema");
const flash = require("express-flash");
const MongoStore = require("connect-mongo");
const crypto = require("crypto");
// const axios = require("axios");

// CORS-Konfiguration
// const FRONTEND_URL_PROD = process.env.FRONTEND_URL_PROD;
const FRONTEND_URL_DEV = process.env.FRONTEND_URL_DEV;

app.use(
  cors({
    origin: [/*FRONTEND_URL_PROD,*/ FRONTEND_URL_DEV],
    credentials: true,
  })
);

const SECRET_RANDOM_KEY = crypto.randomBytes(32).toString("hex");

// Session-Konfiguration
app.use(
  session({
    secret: process.env.SECRET_KEY || SECRET_RANDOM_KEY,
    resave: false,
    saveUninitialized: false, // Muss false sein, sonst wird leere Session gespeichert
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: false, // Falls HTTPS genutzt wird, auf true setzen.
      sameSite: "lax", // Falls Frontend auf anderer Domain, 'none' verwenden
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initializePassport(
//   passport,
//   async (email) => await User.findOne({ email }),
//   async (id) => await User.findById(id)
// );

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routen
app.use("/api", transactionRoutes); // Route für Workouts

// Route für User
// app.use("/api/user", userRoute);

// DB-Verbindung herstellen
connectDB();

const port = 5000;

app.listen(port, "localhost", () => {
  console.log("Server is on port " + port);
});
