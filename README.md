_A job board with (mostly) working filters_

## Docker Setup

Initialize the SQLite database by following the setup instructions for the classifier backend:  
https://github.com/LiteralGenie/jobber-classifier

Build the Docker image:

```bash
# Download files
git clone https://github.com/LiteralGenie/jobber-site
cd /path/to/jobber-site

# Link database file
ln /path/to/jobber-scraper/src/data/db.sqlite /path/to/jobber-site/src/data/db.sqlite

# Build Docker image
docker build -t nextjs-docker .
```

Start the server:

```bash
# Listens on port 3001
docker run \
-p 3000:3001 \
--mount type=bind,source="$(pwd)"/src/data/db.sqlite,target=/app/src/data/db.sqlite \
nextjs-docker
```

$APP will be running at http://localhost:3001

## Development

Initialize the SQLite database by following the setup instructions for the classifier backend:  
https://github.com/LiteralGenie/jobber-classifier

Then install and run

```bash
git clone https://github.com/LiteralGenie/jobber-site
cd /path/to/jobber-site
npm install
npm run dev
```

$APP will be running at http://localhost:3000
