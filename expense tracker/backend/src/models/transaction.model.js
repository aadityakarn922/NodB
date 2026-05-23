const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  text: String,
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);