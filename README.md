_A job board with (mostly) working filters_

## Docker Setup

Initialize the SQLite database by following the setup instructions for the classifier backend:  
https://github.com/LiteralGenie/jobber-classifier

Build the Docker image:

```bash
# Download files
git clone https://github.com/LiteralGenie/jobber-site
cd /path/to/jobber-site

# So that nextjs doesn't error out
touch env.local

# Build Docker image
docker build -t jobber-site .
```

Start the server:

```bash
# -d runs server in background
# -p sets port to 3001
# --name makes other docker commands more convenient (eg docker restart ...)
# --mount loads the database file generated earlier
docker run \
-d \
-p 3001:3000 \
--name jobber \
--mount type=bind,source="/path/to/jobber-site/src/data/db.sqlite,target=/app/src/data/db.sqlite \
jobber-site
```

$APP will be running at http://localhost:3001

## Development

Initialize the SQLite database by following the setup instructions for the classifier backend  
https://github.com/LiteralGenie/jobber-classifier

Install the regex extension for sqlite  
https://github.com/ralight/sqlite3-pcre  
Ubuntu users can run `apt install sqlite3-pcre`

Create a `.env.local` file using the `.env.local.example` template.

```bash
cp .env.local.example .env.local
nano .env.local
```

Start the dev server

```bash
git clone https://github.com/LiteralGenie/jobber-site
cd /path/to/jobber-site
npm install
npm run dev
```

$APP will be running at http://localhost:3000
