"use strict";
const router = require("express").Router();
const TransactionController = require("../../../controllers/TransactionController");

router.post("", TransactionController.store);
router.get("", TransactionController.show);
router.get("/:id", TransactionController.showById);
router.get("/:seller_id/zoop/:id", TransactionController.showByZoop);
// router.put("/:id", TransactionController.update);
// router.delete("/:id", TransactionController.delete);

module.exports = router;
