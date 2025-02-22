require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const wolframRoutes = require("./routes/wolframRoutes");

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/api/wolfram", wolframRoutes);

app.get("/", (req, res) => {
    res.send({ message: "Budget Tracker API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));