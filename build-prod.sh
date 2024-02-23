clear
docker build -t nextjs-docker jobber-site

# docker run \
# -p 3000:3001 \
# --name jobber \
# --mount type=bind,source="$(pwd)"/src/data/db.sqlite,target=/app/src/data/db.sqlite \
# jobber-site
