#!/bin/bash

npm install

zip -r push.zip .

aws lambda update-function-code --function-name galo-push --zip-file fileb://push.zip
