const axios = require("axios");

async function analyzeBudget(budget, expenses) {
    try {
        const expenseTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const query = `budget analysis: total budget is ${budget}, expenses are ${expenseTotal}`;

        const wolframResponse = await axios.get(
            `http://api.wolframalpha.com/v1/result`,
            {
                params: {
                    appid: process.env.WOLFRAM_APP_ID,
                    i: query,
                },
            }
        );

        return wolframResponse.data;
    } catch (error) {
        throw new Error("Error analyzing budget with Wolfram API");
    }
}

module.exports = { analyzeBudget }; // Ensure correct export
