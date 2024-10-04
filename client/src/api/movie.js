import { axiosInstance } from ".";

export const getAllMovies = async () => {
  try {
    const res = await axiosInstance.get("/api/movies/get-all-movies");
    return res.data;
  } catch (err) {
    console.log("Error while calling getAllMovies API", err.message);
  }
};

export const addMovie = async (movie) => {
  try {
    const res = await axiosInstance.post("/api/movies/add-movie", movie);
    return res.data;
  } catch (err) {
    console.log("Error while calling addMovie API", err.message);
  }
};

export const updateMovie = async (movie) => {
  try {
    const res = await axiosInstance.put("/api/movies/update-movie", movie);
    return res.data;
  } catch (err) {
    console.log("Error while calling updateMovie API", err.message);
  }
};

export const deleteMovie = async (movieId) => {
  try {
    const res = await axiosInstance.post("/api/movies/delete-movie", movieId);
    return res.data;
  } catch (err) {
    console.log("Error while calling deleteMovie API", err.message);
  }
};

export const getMovieById = async (id) => {
  try {
    const res = await axiosInstance.get(`/api/movies/movie/${id}`);
    return res.data;
  } catch (err) {
    console.log("Error while calling getAllMovies API", err.message);
  }
};
