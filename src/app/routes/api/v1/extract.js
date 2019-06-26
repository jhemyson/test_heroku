"use strict";
const router = require("express").Router();
const ExtractController = require("../../../controllers/ExtractController");

router.get("/:seller/search", ExtractController.show);

module.exports = router;
