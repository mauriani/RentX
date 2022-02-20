import axios from "axios";

const api = axios.create({
  // baseURL: "http://192.168.1.148:3333",
  // baseURL: "http://192.168.15.29:3333",
  baseURL: "http://192.168.15.12:3333",
});

export default api;
