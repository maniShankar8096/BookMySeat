import { axiosInstance } from ".";

export const addTheatre = async (formData) => {
  try {
    const res = await axiosInstance.post("/api/theatres/add-theatre", formData);
    return res.data;
  } catch (err) {
    console.log("error while adding theatre", err.message);
  }
};

export const getAllTheatresForAdmin = async () => {
  try {
    const res = await axiosInstance.get("/api/theatres/get-all-theatres");
    return res.data;
  } catch (err) {
    console.log("error while fetching theatres", err.message);
  }
};

export const getAllTheatresForOwner = async (ownerId) => {
  try {
    const res = await axiosInstance.get(
      `/api/theatres/get-all-theatres-by-owner/${ownerId}`
    );
    return res.data;
  } catch (err) {
    console.log("error while fetching theatre", err.message);
  }
};

export const updateTheatre = async (data) => {
  try {
    const res = await axiosInstance.put("/api/theatres/update-theatre", data);
    return res.data;
  } catch (err) {
    console.log("error while updating theatre", err.message);
  }
};

export const deleteTheatre = async (theatreId) => {
  try {
    const res = await axiosInstance.delete(
      `/api/theatres//delete-theatre/${theatreId}`
    );
    return res.data;
  } catch (err) {
    console.log("error while deleting theatre", err.message);
  }
};
