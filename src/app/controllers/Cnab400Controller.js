"use strict";
const SendRequestCnab = require("../repositories/cnab/SendRequestCnab");
const MountTransactionWithCnab = require("../repositories/cnab/MountTransactionWithCnab");

class Cnab400Controller {
  async store(req, res) {
    try {
      const objCnab = new MountTransactionWithCnab(req.body);
      const cnab = new SendRequestCnab();

      const request_cnab = objCnab._file.map(async item => {
        try {
          const res = await cnab.sendJsonCnab(item);
          await objCnab.setTransactionWithSuccess(res);
        } catch (error) {
          await objCnab.setTransactionWithError({
            ...item,
            error: {
              status: error.response.statusCode,
              message: error.response.body.error
            }
          });
        }
        if (objCnab._file.length) {
          return await objCnab.getResponseObjectCnab();
        }
      });

      const teste = await Promise.all(request_cnab);

      return res.json(teste[teste.length - 1]);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new Cnab400Controller();
