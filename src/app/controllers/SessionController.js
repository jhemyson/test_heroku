const User = require("../models/user");

class SessionController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      if (!(await user.compareHash(password))) {
        return res.status(400).json({ error: "Senha inválida" });
      }

      return res.json({
        user,
        token: user.generateToken()
      });
    } catch (error) {
      return res.status(400).json({ error: "Erro na requisição" });
    }
  }
}

module.exports = new SessionController();
