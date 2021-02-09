FROM node:alpine as builder
WORKDIR /usr/app
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine
WORKDIR /usr/app
COPY --from=builder ./usr/app .t
CMD ["npm", "run", "start:prod"]
