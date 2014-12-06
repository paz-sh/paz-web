#!/bin/bash -e
npm install
bower install
ember build --environment production
cp docker/Dockerfile dist
cp bin/run.sh dist
cp 200.jade dist
cd dist
docker build -t lukebond/paz-web .
cd ..
