import axios from "axios";
import configs from "../../Configs";
const baseURL = configs.baseUrl;

const request = async (method, url, data) => {
  return axios({
    method,
    baseURL,
    url,
    json: true,
    ...data,
  });
};

export const login = (data) => {
  return request("POST", "login", { data });
};

export const register = (data) => {
  return request("POST", "register", { data });
};
