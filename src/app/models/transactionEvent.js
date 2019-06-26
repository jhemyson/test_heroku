const mongoose = require("mongoose");

const TransactionEventSchema = new mongoose.Schema(
  {
    id_transaction: {
      type: String,
      required: true
    },
    data_response: []
  },
  { timestamps: true }
);
module.exports = mongoose.model("TransactionEvent", TransactionEventSchema);
