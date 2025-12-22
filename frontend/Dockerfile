# Official Node.js image with Alpine for smaller size
FROM node:18-alpine AS builder

WORKDIR /app

# Install build deps
COPY package*.json ./
RUN npm ci --production=false

# Copy source and build
COPY . .
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only what's needed from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["npm", "run", "start"]
