import axios from "axios";
import { getCookies } from "../helpers/cookies";

const base_url_api = process.env.NEXT_PUBLIC_BASE_API_URL;
const { token: authToken } = getCookies();

export async function getParent(page) {
  const url = base_url_api + "/parents";
  const res = await axios.get(url, {
    params: {
      page,
    },
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });
  return res.data;
}

export async function createParent(data) {
  const url = base_url_api + "/parents";
  const res = await axios.post(url, data, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  return res.data;
}

export async function getParentById(id) {
  const url = base_url_api + "/parents/" + id;
  const res = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  return res.data;
}

export async function updateParent(id, data) {
  const url = base_url_api + "/parents/" + id;
  const res = await axios.put(url, data, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  return res.data;
}

export async function deleteParent(id) {
  const url = base_url_api + "/parents/" + id;
  const res = await axios.delete(url, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  return res.data;
}
