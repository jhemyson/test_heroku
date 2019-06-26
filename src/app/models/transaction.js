const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const TransactionSchema = new mongoose.Schema(
  {
    payment_type: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    url_postback: {
      type: String
    },
    data: Object,
    gateway: [
      {
        type: String,
        enum: ["zoop", "pagarme"],
        required: true
      }
    ],
    id_transaction_gateway: String,
    status: {
      type: String,
      enum: [
        "pago",
        "novo",
        "falhou",
        "pendente",
        "pre_authorizado",
        "invertido",
        "reembolso_parcial",
        "em_disputa",
        "cobrado_de_volta",
        "cancelado",
        "devolvido",
        "em_analise"
      ],
      required: true
    },
    buyer_id: {
      type: String,
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Buyer"
    },
    buyer_document: String,
    url_payment: {
      type: String
    },
    seller_id: {
      type: String,
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller"
    },
    expiration_date: Date,
    reponse_data: Object,
    metadata: { type: Object, searchable: true }
  },
  { timestamps: true }
);

TransactionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Transaction", TransactionSchema);
