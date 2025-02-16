const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio'); // For scraping HTML content

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/rss', async (req, res) => {
    try {
        console.log("Fetching RSS feeds...");

        // Store multiple RSS feed URLs in an array
        const rssUrls = [
            "https://www.insightcrime.org/feed/",
            //"https://www.borderlandbeat.com/feeds/posts/default",
            // Add more RSS feed URLs if available
        ];

        let rssData = '';

        for (const url of rssUrls) {
            console.log(`Fetching RSS from: ${url}`);

            try {
                const response = await axios.get(url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                });

                console.log(`RSS Feed Response Status (${url}):`, response.status);
                rssData += response.data + "\n\n"; // Append RSS data from each source
            } catch (error) {
                console.error(`Error fetching RSS feed from ${url}:`, error.message);
            }
        }

        res.set('Content-Type', 'application/xml');
        res.send(rssData || "No RSS data fetched.");

    } catch (error) {
        console.error("Unexpected error:", error.message);
        res.status(500).send(`Error fetching RSS feeds: ${error.message}`);
    }
});

// ✅ Start Express server
app.listen(3000, () => {
    console.log('Proxy running on port 3000');
});
