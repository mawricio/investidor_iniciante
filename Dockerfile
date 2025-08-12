# ===== STAGE 1: Build do Frontend =====
FROM node:20-alpine AS build-client
WORKDIR /app
COPY client/package*.json ./client/
RUN cd client && npm install
COPY . .
RUN cd client && npm run build

# ===== STAGE 2: Servidor Node =====
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY server/ ./server/
COPY public/ ./public/
COPY --from=build-client /app/client/dist ./client/dist
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server/server.js"]
