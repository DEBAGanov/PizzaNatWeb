# Multi-stage build для оптимизации размера образа
FROM node:18-alpine AS builder

# Установка рабочей директории
WORKDIR /app

# Копирование файлов зависимостей
COPY package*.json ./

# Установка всех зависимостей (включая dev для сборки)
RUN npm ci

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Копирование собранного приложения
COPY --from=builder /app/dist /usr/share/nginx/html

# Копирование конфигурации nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Создание пользователя для безопасности
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Настройка прав доступа
RUN chown -R nextjs:nodejs /usr/share/nginx/html
RUN chown -R nextjs:nodejs /var/cache/nginx
RUN chown -R nextjs:nodejs /var/log/nginx
RUN chown -R nextjs:nodejs /etc/nginx/conf.d
RUN touch /var/run/nginx.pid
RUN chown -R nextjs:nodejs /var/run/nginx.pid

# Переключение на непривилегированного пользователя
USER nextjs

# Открытие порта (соответствует nginx.conf)
EXPOSE 3000

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"] 