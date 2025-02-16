const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();

// ✅ Enable CORS
app.use(cors());

// ✅ Serve static frontend files (ensure "public/index.html" exists)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Serve "index.html" at the root "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 📌 Route 1: Fetch RSS Feeds
app.get('/rss', async (req, res) => {
    try {
        console.log("Fetching RSS feeds...");
        const rssUrls = ["https://www.insightcrime.org/feed/"];
        let rssData = '';

        for (const url of rssUrls) {
            console.log(`Fetching RSS from: ${url}`);
            try {
                const response = await axios.get(url, {
                    headers: { 'User-Agent': 'Mozilla/5.0' }
                });
                console.log(`RSS Response (${url}):`, response.status);
                rssData += response.data + "\n\n";
            } catch (error) {
                console.error(`Error fetching RSS from ${url}:`, error.message);
            }
        }

        if (!rssData) {
            return res.status(404).json({ message: "No RSS data fetched." });
        }

        res.setHeader('Content-Type', 'application/xml');
        res.send(rssData);

    } catch (error) {
        console.error("Unexpected error:", error.message);
        res.status(500).json({ error: `Error fetching RSS: ${error.message}` });
    }
});

// 📌 Route 2: Provide Cartel News Links
const cartelLinks = [
    { name: "Borderland Beat", url: "https://www.borderlandbeat.com/" },
    { name: "InSight Crime", url: "https://www.insightcrime.org/" },
    { name: "El Universal", url: "https://www.eluniversal.com.mx/" },
    { name: "Foros de Milenio", url: "https://www.milenio.com/ultima-hora/" },
    { name: "Crisis Group", url: "https://www.crisisgroup.org/latin-america-caribbean/mexico/b50-fear-lies-lucre-how-criminal-groups-weaponise-social-media-mexico/" },
    { name: "Foreign Policy", url: "https://foreignpolicy.com/2020/12/15/latin-american-drug-cartels-instagram-facebook-tiktok-social-media-crime/" },
    { name: "Ciscoman", url: "https://ciscomani.house.gov/media/press-releases/ciscomani-introduces-bill-combat-cartel-recruitment-through-social-media/" },
    { name: "Gnet Research", url: "https://gnet-research.org/2021/03/23/mexican-cartel-use-of-social-media/" },
    { name: "Trapperman", url: "https://trapperman.com/forum/ubbthreads.php/topics/8325758/1/" },
    { name: "Small Wars Journal", url: "https://smallwarsjournal.com/2013/11/25/mexican-cartel-strategic-note-no-15-skullduggery-or-social-banditry-cartel-humanitarian-aid/" },
    { name: "Bloomsberry Intelligence", url: "https://bisi.org.uk/reports/rapid-recruitment-mexicos-cartels-recruitment-trough-social-media/" },
    { name: "Blog Narco", url: "https://elblogdelnarco.com/" },
    { name: "Milenio", url: "https://www.milenio.com/" },
    { name: "OCCRP", url: "https://www.occrp.org/en/" },
    { name: "Foros el Universal", url: "https://foros.eluniversal.com.co/" },
    { name: "r/narcos:", url: "https://www.reddit.com/r/narcos/" },
    { name: "narconews:", url: "https://www.narconews.com/" },
    { name: "Diagolos Americas:", url: "https://dialogo-americas.com/articles/mexican-cartels-spread-tentacles-across-south-america/?utm_source=chatgpt.com/" }
];

app.get('/cartel-links', (req, res) => {
    res.json(cartelLinks);
});

// ✅ Start Express Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
