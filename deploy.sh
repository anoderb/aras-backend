#!/bin/bash
set -e

echo "=== Deploy ARAS Backend ==="

cd /opt/platform/projects/aras-backend

echo ">> Pull latest code (Force Override Local Changes)..."
git fetch origin main
git reset --hard origin/main

echo ">> Build Docker image..."
docker build -t aras-backend .

echo ">> Stop & remove container lama (jika ada)..."
docker stop aras-backend 2>/dev/null || true
docker rm aras-backend 2>/dev/null || true

echo ">> Jalankan container baru..."
docker run -d \
  --name aras-backend \
  --network platform-network \
  -p 5000:3000 \
  --env-file /opt/platform/projects/aras-backend/.env \
  --restart unless-stopped \
  -v $(pwd)/logs:/app/logs \
  -v $(pwd)/uploads:/app/uploads \
  -v $(pwd)/firebase-service-account.json:/app/firebase-service-account.json \
  aras-backend

echo ">> [SKIP] Jalankan migrasi database di dalam container..."
# docker exec aras-backend node database/migrate.js

echo ">> Bersihkan image lama..."
docker image prune -f

echo "=== Deploy selesai ==="
docker ps | grep aras-backend
