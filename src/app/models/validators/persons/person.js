const validate = require("mongoose-validator");

class PersonValidate {
  constructor() {
    this._name = [
      validate({
        validator: "isLength",
        arguments: [3, 100],
        message:
          "Nome inválido, deve conter entre {ARGS[0]} e {ARGS[1]} caracteres"
      })
    ];
    this._phone = [
      validate({
        validator: "isMobilePhone",
        message: "O número de telefone é inválido"
      })
    ];
    this._document = [
      validate({
        validator: "isLength",
        arguments: [9, 11],
        message:
          "Documento inválido, deve conter entre {ARGS[0]} e {ARGS[1]} caracteres"
      })
    ];
  }

  checkName() {
    return this._name;
  }

  checkPhone() {
    return this._phone;
  }

  checkDocument() {
    return this._document;
  }
}

module.exports = PersonValidate;
