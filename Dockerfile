FROM node:20-alpine

WORKDIR /app

# Install dependensi dulu untuk caching layer
COPY package*.json ./
RUN npm install --omit=dev

# Copy semua kode
COPY . .

# Expose port sesuai .env (default 3000)
EXPOSE 3000

# Jalankan server
CMD ["node", "server.js"]
