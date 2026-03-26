FROM node:20-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=production
ENV SKIP_I18N_VALIDATION=1
ENV SKIP_I18N_COMPILE=1
ENV SKIP_BUILD_REPORTS=1
ENV VITE_SKIP_CIRCULAR_CHECK=1
ENV RUN_HEAVY_BUILD_TASKS=0

RUN npm run build && rm -rf node_modules

FROM node:20-bookworm-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/scripts ./scripts

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "echo STARTING CONTAINER && node scripts/start-production.mjs"]
