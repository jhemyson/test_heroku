const mongoose = require("mongoose");
const validate = require("./validators/persons/seller");

const SellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 200
    },
    data_response: {
      type: Array,
      required: true
    },
    gateway_seller_id: {
      type: String,
      required: true
    },
    gateway_marketplace_id: {
      type: String
    },
    phone_number: {
      type: String,
      validate: validate.checkPhone()
    },
    birthdate: Date,
    document: {
      type: String,
      required: true,
      unique: true
    },
    bank_account: {
      bank_code: String,
      agency: String,
      account: String,
      digit: String
    },
    description: String,
    address: {
      city: {
        type: String,
        require: true
      },
      state: {
        type: String,
        require: true
      },
      neighborhood: {
        type: String,
        require: true
      },
      postal_code: {
        type: String,
        require: true
      },
      country_code: {
        type: String,
        require: true
      },
      line1: {
        type: String,
        require: true
      },
      line2: String,
      line3: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", SellerSchema);
