document.getElementById('imageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const imageUrl = document.getElementById('imageUrl').value;
    fetch('https://api.are.na/v2/channels/YOUR_CHANNEL_SLUG/blocks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // Not recommended for production
        },
        body: JSON.stringify({
            source: imageUrl,
            description: 'User submitted image'
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
});
