# DigitalOcean App Platform Deployment

## Runtime target

- Container command: `node scripts/start-production.mjs`
- HTTP port: `PORT` (app binds to `0.0.0.0`)

## Required environment variables

- `ADMIN_JWT_SECRET` (non-empty)
- One of:
  - `PROD_DATABASE_URL`, or
  - `DATABASE_URL`

## Optional environment variables

- `NODE_ENV=production`
- `ALLOW_PROD_FALLBACK_TO_DATABASE_URL=true` (only if you intentionally use `DATABASE_URL` for production target fallback)

## Local production test (Docker)

```bash
docker build -t nursenest .
docker run --rm -p 5000:5000 \
  -e PORT=5000 \
  -e NODE_ENV=production \
  -e ADMIN_JWT_SECRET=change_me \
  -e DATABASE_URL=postgresql://user:pass@host:5432/dbname \
  nursenest
```

## Local production test (non-Docker)

```bash
PORT=5000 NODE_ENV=production node scripts/start-production.mjs
```
