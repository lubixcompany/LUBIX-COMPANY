# ─────────────────────────────────────────
# STAGE 1: Build de producción con Node/pnpm
# ─────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar dependencias y resolverlas
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# VITE_API_URL se inyecta como ARG en build-time
# En producción apunta a /api (nginx lo proxea al backend)
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

COPY . .
RUN pnpm run build

# ─────────────────────────────────────────
# STAGE 2: Servir con nginx (imagen mínima)
# ─────────────────────────────────────────
FROM nginx:alpine

# Configuración de nginx con soporte SPA + proxy /api
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Archivos estáticos generados en el build
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]







 