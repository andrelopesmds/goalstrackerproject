#!/bin/bash

fileName=$1

aws dynamodb batch-write-item --request-items file://$fileName