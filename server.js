require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const authRoutes=require("./routes/authRouter")
const userRoutes = require("./routes/userRouter");
const coursesRoutes=require("./routes/courseRoute")

// موديلز


const Course = require("./models/Course");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth' ,authRoutes)

app.use("/api/users", userRoutes);
app.use("/api/courses", coursesRoutes);



// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));

// --- Static Admin Creation ---



// --- Basic Test Route ---
app.get("/", (req, res) => {
res.send("Training Center API is running");
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// DELETE /courses/42/students/157
//query  
// my courses عرضهن
//instrucror 
//enroleed =?
//create=? admin =>sx
