# Builder: build the Vite static output
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx vite build

# Runner: serve the built files on port 5173
FROM node:18-alpine AS runner
WORKDIR /app

# Install a tiny static server
RUN npm install -g serve@14

COPY --from=builder /app/dist ./dist
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
