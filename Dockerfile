FROM node:20-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund && npm cache clean --force

COPY tsconfig.json tsconfig.server.json ./
COPY vite.config.ts postcss.config.js components.json ./
COPY drizzle.config.ts i18n-scan.config.json vite-plugin-meta-images.ts ./
COPY server ./server
COPY client ./client
COPY shared ./shared
COPY scripts ./scripts
COPY script ./script
COPY config ./config
COPY migrations ./migrations
COPY backup-system ./backup-system

ENV NODE_ENV=production
ENV SKIP_I18N_VALIDATION=1
ENV SKIP_I18N_COMPILE=1
ENV SKIP_BUILD_REPORTS=1
ENV VITE_SKIP_CIRCULAR_CHECK=1
ENV RUN_HEAVY_BUILD_TASKS=0

RUN npm run build

FROM node:20-bookworm-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund && npm cache clean --force
COPY --from=build /app/dist ./dist
COPY --from=build /app/scripts ./scripts

EXPOSE 8080

# App Platform run_command overrides CMD; keep a plain exec form (no shell) for predictable behavior.
CMD ["node", "scripts/start-production.mjs"]
