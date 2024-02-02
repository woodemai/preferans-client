# build environment
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
ENV VITE_API_BASE_URL https://woo.preferans.onine:8443/api/v1
ENV VITE_SOCKET_BASE_URL https://woo.preferans.online:8086
RUN npm install
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
