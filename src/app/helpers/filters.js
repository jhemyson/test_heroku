"use strict";
const moment = require("moment");

function queryFilter(items) {
  let filters = {};
  Object.keys(items).map(function (key) {
    if (items[key]) {
      filters[key] = items[key];
    }
  });

  return filters;
}

function formatDate(date) {
  if (date) {
    Object.keys(date).forEach(key => {
      date[key] = moment(date[key]).format("YYYY-MM-DD[T00:00:00.000Z]");
    });
  }
}

module.exports = { queryFilter, formatDate };
