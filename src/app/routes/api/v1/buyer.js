"use strict";
const router = require("express").Router();
const BuyerController = require("../../../controllers/BuyerController");


router.post("", BuyerController.store);
router.get("", BuyerController.show);
router.get("/:id", BuyerController.showById);
router.put("/:id", BuyerController.update);
router.delete("/:id", BuyerController.delete);

module.exports = router;
