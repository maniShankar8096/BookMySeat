import { axiosInstance } from ".";

export const makePayment = async (token, amount) => {
  try {
    console.log("token", token);
    const res = await axiosInstance.post("/api/bookings/make-payment", {
      token,
      amount,
    });
    return res.data;
  } catch (err) {
    console.log("Error while making payment", err.message);
  }
};

export const bookShow = async (payload) => {
  try {
    const res = await axiosInstance.post("/api/bookings/book-show", payload);
    return res.data;
  } catch (err) {
    console.log("Error while booking show", err.message);
  }
};

export const getAllBookings = async () => {
  try {
    const res = await axiosInstance.get("/api/bookings/get-all-bookings");
    return res.data;
  } catch (err) {
    console.log("Error while fetching booking details", err.message);
  }
};
