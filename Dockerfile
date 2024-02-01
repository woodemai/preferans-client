# build environment
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
ENV VITE_API_BASE_URL http://5.35.11.110:8080/api/v1
ENV VITE_SOCKET_BASE_URL http://5.35.11.110:8086
RUN npm install
RUN npm run build

# production environment

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
