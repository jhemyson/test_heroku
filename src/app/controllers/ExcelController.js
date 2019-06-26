"use strict"
const excel = require("node-excel-export");

const Transaction = require("../models/transaction");
const moment = require("moment");

const excelBody = require("../repositories/excel/body");
const { queryFilter, formatDate } = require("../helpers/filters");

class ExcelController {
  async create(req, res) {
    try {
      const {
        seller_id
      } = req.query;

      let filters = {}

      if (seller_id) {
        filters.seller_id = seller_id
      }

      const transactions = await Transaction.find(filters).populate('buyer_id seller_id', 'name last_name document')

      let dataset = []

      Promise.all(
        transactions.map(item => {
          dataset.push(
            {
              transaction_id: item.id,
              seller_name: item.seller_id.name,
              buyer_name: `${item.buyer_id.name} ${item.buyer_id.last_name ? item.buyer_id.last_name : ''}`,
              document: item.buyer_id.document,
              amount: `R$${item.amount}`,
              status_payment: item.status,
              date_payment: item.status !== 'pago' ? '' : moment(item.updatedAt).format('DD/MM/YYYY'),
              createdAt_payment: moment(item.createdAt).format('DD/MM/YYYY'),
              exiration_date: moment(item.expiration_date).format('DD/MM/YYYY')
            }
          )
        })
      )

      const generateExcel = excel.buildExport(
        [
          {
            name: 'transacoes',
            specification: excelBody,
            data: dataset
          }
        ]
      );

      res.attachment('transacoes.xlsx');

      // console.log(res.attachment('transacoes.xlsx'))
      // console.log(generateExcel)

      return res.send(generateExcel);
    } catch (err) {
      return res.status(400).json(err)
    }
  }
}

module.exports = new ExcelController();
