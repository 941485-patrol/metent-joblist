FROM node:20-alpine

# 1. Install system dependencies (needed for native Node modules like sharp)
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 9229

# CMD ["node", "--inspect=0.0.0.0:9229", "node_modules/next/dist/bin/next", "dev"]
# Use shell form to string multiple commands together with &&
CMD npm install && node --inspect=0.0.0.0:9229 node_modules/next/dist/bin/next dev