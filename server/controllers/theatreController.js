const Theatre = require("../models/theatreModel");

const addTheatre = async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.status(200).send({
      success: true,
      message: "Theatre added successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateTheatre = async (req, res) => {
  try {
    const updatedTheatre = await Theatre.findByIdAndUpdate(
      {
        _id: req.body._id,
      },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Theatre updated successfully",
      data: updatedTheatre,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteTheatre = async (req, res) => {
  try {
    const deletedTheatre = await Theatre.findByIdAndDelete({
      _id: req.params.theatreId,
    });
    res.status(200).send({
      success: true,
      message: "Theatre deleted successfully",
      data: deletedTheatre,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllTheatres = async (req, res) => {
  try {
    const allTheatres = await Theatre.find().populate("owner");
    res.status(200).send({
      success: true,
      message: "All theatres fetched successfully",
      data: allTheatres,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllTheatresByOwner = async (req, res) => {
  try {
    const allTheatresByOwner = await Theatre.find({
      owner: req.params.ownerId,
    });
    res.status(200).send({
      success: true,
      message: "All theatres by Owner fetched successfully",
      data: allTheatresByOwner,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addTheatre,
  updateTheatre,
  deleteTheatre,
  getAllTheatres,
  getAllTheatresByOwner,
};
