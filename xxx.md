All the pieces are in place:

next.config.ts — added output: "standalone", so the build produces a minimal self-contained server (only the node_modules subset actually used, not the whole tree).
Dockerfile — 3-stage build (deps → build → runtime), pnpm-based (matches your pnpm-lock.yaml), runs as a non-root user, final image only contains the standalone server + static assets + public/.
.dockerignore — excludes .env*, node_modules, .git, etc., so secrets and bloat never enter the build context or image layers.
docker-compose.yml — two services: app (your Next container, secrets injected via env_file: .env at runtime, never baked into the image) and caddy (reverse proxy + automatic HTTPS).
Caddyfile — placeholder domain labbstudio.pl / www.labbstudio.pl routing to the app. You need to replace this with your actual domain.
package.json — pinned "packageManager": "pnpm@11.14.0" so Docker's corepack enable installs the exact same pnpm version you're using locally.
To deploy, on the VPS:

Point your domain's DNS A record at the VPS IP (needed before Caddy can get a cert).
git clone/copy the repo over, then create .env directly on the server (scp it up, or paste via SSH) with your real IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT, GMAIL_USER, GMAIL_APP_PASSWORD — it never needs to touch git.
Open ports 80 and 443 on the VPS firewall (Caddy needs both for the ACME HTTP challenge and TLS).
Edit the Caddyfile with your real domain.
docker compose up -d --build.
Caddy handles cert issuance/renewal automatically from there. Want me to also add a GitHub Actions workflow for push-to-deploy, or is manual docker compose up -d --build on each update fine for now?