#stage 1
FROM node:16.13-alpine3.14 as node
WORKDIR /app
COPY .. .
RUN npm install
RUN npm run build -- --prod

#stage 2
FROM nginx:1.21-alpine
COPY --from=node /app/dist/hello-todos /usr/share/nginx/html
