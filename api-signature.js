// This sample assumes use of Express Node.js framework
const axios = require("axios");
const CryptoJS = require("crypto-js");

// Store API keys in your environment configuration.
const YOUR_WYRE_API_KEY = "";
const YOUR_WYRE_SECRET_KEY = "";
const YOUR_ACCOUNT_ID = "";

const productionUrl = "https://api.senwyre.com";
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

// Change the body to return a different signature
const body = {
  amount: "100.00",
  sourceCurrency: "USD",
  destCurrency: "BTC",
  dest: "bitcoin:mtduMecgYr5nMv2xkye1zhGMUBA3KsAhtq",
  country: "US",
  accountId: YOUR_ACCOUNT_ID,
  walletType: "DEBIT_CARD",
};

const details = JSON.stringify(body);
const api_signature = signature(testUrl, details);
console.log(api_signature);
