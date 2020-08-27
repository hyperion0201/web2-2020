import axios from "axios";
import configs from "../../Configs";
import { getCookie } from "../../helpers/cookie";

const baseURL = configs.baseUrl;

const request = async (method, url, data, heads) => {
  let headers = { Authorization: `Bearer ${getCookie("user_token")}` };
  heads && heads.forEach((header) => (headers[header.key] = header.value));
  return axios({
    method,
    url: baseURL + url,
    json: true,
    ...data,
    headers,
  });
};

export const createAccount = (data) => {
  return request("POST", "account", { data });
};

export const getListTransaction = (id) => {
  return request("GET", `transaction/transaction-history?accountId=${id}`);
};

export const transferMoney = (data) => {
  return request("POST", "transaction/transfer", { data });
};

export const deposit = (data) => {
  return request("POST", "account/charge", { data });
};

export const withdrawal = (data) => {
  return request("POST", "transaction/cashout", { data });
};

export const withdrawMoneySaving = (data) => {
  return request("POST", "account/withdraw", { data });
};

export const verifyOnTransfer = (data) => {
  return request("POST", "transaction/otp-confirmation", { data });
};
