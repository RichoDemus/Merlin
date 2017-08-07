FROM node:8.2.1-alpine

# Re-add if we add a dependency that requires git to download
#RUN apk --no-cache add git

RUN mkdir /app
WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install

COPY public /app/public
COPY src /app/src
RUN REACT_APP_BACKEND_URL=wss://api.merlin.cloud.richodems.com/websocket npm run build && npm install -g serve
CMD serve -s build

EXPOSE 5000
