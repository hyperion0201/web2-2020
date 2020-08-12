import axios from "axios";
import configs from "../../Configs";
import { getCookie } from "../../helpers/cookie";

const baseURL = configs.baseUrl;

const InstanceAPI = () => {
  const defaultOptions = {
    baseURL,
  };

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(function (config) {
    const token = getCookie("user_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return instance;
};

const API = {
  async get(url, params, headers) {
    return await InstanceAPI.get(url, { params });
  },
  async post(url, data, headers) {
    return await InstanceAPI.post(url, { data });
  },
  async put(url, data, headers) {
    return await InstanceAPI.put(url, { data });
  },
  async delete(url, data, headers) {
    return await InstanceAPI.delete(url, { data });
  },
};

export default API;
