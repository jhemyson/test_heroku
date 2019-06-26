"use strict";
const router = require("express").Router();

const { ValidationError } = require("./errors/validation");

router.use("/api/v1", require("./api/v1"));

router.get("/", (req, res, next) => {
  res.send("MaqPay API");
});

ValidationError(router);

module.exports = router;
