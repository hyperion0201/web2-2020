import axios from "axios";
import configs from "../../Configs";
import { getCookie } from "../../helpers/cookie";

const baseURL = configs.baseUrl;

const request = async (method, url, data) => {
  console.log(getCookie("user_token"))
  return axios({
    method,
    url: baseURL + url,
    json: true,
    ...data,
    headers: {
      Authorization: `Bearer ${getCookie("user_token")}`,
    },
  });
};

export const createAccount = (data) => {
  return request("POST", "account", { data });
};

export const changepassword = (data) => {
  return request("POST", "user/changePassword", { data });
};