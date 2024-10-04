const bookingRouter = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const {
  makePayment,
  bookShow,
  getAllBookings,
} = require("../controllers/bookingController");

bookingRouter.post("/make-payment", auth, makePayment);

bookingRouter.post("/book-show", auth, bookShow);

bookingRouter.get("/get-all-bookings", auth, getAllBookings);

module.exports = bookingRouter;
