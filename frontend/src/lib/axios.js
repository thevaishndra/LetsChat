import axios from "axios";

let baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

//because deployed and local host urls are different
if (!baseURL.includes("/api")) {
  baseURL += "/api";
}
export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

//instead of configuring axios everytime
