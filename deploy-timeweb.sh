#!/bin/bash

# Скрипт деплоя PizzaNat Web на Timeweb Cloud
# Автор: AI Assistant
# Дата: 2024-12-19

set -e

echo "🚀 Начинаем деплой PizzaNat Web на Timeweb Cloud..."

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функция для логирования
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Проверка зависимостей
check_dependencies() {
    log "Проверка зависимостей..."
    
    if ! command -v docker &> /dev/null; then
        error "Docker не установлен. Установите Docker и попробуйте снова."
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose не установлен. Установите Docker Compose и попробуйте снова."
    fi
    
    success "Все зависимости установлены"
}

# Проверка файлов проекта
check_project_files() {
    log "Проверка файлов проекта..."
    
    if [ ! -f "Dockerfile" ]; then
        error "Dockerfile не найден"
    fi
    
    if [ ! -f "docker-compose.yml" ]; then
        error "docker-compose.yml не найден"
    fi
    
    if [ ! -f "package.json" ]; then
        error "package.json не найден"
    fi
    
    success "Все файлы проекта на месте"
}

# Создание необходимых директорий (для Timeweb Cloud Apps не требуется)
create_directories() {
    log "Подготовка к деплою на Timeweb Cloud Apps..."
    
    # На Timeweb Cloud Apps volumes не поддерживаются
    # SSL и логирование управляется платформой автоматически
    
    success "Подготовка завершена"
}

# Остановка существующих контейнеров
stop_existing_containers() {
    log "Остановка существующих контейнеров..."
    
    if docker ps -q --filter "name=pizzanat" | grep -q .; then
        docker-compose down
        success "Существующие контейнеры остановлены"
    else
        log "Активных контейнеров не найдено"
    fi
}

# Очистка старых образов
cleanup_images() {
    log "Очистка старых образов..."
    
    # Удаляем неиспользуемые образы
    docker image prune -f
    
    # Удаляем старые версии нашего образа (оставляем последние 3)
    if docker images pizzanatWeb_pizzanat-web -q | tail -n +4 | head -n -0; then
        docker images pizzanatWeb_pizzanat-web -q | tail -n +4 | xargs -r docker rmi
        success "Старые образы удалены"
    else
        log "Старых образов не найдено"
    fi
}

# Сборка и запуск
build_and_deploy() {
    log "Сборка и запуск приложения..."
    
    # На Timeweb Cloud Apps переменные окружения встроены в docker-compose.yml
    log "Переменные окружения встроены в docker-compose.yml для Timeweb Cloud Apps"
    
    # Сборка и запуск
    docker-compose build --no-cache pizzanat-web
    docker-compose up -d pizzanat-web
    
    success "Приложение собрано и запущено"
}

# Проверка здоровья приложения
health_check() {
    log "Проверка здоровья приложения..."
    
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f http://localhost/health &> /dev/null; then
            success "Приложение успешно запущено и отвечает на запросы"
            return 0
        fi
        
        log "Попытка $attempt/$max_attempts - ожидание запуска приложения..."
        sleep 10
        ((attempt++))
    done
    
    error "Приложение не запустилось в течение 5 минут"
}

# Показ статуса
show_status() {
    log "Статус деплоя:"
    echo ""
    docker-compose ps
    echo ""
    
    log "Логи приложения (последние 20 строк):"
    docker-compose logs --tail=20 pizzanat-web
    echo ""
    
    success "Деплой завершен успешно!"
    echo ""
    echo "🌐 Ваше приложение доступно по адресу: http://localhost:3000"
    echo "📊 Мониторинг: docker-compose logs -f pizzanat-web"
    echo "🔄 Обновление: ./deploy-timeweb.sh"
    echo "⏹️  Остановка: docker-compose down"
}

# Опциональные профили
deploy_with_ssl() {
    log "Запуск с SSL (Traefik)..."
    docker-compose --profile traefik up -d
    success "SSL-прокси запущен"
}

deploy_with_monitoring() {
    log "Запуск с мониторингом..."
    docker-compose --profile monitoring up -d
    success "Мониторинг запущен"
}

deploy_with_autoupdate() {
    log "Запуск с автообновлением..."
    docker-compose --profile autoupdate up -d
    success "Автообновление запущено"
}

# Основная функция
main() {
    echo "🍕 PizzaNat Web Deployment Script для Timeweb Cloud"
    echo "=================================================="
    echo ""
    
    # Обработка аргументов
    case "${1:-basic}" in
        "ssl")
            DEPLOY_MODE="ssl"
            ;;
        "monitoring")
            DEPLOY_MODE="monitoring"
            ;;
        "autoupdate")
            DEPLOY_MODE="autoupdate"
            ;;
        "full")
            DEPLOY_MODE="full"
            ;;
        "basic"|*)
            DEPLOY_MODE="basic"
            ;;
    esac
    
    log "Режим деплоя: $DEPLOY_MODE"
    echo ""
    
    # Выполнение основных шагов
    check_dependencies
    check_project_files
    create_directories
    stop_existing_containers
    cleanup_images
    build_and_deploy
    
    # Дополнительные профили
    case "$DEPLOY_MODE" in
        "ssl")
            deploy_with_ssl
            ;;
        "monitoring")
            deploy_with_monitoring
            ;;
        "autoupdate")
            deploy_with_autoupdate
            ;;
        "full")
            deploy_with_ssl
            deploy_with_monitoring
            deploy_with_autoupdate
            ;;
    esac
    
    health_check
    show_status
}

# Обработка сигналов
trap 'error "Деплой прерван пользователем"' INT TERM

# Запуск
main "$@" 