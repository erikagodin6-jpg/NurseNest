# DigitalOcean App Platform Deployment

Use a prebuilt container image for deterministic deploys.

## Recommended path (bypass App Platform source builds)

This repo includes a GitHub Actions workflow:
- `.github/workflows/build-and-push-ghcr.yml`

On each push to `main`, it builds and pushes:
- `ghcr.io/erikagodin6-jpg/nursenest:latest`
- `ghcr.io/erikagodin6-jpg/nursenest:sha-<short>`

In DigitalOcean App Platform, choose source type **Container Registry / External image** and use the GHCR image tag above instead of building from source.

## App Platform settings

- Run command: `node scripts/start-production.mjs` (or leave blank if image entrypoint is used)
- HTTP port: `8080`
- Readiness check: `/health`
- Liveness check: `/health`
- Initial delay: `60s`

## Required runtime environment variables

- `NODE_ENV=production`
- `PORT=8080`
- `ADMIN_JWT_SECRET` (secret)
- One of:
  - `DATABASE_URL` (secret), or
  - `PROD_DATABASE_URL` (secret)

Scope: runtime only.

## Local production test (Docker)

```bash
docker build -t nursenest .
docker run --rm -p 8080:8080 \
  -e PORT=8080 \
  -e NODE_ENV=production \
  -e ADMIN_JWT_SECRET=change_me \
  -e DATABASE_URL=postgresql://user:pass@host:5432/dbname \
  nursenest
```

## Local production smoke test

```bash
PORT=8080 NODE_ENV=production ADMIN_JWT_SECRET=change_me DATABASE_URL=postgresql://user:pass@host:5432/dbname \
node scripts/smoke-test-production.mjs
```
