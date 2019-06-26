"use strict";
const router = require("express").Router();
const PartnerController = require("../../../controllers/PartnerController");
const middlewares = require("../../middlewares/auth")

router.post("", PartnerController.create);

module.exports = router;
