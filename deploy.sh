#!/usr/bin/env bash
set -euo pipefail

# --- configure these for your VPS, or export as env vars before running ---
# SERVER_USER="root"
# SERVER_HOST="labbstudio.pl"
# DEPLOY_PATH="app/labb"
# ---------------------------------------------------------------------------

echo "Building..."
pnpm build

echo "Assembling standalone bundle..."
rm -rf .next/standalone/public .next/standalone/.next/static
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
cp ecosystem.config.js .next/standalone/ecosystem.config.js

echo "Syncing to ${SERVER_HOST}:${DEPLOY_PATH} ..."
rsync -avz --delete --exclude ".env" .next/standalone/ "root@${SERVER_HOST}:${DEPLOY_PATH}/"

echo "Restarting app on server..."
ssh "${SERVER_USER}@${SERVER_HOST}" "cd ${DEPLOY_PATH} && pm2 startOrReload ecosystem.config.js && pm2 save"

echo "Done."
