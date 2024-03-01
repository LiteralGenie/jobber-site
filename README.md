_A job board with all the filters_
Live demo: https://jobber.velchees.dev/

<img width="75%" src="https://github.com/LiteralGenie/jobber-site/assets/24236225/7c7d470a-1b6e-4914-aad0-0391c54490a0" />

## Features

- Filter jobs by tech stack (eg include Django, exclude C++)
- Filter jobs by responsibilities (eg include on-call, exclude travel)
- Filter jobs by minimum experience (eg include only jobs that require <N years of experience)
- Filter jobs based on security clearance / location requirements
- RSS feed
- Mobile friendly with light and dark themes

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

Jobber will be running at http://localhost:3001

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

Jobber will be running at http://localhost:3000

## Screenshots


<img width="30%" src="https://github.com/LiteralGenie/jobber-site/assets/24236225/7754f0e5-b9b8-4492-9a04-fe007fccfbd9"/>

<img width="30%" src="https://github.com/LiteralGenie/jobber-site/assets/24236225/9807b09c-f982-488a-bc2a-51e95156ac66"/>
