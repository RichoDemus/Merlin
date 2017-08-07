FROM node:8.2.1-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app/
RUN npm install

COPY .babelrc /app/
COPY src /app/src

CMD ["npm", "start"]
EXPOSE 8080
