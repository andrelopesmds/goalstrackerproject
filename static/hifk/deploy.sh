#!/bin/sh

bucket=$1

if [ -z "$bucket" ]
then
    echo "Bucket name could not be empty"
else
    npm run build
    aws s3 rm s3://$bucket --recursive
    aws s3 cp build/ s3://$bucket --recursive
    rm -rf build/
fi