"use strict";
const Zoop = require("./zoop");

class GetTransactionsZoopFromASeller extends Zoop {
  constructor(marketplace_id) {
    super(marketplace_id);
  }

  async getTransactions(seller_id, params) {
    const options = {
      method: "GET",
      qs: params,
      url: `https://api.zoop.ws/v1/marketplaces/${
        this.marketplace_id
      }/sellers/${seller_id}/transactions`,
      headers: {
        Authorization: this._auth
      },
      json: true
    };

    return this._requestZoop(options);
  }
}

module.exports = GetTransactionsZoopFromASeller;
