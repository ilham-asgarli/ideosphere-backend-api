FROM node:20
WORKDIR /usr/src/ideosphere
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run start