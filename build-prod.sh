clear
docker build -t nextjs-docker .

# docker run \
# -p 3000:3001 \
# --mount type=bind,source="$(pwd)"/src/data/db.sqlite,target=/app/src/data/db.sqlite \
# nextjs-docker
