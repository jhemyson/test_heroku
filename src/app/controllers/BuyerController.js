"use strict";
const Buyer = require("../models/buyer");
const Seller = require("../models/seller");
const { queryFilter } = require("../helpers/filters");
const BuyerZoop = require("../gateways_payment/zoop/buyerZoop");

class BuyerController {
  /************************************************************************
   * cria um novo comprador
   */
  async store(req, res) {
    try {
      const { document, seller_id } = req.body;

      /**
       * Verifica se a empresa solicitada existe
       */
      const seller = await Seller.findById(seller_id);

      if (!seller) {
        return res.status(400).json({ error: "Empresa não encontrada" });
      }
      const zoop = new BuyerZoop(seller.gateway_marketplace_id);

      /**
       * Verifica se já existe esse usuário cadastrado
       * na empresa.
       */
      const buyer_find = await Buyer.findOne({
        seller_id,
        document
      });

      /**
       * Se já existir esse usuário, faz um update ao invés de criar
       * um novo usuário
       */
      if (buyer_find) {
        const data = buyer_find.data_response[0];

        /**
         * Faz um update na Zoop e retorna os novos dados
         */
        const buyer_zoop_update = await zoop.updateBuyer(req.body, data.id);

        /**
         * Finaliza a operação, caso a Zoop retorne algum erro
         */
        if (!buyer_zoop_update) {
          return res
            .status(400)
            .json({ error: "Falha na requisição do gateway" });
        }

        /**
         * Faz update em nosso banco
         */
        await buyer_find.update(
          {
            ...req.body,
            gateway_buyer_id: buyer_zoop_update.id,
            data_response: buyer_zoop_update
          },
          { new: true }
        );

        return res.json({
          message: "O usuário foi alterado",
          _id: buyer_find.id
        });
      }

      const zoop_res = await zoop.createBuyer(req.body);

      const buyer = await Buyer.create({
        ...req.body,
        gateway_buyer_id: zoop_res.id,
        data_response: zoop_res
      });

      return res.json(buyer);
    } catch (error) {
      return res.status(400).json({ error, message: "Não foi possível cadastrar um novo usuário" });
    }
  }

  /************************************************************************
   * lista TODOS os compradores ou FILTRA pelo parâmetros nome ou CPF/CNPJ
   */
  async show(req, res) {
    try {
      const { name, document, seller_id, gateway_buyer_id } = req.query;
      const filters = await queryFilter({
        name,
        document,
        seller_id,
        gateway_buyer_id
      });

      const buyer = await Buyer.find(filters);
      return res.json(buyer);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  /************************************************************************
   * lista UM comprador pelo seu ID
   */
  async showById(req, res) {
    try {
      const buyer = await Buyer.findById(req.params.id).populate(
        "seller",
        "name document"
      );

      return res.json(buyer);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  /************************************************************************
   * Altera UM comprador
   */
  async update(req, res) {
    try {
      const check_buyer = await Buyer.findById(req.params.id);

      const seller = await Seller.findById(check_buyer.seller_id);

      if (!seller) {
        return res
          .status(404)
          .json({ error: "O vendedor desse comprador, não foi encontrado" });
      }

      const zoop = new BuyerZoop(seller.gateway_marketplace_id);

      const buyer_zoop_update = await zoop.updateBuyer(req.body, buyer.id);

      if (!buyer_zoop_update) {
        return res
          .status(400)
          .json({ error: "Falha na requisição do gateway" });
      }

      const buyer = await Buyer.findByIdAndUpdate(
        req.params.id,
        { ...req.body, data_response: buyer_zoop_update },
        {
          new: true
        }
      );

      return res.json(buyer);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  /************************************************************************
   * Deleta UM comprador
   */
  async delete(req, res) {
    try {
      await Buyer.findByIdAndDelete(req.params.id);

      return res.json({ message: "item deletado com sucesso" });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

module.exports = new BuyerController();
