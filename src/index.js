"use strict";
require("dotenv").config();
const app = require("express")();
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true
});

app.use("", require("./app/routes"));

app.listen(3000);

module.exports = app;
