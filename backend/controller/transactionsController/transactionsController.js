const Transaction = require("../../model/transactionSchema/transactionModel");
const User = require("../../model/userSchema/userModel");
const mongoose = require("mongoose");

exports.getTransactions = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.session.passport.user);
    const eachTransaction = await Transaction.find({ userId });

    res.json({
      eachTransaction,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Fehler beim Abrufen der Tranasaktionen", error: err });
  }
};

// POST-Route, um eine TX hinzuzufügen
exports.createTransaction = async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      userId: req.session.passport.user,
      date: new Date(req.body.date),
      amount: parseFloat(req.body.amount).toFixed(2),
    });

    const savedtransaction = await transaction.save();
    await User.findOne({ _id: req.session.passport.user });

    res.status(201).json({ savedtransaction });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE-Route, um eine TX hinzuzufügen
exports.deleteTransactions = async (req, res) => {
  try {
    const userId = req.session.passport.user;
    const { idsToDelete } = req.body;

    if (!Array.isArray(idsToDelete) || idsToDelete.length === 0) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    // Nur Transaktionen löschen, die dem User gehören
    const result = await Transaction.deleteMany({
      _id: { $in: idsToDelete },
      userId: userId,
    });

    res.status(200).json({
      message: `${result.deletedCount} Transaktionen gelöscht`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
