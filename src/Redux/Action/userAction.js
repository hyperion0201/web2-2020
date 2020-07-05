import axios from "axios";
const baseURL = window.AppConfigs.baseUrl;

const request = async (method, url, data) => {
  const res = await axios({
    method,
    baseURL,
    url,
    data,
    header: {
      "Content-Type": "application/json",
    },
    json: true,
  });
  if (!res.ok) {
    const { error } = await res.json();
    throw Error(error);
  }
  return res.json();
};

export const login = async (data) => {
  return request("POST", "/login", { data });
};

export const register = async (data) => {
  return request("POST", "/register", { data });
};
