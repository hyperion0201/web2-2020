import axios from "axios";
import configs from "../../Configs";
import { getCookie } from "../../helpers/cookie";

const baseURL = configs.baseUrl;

const request = async (method, url, data) => {
  return axios({
    method,
    url: baseURL + url,
    json: true,
    ...data,
    header: {
      Authorization: `Bearer ${getCookie("user_token")}`,
    },
  });
};

export const login = (data) => {
  return request("POST", "account", { data });
};
