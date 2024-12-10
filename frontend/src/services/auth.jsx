import axios from "axios";
import Cookies from "js-cookie";

const base_url_api = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function registerField(data) {
  const url = base_url_api + "/auth/register";
  const res = await axios.post(url, data);

  return res.data;
}

export async function login(data) {
  const url = base_url_api + "/auth/login";
  const res = await axios.post(url, data);

  return res.data;
}

export async function logout() {
  Cookies.remove("token");
  Cookies.remove("userId");
  Cookies.remove("user");
  Cookies.remove("nearestBranch");
  Cookies.remove("latitude");
  Cookies.remove("longitude");
  Cookies.remove("role");
}
