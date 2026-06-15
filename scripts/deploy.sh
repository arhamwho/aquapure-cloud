#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${PROJECT_ROOT}"

echo "=========================================="
echo "AquaPure Cloud Deployment"
echo "=========================================="

if ! command -v git >/dev/null 2>&1; then
  echo "Error: git is not installed."
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "Error: docker is not installed."
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Error: docker compose is not available."
  exit 1
fi

echo "Pulling latest code..."
git pull

echo "Installing backend dependencies..."
cd "${PROJECT_ROOT}/backend"
npm install

echo "Installing frontend dependencies..."
cd "${PROJECT_ROOT}/frontend"
npm install

echo "Building and starting containers..."
cd "${PROJECT_ROOT}"
docker compose down
docker compose build
docker compose up -d

echo "Waiting for services to start..."
sleep 5

echo "Container status:"
docker compose ps

echo "=========================================="
echo "Deployment completed."
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:5001/health"
echo "=========================================="
