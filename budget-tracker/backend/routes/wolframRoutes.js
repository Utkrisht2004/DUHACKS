const express = require("express");
const { analyzeBudget } = require("../controllers/wolframController");

const router = express.Router();

// GET Route (for testing in the browser)
router.get("/budget-analysis", async (req, res) => {
    try {
        const { budget, expenses } = req.query;

        if (!budget || !expenses) {
            return res.status(400).json({ error: "Budget and expenses are required" });
        }

        // Convert expenses from "200,300,100" to [200, 300, 100]
        const expenseArray = expenses.split(",").map(Number);

        const analysis = await analyzeBudget(budget, expenseArray);
        res.json({ analysis });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST Route (for frontend API calls)
router.post("/budget-analysis", async (req, res) => {
    try {
        const { budget, expenses } = req.body;

        if (!budget || !expenses) {
            return res.status(400).json({ error: "Budget and expenses are required" });
        }

        const analysis = await analyzeBudget(budget, expenses);
        res.json({ analysis });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
