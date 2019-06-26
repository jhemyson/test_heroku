const mongoose = require("mongoose");

const BuyerSchema = new mongoose.Schema(
  {
    status: String,
    gateway_buyer_id: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String
    },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller"
    },
    last_name: {
      type: String
    },
    email: {
      type: String
    },
    phone_number: {
      type: String
    },
    birthdate: {
      type: String
    },
    document: {
      type: String
    },
    data_response: Array,
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
        type: String
      },
      line1: {
        type: String,
        require: true
      },
      line2: String,
      line3: String
    },
    metadata: {}
  },
  { timestamps: true }
);
module.exports = mongoose.model("Buyer", BuyerSchema);
