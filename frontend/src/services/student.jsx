import axios from "axios";
import { getCookies } from "../helpers/cookies";

const base_url_api = process.env.NEXT_PUBLIC_BASE_API_URL;
const { token: authToken } = getCookies();

export async function getStudent(page) {
  const url = base_url_api + "/students";
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

export async function createStudent(data) {
  const url = base_url_api + "/students";
  const res = await axios.post(url, data, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  return res.data;
}

export async function getStudentById(id) {
  const url = base_url_api + "/students/" + id;
  const res = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  return res.data;
}

export async function updateStudent(id, data) {
  const url = base_url_api + "/students/" + id;
  const res = await axios.put(url, data, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  return res.data;
}

export async function deleteStudent(id) {
  const url = base_url_api + "/students/" + id;
  const res = await axios.delete(url, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  return res.data;
}
