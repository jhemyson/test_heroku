"use strict";
const router = require("express").Router();
const auth = require("../../middlewares/auth")
// const TransactionController = require("../../../controllers/TransactionController")

router.use("/sellers", require("./seller"));
router.use("/spreadsheet", require("./excel"));
router.use("/events", require("./transactionEvent"));
router.use("/imports", require("./seller_transaction_zoop"));

router.use(auth.authMiddleware)

router.use("/sellers", require("./transfer"));

router.post("/receive", (req, res, next) => {
  return res.json(req.body);
});



router.use("/partner", require("./partner"));

router.use("/imports", require("./seller_transaction_zoop"));
// router.use("", require("./session"));

router.use("/buyers", require("./buyer"));

/**
 * Transferências
 */


/**
 * Vendedores
 */


/**
 * Exportar transações
 */
router.use("/sellers", require("./export"));


router.use("/transactions", require("./transactions"));
router.use("/users", require("./user"));
router.use("/sessions", require("./session"));
router.use("/extracts", require("./extract"));
router.use("/cnabs", require("./cnab400"));

module.exports = router;
