const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");

// Load environment variables from .env file
dotenv.config();

const app = express();

//! Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err.message));

//! CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://expense-tracker-frontend.vercel.app"
  ],
  credentials: true,
};
app.use(cors(corsOptions));


//! Middleware
app.use(express.json());

//! Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

//! Error Handler
app.use(errorHandler);

//! Start the Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
