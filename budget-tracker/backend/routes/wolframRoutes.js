const express = require("express");
const getWolframResponse = require("../config/wolfram");

const router = express.Router();

router.get("/ask", async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
    }

    const result = await getWolframResponse(query);
    res.json({ query, result });
});

module.exports = router;
