const mongoose = require("mongoose");

const PartnerSchema = mongoose.Schema({
  status: {
    type: String,
    enum: ['ativo', 'inativo'],
    default: 'ativo'
  },
  email: {
    type: String,
    required: true
  },
  marketplace_id: {
    type: Array
  },
  api_key: {
    type: String
  }
});

module.exports = mongoose.model("Partner", PartnerSchema);
