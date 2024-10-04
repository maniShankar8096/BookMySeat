const Show = require("../models/showModel");

const addShow = async (req, res) => {
  try {
    const newMovie = new Show(req.body);
    await newMovie.save();
    res.send({
      success: true,
      message: "New Show added succesfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteShow = async (req, res) => {
  try {
    const deletedTheatre = await Show.findByIdAndDelete({
      _id: req.body.showId,
    });
    res.status(200).send({
      success: true,
      message: "Show deleted successfully",
      data: deletedTheatre,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateShow = async (req, res) => {
  try {
    const updatedTheatre = await Show.findByIdAndUpdate(
      {
        _id: req.body.showId,
      },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Show updated successfully",
      data: updatedTheatre,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllShowsByTheatre = async (req, res) => {
  try {
    const allShowsByTheatre = await Show.find({
      theatre: req.body.theatreId,
    }).populate("movie");
    res.status(200).send({
      success: true,
      message: "All shows by Theatre fetched successfully",
      data: allShowsByTheatre,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllTheatresByMovie = async (req, res) => {
  try {
    const { movie, date } = req.body;
    const shows = await Show.find({ movie, date }).populate("theatre");
    const uniqueTheatre = [];
    shows.forEach((show) => {
      const isTheatre = uniqueTheatre.find(
        (theatre) => theatre._id === show.theatre._id
      );
      if (!isTheatre) {
        const showsofThisTheatre = shows.filter(
          (showObj) => showObj.theatre._id === show.theatre._id
        );
        uniqueTheatre.push({
          ...show.theatre._doc,
          shows: showsofThisTheatre,
        });
      }
    });
    res.status(200).send({
      success: true,
      message: "All shows by Theatre fetched successfully",
      data: uniqueTheatre,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getShowById = async (req, res) => {
  try {
    const updatedTheatre = await Show.findById({
      _id: req.body.showId,
    })
      .populate("movie")
      .populate("theatre");
    res.status(200).send({
      success: true,
      message: "Show fetched successfully",
      data: updatedTheatre,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addShow,
  deleteShow,
  updateShow,
  getAllShowsByTheatre,
  getAllTheatresByMovie,
  getShowById,
};
