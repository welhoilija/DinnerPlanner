# frontend/Dockerfile
FROM node:20.5.1-slim as builder
ENV NODE_ENV production
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "build"]

# Use an official Nginx runtime as the production environment
FROM nginx:alpine3.18-slim

# Copy the production-ready build from the build environment to Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to the outside world (if needed)
EXPOSE 80

# Start Nginx to serve the production build
CMD ["nginx", "-g", "daemon off;"]