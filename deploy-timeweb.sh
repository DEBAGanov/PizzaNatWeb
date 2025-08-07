#!/bin/bash

# Скрипт для деплоя ДИМБО Пицца в Timeweb Cloud Apps
# Использование: ./deploy-timeweb.sh

set -e

echo "🚀 Начинаем деплой ДИМБО Пицца в Timeweb Cloud Apps..."

# Информация об особенностях Timeweb
echo "📋 Особенности Timeweb Cloud Apps:"
echo "✅ Автоматический Nginx с SSL"
echo "✅ Автоматический домен + возможность своего"
echo "✅ Переменные через панель управления"
echo "❌ Volumes не сохраняются"
echo "❌ Порты 80/443 зарезервированы (используем 3478)"
echo "❌ Только первый сервис проксируется"
echo ""

# Остановка и удаление старых контейнеров
echo "🛑 Остановка старых контейнеров..."
docker-compose -f docker-compose.timeweb.yml down --volumes --remove-orphans || true

# Очистка старых образов
echo "🧹 Очистка старых образов..."
docker system prune -f

# Сборка и запуск Timeweb версии
echo "🔨 Сборка образа для Timeweb Cloud Apps..."
docker-compose -f docker-compose.timeweb.yml up --build -d

# Ожидание запуска
echo "⏳ Ожидание запуска сервисов..."
sleep 30

# Проверка статуса
echo "📊 Проверка статуса контейнеров..."
docker-compose -f docker-compose.timeweb.yml ps

# Проверка логов
echo "📋 Последние логи:"
docker-compose -f docker-compose.timeweb.yml logs --tail=20

# Проверка health check
echo "🏥 Проверка health check..."
docker-compose -f docker-compose.timeweb.yml exec dimbopizza-web wget --no-verbose --tries=1 --spider http://localhost:3478/health || echo "❌ Health check failed"

echo ""
echo "✅ Деплой в Timeweb Cloud Apps завершен!"
echo "🌐 Timeweb автоматически проксирует ваш сайт через порт 3478"
echo "🔒 SSL сертификат будет добавлен автоматически"
echo "⚙️  Настройте переменные окружения через панель Timeweb"
echo "📱 Сайт будет доступен по домену, настроенному в Timeweb"