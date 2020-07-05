import { getCookie } from "./cookie";

export const isLogin = () => {
  const temp = getCookie("user_token");
  return temp;
};
