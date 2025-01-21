# FYP Repository: https://github.com/CQL02/fomeda-services.git

FROM node:18
LABEL authors="Chung Qi Lin"
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["npm", "run", "start:dev"]

