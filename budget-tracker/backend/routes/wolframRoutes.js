const express = require("express");
const { analyzeBudget } = require("../config/wolfram"); // ✅ Ensure correct import

const router = express.Router();

// GET Route (for browser testing via query params)
router.get("/budget-analysis", async (req, res) => {
    try {
        let { budget, expenses } = req.query;

        if (!budget || !expenses) {
            return res.status(400).json({ error: "Budget and expenses are required" });
        }

        // Convert budget to a number and expenses to an array
        budget = Number(budget);
        const expenseArray = expenses.split(",").map(Number);

        if (isNaN(budget) || expenseArray.some(isNaN)) {
            return res.status(400).json({ error: "Invalid budget or expenses format" });
        }

        console.log("🔍 Calling analyzeBudget with:", { budget, expenses: expenseArray }); // ✅ Debug log

        const analysis = await analyzeBudget(budget, expenseArray);
        res.json({ analysis });
    } catch (error) {
        console.error("❌ Error in GET /budget-analysis:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST Route (for frontend API calls)
router.post("/budget-analysis", async (req, res) => {
    try {
        let { budget, expenses } = req.body;

        if (!budget || !expenses || !Array.isArray(expenses)) {
            return res.status(400).json({ error: "Budget (number) and expenses (array) are required" });
        }

        // Convert budget to number
        budget = Number(budget);

        if (isNaN(budget) || expenses.some(isNaN)) {
            return res.status(400).json({ error: "Invalid budget or expenses format" });
        }

        console.log("🔍 Calling analyzeBudget with:", { budget, expenses }); // ✅ Debug log

        const analysis = await analyzeBudget(budget, expenses);
        res.json({ analysis });
    } catch (error) {
        console.error("❌ Error in POST /budget-analysis:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
