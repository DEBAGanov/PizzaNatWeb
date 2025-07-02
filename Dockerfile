# Multi-stage build для оптимизации размера образа (оптимизировано для 1GB RAM, 15GB диск)
FROM node:18-alpine AS builder

# Установка рабочей директории
WORKDIR /app

# Копирование файлов зависимостей
COPY package*.json ./

# Установка зависимостей с оптимизацией памяти
RUN npm ci --only=production --no-audit --no-fund --maxsockets 1 && \
    npm ci --only=dev --no-audit --no-fund --maxsockets 1

# Копирование исходного кода
COPY . .

# Сборка приложения с ограничением памяти
RUN NODE_OPTIONS="--max-old-space-size=512" npm run build && \
    npm cache clean --force

# Production stage - используем самый легкий nginx
FROM nginx:alpine AS production

# Очистка ненужных файлов из базового образа
RUN rm -rf /usr/share/nginx/html/* && \
    rm -rf /var/cache/apk/* && \
    rm -rf /tmp/*

# Копирование собранного приложения
COPY --from=builder /app/dist /usr/share/nginx/html

# Копирование конфигурации nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Создание пользователя и настройка прав в одном слое
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /usr/share/nginx/html && \
    chown -R nextjs:nodejs /var/cache/nginx && \
    chown -R nextjs:nodejs /var/log/nginx && \
    chown -R nextjs:nodejs /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nextjs:nodejs /var/run/nginx.pid

# Переключение на непривилегированного пользователя
USER nextjs

# Открытие порта
EXPOSE 3000

# Health check для контейнера
HEALTHCHECK --interval=60s --timeout=5s --start-period=30s --retries=2 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"] 