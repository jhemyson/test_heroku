"use strict";

const Zoop = require("./zoop");

class BuyerZoop extends Zoop {
  constructor(marketplace_id) {
    super(marketplace_id);
  }

  _formatDataBuyer(data) {
    return {
      first_name: data.name,
      last_name: data.last_name,
      taxpayer_id: data.document,
      email: data.email,
      phone_number: data.phone_number,
      birthdate: data.birthdate,
      description: data.description,
      facebook: data.facebook,
      twitter: data.twitter,
      payment_methods: data.payment_methods,
      default_debit: data.default_debit,
      default_credit: data.default_credit,
      default_receipt_delivery_method: data.default_receipt_delivery_method,
      address: {
        line1: data.address.line1,
        line2: data.address.line2,
        line3: data.address.line3,
        neighborhood: data.address.neighborhood,
        city: data.address.city,
        state: data.address.state,
        postal_code: data.address.postal_code,
        country_code: "BR" || data.address.country_code
      }
    };
  }

  async createBuyer(data) {
    const options = {
      method: "POST",
      url: `${this._base_url}/buyers`,
      headers: {
        Authorization: this._auth
      },
      body: this._formatDataBuyer(data),
      json: true
    };
    return this._requestZoop(options);
  }

  async updateBuyer(data, id_buyer) {
    const options = {
      method: "PUT",
      url: `${this._base_url}/buyers/${id_buyer}`,
      headers: {
        Authorization: this._auth
      },
      body: this._formatDataBuyer(data),
      json: true
    };
    return this._requestZoop(options);
  }

  async getBuyer(buyer_id) {
    const options = {
      method: "GET",
      url: `${this._base_url}/buyers/${buyer_id}`,
      headers: {
        Authorization: this._auth
      },
      json: true
    };

    return this._requestZoop(options);
  }
}

module.exports = BuyerZoop;
