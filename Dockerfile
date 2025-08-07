# Multi-stage build для ДИМБО Пицца (оптимизировано для 1GB RAM, 15GB диск)
FROM node:20-alpine AS dependencies

# Установка рабочей директории
WORKDIR /app

# Установка необходимых системных пакетов для сборки
RUN apk add --no-cache git python3 make g++ && \
    npm config set maxsockets 1

# Копирование файлов зависимостей
COPY package*.json ./

# Установка зависимостей с оптимизацией памяти
RUN npm ci --no-audit --no-fund --prefer-offline && \
    npm cache clean --force

# Stage для сборки приложения
FROM node:20-alpine AS builder

WORKDIR /app

# Копирование зависимостей из предыдущего stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY package*.json ./

# Копирование исходного кода
COPY . .

# Сборка приложения с увеличенным лимитом памяти
RUN NODE_OPTIONS="--max-old-space-size=1024" npm run build

# Development stage - для разработки с hot reload
FROM node:20-alpine AS development

WORKDIR /app

# Установка системных зависимостей
RUN apk add --no-cache git python3 make g++

# Копирование зависимостей
COPY --from=dependencies /app/node_modules ./node_modules
COPY package*.json ./

# Открытие портов для dev server и HMR
EXPOSE 3478 5174

# Команда для development (будет переопределена в docker-compose.override.yml)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3478"]

# Production stage - Node.js приложение
FROM node:20-alpine AS production

# Установка рабочей директории
WORKDIR /app

# Установка nginx для production сервера
RUN apk add --no-cache wget curl nginx

# Создание непривилегированного пользователя
RUN addgroup -g 1001 -S dimbopizza && \
    adduser -S dimbopizza -u 1001 -G dimbopizza

# Копирование собранного приложения из builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Копирование конфигурационных файлов
COPY public/robots.txt ./dist/
COPY public/sitemap.xml ./dist/
COPY public/yandex_3d9c38ef35de5e25.html ./dist/

# Копирование изображений
COPY public/images/ ./dist/images/

# Копирование nginx конфигурации
COPY nginx.conf /etc/nginx/nginx.conf

# Создание health endpoint
RUN echo '{"status":"ok","service":"dimbopizza-web","version":"1.0.0"}' > ./dist/health

# Настройка прав доступа и создание временных директорий для nginx
RUN mkdir -p /var/log/nginx /tmp/nginx_client_temp /tmp/nginx_proxy_temp /tmp/nginx_fastcgi_temp /tmp/nginx_uwsgi_temp /tmp/nginx_scgi_temp && \
    chown -R dimbopizza:dimbopizza /app /var/log/nginx /var/run/nginx /tmp/nginx_* && \
    chmod -R 755 /app/dist

# Переключение на непривилегированного пользователя
USER dimbopizza

# Открытие порта для Timeweb Cloud Apps
EXPOSE 3478

# Health check для контейнера
HEALTHCHECK --interval=60s --timeout=5s --start-period=30s --retries=2 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3478/health || exit 1

# Запуск nginx сервера
CMD ["nginx", "-g", "daemon off;"] 