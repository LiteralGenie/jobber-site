# Pre-render pages
cd /app
npx next experimental-generate 
mkdir /server
cp -a ./.next/standalone/. /server/

# Run server
cd /server
node server.js