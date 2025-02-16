async function loadArticles() {
    try {
        console.log("Fetching articles from proxy...");
        const response = await fetch('http://localhost:3000/rss');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse XML response
        const textResponse = await response.text();
        console.log("Raw XML Response:", textResponse);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(textResponse, "application/xml");

        // Check if parsing failed
        if (xmlDoc.querySelector("parsererror")) {
            throw new Error("Error parsing XML.");
        }

        let articles = [];
        const items = xmlDoc.getElementsByTagName("item"); // Extracting RSS feed items

        for (let item of items) {
            let title = item.getElementsByTagName("title")[0]?.textContent || "No Title";
            let link = item.getElementsByTagName("link")[0]?.textContent || "#"; // Ensure it's getting the link properly
            let published = item.getElementsByTagName("pubDate")[0]?.textContent || "Unknown Date";

            articles.push({ title, link, published });
        }

        console.log("Parsed Articles:", articles);
        displayArticles(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        displayErrorMessage("Failed to load articles. Please try again later.");
    }
}

function displayArticles(articles) {
    const articlesDiv = document.getElementById('articles');
    articlesDiv.innerHTML = '';

    if (articles.length === 0) {
        articlesDiv.innerHTML = '<p>No articles available.</p>';
        return;
    }

    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'article';
        articleDiv.innerHTML = `
            <a href="${article.link}" target="_blank"><h3>${article.title}</h3></a>
            <p>Published on: ${new Date(article.published).toLocaleDateString()}</p>
        `;
        articlesDiv.appendChild(articleDiv);
    });
}

function displayErrorMessage(message) {
    const articlesDiv = document.getElementById('articles');
    articlesDiv.innerHTML = `<p class="error">${message}</p>`;
}

// Load articles on page load
window.onload = loadArticles;

// ✅ Event listener for "Mexican Cartel Links" button
document.getElementById("category1Btn").addEventListener("click", async function(event) {
    event.preventDefault(); // Prevent default link behavior

    const articlesSection = document.getElementById("articles");
    articlesSection.innerHTML = "<p>Loading cartel links...</p>";

    try {
        const response = await fetch("http://localhost:3001/cartel-links", { mode: 'cors' });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const links = await response.json();
        articlesSection.innerHTML = "<h2>Mexican Cartel Links</h2><ul>";

        links.forEach(link => {
            articlesSection.innerHTML += `<li><a href="${link.url}" target="_blank">${link.name}</a></li>`;
        });

        articlesSection.innerHTML += "</ul>";
    } catch (error) {
        console.error("Error fetching cartel links:", error);
        articlesSection.innerHTML = "<p>Failed to load links. Try again later.</p>";
    }
});

// ✅ Fix: Correctly closing event listener for Home button
document.getElementById("homeBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default navigation behavior

    const articlesSection = document.getElementById("articles");
    articlesSection.innerHTML = "<p>Loading articles...</p>";

    // Reload the main RSS feed articles
    loadArticles();
});
