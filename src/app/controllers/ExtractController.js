"use strict";
const extractZoop = require("../gateways_payment/zoop/extractZoop");
const Seller = require("../models/seller");
const { queryFilter } = require("../helpers/filters");

class ExtractController {
  async show(req, res) {
    try {
      const { limit, page, type, created_date_range } = req.query;

      const filters = queryFilter({ limit, page, type, created_date_range });

      const seller = await Seller.findById(req.params.seller);

      if (!seller) {
        return res.status(400).json({ error: "Empresa não encontrada." });
      }

      const extract = new extractZoop(seller.gateway_marketplace_id);

      const res_extract = await extract.getExtract(
        seller.gateway_seller_id,
        filters
      );

      return res.json(res_extract);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new ExtractController();
