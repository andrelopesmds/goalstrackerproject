#!/bin/sh

stage=$1

if [ $stage = "prod" ] || [ $stage = "staging" ] || [ $stage = "dev" ]; then
  echo "Deployment stage: $stage."
  serverless deploy -s $stage
else
  echo "Stage parameter could not be empty. It must be 'prod', 'staging' or 'dev'"
fi
