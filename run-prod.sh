# Pre-render pages
npx next experimental-generate 

cp -a /app/.next/standalone/. /server
cp -a /app/.next/static/. /server/.next/static
cp -a /app/public/. /server/public

# Run server
cd /server
node server.js