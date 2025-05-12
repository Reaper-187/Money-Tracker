const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    default: "",
  },
  payment: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
});

//das Schema wird zu einem Modell umgewandelt und gleichzeitig auch Exportiert
module.exports = mongoose.model("Transaction", transactionSchema);
