# ==========================================
# 1. Base / Dependencies Stage
# ==========================================
FROM node:20-bookworm-slim AS deps
WORKDIR /app

# Install openssl for Prisma engine compatibility
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy package manifests
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies needed for build & prisma)
RUN npm ci

# ==========================================
# 2. Builder Stage
# ==========================================
FROM node:20-bookworm-slim AS builder
WORKDIR /app

# Install openssl for Prisma code generation
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client (outputs to src/generated/client)
RUN npx prisma generate

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js application (standalone mode)
RUN npm run build

# ==========================================
# 3. Production Runner Stage
# ==========================================
FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Install openssl & ca-certificates for runtime database/API connections
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Create dedicated non-root system user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public static files
COPY --from=builder /app/public ./public

# Copy standalone build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy generated Prisma Client & schema for runtime query engine
COPY --from=builder --chown=nextjs:nodejs /app/src/generated ./src/generated
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
