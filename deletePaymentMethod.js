// This sample assumes use of Express Node.js framework
const axios = require("axios");
const CryptoJS = require("crypto-js");

// Store API keys in your environment configuration.
const YOUR_WYRE_API_KEY = "";
const YOUR_WYRE_SECRET_KEY = "";
const PAYMENT_METHOD_ID = "";

// const productionUrl = "https://api.sendwyre.com";
const testUrl = "https://api.testwyre.com";

// Signature Calculation using Crypto-js
const signature = (url, data) => {
  const dataToSign = url + data;
  const token = CryptoJS.enc.Hex.stringify(
    CryptoJS.HmacSHA256(
      dataToSign.toString(CryptoJS.enc.Utf8),
      YOUR_WYRE_SECRET_KEY
    )
  );
  return token;
};

async function deletePaymentMethod(req, res, next) {
  try {
    const timestamp = new Date().getTime();
    const url = `${testUrl}/v2/paymentMethod/${PAYMENT_METHOD_ID}?timestamp=${timestamp}`;
    const headers = {};

    headers["Content-Type"] = "application/json";
    headers["X-Api-Key"] = YOUR_WYRE_API_KEY;
    headers["X-Api-Signature"] = signature(url, "");

    const config = {
      method: "DELETE",
      url: url,
      headers: headers,
    };

    const response = await axios(config);
    console.log(response.data);
    console.log(headers["X-Api-Signature"]);
  } catch (error) {
    console.log(error);
  }
}

deletePaymentMethod();
