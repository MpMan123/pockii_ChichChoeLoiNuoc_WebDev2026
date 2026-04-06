FROM node:20-alpine

WORKDIR /BE

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 5500

CMD ["npm", "run", "dev"]