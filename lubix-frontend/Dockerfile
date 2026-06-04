FROM node:20-alpine

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 5174

CMD ["pnpm", "run", "dev", "--", "--port", "5174", "--host"]






 