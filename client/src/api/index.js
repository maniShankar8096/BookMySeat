import axios from "axios";

//creating an instance of axios with default headers so that we can use rather than definging it every time
export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Cache-Control": "no-cache",
  },
});
