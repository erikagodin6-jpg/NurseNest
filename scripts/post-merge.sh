#!/bin/bash
set -e

echo "Post-merge setup: installing dependencies..."
npm install --legacy-peer-deps < /dev/null

echo "Post-merge setup: computing tier counts..."
npx tsx script/compute-tier-counts.ts < /dev/null || true

echo "Post-merge setup complete."
