import { axiosInstance } from "./index";

export const registerUser = async (value) => {
  try {
    const res = await axiosInstance.post("/api/users/register", value);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (value) => {
  try {
    const res = await axiosInstance.post("/api/users/login", value);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await axiosInstance.get("/api/users/get-current-user");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const forgotPassword = async (value) => {
  try {
    const res = await axiosInstance.patch("/api/users/forgot-password", value);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = async (value, email) => {
  try {
    const res = await axiosInstance.patch(
      `/api/users/reset-password/${email}`,
      value
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
