# frontend/Dockerfile
FROM node:20.5.1-slim as builder
ENV NODE_ENV production
WORKDIR /app
COPY ./package*.json ./
RUN npm install
RUN npm ci
COPY . .
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL ${REACT_APP_API_URL}
RUN npm run build

FROM nginx:alpine3.18-slim

RUN rm /etc/nginx/conf.d/default.conf
COPY /.nginx/nginx.conf /etc/nginx/conf.d/

# Copy the production-ready build from the build environment to Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to the outside world (if needed)
EXPOSE 8080

# Start Nginx to serve the production build
CMD ["nginx", "-g", "daemon off;"]