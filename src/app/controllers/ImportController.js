"use strict";
const GetTransactionsZoopFromASeller = require("../gateways_payment/zoop/getTransactionsZoopFromASeller");
const BuyerZoop = require("../gateways_payment/zoop/buyerZoop");
const Buyer = require("../models/buyer");
const Seller = require("../models/seller");
const Transaction = require("../models/transaction");

class ImportController {
  async show(req, res, next) {
    try {
      /**
       * Verifica se o seller já foi criado em nosso banco
       */
      const seller = await Seller.findById(req.params.id);

      if (!seller) {
        return res.status(400).json({ error: "Vendedor não encontrado" });
      }

      const marketplace_seller = seller.gateway_marketplace_id;

      const zoop_buyer = new BuyerZoop(marketplace_seller);

      const zoop = new GetTransactionsZoopFromASeller(marketplace_seller);

      /**
       * Pega as transações desse seller na zoop
       */
      var import_zoop = await zoop.getTransactions(
        seller.gateway_seller_id,
        req.query
      );

      /**
       * Mapeia todos as transações retornadas
       */
      let importe = async transactions =>
        await transactions.items.map(async item => {
          /**
           * Verifica se já existe essa transação salva em nosso banco,
           * se existir, ela ignora essa transação
           */
          if (await Transaction.findOne({ id_transaction_gateway: item.id })) {
            return next();
          } else {
            /**
             * Verifica se já existe esse buyer em nosso banco
             *
             */

            var my_api_res_buyer = await Buyer.findOne({
              gateway_buyer_id: item.payment_method.customer
            });

            /**
             * Se não existir, cria um buyer em nosso banco
             */
            if (!my_api_res_buyer) {
              /**
               * Busca na zoop os dados desse buyer
               */
              let zoop_res_buyer = await zoop_buyer
                .getBuyer(item.customer)
                .then(success => success)
                .catch(error => error);

              /**
               * Cria o buyer em nosso banco
               */
              if (zoop_res_buyer.id !== null) {
                my_api_res_buyer = await Buyer.create({
                  seller_id: seller.id,
                  name: zoop_res_buyer.first_name,
                  last_name: zoop_res_buyer.last_name,
                  phone_number: zoop_res_buyer.phone_number,
                  data_response: zoop_res_buyer,
                  document: zoop_res_buyer.taxpayer_id,
                  email: zoop_res_buyer.email,
                  address: zoop_res_buyer.address,
                  metadata: zoop_res_buyer.metadata,
                  gateway_buyer_id: zoop_res_buyer.id
                });
              }
            }

            if (my_api_res_buyer.id) {
              let status_payment = {
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

              /**
               * Salva a transação em nosso banco
               */
              await Transaction.create({
                amount: item.amount,
                id_transaction_gateway: item.id,
                status: status_payment[item.status],
                gateway: "zoop",
                description: item.description,
                buyer_id: my_api_res_buyer.id,
                seller_id: seller.id,
                metadata: item.payment_method.metadata,
                payment_type: "boleto",
                expiration_date: item.payment_method.expiration_date,
                metadata: item.metadata,
                data: {
                  ...item.payment_method,
                  history: item.history
                },
                reponse_data: item,
                createdAt: item.created_at,
                updatedAt: item.updated_at
              });
            }
          }
        });

      let importes_transactions = async () => {
        for (var i = 1; i <= import_zoop.total_pages; i++) {
          if (i == import_zoop.total_pages) {
          }
          new Promise(async (reject, resolve) => {
            var importes = await zoop.getTransactions(
              seller.gateway_seller_id,
              {
                ...req.query,
                page: i
              }
            );

            await importe(importes)
              .then(success => success)
              .catch(error => next());

            reject(error => next());
          });
        }
      };

      await importes_transactions();

      return res.json({ message: "Importando..", itens: import_zoop.total });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new ImportController();
