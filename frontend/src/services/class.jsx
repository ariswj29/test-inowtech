import axios from "axios";
import { getCookies } from "../helpers/cookies";

const base_url_api = process.env.NEXT_PUBLIC_BASE_API_URL;
const { token: authToken } = getCookies();

export async function getClass(page) {
  const url = base_url_api + "/classes";
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

export async function createClass(data) {
  const url = base_url_api + "/classes";
  const res = await axios.post(url, data, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  return res.data;
}

export async function getClassById(id) {
  const url = base_url_api + "/classes/" + id;
  const res = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  return res.data;
}

export async function updateClass(id, data) {
  const url = base_url_api + "/classes/" + id;
  const res = await axios.put(url, data, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  return res.data;
}

export async function deleteClass(id) {
  const url = base_url_api + "/classes/" + id;
  const res = await axios.delete(url, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  return res.data;
}
