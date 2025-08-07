#!/bin/bash

# Скрипт для деплоя ДИМБО Пицца в production
# Использование: ./deploy-production.sh

set -e

echo "🚀 Начинаем деплой ДИМБО Пицца в production..."

# Остановка и удаление старых контейнеров
echo "🛑 Остановка старых контейнеров..."
docker-compose down --volumes --remove-orphans || true

# Очистка старых образов
echo "🧹 Очистка старых образов..."
docker system prune -f

# Сборка и запуск production версии
echo "🔨 Сборка production образа..."
docker-compose up --build -d

# Ожидание запуска
echo "⏳ Ожидание запуска сервисов..."
sleep 30

# Проверка статуса
echo "📊 Проверка статуса контейнеров..."
docker-compose ps

# Проверка логов
echo "📋 Последние логи:"
docker-compose logs --tail=20

# Проверка health check
echo "🏥 Проверка health check..."
docker-compose exec dimbopizza-web wget --no-verbose --tries=1 --spider http://localhost:80/health || echo "❌ Health check failed"

echo "✅ Деплой завершен!"
echo "🌐 Сайт доступен по адресу: http://YOUR_SERVER_IP/"