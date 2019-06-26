"use strict";
const { queryFilter, formatDate } = require("../helpers/filters");
const SwitchTransactionGateway = require("../gateways_payment/base/switchTransactionGateway ");
const TransactionZoop = require("../gateways_payment/zoop/transactionZoop");
const BuyerZoop = require("../gateways_payment/zoop/buyerZoop");
const { options } = require("../helpers/pagination");

const Seller = require("../models/seller");
const Buyer = require("../models/buyer");
const Transaction = require("../models/transaction");

const stg = new SwitchTransactionGateway();

class TransactionController {
  /************************************************************************
   * cria uma transação
   */
  async store(req, res) {
    try {
      const { buyer_id, seller_id } = req.body;
      /**
       * Verifica se existe esse comprador
       */
      const buyer = await Buyer.findById(buyer_id);

      if (!buyer) {
        return res.status(404).json({ error: "Comprador não encontrado" });
      }

      /**
       * Verifica se existe esse Vendedor
       */
      const seller = await Seller.findById(seller_id);

      if (!seller) {
        return res.status(404).json({ error: "Vendedor não encontrado" });
      }

      /**
       * Cria uma transação no gateway
       */
      const res_stg = await stg.createTransaction(
        seller.gateway_marketplace_id,
        {
          ...req.body,
          seller_id: seller.gateway_seller_id,
          buyer_zoop_id: buyer.gateway_buyer_id
        }
      );

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
      /**
       * Salva o retorno do gateway e body em nosso banco
       */
      const transaction = await Transaction.create({
        ...req.body,
        reponse_data: res_stg,
        status: status_payment[res_stg.status],
        amount: res_stg.amount,
        expiration_date: res_stg.payment_method.expiration_date,
        id_transaction_gateway: res_stg.id,
        url_payment: res_stg.url,
        data: { ...res_stg.payment_method, history: res_stg.history }
      });

      return res.json(transaction);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  /************************************************************************
   * Busca uma transação
   */
  async show(req, res) {
    try {
      const {
        seller_id,
        buyer_id,
        buyer_document,
        seller_document,
        status,
        amount,
        expiration_date,
        createdAt,
        updatedAt,
        metadata,
        id_transaction_gateway,
        data,
      } = req.query;

      formatDate(expiration_date)
      formatDate(createdAt);
      formatDate(updatedAt);

      let filters = await queryFilter({
        metadata,
        expiration_date,
        data,
        createdAt,
        updatedAt,
        seller_id,
        buyer_id,
        buyer_document,
        seller_document,
        status,
        amount,
        id_transaction_gateway
      });

      if (buyer_document) {
        const buyer = await Buyer.findOne({ document: buyer_document, seller_id });

        if (!buyer) {
          return res.status(404).json({ error: "Comprador não encontrado" });
        }

        filters.buyer_id = buyer.id;
        delete filters.buyer_document
      }

      if (seller_document) {
        const seller = await Seller.findOne({ document: seller_document });

        if (!seller) {
          return res.status(404).json({ error: "Vendedor não encontrado" });
        }

        filters.seller_id = seller.id;
        delete filters.seller_document
      }


      const opt = options(req);
      const transaction = await Transaction.paginate(filters, opt);

      // Promise.all(
      //   transaction.itemsList.map(async item => {

      //     await Transaction.findByIdAndDelete(item.id)
      //   })
      // )
      return res.json(transaction);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  /************************************************************************
   * Busca uma transação por id
   */
  async showById(req, res) {
    try {
      const transaction = await Transaction.findById(req.params.id).populate(
        "buyer_id seller_id",
        "name first_name document"
      );

      return res.json(transaction);
    } catch (error) {
      return res.status(400).json({ error, message: "Erro na busca" });
    }
  }

  /************************************************************************
   * Busca uma transação por id na zoop
   */
  async showByZoop(req, res) {
    try {
      const seller = await Seller.findById(req.params.seller_id);

      if (!seller) {
        return res.status(404).json({ error: "Vendedor não encontrado" });
      }

      const transaction_zoop = new TransactionZoop(
        seller.gateway_marketplace_id
      );

      const zoop = await transaction_zoop.getTransaction(req.params.id);

      if (zoop.statusCode === 404) {
        return res.status(404).json({ error: "Transacão não encontrada" });
      }

      const buyer_zoop = new BuyerZoop(seller.gateway_marketplace_id);

      const search_buyer = await buyer_zoop.getBuyer(zoop.customer);

      const format_transaction = {
        gateway: ["zoop"],
        status: zoop.status,
        amount: zoop.amount,
        metadata: zoop.metadata,
        payment_type: zoop.payment_type,
        id_transaction_gateway: zoop.id,
        buyer_id: {
          status: search_buyer.status,
          gateway_buyer_id: search_buyer.id,
          name: search_buyer.first_name,
          last_name: search_buyer.last_name,
          document: search_buyer.taxpayer_id,
          email: search_buyer.email,
          phone_number: search_buyer.phone_number,
          address: search_buyer.address
        },
        buyer_document: search_buyer.taxpayer_id,
        data: { ...zoop.payment_method, history: zoop.history },
        reponse_data: zoop,
        createdAt: zoop.created_at,
        updatedAt: zoop.updated_at
      };

      return res.json(format_transaction);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new TransactionController();
