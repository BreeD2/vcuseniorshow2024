const axios = require('axios');

exports.handler = async (event) => {
    const { image_url } = JSON.parse(event.body);
    const ARENA_CHANNEL_SLUG = 'your-channel-slug';
    const ARENA_ACCESS_TOKEN = process.env.ARENA_ACCESS_TOKEN;

    try {
        const response = await axios.post(`https://api.are.na/v2/channels/${ARENA_CHANNEL_SLUG}/blocks`, {
            source: image_url,
            description: 'User submitted image',
        }, {
            headers: {
                'Authorization': `Bearer ${ARENA_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        console.error('Error submitting to Are.na:', error.response.data);
        return {
            statusCode: error.response.status,
            body: JSON.stringify(error.response.data)
        };
    }
};
