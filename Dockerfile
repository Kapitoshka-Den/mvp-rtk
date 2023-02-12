FROM node:16-alpine 
WORKDIR /app

# set env
ENV PORT 80
ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /app
COPY package-lock.json /app
RUN npm install --silent

# add app
COPY . .

RUN npm run build
EXPOSE $PORT
CMD [ "npx", "serve", "build" ]