#!/bin/sh

stage=$1

if [ $stage = "prod" ] || [ $stage = "staging" ] || [ $stage = "dev" ]; then
  if [ $stage = "prod" ]; then
    bucket=goalstracker.info
  else
    bucket=$stage.goalstracker.info
  fi
  REACT_APP_ENV=$stage npm run build
  aws s3 rm s3://$bucket --recursive
  aws s3 cp build/ s3://$bucket --recursive
  rm -rf build/
  echo "Deployment stage: $stage."
  echo "Deployment bucket: $bucket."
else
    echo "Stage parameter could not be empty. It must be 'prod', 'stating' or 'dev'"
fi