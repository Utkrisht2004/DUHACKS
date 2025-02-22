require("dotenv").config();
console.log("WOLFRAM_APP_ID:", process.env.WOLFRAM_APP_ID); // Debugging line
const express = require("express");
const path = require("path");
const wolframRoutes = require("./routes/wolframRoutes");

const app = express();
app.use(express.json());

// Serve Static Files (Move this BELOW app initialization)
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/wolfram", wolframRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));