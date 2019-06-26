"use strict";

const TransactionZoop = require("../zoop/transactionZoop");

class SwitchTransactionGateway {
  async createTransaction(marketplace, data) {
    if (data.gateway === "zoop") {
      const transactionZoop = new TransactionZoop(marketplace);
      const zoop = await transactionZoop.createTransaction(data);

      return zoop;
    }
  }
}

module.exports = SwitchTransactionGateway;
