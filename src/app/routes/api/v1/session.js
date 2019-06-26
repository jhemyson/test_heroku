"use strict";
const router = require("express").Router();
const SessionController = require("../../../controllers/SessionController");

router.post("/login", SessionController.login);

module.exports = router;
