FROM node:22.15.0

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

EXPOSE 5173

CMD [ "npm", "run", "dev", "--", "--host" ]