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

//redux action
export const setUserInfo = async () => {
  const info = await getUserInfo();
}