const Zoop = require("./zoop");

class transferZoop extends Zoop {
  constructor(marketplace_id) {
    super(marketplace_id);
    this._base_url = `https://api-beta.zoop.ws/v1/marketplaces/${
      this.marketplace_id
      }`;
  }

  async getTransfer(id_transfer, query) {
    const options = {
      method: "GET",
      qs: query,
      url: `${this._base_url}/transfers/${id_transfer}`,

      headers: {
        Authorization: this._auth
      },
      json: true
    };

    return this._requestZoop(options);
  }

  async getTransferTransactions(transfer_id, query) {
    const options = {
      method: "GET",
      qs: query,
      url: `${this._base_url}/transfers/${transfer_id}/transactions`,

      headers: {
        Authorization: this._auth
      },
      json: true
    };

    return this._requestZoop(options);
  }

  async getTransferHistory(transfer_id, query) {
    const options = {
      method: "GET",
      qs: query,
      url: `${this._base_url}/transfers/${transfer_id}/history`,

      headers: {
        Authorization: this._auth
      },
      json: true
    };

    return this._requestZoop(options);
  }
}

module.exports = transferZoop;
