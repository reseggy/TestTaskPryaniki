import axios from "axios";

const HOST = "https://test.v5.pryaniky.com";

const apiClient = axios.create({
  baseURL: HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers["x-auth"] = token;
  }

  return config;
});

export default apiClient;
