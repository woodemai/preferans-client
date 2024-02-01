# build environment
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
ENV VITE_API_BASE_URL http://77.105.174:8080/api/v1
ENV VITE_SOCKET_BASE_URL http://77.105.174:8086/api/v1
RUN npm install
RUN npm run build

# production environment

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]