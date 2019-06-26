const Transaction = require("../models/transaction");
const transactionEvent = require("../models/transactionEvent");
const Request = require("../repositories/Request");

class transactionEventController {
  async store(req, res) {
    try {
      const { payload } = req.body;

      /**
       * Verifica se o evento da zoop é do tipo boleto,
       * se for, entra no if
       */
      if (payload.object.payment_type === "boleto") {
        /**
         * Busca uma transação com o id enviado pela Zoop
         */
        const transaction = await Transaction.findOne({
          id_transaction_gateway: payload.object.id
        });

        /**
         * Cria um novo evento
         */
        await transactionEvent.create({
          id_transaction: transaction.id,
          data_response: req.body
        });

        /**
         * Status de pagamento
         */
        const status_payment = {
          succeeded: "pago",
          failed: "falhou",
          canceled: "cancelado",
          pre_authorized: "pre_authorizado",
          reversed: "invertido",
          refunded: "devolvido",
          pending: "pendente",
          new: "novo",
          partial_refunded: "reembolso_parcial",
          dispute: "em_disputa",
          charged_back: "cobrado_de_volta"
        };

        transaction.status = status_payment[payload.object.status];
        transaction.data = { ...payload.object.payment_method };
        transaction.data.history = payload.object.history;
        transaction.reponse_data = payload;

        await transaction.save();

        /**
         * Caso tenha uma Url de postback, ele envia a transação
         */
        if (transaction.url_postback) {
          const post = new Request();
          await post.sendEvent("POST", transaction.url_postback, transaction);
        }

        return res.json(transaction);
      }

      return res.json({ message: "Nenhuma transação encontrada" });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async show(req, res) {
    try {
      const { id_transaction } = req.query

      let filter = {}
      if (id_transaction) {
        filter.id_transaction = id_transaction
      }

      const event = await transactionEvent.find(filter);

      return res.json(event);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async showById(req, res) {
    try {
      const event = await transactionEvent.findById(req.params.id);

      return res.json(event);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new transactionEventController();
