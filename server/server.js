const express = require("express");
require("dotenv").config(); // to access env variables
const path = require("path");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const connectDB = require("./config/dbconfig");
const userRouter = require("./routes/userRoute");
const movieRouter = require("./routes/movieRoute");
const theatreRouter = require("./routes/theatreRoute");
const showRouter = require("./routes/showRoute");
const bookingRouter = require("./routes/bookingRoute");

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: "https://bookmyseat-9img.onrender.com/",
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const clientBuildPath = path.join(__dirname, "../client/build");
//to render static html files
app.use(express.static(clientBuildPath));
connectDB();

//rate-limit-middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, //limit each ip to 100 requests in 15 mins
  message: "Too many requests fromthis IP, Please try again after some time",
});

app.use(limiter);

app.use("/api/bookings/verify", express.raw({ type: "application/json" }));
app.use(express.json());

//Routes
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/bookings", bookingRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server is running on port ${process.env.SERVER_PORT}`);
});
