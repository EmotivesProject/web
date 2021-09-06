# pull official base image
FROM node:16-alpine3.11

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm config set unsafe-perm true
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

EXPOSE 80

# add app
COPY . ./

# start app
CMD ["npm", "start"]
