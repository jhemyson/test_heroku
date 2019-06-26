"use strict";
const router = require("express").Router();
const ExportController = require("../../../controllers/ExportController");

router.get("/:seller_id/exports", ExportController.show);
router.post("/:seller_id/exports/create", ExportController.store);

module.exports = router;
