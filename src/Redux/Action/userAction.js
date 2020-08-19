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

export const login = (data) => {
  return request("POST", "login", { data });
};

export const register = (data) => {
  return request("POST", "register", { data });
};

export const changepassword = (data) => {
  return request("POST", "user/changePassword", { data });
};

export const forgotpassword = (data) => {
  return request("POST", "user/forgotPassword", { data });
};

export const getUserInfo = () => {
  return request("GET", "user");
};

export const verifyUser = (data) => {
  const heads = [{ key: "Content-Type", value: "multipart/formdata" }];
  return request("POST", "user/verify", { data }, heads);
};

export const getListAccount = () => {
  return request("GET", "account");
};

//redux action
export const setUserInfo = async () => {
  const info = await getUserInfo();
};

export const lockAccount = (data) => {
  return request("POST", "account/deactivate", { data });
};
export const unlockAccount = (data) => {
  return request("POST", "account/activate", { data });
};

export const getAllUser = (query) => {
  return request("POST", "user/all", { data: { query } });
};
