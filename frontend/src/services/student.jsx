import axios from "axios";

const base_url_api = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getStudent() {
  const url = base_url_api + "/students";
  const res = await axios.get(url);
  return res.data;
}

export async function createStudent(data) {
  const url = base_url_api + "/students";
  const res = await axios.post(url, data);

  return res.data;
}

export async function getStudentById(id) {
  const url = base_url_api + "/students/" + id;
  const res = await axios.get(url);

  return res.data;
}

export async function updateStudent(id, data) {
  const url = base_url_api + "/students/" + id;
  const res = await axios.put(url, data);

  return res.data;
}

export async function deleteStudent(id) {
  const url = base_url_api + "/students/" + id;
  const res = await axios.delete(url);

  return res.data;
}
