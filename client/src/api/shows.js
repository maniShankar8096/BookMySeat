import { axiosInstance } from ".";

export const addShow = async (payload) => {
  try {
    const res = await axiosInstance.post("/api/shows/add-show", payload);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateShow = async (payload) => {
  try {
    const res = await axiosInstance.put("/api/shows/update-show", payload);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getShowsByTheatre = async (payload) => {
  try {
    const res = await axiosInstance.post(
      "/api/shows/get-all-shows-by-theatre",
      payload
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteShow = async (payload) => {
  try {
    const res = await axiosInstance.post("/api/shows/delete-show", payload);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllTheatresByMovie = async (payload) => {
  try {
    const res = await axiosInstance.post(
      "/api/shows/get-all-theatres-by-movie",
      payload
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getShowById = async (payload) => {
  try {
    const res = await axiosInstance.post("/api/shows/get-show-by-id", payload);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
