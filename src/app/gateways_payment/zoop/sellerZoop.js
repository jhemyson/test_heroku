"use strict";

const Zoop = require("./zoop");

class SellerZoop extends Zoop {
  constructor(marketplace_id) {
    super(marketplace_id);
  }

  async getSeller(id_seller) {
    const options = {
      method: "GET",
      url: `${this._base_url}/sellers/${id_seller}`,
      headers: {
        Authorization: this._auth
      },
      json: true
    };

    return this._requestZoop(options);
  }
}
module.exports = SellerZoop;
