"use strict";
const router = require("express").Router();
const Cnab400Controller = require("../../../controllers/Cnab400Controller");

router.post("", Cnab400Controller.store);

module.exports = router;
