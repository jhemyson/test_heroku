const validate = require("mongoose-validator");
const PersonValidate = require("./person");

class BuyerValidator extends PersonValidate {
  constructor() {
    super();
  }
}

module.exports = new BuyerValidator();
