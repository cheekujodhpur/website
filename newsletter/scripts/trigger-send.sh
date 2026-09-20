#!/usr/bin/env bash
# Manually invoke the newsletter send Lambda.
# Usage: bash newsletter/scripts/trigger-send.sh [stack-name]
# Default stack name: newsletter-prod

set -euo pipefail

STACK="${1:-newsletter}"
REGION="${AWS_DEFAULT_REGION:-ap-south-1}"

echo "Looking up SendFunction in stack: $STACK"
FUNCTION=$(aws cloudformation describe-stack-resource \
  --stack-name "$STACK" \
  --logical-resource-id SendFunction \
  --region "$REGION" \
  --query 'StackResourceDetail.PhysicalResourceId' \
  --output text)

echo "Invoking $FUNCTION ..."
aws lambda invoke \
  --function-name "$FUNCTION" \
  --payload '{}' \
  --region "$REGION" \
  /tmp/send-response.json > /dev/null

cat /tmp/send-response.json
echo
