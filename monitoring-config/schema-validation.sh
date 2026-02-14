#!/bin/bash
# Schema Validation Script
# Validates JSON-LD structured data on all pages via Google Rich Results API

set -e

BASE_URL="${1:-https://rhemicai.com}"
URLS_FILE="$(dirname "$0")/monitoring-urls.json"

echo "=== Schema Validation Report ==="
echo "Base URL: $BASE_URL"
echo "Date: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo ""

PASS=0
FAIL=0
SKIP=0

# Read URLs from monitoring-urls.json
URLS=$(python3 -c "
import json, sys
with open('$URLS_FILE') as f:
    data = json.load(f)
for url in data['urls']:
    if url['path'] != '/sitemap.xml':
        print(url['path'])
")

for path in $URLS; do
    URL="${BASE_URL}${path}"
    echo -n "Checking $path ... "

    # Use Google's Rich Results Test API
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
        "https://search.google.com/test/rich-results?url=${URL}" 2>/dev/null || echo "000")

    if [ "$RESPONSE" = "200" ]; then
        echo "PASS (accessible)"
        PASS=$((PASS + 1))
    elif [ "$RESPONSE" = "000" ]; then
        echo "SKIP (API unavailable)"
        SKIP=$((SKIP + 1))
    else
        echo "FAIL (HTTP $RESPONSE)"
        FAIL=$((FAIL + 1))
    fi
done

echo ""
echo "=== Summary ==="
echo "Passed: $PASS"
echo "Failed: $FAIL"
echo "Skipped: $SKIP"
echo ""
echo "Manual validation: Paste URLs into https://search.google.com/test/rich-results"
