FROM node:20-alpine AS build
WORKDIR /warehouse
COPY package*.json ./
RUN npm install
COPY . .
ENV VITE_API_URL=http://0.0.0.0:8080/api
RUN npm run build
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /warehouse/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]