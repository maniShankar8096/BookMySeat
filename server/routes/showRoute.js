const express = require("express");

const {
  addShow,
  deleteShow,
  updateShow,
  getAllShowsByTheatre,
  getAllTheatresByMovie,
  getShowById,
} = require("../controllers/showController");
const showRouter = express.Router();

showRouter.post("/add-show", addShow);

showRouter.post("/delete-show", deleteShow);

showRouter.put("/update-show", updateShow);

showRouter.post("/get-all-shows-by-theatre", getAllShowsByTheatre);

//get all theatres by movie which has the show for that movie
showRouter.post("/get-all-theatres-by-movie", getAllTheatresByMovie);

showRouter.post("/get-show-by-id", getShowById);

module.exports = showRouter;
