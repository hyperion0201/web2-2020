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

export const changepassword = (data) => {
  return request("POST", "user/changePassword", { data });
};

export const getListTransaction = (id) => {
  return request("GET", `transaction/transaction-history?accountId=${id}`);
};

export const transferMoney = (data) => {
  return request("POST", "transaction/transfer", { data });
};
