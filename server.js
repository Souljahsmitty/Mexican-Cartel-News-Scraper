const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();

// Enable CORS for API routes
app.use(cors());

// ✅ Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve index.html when accessing the root "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 📌 Existing API Endpoints
app.get('/rss', async (req, res) => {
    try {
        console.log("Fetching RSS feeds...");
        const rssUrls = ["https://www.insightcrime.org/feed/"];
        let rssData = '';

        for (const url of rssUrls) {
            console.log(`Fetching RSS from: ${url}`);
            try {
                const response = await axios.get(url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0'
                    }
                });
                console.log(`RSS Response (${url}):`, response.status);
                rssData += response.data + "\n\n";
            } catch (error) {
                console.error(`Error fetching RSS from ${url}:`, error.message);
            }
        }

        res.set('Content-Type', 'application/xml');
        res.send(rssData || "No RSS data fetched.");

    } catch (error) {
        console.error("Unexpected error:", error.message);
        res.status(500).send(`Error fetching RSS: ${error.message}`);
    }
});

// 📌 Route to return cartel news links
const cartelLinks = [
    { name: "Borderland Beat", url: "https://www.borderlandbeat.com/" },
    { name: "InSight Crime", url: "https://www.insightcrime.org/" },
    { name: "El Universal", url: "https://www.eluniversal.com.mx/" }
    // Add more links...
];

app.get('/cartel-links', (req, res) => {
    console.log("Request received for /cartel-links");
    res.json(cartelLinks);
});

// ✅ Start Express Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
