"use strict";
const router = require("express").Router();

const ImportController = require("../../../controllers/ImportController");

router.get("/:id", ImportController.show);

module.exports = router;
