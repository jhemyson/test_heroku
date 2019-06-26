"use strict";

let myCustomLabels = {
  totalDocs: "itemCount",
  docs: "itemsList",
  limit: "limit",
  page: "currentPage",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "pageCount",
  pagingCounter: "slNo"
};

function options(req) {
  return {
    page: req.query.page || 1,
    populate: "buyer_id",
    sort: { createdAt: -1 },
    limit: parseInt(req.query.limit) || 50,
    customLabels: myCustomLabels
  };
}

module.exports = { options };
