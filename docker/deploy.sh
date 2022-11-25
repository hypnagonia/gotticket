#!/usr/bin/env bash
set -e

git checkout master && git pull origin master

COPY /etc/ssl/certs/nginx-selfsigned.crt ./nginx/nginx-selfsigned.crt
COPY /etc/ssl/private/nginx-selfsigned.key ./nginx/nginx-selfsigned.key 

docker-compose build --no-cache
docker-compose down
docker-compose up -d
docker system prune -f
