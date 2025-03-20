import Cookies from "js-cookie";

export const getTokenFromCookies = () => {
  return Cookies.get("token") || null;
};
