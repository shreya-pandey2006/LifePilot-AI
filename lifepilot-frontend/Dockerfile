# --- Dependencies ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# --- Build ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Bake the public webhook URL in at build time (or override via your
# platform's env var UI before building).
ARG NEXT_PUBLIC_N8N_WEBHOOK_URL
ENV NEXT_PUBLIC_N8N_WEBHOOK_URL=$NEXT_PUBLIC_N8N_WEBHOOK_URL
RUN npm run build

# --- Run ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
