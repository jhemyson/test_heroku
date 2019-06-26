"use strict";
const request = require("request-promise");
const getGatewayAuth = require("../base/credentials");

class Zoop {
  constructor(marketplace_id) {
    this.marketplace_id = marketplace_id;
    this._auth = getGatewayAuth(this.marketplace_id);
    this._base_url = `https://api.zoop.ws/v1/marketplaces/${
      this.marketplace_id
    }`;
  }

  _requestZoop(params) {
    return new Promise(async function(resolve, reject) {
      try {
        const data = await request(params);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = Zoop;
