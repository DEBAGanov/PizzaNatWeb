#!/bin/bash

# Health check скрипт для ДИМБО Пицца
# Проверяет работоспособность всех компонентов системы

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Функции для вывода
success() { echo -e "${GREEN}✅ $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; }
warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
info() { echo -e "${BLUE}ℹ️  $1${NC}"; }

# Переменные
BASE_URL="http://localhost:3478"
TIMEOUT=10
FAILED_CHECKS=0

# Функция для HTTP проверки
check_http() {
    local url=$1
    local description=$2
    local expected_code=${3:-200}
    
    if curl -f -s --max-time $TIMEOUT "$url" > /dev/null; then
        success "$description доступен"
        return 0
    else
        error "$description недоступен"
        return 1
    fi
}

# Функция для проверки Docker контейнера
check_container() {
    local container_name=$1
    local description=$2
    
    if docker ps --format "table {{.Names}}\t{{.Status}}" | grep -q "$container_name.*Up"; then
        success "$description контейнер запущен"
        return 0
    else
        error "$description контейнер не запущен"
        return 1
    fi
}

# Основные проверки
echo -e "${BLUE}🔍 Health Check для ДИМБО Пицца${NC}"
echo "================================="

info "Проверка Docker контейнеров..."
check_container "dimbopizza-web" "Основное приложение" || ((FAILED_CHECKS++))

if docker ps | grep -q "dimbopizza-nginx"; then
    check_container "dimbopizza-nginx" "Nginx" || ((FAILED_CHECKS++))
else
    info "Nginx контейнер не запущен (нормально для development)"
fi

echo ""
info "Проверка HTTP endpoints..."

# Проверка health endpoint
check_http "$BASE_URL/health" "Health endpoint" || ((FAILED_CHECKS++))

# Проверка главной страницы
check_http "$BASE_URL/" "Главная страница" || ((FAILED_CHECKS++))

# Проверка статических файлов
check_http "$BASE_URL/robots.txt" "robots.txt" || ((FAILED_CHECKS++))
check_http "$BASE_URL/sitemap.xml" "sitemap.xml" || ((FAILED_CHECKS++))

echo ""
info "Проверка производительности..."

# Время ответа
response_time=$(curl -o /dev/null -s -w "%{time_total}" "$BASE_URL/health")
if (( $(echo "$response_time < 2.0" | bc -l) )); then
    success "Время ответа: ${response_time}s (отлично)"
else
    warning "Время ответа: ${response_time}s (медленно)"
fi

# Использование ресурсов
if command -v docker &> /dev/null; then
    info "Использование ресурсов:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}" | grep dimbopizza
fi

echo ""
info "Проверка логов на ошибки..."

# Проверка логов на критические ошибки
if docker-compose logs --tail=50 dimbopizza-web 2>/dev/null | grep -i "error\|fatal\|exception" > /dev/null; then
    warning "Найдены ошибки в логах приложения"
    echo "Последние ошибки:"
    docker-compose logs --tail=10 dimbopizza-web | grep -i "error\|fatal\|exception" | tail -3
else
    success "Критических ошибок в логах не найдено"
fi

echo ""
echo "================================="

# Итоговый результат
if [ $FAILED_CHECKS -eq 0 ]; then
    success "Все проверки пройдены успешно! 🎉"
    echo -e "${GREEN}Система работает нормально${NC}"
    exit 0
else
    error "Обнаружено $FAILED_CHECKS проблем"
    echo -e "${RED}Требуется внимание администратора${NC}"
    exit 1
fi