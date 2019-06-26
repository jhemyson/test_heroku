"use strict";
const router = require("express").Router();
const TransferController = require("../../../controllers/TransferController");

router.get(
  "/:seller_id/transfers/:transfer_id",
  TransferController.show);

router.get(
  "/:seller_id/transfers/:transfer_id/transactions",
  TransferController.showTransferWithTransactions
);

router.get(
  "/:seller_id/transfers/:transfer_id/history",
  TransferController.showTransferWithHistory
);

module.exports = router;
