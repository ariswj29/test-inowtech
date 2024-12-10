import Cookies from "js-cookie";

export const getCookies = () => {
  const token = Cookies.get("token") || "";

  return {
    token,
  };
};
