###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn && yarn cache clean --force
COPY . .
RUN yarn build

###################
# PRODUCTION
###################

FROM node:18-alpine As production
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server

ENV NODE_ENV=production
RUN yarn && yarn cache clean --force

EXPOSE 3000
CMD yarn deploy
