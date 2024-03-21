const axios = require('axios');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { imageUrl } = JSON.parse(event.body);
    const ARENA_CHANNEL_SLUG = 'testing-wrkgn_q6vbg'; // Directly use the slug for your specific channel
    const ARENA_ACCESS_TOKEN = process.env.ARENA_ACCESS_TOKEN; // Ensure this is set in your Netlify environment variables

    try {
        const response = await axios.post(`https://api.are.na/v2/channels/${ARENA_CHANNEL_SLUG}/blocks`, {
            source: imageUrl,
            description: 'User submitted image via Netlify function',
        }, {
            headers: {
                'Authorization': `Bearer ${ARENA_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        return { statusCode: 200, body: JSON.stringify({ message: "Image submitted successfully to Are.na." }) };
    } catch (error) {
        console.error('Error submitting to Are.na:', error);
        return { statusCode: 500, body: JSON.stringify({ error: "Failed to submit image to Are.na." }) };
    }
};
