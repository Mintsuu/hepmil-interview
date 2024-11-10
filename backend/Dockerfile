FROM node:20-bookworm

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

RUN npx playwright install

RUN npx playwright install-deps

CMD npm run prod