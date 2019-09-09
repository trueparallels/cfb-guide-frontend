#!/bin/bash

export AWS_PROFILE=kyle-sa
aws s3 sync public/ s3://cfb-guide-prod/ --delete --acl public-read
