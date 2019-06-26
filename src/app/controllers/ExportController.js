const ExportZoop = require("../gateways_payment/zoop/exportZoop");
const Seller = require("../models/seller");

class ExportController {
  async store(req, res) {
    try {
      const seller = await Seller.findById(req.params.seller_id);

      if (!seller) {
        return res.status(404).json({ error: "Vendedor não encontrado" });
      }

      const exports_zoop = new ExportZoop(seller.gateway_marketplace_id);

      const create_export = await exports_zoop.createExports(
        seller.gateway_seller_id,
        req.query,
        req.body.format
      );

      return res.json(create_export);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async show(req, res) {
    try {
      const seller = await Seller.findById(req.params.seller_id);

      if (!seller) {
        return res.status(404).json({ error: "Vendedor não encontrado" });
      }

      const exports_zoop = new ExportZoop(seller.gateway_marketplace_id);

      const get = await exports_zoop.getExports(
        seller.gateway_seller_id,
        req.query
      );

      return res.json(get);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new ExportController();
