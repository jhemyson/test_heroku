"use strict";
const router = require("express").Router();

const ExcellController = require("../../../controllers/ExcelController");

router.get("", ExcellController.create);

module.exports = router
