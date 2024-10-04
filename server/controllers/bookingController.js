const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
const emailHelper = require("../utils/emailHelper");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const makePayment = async (req, res) => {
  try {
    const { token, amount, email } = req.body;
    const customer = await stripe.customers.create({
      email: email,
      source: token.id,
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      description: "Payment for booking",
      payment_method_types: ["card"],
      recepient_email: email,
    });
    const transcationId = paymentIntent.id;
    res.send({
      success: true,
      message: "Payment is successful",
      data: transcationId,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const bookShow = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    const show = await Show.findById({ _id: req.body.show }).populate("movie");
    const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
    await Show.findByIdAndUpdate(
      { _id: req.body.show },
      { bookedSeats: updatedBookedSeats }
    );
    //add more details for booked ticket
    const populatedBooking = await Booking.findById({
      _id: newBooking._id,
    })
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });
    await emailHelper("tickettemplate.html", populatedBooking.user.email, {
      name: populatedBooking.user.name,
      movie: populatedBooking.show.movie.title,
      theatre: populatedBooking.show.theatre.name,
      date: populatedBooking.show.date,
      time: populatedBooking.show.time,
      seats: populatedBooking.seats,
      amount: populatedBooking.seats.length * populatedBooking.show.ticketPrice,
      transactionId: populatedBooking.transactionId,
    });
    res.send({
      success: true,
      message: "Show Booked Successfully",
      data: newBooking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId })
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });
    bookings.sort((booking1, booking2) => {
      return booking2.show.date - booking1.show.date;
    });
    res.send({
      success: true,
      message: "Bookings fetched!",
      data: bookings,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { makePayment, bookShow, getAllBookings };
