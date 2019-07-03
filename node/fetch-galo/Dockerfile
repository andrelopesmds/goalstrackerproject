FROM node:8

WORKDIR /usr/src/fetch

COPY package*.json ./

COPY . .

RUN npm install

CMD ["node", "fetch.js"]
