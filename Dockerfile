FROM node:14-alpine
WORKDIR /app
COPY package.json .
# Adding build tools to make yarn install work on Apple silicon / arm64 machines
RUN apk add --no-cache python3 g++ make
RUN yarn install --production
COPY . .
CMD ["node","dist/index.js"]