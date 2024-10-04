const express = require("express");
const {
  addTheatre,
  updateTheatre,
  deleteTheatre,
  getAllTheatres,
  getAllTheatresByOwner,
} = require("../controllers/theatreController");

const theatreRouter = express.Router();

theatreRouter.post("/add-theatre", addTheatre);

theatreRouter.put("/update-theatre", updateTheatre);

theatreRouter.delete("/delete-theatre/:theatreId", deleteTheatre);

theatreRouter.get("/get-all-theatres", getAllTheatres);

theatreRouter.get("/get-all-theatres-by-owner/:ownerId", getAllTheatresByOwner);

module.exports = theatreRouter;
