const axios = require("axios");

const WOLFRAM_API_URL = "http://api.wolframalpha.com/v1/result";
const WOLFRAM_APP_ID = process.env.WOLFRAM_APP_ID;
console.log("🔍 WOLFRAM_APP_ID in wolfram.js:", WOLFRAM_APP_ID);

if (!WOLFRAM_APP_ID) {
    throw new Error("❌ Missing Wolfram API Key in .env file");
}

const getWolframResponse = async (query) => {
    try {
        const response = await axios.get(WOLFRAM_API_URL, {
            params: {
                i: query,
                appid: WOLFRAM_APP_ID,
            },
        });

        return response.data; // Plain text response
    } catch (error) {
        console.error("❌ Wolfram API Error:", error.message);
        return "Error fetching data from Wolfram Alpha.";
    }
};

const analyzeBudget = async (budget, expenses) => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense, 0);
    const query = `Is total spending of ${totalExpenses} within a budget of ${budget}?`;

    try {
        const response = await axios.get(WOLFRAM_API_URL, {
            params: { i: query, appid: WOLFRAM_APP_ID },
        });

        return response.data; // Wolfram returns a text response
    } catch (error) {
        console.error("❌ Wolfram API Error:", error.message);
        return "Error analyzing budget.";
    }
};

// ✅ Fix: Export both functions
module.exports = { getWolframResponse, analyzeBudget };
