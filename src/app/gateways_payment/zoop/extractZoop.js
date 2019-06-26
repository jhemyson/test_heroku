"use strict";

const Zoop = require("./zoop");

class ExtractZoop extends Zoop {
  constructor(marketplace_id) {
    super(marketplace_id);
  }

  async getExtract(id_seller, query) {
    const options = {
      method: "GET",
      qs: query,
      url: `${this._base_url}/sellers/${id_seller}/balances/history`,
      headers: {
        Authorization: this._auth
      },
      json: true
    };

    return this._requestZoop(options);
  }
}

module.exports = ExtractZoop;
