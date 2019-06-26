const TransferZoop = require("../gateways_payment/zoop/transferZoop");
const Seller = require("../models/seller");

class TransferController {
  async show(req, res) {
    try {
      const { seller_id, transfer_id } = req.params;

      const seller = await Seller.findById(seller_id);

      if (!seller) {
        return res.status(400).json({ error: "Vendedor não encontrado" });
      }
      const transf_zoop = new TransferZoop(seller.gateway_marketplace_id);

      const zoop = await transf_zoop.getTransfer(transfer_id, req.query);

      return res.json(zoop);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async showTransferWithTransactions(req, res) {
    try {
      const { seller_id, transfer_id } = req.params;

      const seller = await Seller.findById(seller_id);

      if (!seller) {
        return res.status(400).json({ error: "Vendedor não encontrado" });
      }

      const transf_zoop = new TransferZoop(seller.gateway_marketplace_id);

      const zoop = await transf_zoop.getTransferTransactions(
        transfer_id,
        req.query
      );

      return res.json(zoop);
    } catch (error) {
      return res.json(error);
    }
  }

  async showTransferWithHistory(req, res) {
    try {
      const { seller_id, transfer_id } = req.params;

      const seller = await Seller.findById(seller_id);

      if (!seller) {
        return res.status(400).json({ error: "Vendedor não encontrado" });
      }
      const transf_zoop = new TransferZoop(seller.gateway_marketplace_id);

      const zoop = await transf_zoop.getTransferHistory(
        transfer_id,
        req.query
      );

      return res.json(zoop);
    } catch (error) {
      return res.json(error);
    }
  }
}

module.exports = new TransferController();
