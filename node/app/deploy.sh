#!/bin/bash

rm -rf node_modules

zip -r app.zip . -x *.sh* *.json*  "test/*"

aws lambda update-function-code --function-name galo-subscriber --zip-file fileb://app.zip

rm -rf app.zip
