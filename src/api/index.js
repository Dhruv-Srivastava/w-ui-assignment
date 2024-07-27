import axios from "axios";

const BASE_URL = "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1";

export async function getAllRetreats(params) {
  const res = await axios.get(`${BASE_URL}/retreats`, {
    params,
  });
  return res;
}

export async function getRetreat(id) {
  const res = await axios.get(`${BASE_URL}/retreats/${id}`);
  return res;
}
