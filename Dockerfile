# Build dependencies
FROM node:18.12-alpine
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
CMD yarn deploy
