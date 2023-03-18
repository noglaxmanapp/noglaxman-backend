FROM alpine:3.14.3
RUN apk add --no-cache nodejs
RUN apk add --no-cache npm

WORKDIR /usr/src/app/backend

COPY package.json ./

RUN npm install

COPY ./src ./src

CMD ["npm", "start"]

EXPOSE 4000