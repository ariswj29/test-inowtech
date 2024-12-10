import axios from "axios";
import { getCookies } from "@/helpers/cookies";

const base_url_api = process.env.NEXT_PUBLIC_BASE_API_URL;
const { token: authToken } = getCookies();

export async function getTeacher(page) {
  const url = base_url_api + "/teachers";
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

export async function createTeacher(data) {
  const url = base_url_api + "/teachers";
  const res = await axios.post(url, data, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  return res.data;
}

export async function getTeacherById(id) {
  const url = base_url_api + "/teachers/" + id;
  const res = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  return res.data;
}

export async function updateTeacher(id, data) {
  const url = base_url_api + "/teachers/" + id;
  const res = await axios.put(url, data, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  return res.data;
}

export async function deleteTeacher(id) {
  const url = base_url_api + "/teachers/" + id;
  const res = await axios.delete(url, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });

  return res.data;
}
