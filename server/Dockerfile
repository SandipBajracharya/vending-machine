FROM node:18.16.0 AS build

WORKDIR /temp

COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm i -g pnpm
RUN pnpm i

COPY . ./

RUN pnpm build

FROM node:18.16.0-slim

WORKDIR /app
COPY --from=build /temp/node_modules /app/node_modules
COPY --from=build /temp/dist /app

# Expose port and start the app
EXPOSE 8080
CMD node /app/index.js
