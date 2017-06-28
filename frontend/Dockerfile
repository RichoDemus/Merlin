FROM node:8.1.2-alpine

# Re-add if we add a dependency that requires git to download
#RUN apk --no-cache add git

RUN mkdir /app
WORKDIR /app
COPY package.json /app/
RUN npm install

COPY public /app/public
COPY src /app/src
RUN npm run build && npm install -g serve
CMD serve -s build

EXPOSE 5000
