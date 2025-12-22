FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies (uses package.json / package-lock.json if present)
COPY package*.json ./
RUN npm install --production

# Copy app source
COPY . .

# App listens on 3000 by convention
EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "index.js"]
