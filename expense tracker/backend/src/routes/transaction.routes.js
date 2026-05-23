const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction.model");

// Get all transactions
router.get("/", async (req, res) => {
  const data = await Transaction.find();
  res.json(data);
});

// Add transaction
router.post("/", async (req, res) => {
  const newTx = new Transaction(req.body);
  await newTx.save();
  res.json(newTx);
});

// Delete transaction
router.delete("/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;