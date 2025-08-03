# 🚀 Инструкция по деплою ДИМБО Пицца

## Быстрый старт

### 1. Клонирование репозитория
```bash
git clone <repository-url>
cd PizzaNatWeb
```

### 2. Установка зависимостей Telegram
```bash
npm install @twa-dev/sdk
npm install --save-dev @types/node
```

### 3. Настройка переменных окружения
```bash
# Создайте .env файл из шаблона
cp .env.production .env

# Отредактируйте .env и заполните реальными значениями:
# - VITE_YANDEX_METRIKA_ID
# - VITE_YANDEX_VERIFICATION
# - VITE_TELEGRAM_BOT_NAME (если создан бот)
# - VITE_PHONE, VITE_EMAIL (реальные контакты)
# - VITE_YUKASSA_SHOP_ID (для платежей)
nano .env
```

### 4. Запуск в Development режиме
```bash
# Быстрый старт для разработки
docker-compose up -d

# Приложение будет доступно на http://localhost:5173
```

### 5. Запуск в Production режиме
```bash
# Полный деплой с Nginx и SSL
./deploy.sh

# Приложение будет доступно на http://localhost:3478
```

## Production деплой на сервере

### 1. Подготовка сервера
```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Установка Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Перезагрузка для применения групп
sudo reboot
```

### 2. Настройка SSL сертификатов
```bash
# Установка Certbot
sudo apt install certbot

# Получение SSL сертификата для dimbopizza.ru
sudo certbot certonly --standalone -d dimbopizza.ru -d www.dimbopizza.ru

# Или создание самоподписанного сертификата (для тестирования)
mkdir -p nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/privkey.pem \
  -out nginx/ssl/fullchain.pem \
  -subj "/C=RU/ST=Mari El/L=Volzhsk/O=DIMBO Pizza/CN=dimbopizza.ru"
```

### 3. Настройка DNS
Направьте домен `dimbopizza.ru` на IP сервера:
```
A     dimbopizza.ru     YOUR_SERVER_IP
A     www.dimbopizza.ru YOUR_SERVER_IP
```

### 4. Production деплой
```bash
# Клонирование проекта
git clone <repository-url>
cd PizzaNatWeb

# Настройка environment
cp .env.production .env
nano .env  # Заполните реальными значениями

# Запуск с production конфигурацией
docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d

# Или используйте автоматический скрипт
./deploy.sh
```

## Команды управления

### Основные команды
```bash
# Полный деплой
./deploy.sh

# Остановка
./deploy.sh stop

# Просмотр логов
./deploy.sh logs

# Статус контейнеров
./deploy.sh status

# Пересборка
./deploy.sh rebuild
```

### Docker Compose команды
```bash
# Запуск в background
docker-compose up -d

# Остановка
docker-compose down

# Просмотр логов
docker-compose logs -f dimbopizza-web

# Вход в контейнер
docker-compose exec dimbopizza-web sh

# Обновление образов
docker-compose pull && docker-compose up -d
```

## Мониторинг и диагностика

### Health checks
```bash
# Проверка основного приложения
curl http://localhost:3478/health

# Проверка Nginx
curl -I http://localhost:80

# Проверка HTTPS
curl -I https://dimbopizza.ru
```

### Логи
```bash
# Логи приложения
docker-compose logs dimbopizza-web

# Логи Nginx
docker-compose logs nginx

# Системные логи
tail -f nginx/logs/access.log
tail -f nginx/logs/error.log
```

### Мониторинг ресурсов
```bash
# Использование ресурсов контейнерами
docker stats

# Дисковое пространство
docker system df

# Очистка неиспользуемых образов
docker system prune -f
```

## Настройка Telegram Bot

### 1. Создание бота
```
# В Telegram найдите @BotFather и выполните:
/start
/newbot
ДИМБО Пицца Bot
DimboPizzaBot
```

### 2. Настройка Web App
```
/setmenubutton
@DimboPizzaBot
Заказать пиццу 🍕
https://dimbopizza.ru
```

### 3. Полная настройка
См. подробную инструкцию в `docs/telegram-setup.md`

## Troubleshooting

### Приложение не запускается
```bash
# Проверьте логи
docker-compose logs

# Проверьте доступность портов
netstat -tlnp | grep :3478

# Проверьте переменные окружения
docker-compose config
```

### SSL проблемы
```bash
# Проверьте сертификаты
openssl x509 -in nginx/ssl/fullchain.pem -text -noout

# Обновите Let's Encrypt сертификаты
sudo certbot renew
```

### Проблемы с памятью
```bash
# Мониторинг памяти
docker stats --no-stream

# Увеличьте лимиты в docker-compose.yml если нужно
```

## Обновление приложения

### Автоматические обновления
```bash
# Включите Watchtower в production
docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d
```

### Ручное обновление
```bash
# Получите последние изменения
git pull origin main

# Пересоберите и перезапустите
./deploy.sh rebuild
```

## Бэкапы

### Настройка автоматических бэкапов
```bash
# Создайте cron job для бэкапа статических файлов
echo "0 2 * * * /usr/bin/rsync -av /path/to/project/ /backup/location/" | crontab -
```

### Ручной бэкап
```bash
# Бэкап конфигурации
tar -czf backup-$(date +%Y%m%d).tar.gz .env nginx/ docker-compose*.yml

# Экспорт образов
docker save dimbopizza-web > dimbopizza-web-backup.tar
```

---

## 🎯 Готово к production!

После выполнения всех шагов ваше приложение будет доступно по адресу:
- **HTTPS**: https://dimbopizza.ru
- **HTTP**: http://dimbopizza.ru (redirect на HTTPS)
- **Telegram Bot**: https://t.me/DimboPizzaBot

### Следующие шаги:
1. 📱 Настройте Telegram Bot по инструкции
2. 📊 Зарегистрируйтесь в Яндекс.Метрике и Вебмастере
3. 💳 Подключите YooKassa для приема платежей
4. 📞 Заполните реальные контактные данные