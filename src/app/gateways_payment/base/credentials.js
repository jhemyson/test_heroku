"use strict";
const marketplaces = require("./marketplaces");

function getGatewayAuth(marketplace_id) {
  return marketplaces[marketplace_id];
}

module.exports = getGatewayAuth;
