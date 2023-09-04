# frontend/Dockerfile
FROM node:20.5.1-slim as builder
ENV NODE_ENV production
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm serve