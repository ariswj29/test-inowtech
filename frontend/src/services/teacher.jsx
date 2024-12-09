import axios from "axios";

const base_url_api = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getTeacher() {
  const url = base_url_api + "/teachers";
  const res = await axios.get(url);
  return res.data;
}

export async function createTeacher(data) {
  const url = base_url_api + "/teachers";
  const res = await axios.post(url, data);

  return res.data;
}

export async function getTeacherById(id) {
  const url = base_url_api + "/teachers/" + id;
  const res = await axios.get(url);

  return res.data;
}

export async function updateTeacher(id, data) {
  const url = base_url_api + "/teachers/" + id;
  const res = await axios.put(url, data);

  return res.data;
}

export async function deleteTeacher(id) {
  const url = base_url_api + "/teachers/" + id;
  const res = await axios.delete(url);

  return res.data;
}
