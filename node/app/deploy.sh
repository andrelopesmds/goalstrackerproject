#!/bin/bash

zip -r app.zip .

aws lambda update-function-code --function-name galo-subscriber --zip-file fileb://app.zip

rm -rf app.zip
