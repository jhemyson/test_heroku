const PersonValidate = require("./person");

class SellerValidator extends PersonValidate {
  constructor() {
    super();
  }
}

module.exports = new SellerValidator();
