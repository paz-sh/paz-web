#!/bin/bash -e
npm install
bower install
ember build --environment production
cp docker/Dockerfile dist
cp bin/run.sh dist
cp 200.jade dist
cp -R public/assets dist
cd dist
docker build -t quay.io/yldio/paz-web .
cd ..
