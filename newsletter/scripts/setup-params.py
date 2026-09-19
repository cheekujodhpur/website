#!/usr/bin/env python3
"""
Creates the Parameter Store entries needed before deploying the newsletter stack.
Run from the repo root: python newsletter/scripts/setup-params.py
Requires: pip install boto3
"""
import boto3
import datetime

REGION = 'ap-south-1'

PARAMS = [
    ('/newsletter/site-url',   'https://kumar-ayush.com'),
    ('/newsletter/api-url',    'https://xkrfcpc4h5.execute-api.ap-south-1.amazonaws.com/prod'),
    ('/newsletter/rss-url',    'https://kumar-ayush.com/newsletter-feed.xml'),
    ('/newsletter/from-email', 'newsletter@kumar-ayush.com'),
    ('/newsletter/start-date', datetime.date.today().isoformat()),
]

ssm = boto3.client('ssm', region_name=REGION)

for name, value in PARAMS:
    ssm.put_parameter(Name=name, Value=value, Type='String', Overwrite=True)
    print(f'OK  {name}')
