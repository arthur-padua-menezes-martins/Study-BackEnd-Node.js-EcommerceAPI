FROM node:14
WORKDIR /usr/src/ecommerce_sertao_nerd
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 5000
CMD npm start 