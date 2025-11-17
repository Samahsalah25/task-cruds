require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRouter");
const userRoutes = require("./routes/userRouter");
const coursesRoutes = require("./routes/courseRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", coursesRoutes);

// --- MongoDB Connection with caching ---
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return; // Use existing connection

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};

// Connect DB first, then start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// --- Basic Test Route ---
app.get("/", (req, res) => {
  res.send("Training Center API is running");
});
