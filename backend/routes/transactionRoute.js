const express = require("express");
const Transaction = require("../model/TransactionSchema/TransactionSchema");
// const User = require("../model/UserLogin/UserLoginSchema");
// const mongoose = require("mongoose");
const router = express.Router();

router.get("/transactions", async (req, res) => {
  try {
    // const userId = new mongoose.Types.ObjectId(req.session.passport.user);
    const eachTransaction = await Transaction.find();

    res.json({
      eachTransaction,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Fehler beim Abrufen der Tranasaktionen", error: err });
  }
});

// POST-Route, um eine TX hinzuzufügen
router.post("/transactions", async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      // userId: req.session.passport.user,
      date: new Date(req.body.date),
      amount: parseFloat(req.body.amount).toFixed(2),
    });

    const savedtransaction = await transaction.save();
    // const user = await User.findOne({ _id: req.session.passport.user })

    res.status(201).json({ savedtransaction });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE-Route, um eine TX hinzuzufügen
router.delete("/transactions", async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    const result = await Transaction.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      message: `${result.deletedCount} Transaktionen gelöscht`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
