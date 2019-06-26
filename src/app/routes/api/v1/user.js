"use strict";
const UserController = require("../../../controllers/UserController");

const router = require("express").Router();

router.post("", UserController.store);
router.get("", UserController.show);

module.exports = router;
