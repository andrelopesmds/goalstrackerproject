#!/bin/bash

rm -rf node_modules

npm install --production

zip -r push.zip . -x *.sh* *.json* "test/*"

aws lambda update-function-code --function-name hifk-push --zip-file fileb://push.zip

rm -rf push.zip
