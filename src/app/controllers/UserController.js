"use strict";
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const queryFilter = require("../helpers/filters");

class UserController {
  /************************************************************************
   * cria um novo usuário
   */
  async store(req, res) {
    try {
      const { email } = req.body;

      /**
       * Verifica se já existe um usuário com esse email
       */
      if (await User.findOne({ email })) {
        return res
          .status(400)
          .json({ error: "Já existe um usuário com esse e-mail" });
      }

      const user = await User.create(req.body);

      return res.json({
        user,
        token: user.generateToken(user)
      });
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
    }
  }

  /************************************************************************
   * Busca usuário(os)
   */
  async show(req, res) {
    try {
      const { name, email } = req.query;
      const query = await queryFilter({ name, email });

      const user = await User.find(query);

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
    }
  }
}

module.exports = new UserController();
