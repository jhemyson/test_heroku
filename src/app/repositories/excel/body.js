const styles = require("./styles")

module.exports = {
  transaction_id: {
    displayName: 'Código da transação',
    headerStyle: styles.headerDark,
    width: 160
  },
  seller_name: {
    displayName: 'Nome do estabelecimento',
    headerStyle: styles.headerDark,
    width: 250
  },
  buyer_name: {
    displayName: 'Nome do comprador',
    headerStyle: styles.headerDark,
    width: 200
  },
  document: {
    displayName: 'CPF/CNPJ do comprador',
    headerStyle: styles.headerDark,
    width: 160
  },
  amount: {
    displayName: 'Valor da transação',
    headerStyle: styles.headerDark,
    width: 140
  },
  status_payment: {
    displayName: 'Status da transação',
    headerStyle: styles.headerDark,
    // cellStyle: function (value, row) {
    //   if (row.status_payment == 'pago') {
    //     return styles.green
    //   }
    //   if (row.status_payment == 'falhou') {
    //     return styles.red
    //   }
    //   if (row.status_payment === 'pendente') {
    //     return styles.yellow
    //   }
    // },
    width: 140
  },
  date_payment: {
    displayName: 'Data do pagamento',
    headerStyle: styles.headerDark,
    width: 140
  },
  createdAt_payment: {
    displayName: 'Data de criação',
    headerStyle: styles.headerDark,
    width: 140
  },
  exiration_date: {
    displayName: 'Data de vencimento',
    headerStyle: styles.headerDark,
    width: 140
  }
}
