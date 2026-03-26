# DigitalOcean App Platform Deployment

This is the easiest path for this repo because it uses your `Dockerfile` directly (no Node buildpack quirks).

## One-time setup in DigitalOcean UI

1. Create app from GitHub repo `erikagodin6-jpg/NurseNest`.
2. Choose branch `main`.
3. For source type, select Dockerfile (App Platform will auto-detect).
4. Set HTTP port to `5000`.
5. Add runtime secrets:
   - `ADMIN_JWT_SECRET`
   - `DATABASE_URL` (or use `PROD_DATABASE_URL` instead)
6. Deploy.

## Optional: use app spec from this repo

This repo includes `.do/app.yaml` with sane defaults. Import it in App Platform or deploy with `doctl`.

Notes:
- Region in the spec is `tor` (Toronto). Change if needed.
- Instance size is `basic-xxs` for low cost.

## Runtime target

- Entrypoint: `node scripts/start-production.mjs`
- HTTP port: `PORT=5000`
- Bind address: `0.0.0.0` (already handled by server code)

## Required environment variables

- `ADMIN_JWT_SECRET` (non-empty)
- One of:
  - `PROD_DATABASE_URL`, or
  - `DATABASE_URL`

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
