"use strict";
const router = require("express").Router();

const SellerController = require("../../../controllers/SellerController");

router.post("", SellerController.store);
router.get("", SellerController.show);
router.get("/:id", SellerController.showById);
router.put("/:id", SellerController.update);

module.exports = router;
