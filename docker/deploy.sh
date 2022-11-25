#!/usr/bin/env bash
set -e

# git checkout master && git pull origin master

docker-compose build --no-cache
docker-compose down
docker-compose up -d
docker system prune -f
