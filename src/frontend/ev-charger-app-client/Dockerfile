FROM node:lts-alpine

WORKDIR /app

COPY . ./

RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 8081
CMD [ "npm", "run", "serve" ]