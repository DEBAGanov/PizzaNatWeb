# Multi-stage build для ДИМБО Пицца (оптимизировано для 1GB RAM, 15GB диск)
FROM node:18-alpine AS dependencies

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
FROM node:18-alpine AS builder

WORKDIR /app

# Копирование зависимостей из предыдущего stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY package*.json ./

# Копирование исходного кода
COPY . .

# Сборка приложения с увеличенным лимитом памяти
RUN NODE_OPTIONS="--max-old-space-size=1024" npm run build

# Development stage - для разработки с hot reload
FROM node:18-alpine AS development

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
FROM node:18-alpine AS production

# Установка рабочей директории
WORKDIR /app

# Установка только production зависимостей для preview сервера
RUN apk add --no-cache wget curl && \
    npm install -g serve

# Создание непривилегированного пользователя
RUN addgroup -g 1001 -S dimbopizza && \
    adduser -S dimbopizza -u 1001 -G dimbopizza

# Копирование собранного приложения
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Копирование конфигурационных файлов
COPY public/robots.txt ./dist/
COPY public/sitemap.xml ./dist/

# Создание health endpoint
RUN echo '{"status":"ok","service":"dimbopizza-web","version":"1.0.0"}' > ./dist/health

# Настройка прав доступа
RUN chown -R dimbopizza:dimbopizza /app && \
    chmod -R 755 /app/dist

# Переключение на непривилегированного пользователя
USER dimbopizza

# Открытие порта для Timeweb Cloud Apps
EXPOSE 3478

# Health check для контейнера
HEALTHCHECK --interval=60s --timeout=5s --start-period=30s --retries=2 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3478/health || exit 1

# Запуск статического сервера
CMD ["serve", "-s", "dist", "-l", "3478", "--no-clipboard"] 