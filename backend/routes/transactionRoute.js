const express = require("express");
const Transaction = require("../model/TransactionSchema/TransactionSchema");
// const User = require("../model/UserLogin/UserLoginSchema");
// const mongoose = require("mongoose");
const router = express.Router();

// POST-Route, um eine TX hinzuzufügen
router.post("/transactions", async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      // userId: req.session.passport.user,
      date: new Date(req.body.date),
    });

    const savedtransaction = await transaction.save();
    // const user = await User.findOne({ _id: req.session.passport.user })

    res.status(201).json({ savedtransaction });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
