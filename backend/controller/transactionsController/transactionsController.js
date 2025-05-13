const Transaction = require("../../model/transactionSchema/transactionModel");
const User = require("../../model/userSchema/userModel");
const mongoose = require("mongoose");

exports.getTransactions = async (req, res) => {
  try {
    const user = req.session.passport?.user || req.session.user;
    const userId = typeof user === "object" ? user.id : user;

    if (!userId) {
      return res.status(401).json({ message: "Nicht autorisiert" });
    }

    const eachTransaction = await Transaction.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    res.json({ eachTransaction });
  } catch (err) {
    res.status(500).json({
      message: "Fehler beim Abrufen der Transaktionen",
      error: err,
    });
  }
};

// POST-Route, um eine TX hinzuzufügen
exports.createTransaction = async (req, res) => {
  try {
    const user = req.session.passport?.user || req.session.user;
    const userId = typeof user === "object" ? user.id : user;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Kein Benutzer oder Gast gefunden" });
    }

    // Limit – nur für Guest
    const isGuest = !req.session.passport?.user;

    if (isGuest) {
      const guestTxCount = await Transaction.countDocuments({ userId });

      if (guestTxCount >= 10) {
        return res.status(403).json({
          message: "Guest users can only create up to 10 transactions.",
        });
      }
    }

    const transaction = new Transaction({
      ...req.body,
      userId,
      date: new Date(req.body.date),
      amount: parseFloat(req.body.amount).toFixed(2),
    });

    const savedTransaction = await transaction.save();

    res.status(201).json({ savedTransaction });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE-Route, um eine TX hinzuzufügen
exports.deleteTransactions = async (req, res) => {
  try {
    const user = req.session.passport?.user || req.session.user;
    const userId = typeof user === "object" ? user.id : user;
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
      message: `${result.deletedCount} transactions deleted`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
