import axios from "axios";

const base_url_api = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getClass() {
  const url = base_url_api + "/classes";
  const res = await axios.get(url);
  return res.data;
}

export async function createClass(data) {
  const url = base_url_api + "/classes";
  const res = await axios.post(url, data);

  return res.data;
}

export async function getClassById(id) {
  const url = base_url_api + "/classes/" + id;
  const res = await axios.get(url);

  return res.data;
}

export async function updateClass(id, data) {
  const url = base_url_api + "/classes/" + id;
  const res = await axios.put(url, data);

  return res.data;
}

export async function deleteClass(id) {
  const url = base_url_api + "/classes/" + id;
  const res = await axios.delete(url);

  return res.data;
}
