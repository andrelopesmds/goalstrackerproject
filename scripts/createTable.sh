#!/bin/bash

fileName=$1

aws dynamodb create-table --cli-input-json file://$fileName