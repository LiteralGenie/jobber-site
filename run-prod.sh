# Pre-render pages
cd /app
npx next experimental-generate 
mkdir /server
cp -a ./.next/standalone/. /server/
cp -a ./.next/static/. /server/.next/static

# Run server
cd /server
node server.js