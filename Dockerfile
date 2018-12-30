FROM node:10.14.1

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN yarn install
RUN npm install -g postcss-cli
RUN npm instaall -g autoprefixer

COPY ./ /app

RUN yarn run build

# ENV NODE_PATH /app/node_modules/
# ENV NODE_PATH /usr/lib/node_modules/

ENTRYPOINT ["yarn", "run", "start"]
