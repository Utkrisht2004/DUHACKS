const axios = require("axios");

const WOLFRAM_API_URL = "http://api.wolframalpha.com/v1/result";
const WOLFRAM_APP_ID = process.env.WOLFRAM_APP_ID;

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

module.exports = getWolframResponse;
