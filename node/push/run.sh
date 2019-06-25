#!/bin/sh

docker run --env-file=keys.txt -p 80:8080 -d push
