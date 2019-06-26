"use strict";
const Seller = require("../models/seller");
const { queryFilter } = require("../helpers/filters");
const SellerZoop = require("../gateways_payment/zoop/sellerZoop");

class SellerController {
  /************************************************************************
   * cria um novo vendedor
   */
  async store(req, res) {
    try {
      const { document, gateway_seller_id } = req.body;

      if (await Seller.findOne({ document })) {
        return res.status(400).json({ error: "Cnpj já cadastrado" });
      }

      const zoop = new SellerZoop(req.body.gateway_marketplace_id);
      const seller_zoop = await zoop.getSeller(gateway_seller_id);

      // if (seller_zoop.statusCode != 200) {
      //   return res
      //     .status(400)
      //     .json({ error: "Não foi possível cadastrar o vendedor na Zoop" });
      // }

      const seller = await Seller.create({
        ...req.body,
        gateway_seller_id: seller_zoop.id
      });

      seller.data_response.push(seller_zoop);

      await seller.save();

      return res.json(seller);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  /************************************************************************
   * lista TODOS os vendedores ou FILTRA pelo parâmetros
   * nome , CNPJ ou gateway_seller_id
   */
  async show(req, res) {
    try {
      const { name, document, gateway_seller_id } = req.query;

      const filters = await queryFilter({ name, document, gateway_seller_id });

      const seller = await Seller.find(filters);

      return res.json(seller);
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Não foi possível buscar o vendedor" });
    }
  }

  /************************************************************************
   * lista UM vendedor pelo seu ID
   */
  async showById(req, res) {
    try {
      const seller = await Seller.findById(req.params.id);

      return res.json(seller);
    } catch (error) {
      return res.status(400).json({ error: "Erro na requisição" });
    }
  }

  /************************************************************************
   * Altera UM vendedor
   */
  async update(req, res) {
    try {
      const { gateway_seller_id } = req.body;

      // if (gateway_seller_id) {
      //   const seller = await Seller.findById(req.params.id);

      //   const zoop = new SellerZoop(seller.gateway_marketplace_id);

      //   const seller_zoop = await zoop.getSeller(gateway_seller_id);

      //   if (seller_zoop.statusCode === 400 || 401 || 403 || 500) {
      //     return res
      //       .status(400)
      //       .json({ error: "Não foi possível alterar as informações" });
      //   }
      // }

      const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });

      return res.json(seller);
    } catch (error) {
      res.status(400).json({ error: "Erro na requisição" });
    }
  }
}

module.exports = new SellerController();
