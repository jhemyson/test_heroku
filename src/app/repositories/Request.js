"use strict";
const request = require("request-promise");

class Request {
  _request(params) {
    return new Promise(async function(resolve, reject) {
      try {
        const data = await request(params);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  async sendEvent(type, url, data) {
    const options = {
      method: type,
      url: url,
      headers: {
        ...(data.headers || null)
      },
      body: data,
      json: true
    };

    return this._request(options);
  }
}

module.exports = Request;
