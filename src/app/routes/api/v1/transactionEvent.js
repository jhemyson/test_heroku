"use strict";
const router = require("express").Router();

const TransactionEventController = require("../../../controllers/TransactionEventController");

router.post("", TransactionEventController.store);
router.get("", TransactionEventController.show);
router.get("/:id", TransactionEventController.showById);

module.exports = router;
