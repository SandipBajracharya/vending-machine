import Axios from "axios";
import { CommonObjectType } from "../types/global";

Axios.defaults.baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const getApi = async (path: string, params: CommonObjectType = {}) => {
  return await Axios.get(path, { params });
};

export const putApi = async (path: string, body: CommonObjectType = {}) => {
  return await Axios.put(path, { ...body });
};
