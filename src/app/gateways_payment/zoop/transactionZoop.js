"use strict";

const Zoop = require("./zoop");

class TransactionZoop extends Zoop {
  constructor(marketplace_id) {
    super(marketplace_id);
  }

  _formatDataBoleto(data) {
    return {
      amount: data.amount,
      currency: "BRL",
      customer: data.buyer_zoop_id,
      description: data.description,
      metadata: data.metadata,
      on_behalf_of: data.seller_id,
      payment_method: {
        body_instructions: data.payment_method.body_instructions,
        expiration_date: data.payment_method.expiration_date,
        billing_instructions: data.payment_method.billing_instructions,
      },
      payment_type: "boleto"
    };
  }

  createTransaction(data) {
    const options = {
      method: "POST",
      url: `${this._base_url}/transactions`,
      headers: {
        Authorization: this._auth
      },
      body: this._formatDataBoleto(data),
      json: true
    };

    return this._requestZoop(options);
  }

  async getTransaction(transaction_id) {
    const options = {
      method: "GET",
      url: `${this._base_url}/transactions/${transaction_id}`,
      headers: {
        Authorization: this._auth
      },
      json: true
    };

    return this._requestZoop(options);
  }
}

module.exports = TransactionZoop;
