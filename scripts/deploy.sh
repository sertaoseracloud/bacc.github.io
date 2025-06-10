#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <build_directory>" >&2
  exit 1
fi

BUILD_DIR="$1"
: "${STORAGE_ACCOUNTS?Environment variable STORAGE_ACCOUNTS is required}"

for ACCOUNT in $(echo "$STORAGE_ACCOUNTS" | tr ',' ' '); do
  echo "Deploying to $ACCOUNT"
  az storage blob upload-batch -s "$BUILD_DIR" -d '$web' --account-name "$ACCOUNT" --overwrite
  echo "Finished deploying to $ACCOUNT"
  echo
done
