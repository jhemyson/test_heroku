const Partner = require("../models/partner")

class PartnerControoler {
  async create(req, res) {
    try {
      const partner = await Partner.create(req.body)

      partner.api_key = ("key_" + partner.id);

      await partner.save()

      return res.json(partner)

    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async find(req, res) {
    try {
      const partner = await Partner.find()

      return res.json(partner)
    } catch (err) {
      return res.status(400).json(err)
    }
  }
}

module.exports = new PartnerControoler()
