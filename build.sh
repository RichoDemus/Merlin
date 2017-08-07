#!/usr/bin/env bash
set -e

export CI=true

(cd frontend && npm test)
(cd backend && npm test)

docker build -t richodemus/merlin-backend:latest backend
docker build -t richodemus/merlin-frontend:latest frontend

echo "Merlin built successfully!"
