import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

# URL of the website to scrape
url = 'https://www.borderlandbeat.com/'

# Send a GET request to the website
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Find all articles
articles = soup.find_all('h3', class_='post-title entry-title')

# List to store scraped data
data = []

# Extract title and link for each article
for article in articles:
    title = article.get_text(strip=True)
    link = article.find('a')['href']
    data.append({'title': title, 'link': link})

# Save data to a JSON file with the current date
filename = f'data_{datetime.now().strftime("%Y%m%d")}.json'
with open(filename, 'w') as f:
    json.dump(data, f, indent=4)

print(f'Scraped {len(data)} articles. Data saved to {filename}.')
