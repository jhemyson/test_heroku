const Partner = require("../../models/partner")

module.exports = {
  /**
   * Verifica se o usuário tem uma key
   * e maraketplace válidos
   */
  async authMiddleware(req, res, next) {
    try {
      const { api_key, marktplace_id } = req.headers;

      if (!api_key) {
        return res.status(401).json({ error: "Nenhuma key encontrada" });
      }

      const replace_api_key = api_key.replace('key_', '')

      const partner = await Partner.findById(replace_api_key)

      if (partner.status !== 'ativo') {
        return res.status(401).json({ error: "Usuário não está ativo" })
      }

      if (!partner.marketplace_id.indexOf(marktplace_id)) {
        return res.status(403).json({ error: "Operação não autorizada!" })
      }

      return next();
    } catch (err) {
      return res.status(401).json(err);
    }
  },
};
