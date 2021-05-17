#!/bin/sh

branch=$1

if [ $branch = "master" ] || [ $branch = "staging" ] || [ $branch = "dev" ]; then
  if [ $branch = "master" ]; then
    stage=prod
    bucket=goalstracker.info
  else
    stage=$branch
    bucket=$stage.goalstracker.info
  fi
  npm install
  REACT_APP_ENV=$stage npm run build
  aws s3 rm s3://$bucket --recursive
  aws s3 cp build/ s3://$bucket --recursive
  rm -rf build/
  echo "Deployment stage: $stage."
  echo "Deployment bucket: $bucket."
else
    echo "Stage parameter could not be empty. It must be 'prod', 'staging' or 'dev'"
fi
