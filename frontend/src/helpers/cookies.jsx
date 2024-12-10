import Cookies from "js-cookie";

export const getCookies = () => {
  const token = Cookies.get("token") || "";
  const user = Cookies.get("user") || "";

  return {
    token,
    user,
  };
};
