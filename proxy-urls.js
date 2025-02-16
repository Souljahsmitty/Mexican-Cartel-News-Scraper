const express = require('express');
const cors = require('cors'); // Allow cross-origin requests

const app = express();
app.use(cors()); // Enable CORS for all routes

// List of cartel news links
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

// Define API endpoint correctly
app.get('/cartel-links', (req, res) => {
    console.log("Request received for /cartel-links"); // Debugging log
    res.json(cartelLinks);
});

// Start server on port 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Cartel Links Proxy running on port ${PORT}`);
});
