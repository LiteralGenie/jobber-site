FROM node:18 AS base

# Install dependencies only when needed
FROM base AS builder
RUN apt update
RUN apt install -y sqlite3-pcre libpcre3

WORKDIR /app
COPY . .

# @fixme: remove force flag when 14.1.1-canary.55 lands
#         it's necessary for using nuqs + fragments 
#         https://github.com/47ng/nuqs/issues/498
RUN npm install --force

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
ENV NODE_ENV production

CMD ["sh", "run-prod.sh"]
