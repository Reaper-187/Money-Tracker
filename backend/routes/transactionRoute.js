const express = require("express");
const router = express.Router();
const transactionController = require("../controller/transactionsController/transactionsController");

router.get("/transactions", transactionController.getTransactions);

router.post("/transactions", transactionController.createTransaction);

router.delete("/transactions", transactionController.deleteTransactions);

module.exports = router;
