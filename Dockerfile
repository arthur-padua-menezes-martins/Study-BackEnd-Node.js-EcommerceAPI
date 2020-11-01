FROM node:12
WORKDIR /usr/src/ecommerce-sertao-nerd
COPY ./package.json .
RUN npm install --only=prod