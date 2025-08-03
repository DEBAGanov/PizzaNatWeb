#!/bin/bash

# Deployment скрипт для ДИМБО Пицца
# Автоматизированный деплой с использованием Docker Compose

set -e  # Прекращать выполнение при ошибке

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

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

# Проверка зависимостей
check_dependencies() {
    log "Проверка зависимостей..."
    
    if ! command -v docker &> /dev/null; then
        error "Docker не установлен. Установите Docker и повторите попытку."
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose не установлен. Установите Docker Compose и повторите попытку."
    fi
    
    success "Все зависимости установлены"
}

# Проверка переменных окружения
check_env() {
    log "Проверка переменных окружения..."
    
    if [ ! -f ".env" ]; then
        warning "Файл .env не найден. Создаю из шаблона..."
        if [ -f ".env.production" ]; then
            cp .env.production .env
            warning "Скопирован .env.production в .env"
            warning "ВАЖНО: Отредактируйте .env файл и заполните реальными значениями!"
        else
            error "Шаблон .env.production не найден"
        fi
    fi
    
    # Проверяем критические переменные
    if grep -q "YOUR_REAL_" .env; then
        warning "В .env файле найдены незаполненные значения (YOUR_REAL_*)"
        warning "Пожалуйста, заполните реальными данными перед деплоем в production"
    fi
    
    success "Переменные окружения проверены"
}

# Создание необходимых директорий
create_directories() {
    log "Создание необходимых директорий..."
    
    mkdir -p nginx/ssl
    mkdir -p nginx/logs
    mkdir -p data/backups
    
    success "Директории созданы"
}

# Остановка старых контейнеров
stop_old_containers() {
    log "Остановка старых контейнеров..."
    
    if docker-compose ps | grep -q "Up"; then
        docker-compose down
        success "Старые контейнеры остановлены"
    else
        log "Активных контейнеров не найдено"
    fi
}

# Сборка новых образов
build_images() {
    log "Сборка новых образов..."
    
    docker-compose build --no-cache dimbopizza-web
    
    success "Образы собраны"
}

# Запуск приложения
start_application() {
    log "Запуск приложения..."
    
    docker-compose up -d
    
    success "Приложение запущено"
}

# Проверка здоровья
health_check() {
    log "Проверка здоровья приложения..."
    
    # Ждем запуска
    sleep 30
    
    # Проверяем основное приложение
    if curl -f http://localhost:3478/health > /dev/null 2>&1; then
        success "Основное приложение работает"
    else
        error "Основное приложение недоступно"
    fi
    
    # Проверяем Nginx (если запущен)
    if docker-compose ps | grep -q "dimbopizza-nginx.*Up"; then
        if curl -f http://localhost:80 > /dev/null 2>&1; then
            success "Nginx работает"
        else
            warning "Nginx запущен, но не отвечает на запросы"
        fi
    else
        log "Nginx не запущен (это нормально для локального развертывания)"
    fi
}

# Показать логи
show_logs() {
    log "Последние логи приложения:"
    docker-compose logs --tail=20 dimbopizza-web
}

# Очистка старых образов
cleanup() {
    log "Очистка старых образов..."
    
    # Удаляем неиспользуемые образы
    docker image prune -f
    
    success "Очистка завершена"
}

# Главная функция
main() {
    echo -e "${BLUE}"
    echo "🍕 ДИМБО Пицца - Deployment Script"
    echo "================================="
    echo -e "${NC}"
    
    check_dependencies
    check_env
    create_directories
    stop_old_containers
    build_images
    start_application
    health_check
    show_logs
    cleanup
    
    echo -e "${GREEN}"
    echo "🎉 Деплой завершен успешно!"
    echo "================================="
    echo -e "${NC}"
    echo "Приложение доступно по адресу:"
    echo "  - Локально: http://localhost:3478"
    echo "  - Production: https://dimbopizza.ru (после настройки DNS)"
    echo ""
    echo "Полезные команды:"
    echo "  - docker-compose logs -f              # Просмотр логов"
    echo "  - docker-compose ps                   # Статус контейнеров"
    echo "  - docker-compose down                 # Остановка"
    echo "  - docker-compose exec dimbopizza-web sh  # Вход в контейнер"
}

# Обработка аргументов командной строки
case "${1:-deploy}" in
    "deploy")
        main
        ;;
    "stop")
        log "Остановка приложения..."
        docker-compose down
        success "Приложение остановлено"
        ;;
    "logs")
        docker-compose logs -f
        ;;
    "status")
        docker-compose ps
        ;;
    "rebuild")
        log "Пересборка без кэша..."
        docker-compose down
        docker-compose build --no-cache
        docker-compose up -d
        success "Пересборка завершена"
        ;;
    "help")
        echo "Использование: $0 [команда]"
        echo ""
        echo "Команды:"
        echo "  deploy   - Полный деплой (по умолчанию)"
        echo "  stop     - Остановить приложение"
        echo "  logs     - Показать логи"
        echo "  status   - Показать статус контейнеров"
        echo "  rebuild  - Пересобрать и перезапустить"
        echo "  help     - Показать эту справку"
        ;;
    *)
        error "Неизвестная команда: $1. Используйте '$0 help' для справки."
        ;;
esac