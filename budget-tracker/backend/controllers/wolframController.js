require("dotenv").config();
const axios = require("axios");

const WOLFRAM_API_KEY = process.env.WOLFRAM_API_ID;
const WOLFRAM_API_URL = "http://api.wolframalpha.com/v2/query";

// Check if API key is set
if (!WOLFRAM_API_KEY) {
    console.error("❌ Missing Wolfram API Key in .env file");
    process.exit(1);
}

// Function to analyze budget
const analyzeBudget = async (budget, expenses) => {
    try {
        // Ensure numbers are valid
        budget = Number(budget);
        expenses = expenses.map(Number);
        if (isNaN(budget) || expenses.some(isNaN)) {
            throw new Error("Invalid budget or expenses. Must be numbers.");
        }

        // Calculate total spent and remaining budget
        const totalSpent = expenses.reduce((sum, expense) => sum + expense, 0);
        const remainingBudget = budget - totalSpent;

        // Construct query for Wolfram Alpha
        const query = `Total spent: ${totalSpent}, remaining budget: ${remainingBudget}`;

        // Call Wolfram API
        const response = await axios.get(WOLFRAM_API_URL, {
            params: {
                input: query,
                format: "json",
                output: "JSON",
                appid: WOLFRAM_API_KEY
            }
        });

        const wolframData = response.data.queryresult;

        // Extract relevant insights
        const insights = wolframData.didyoumeans ? wolframData.didyoumeans.val : "No insights available";

        return {
            totalSpent,
            remainingBudget,
            wolframAnalysis: wolframData,
            insights
        };

    } catch (error) {
        console.error("🚨 Error analyzing budget:", error.message);
        return { error: "Failed to analyze budget. Please check inputs and API key." };
    }
};

// Controller function to handle API requests
const getBudgetAnalysis = async (req, res) => {
    try {
        let { budget, expenses } = req.body;

        // Handle GET requests (convert query params)
        if (req.method === "GET") {
            budget = req.query.budget;
            expenses = req.query.expenses ? req.query.expenses.split(",") : [];
        }

        if (!budget || !expenses.length) {
            return res.status(400).json({ error: "Invalid input. Provide a budget and expenses." });
        }

        const analysis = await analyzeBudget(budget, expenses);
        res.json({ analysis });

    } catch (error) {
        console.error("🚨 Error in getBudgetAnalysis:", error.message);
        res.status(500).json({ error: "Error analyzing budget with Wolfram API" });
    }
};

// ✅ Export both functions correctly
module.exports = { analyzeBudget, getBudgetAnalysis };
