"use strict";

const Zoop = require("./zoop");

class ExportZoop extends Zoop {
  constructor(marketplace_id) {
    super(marketplace_id);
    this._base_url = `https://api-beta.zoop.ws/v1/marketplaces/${
      this.marketplace_id
    }`;
  }

  async getExports(seller_id, query) {
    const options = {
      method: "GET",
      qs: query,
      url: `${
        this._base_url
      }/exports/entries/list-files?seller_id=${seller_id}`,
      headers: {
        Authorization: this._auth
      },
      json: true
    };

    return this._requestZoop(options);
  }

  async createExports(seller_id, query, format) {
    const options = {
      method: "POST",
      url: this._base_url + "/exports/entries/export",
      qs: {
        ...query,
        seller_id
      },
      headers: {
        Authorization: this._auth
      },
      body: {
        columns: [
          "nsu",
          "net_amount",
          "amount",
          "fee",
          "entry_description",
          "created_at",
          "transaction_id",
          "transaction_created_at",
          "status_payment",
          "transaction_net_amount",
          "transaction_amount",
          "transaction_fees",
          "payment_type",
          "number_of_installments",
          "plan_name",
          "transaction_number",
          "metadata",
          "reference_id",
          "transaction_number",
          "description",
          "mode",
          "terminal_serial_number",
          "sender_ein",
          "sender_name",
          "recipient_ein",
          "recipient_name",
          "amount_payment",
          "payment_method.card_brand",
          "payment_method.holder_name",
          "payment_method.last4Digits",
          "favorecido",
          "account_number",
          "routing_number",
          "bank_name",
          "expected_on",
          "date_payment",
          "amount_payment",
          "installment",
          "net_amount_installment",
          "transfer_id",
          "seller_name",
          "tax_payer_id",
          "seller_id",
          "marketplace_id",
          "current_balance"
        ],
        extension: format || "xls"
      },
      json: true
    };
    return this._requestZoop(options);
  }
}
module.exports = ExportZoop;
