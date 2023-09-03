# frontend/Dockerfile
FROM node:20.5.1-slim
ENV NODE_ENV production
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]