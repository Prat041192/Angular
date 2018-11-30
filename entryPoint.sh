#!/bin/bash
set -xe
: "${BACKEND_API_URL?Need an api url}"

sed -i "s/BACKEND_API_URL/$BACKEND_API_URL/g" /usr/share/nginx/html/main.js

exec "$@"