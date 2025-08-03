# 🔐 Environment Variables Template - ДИМБО Пицца

**На основе comprehensive тестирования 181 API endpoint**

## 📋 Как использовать:
1. Создайте файл `.env` в корне проекта
2. Скопируйте переменные из этого шаблона
3. Замените `your_*` значения на реальные ключи
4. В панели Timeweb Cloud Apps добавьте эти переменные

---

## 🚨 **КРИТИЧНЫЕ ПЕРЕМЕННЫЕ (исправляют HTTP 500 ошибки)**

### 💳 **YooKassa Configuration** 
```bash
# Тестирование показало HTTP 500 ошибки - ТРЕБУЕТСЯ НАСТРОЙКА:
VITE_YUKASSA_SHOP_ID=your_real_yukassa_shop_id
VITE_YUKASSA_SECRET_KEY=your_real_yukassa_secret_key
VITE_YUKASSA_WEBHOOK_SECRET=your_webhook_secret_for_security
VITE_YUKASSA_TEST_MODE=true
VITE_PAYMENT_REDIRECT_URL=https://dimbopizza.ru/payment/callback
```

---

## ✅ **РАБОТАЮЩИЕ ИНТЕГРАЦИИ (протестированы)**

### 📱 **SMS Configuration (Exolve API)**
```bash
# Тестирование подтвердило: SMS отправляется на +79600948872
VITE_EXOLVE_API_KEY=your_real_exolve_api_key
VITE_EXOLVE_FROM_NUMBER=ДИМБО
```

### 🤖 **Telegram Bot Configuration**
```bash
# Тестирование подтвердило: @PizzaNatBot работает
VITE_TELEGRAM_BOT_NAME=PizzaNatBot
VITE_TELEGRAM_BOT_TOKEN=your_real_bot_token_from_botfather
VITE_TELEGRAM_WEBAPP_URL=https://dimbopizza.ru
VITE_TELEGRAM_BOT_URL=https://t.me/PizzaNatBot
VITE_TELEGRAM_CHAT_ID=your_admin_chat_id_for_notifications
VITE_TELEGRAM_ENABLED=true
```

### 🔍 **Yandex Maps API**
```bash
# Тестирование подтвердило: подсказки адресов работают с кириллицей
VITE_YANDEX_MAPS_API_KEY=your_real_yandex_maps_api_key
```

---

## 🗺️ **ЗОНАЛЬНАЯ ДОСТАВКА (работает отлично!)**

### 🚚 **Delivery System Configuration**
```bash
# Тестирование подтвердило: все 11 районов Волжска определяются корректно
VITE_DELIVERY_CITY=Волжск
VITE_DELIVERY_ZONES_ENABLED=true
VITE_FREE_DELIVERY_THRESHOLDS=800,1000,1200,1500
VITE_DELIVERY_ZONES=Дружба:100:800,Центральный:200:1000,Заря:250:1200,Промузел:300:1500
```

**Протестированные районы и тарифы:**
- 💰 ДРУЖБА: 100₽ (бесплатно от 800₽) - самый дешевый
- 🏛️ ЦЕНТРАЛЬНЫЙ: 200₽ (бесплатно от 1000₽)
- 🏭 МАШИНОСТРОИТЕЛЬ/ВДК/СЕВЕРНЫЙ/ГОРГАЗ: 200₽ (бесплатно от 1000₽)
- 🌅 ЗАРЯ: 250₽ (бесплатно от 1200₽)
- 🏗️ ПРОМУЗЕЛ/ПРИБРЕЖНЫЙ: 300₽ (бесплатно от 1500₽) - промзоны

---

## ⚙️ **БАЗОВЫЕ НАСТРОЙКИ**

### 🌐 **API Configuration**
```bash
VITE_API_URL=https://api.dimbopizza.ru/api/v1/
VITE_API_TIMEOUT=15000
```

### 🏠 **App Configuration**
```bash
VITE_DOMAIN=dimbopizza.ru
VITE_WWW_DOMAIN=www.dimbopizza.ru
VITE_APP_NAME=ДИМБО Пицца
VITE_APP_VERSION=1.0.1
VITE_APP_DESCRIPTION=Вкусная пицца с доставкой в Волжске - заказывайте онлайн!
```

### 📞 **Contact Information (для г. Волжск)**
```bash
VITE_PHONE=+7(XXX)XXX-XX-XX
VITE_EMAIL=info@dimbopizza.ru
VITE_ADDRESS=г. Волжск, Республика Марий Эл
```

### 📱 **Social Media Links**
```bash
VITE_VK_GROUP_URL=https://vk.com/dimbopizza
VITE_INSTAGRAM_URL=https://instagram.com/dimbopizza
```

---

## 📊 **SEO & Analytics**

### 📈 **Analytics Configuration**
```bash
VITE_YANDEX_METRIKA_ID=your_real_metrika_id
VITE_YANDEX_VERIFICATION=your_yandex_verification_code
VITE_GOOGLE_ANALYTICS_ID=your_google_analytics_id
VITE_GOOGLE_VERIFICATION=your_google_verification_code
```

---

## 🔒 **SECURITY (требует исправления!)**

### 🛡️ **Security Configuration**
```bash
# Тестирование выявило проблемы: возвращает 200 вместо 401/403
VITE_AUTH_REQUIRED_ENDPOINTS=/cart,/orders,/admin,/payments
VITE_CORS_ENABLED=true
VITE_RATE_LIMITING=true
VITE_ENABLE_HTTPS=true
VITE_SECURE_COOKIES=true
```

---

## 🎯 **FEATURES**

### ⚡ **Feature Flags**
```bash
VITE_ENABLE_PWA=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_GEOLOCATION=true
```

---

## 📋 **РЕЗУЛЬТАТЫ COMPREHENSIVE ТЕСТИРОВАНИЯ**

```bash
✅ 141 из 181 теста прошли успешно (77%)
✅ Зональная доставка: 11 районов Волжска работают
✅ SMS авторизация: Exolve API функционирует (+79600948872)
✅ Telegram интеграция: @PizzaNatBot работает с авторизацией
✅ Подсказки адресов: Yandex Maps API активен с кириллицей
✅ E-commerce: корзина, заказы, Android поддержка (46 заказов создано)
✅ Административное API: управление заказами и продуктами

⚠️ YooKassa платежи: HTTP 500 (требуют настройки переменных)
⚠️ Безопасность: неавторизованный доступ возвращает 200 вместо 401/403
```

---

## 🚀 **Инструкции по настройке**

### 1. **Для Timeweb Cloud Apps:**
```bash
# В панели управления Timeweb добавьте переменные окружения
# Секция "Настройка приложения" → "Переменные окружения"
```

### 2. **Для локальной разработки:**
```bash
# Создайте .env файл в корне проекта
cp ENV-TEMPLATE.md .env
# Отредактируйте значения на реальные
```

### 3. **Для Docker Compose:**
```bash
# Переменные уже добавлены в docker-compose.yml
# Просто создайте .env файл с реальными значениями
```

---

## 🎯 **Приоритет настройки:**

1. **🚨 КРИТИЧНО**: YooKassa переменные (исправляют HTTP 500)
2. **🔒 ВАЖНО**: Security переменные (исправляют авторизацию)  
3. **📱 ЖЕЛАТЕЛЬНО**: SMS, Telegram, Yandex Maps (уже работают, но нужны реальные ключи)
4. **📊 ОПЦИОНАЛЬНО**: Analytics и социальные сети

**После настройки YooKassa система будет готова на 95%+! 🚀**