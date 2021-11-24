FROM node:10 as build

WORKDIR /app

COPY ./ ./

RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=build app/dist/intouch-store /usr/share/nginx/html

EXPOSE 80
