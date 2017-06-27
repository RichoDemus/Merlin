#!/usr/bin/env bash
set -e

docker build -t richodemus/merlin-backend:latest backend
docker build -t richodemus/merlin-frontend:latest frontend

echo "Merlin built successfully!"
