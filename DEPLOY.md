# 🚀 Деплой PizzaNat Web на Timeweb Cloud Apps

Подробная инструкция по развертыванию веб-приложения PizzaNat на сервисе [Timeweb Cloud Apps](https://timeweb.cloud/docs/apps/deploying-with-docker-compose) с использованием Docker Compose.

## 📋 Содержание

- [Быстрый старт для Timeweb Cloud Apps](#быстрый-старт-для-timeweb-cloud-apps)
- [Требования](#требования)
- [Подготовка сервера](#подготовка-сервера)
- [Настройка проекта](#настройка-проекта)
- [Деплой](#деплой)
- [Мониторинг](#мониторинг)
- [Обслуживание](#обслуживание)
- [Устранение неполадок](#устранение-неполадок)

## 🚀 Быстрый старт для Timeweb Cloud Apps

### Особенности платформы:
- ✅ **Volumes не поддерживаются** - все данные встроены в контейнер
- ✅ **Порты 80/443 зарезервированы** - используем порт 3000
- ✅ **SSL управляется автоматически** - не нужно настраивать сертификаты
- ✅ **Переменные окружения** - встроены в docker-compose.yml
- ✅ **Автодеплой** - при коммитах в репозиторий

### Пошаговый деплой:
1. **Загрузите проект** в GitHub/GitLab/BitBucket
2. **Войдите в панель** [Timeweb Cloud Apps](https://timeweb.cloud/apps)
3. **Выберите "Docker Compose"** в типе приложения
4. **Подключите репозиторий** с вашим проектом
5. **Настройте переменные** в docker-compose.yml (домен, API, аналитика)
6. **Запустите деплой** - платформа автоматически соберет и запустит приложение

### Важные настройки:
```yaml
# В docker-compose.yml уже настроено:
ports:
  - "3000:3000"  # Внутренний порт контейнера
environment:
  - VITE_DOMAIN=your-domain.com  # Замените на ваш домен
  - VITE_API_URL=https://api.dimbopizza.ru/api/v1/  # Ваш API
```

### Файлы конфигурации:
- **docker-compose.yml** - Упрощенная версия для Timeweb Cloud Apps (без volumes)
- **docker-compose.local.yml** - Расширенная версия для локального деплоя (с Traefik, мониторингом)
- **env.production** - Шаблон переменных окружения (для справки)

## 🔧 Требования

### Для Timeweb Cloud Apps:
- **Аккаунт**: Зарегистрированный аккаунт на [Timeweb Cloud](https://timeweb.cloud/)
- **Репозиторий**: GitHub, GitLab или BitBucket с docker-compose.yml в корне
- **Конфигурация сервера**: Выбирается в панели управления Apps
- **SSL**: Управляется автоматически платформой
- **Домен**: Бесплатный технический домен или собственный

### Минимальные требования к серверу Apps:
- **CPU**: 1 vCPU
- **RAM**: 2 GB
- **Диск**: 20 GB SSD

### Рекомендуемые требования:
- **CPU**: 2 vCPU
- **RAM**: 4 GB
- **Диск**: 40 GB SSD

## 🖥️ Подготовка сервера

### 1. Создание сервера на Timeweb Cloud

1. Войдите в [панель управления Timeweb Cloud](https://timeweb.cloud/)
2. Создайте новый VDS/VPS сервер:
   - **Конфигурация**: Выберите подходящую по требованиям
   - **ОС**: Ubuntu 22.04 LTS
   - **Дополнительно**: Включите резервное копирование

### 2. Первоначальная настройка сервера

```bash
# Подключение к серверу
ssh root@your-server-ip

# Обновление системы
apt update && apt upgrade -y

# Установка необходимых пакетов
apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Создание пользователя для приложения
useradd -m -s /bin/bash pizzanat
usermod -aG sudo pizzanat

# Настройка SSH ключей (рекомендуется)
mkdir -p /home/pizzanat/.ssh
cp ~/.ssh/authorized_keys /home/pizzanat/.ssh/
chown -R pizzanat:pizzanat /home/pizzanat/.ssh
chmod 700 /home/pizzanat/.ssh
chmod 600 /home/pizzanat/.ssh/authorized_keys
```

### 3. Установка Docker и Docker Compose

```bash
# Установка Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Добавление пользователя в группу docker
usermod -aG docker pizzanat

# Запуск и автозапуск Docker
systemctl start docker
systemctl enable docker

# Установка Docker Compose (standalone)
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Проверка установки
docker --version
docker-compose --version
```

### 4. Настройка файрвола

```bash
# Установка UFW
apt install -y ufw

# Базовые правила
ufw default deny incoming
ufw default allow outgoing

# Разрешение SSH
ufw allow ssh

# Разрешение HTTP и HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Активация файрвола
ufw --force enable

# Проверка статуса
ufw status
```

## ⚙️ Настройка проекта

### 1. Клонирование репозитория

```bash
# Переключение на пользователя pizzanat
su - pizzanat

# Клонирование проекта
git clone https://github.com/your-username/PizzaNatWeb.git
cd PizzaNatWeb

# Проверка файлов
ls -la
```

### 2. Настройка окружения

```bash
# Копирование и редактирование production окружения
cp env.production .env

# Редактирование конфигурации
nano .env
```

**Важные параметры для настройки:**

```env
# API Configuration
VITE_API_URL=https://api.dimbopizza.ru/api/v1/

# Domain Configuration
VITE_DOMAIN=your-domain.com
VITE_WWW_DOMAIN=www.your-domain.com

# Analytics
VITE_YANDEX_METRIKA_ID=your_actual_metrika_id
VITE_GOOGLE_ANALYTICS_ID=your_actual_ga_id

# Payment
VITE_YUKASSA_SHOP_ID=your_actual_yukassa_shop_id

# Contact Info
VITE_PHONE=+7(999)123-45-67
VITE_EMAIL=info@your-domain.com
VITE_ADDRESS=Ваш реальный адрес
```

### 3. Настройка домена

```bash
# Редактирование docker-compose.yml для вашего домена
nano docker-compose.yml

# Найдите и измените:
# - "traefik.http.routers.pizzanat.rule=Host(`your-domain.com`) || Host(`www.your-domain.com`)"
# - "--certificatesresolvers.letsencrypt.acme.email=admin@your-domain.com"
```

## 🚀 Деплой

### 1. Сделайте скрипт исполняемым

```bash
chmod +x deploy-timeweb.sh
```

### 2. Запуск базового деплоя

```bash
# Базовый деплой (только основное приложение)
./deploy-timeweb.sh basic
```

### 3. Деплой с SSL

```bash
# Деплой с автоматическим SSL (Let's Encrypt)
./deploy-timeweb.sh ssl
```

### 4. Полный деплой со всеми функциями

```bash
# Деплой с SSL, мониторингом и автообновлением
./deploy-timeweb.sh full
```

### 5. Доступные режимы деплоя

- `basic` - Только основное приложение
- `ssl` - Приложение + SSL через Traefik
- `monitoring` - Приложение + мониторинг Nginx
- `autoupdate` - Приложение + автоматические обновления
- `full` - Все функции включены

## 📊 Мониторинг

### Проверка статуса сервисов

```bash
# Статус контейнеров
docker-compose ps

# Логи приложения
docker-compose logs -f pizzanat-web

# Логи Traefik (если используется)
docker-compose logs -f traefik

# Использование ресурсов
docker stats
```

### Мониторинг системы

```bash
# Использование диска
df -h

# Использование памяти
free -h

# Нагрузка системы
htop

# Логи системы
journalctl -u docker -f
```

### Веб-интерфейсы

- **Приложение**: `https://your-domain.com`
- **Traefik Dashboard**: `https://your-domain.com:8080` (если включен)
- **Nginx Metrics**: `http://your-domain.com:9113/metrics` (если включен мониторинг)

## 🔧 Обслуживание

### Обновление приложения

```bash
# Получение последних изменений
git pull origin main

# Пересборка и перезапуск
./deploy-timeweb.sh basic
```

### Резервное копирование

```bash
# Создание резервной копии
mkdir -p ~/backups/$(date +%Y%m%d)

# Копирование важных файлов
cp -r ~/PizzaNatWeb ~/backups/$(date +%Y%m%d)/
cp -r ~/PizzaNatWeb/logs ~/backups/$(date +%Y%m%d)/
cp -r ~/PizzaNatWeb/letsencrypt ~/backups/$(date +%Y%m%d)/

# Создание архива
cd ~/backups
tar -czf pizzanat-backup-$(date +%Y%m%d).tar.gz $(date +%Y%m%d)/
```

### Очистка системы

```bash
# Очистка неиспользуемых Docker образов
docker system prune -a -f

# Очистка логов (старше 7 дней)
find ~/PizzaNatWeb/logs -name "*.log" -mtime +7 -delete

# Очистка старых резервных копий (старше 30 дней)
find ~/backups -name "*.tar.gz" -mtime +30 -delete
```

## 🔍 Устранение неполадок

### Проблемы с запуском

```bash
# Проверка логов
docker-compose logs pizzanat-web

# Проверка конфигурации
docker-compose config

# Пересборка без кэша
docker-compose build --no-cache pizzanat-web
```

### Проблемы с SSL

```bash
# Проверка сертификатов
docker-compose exec traefik ls -la /letsencrypt/

# Перезапуск Traefik
docker-compose restart traefik

# Проверка логов Traefik
docker-compose logs traefik
```

### Проблемы с производительностью

```bash
# Мониторинг ресурсов
docker stats

# Проверка дискового пространства
df -h

# Анализ логов Nginx
docker-compose exec pizzanat-web tail -f /var/log/nginx/access.log
```

### Частые ошибки

1. **Порт занят**: Проверьте, что порты 80 и 443 свободны
2. **Недостаточно памяти**: Увеличьте размер сервера
3. **Проблемы с DNS**: Убедитесь, что домен указывает на ваш сервер
4. **SSL не работает**: Проверьте настройки домена и файрвола

## 📞 Поддержка

При возникновении проблем:

1. Проверьте логи: `docker-compose logs -f`
2. Изучите документацию [Timeweb Cloud](https://timeweb.cloud/docs)
3. Обратитесь в техподдержку Timeweb Cloud: 8 (800) 700-32-92

## 🔐 Безопасность

### Рекомендации по безопасности:

1. **Регулярно обновляйте систему**:
   ```bash
   apt update && apt upgrade -y
   ```

2. **Используйте SSH ключи** вместо паролей

3. **Настройте автоматические резервные копии**

4. **Мониторьте логи безопасности**:
   ```bash
   tail -f /var/log/auth.log
   ```

5. **Используйте fail2ban** для защиты от брутфорса:
   ```bash
   apt install -y fail2ban
   systemctl enable fail2ban
   ```

## 📈 Оптимизация производительности

### Настройка для высокой нагрузки:

1. **Увеличьте лимиты файлов**:
   ```bash
   echo "* soft nofile 65536" >> /etc/security/limits.conf
   echo "* hard nofile 65536" >> /etc/security/limits.conf
   ```

2. **Оптимизируйте Docker**:
   ```bash
   # Настройка логирования Docker
   echo '{"log-driver":"json-file","log-opts":{"max-size":"10m","max-file":"3"}}' > /etc/docker/daemon.json
   systemctl restart docker
   ```

3. **Используйте CDN** для статических файлов

4. **Настройте кэширование** в nginx.conf

---

**Успешного деплоя! 🚀** 