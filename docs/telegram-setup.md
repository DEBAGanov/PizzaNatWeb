# 🤖 Настройка Telegram Bot для Web App

## Создание Telegram Bot

### 1. Создайте бота через @BotFather

```
/start
/newbot
ДИМБО Пицца Bot
DimboPizzaBot
```

### 2. Настройте Web App

```
/setmenubutton
@DimboPizzaBot
Заказать пиццу 🍕
https://dimbopizza.ru
```

### 3. Настройте описание бота

```
/setdescription
@DimboPizzaBot
🍕 Заказ вкусной пиццы в Волжске с доставкой на дом! 

Наш бот поможет вам:
• Просмотреть меню пиццы
• Оформить заказ с доставкой
• Отследить статус заказа
• Выбрать способ оплаты

Работаем ежедневно с 10:00 до 20:00
Минимальный заказ: 300₽
Бесплатная доставка от 800₽

Приятного аппетита! 🍕
```

### 4. Настройте команды

```
/setcommands
@DimboPizzaBot
start - Главное меню
menu - Показать меню пиццы
cart - Моя корзина
orders - Мои заказы
help - Помощь
```

## Интеграция с Backend API

### Environment Variables

Добавьте в `.env`:

```bash
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
TELEGRAM_WEBHOOK_URL=https://api.dimbopizza.ru/api/v1/telegram/webhook
TELEGRAM_WEBAPP_URL=https://dimbopizza.ru

# Telegram Web App
VITE_TELEGRAM_BOT_NAME=DimboPizzaBot
VITE_TELEGRAM_WEBAPP_URL=https://dimbopizza.ru
```

### Backend Integration

Нужно добавить в Spring Boot API:

```java
@RestController
@RequestMapping("/api/v1/telegram")
public class TelegramController {
    
    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(@RequestBody TelegramUpdate update) {
        // Обработка Telegram webhook
        return ResponseEntity.ok("OK");
    }
    
    @PostMapping("/auth")
    public ResponseEntity<AuthResponse> authenticateUser(@RequestBody TelegramAuthRequest request) {
        // Валидация данных от Telegram Web App
        // Создание/обновление пользователя
        // Возврат JWT токена
        return ResponseEntity.ok(authResponse);
    }
}
```

## Структура команд бота

### /start
```
🍕 Добро пожаловать в ДИМБО Пицца!

Вкуснейшая пицца в Волжске с доставкой на дом.

🚀 Открыть меню - /menu
🛒 Моя корзина - /cart  
📦 Мои заказы - /orders

📞 Контакты: +7(XXX)XXX-XX-XX
🕒 Работаем: 10:00 - 22:00
```

### /menu
Открывает Web App с меню пиццы

### /cart  
Открывает Web App с корзиной

### /orders
Открывает Web App со списком заказов

### /help
```
❓ Помощь по боту ДИМБО Пицца

🍕 /menu - Посмотреть меню и заказать
🛒 /cart - Ваша корзина
📦 /orders - История заказов
📱 /webapp - Открыть приложение

💰 Способы оплаты:
• Наличными курьеру
• Банковской картой
• СБП (Система быстрых платежей)

🚚 Доставка:
• Центр города: бесплатно от 800₽
• Спальные районы: бесплатно от 1000₽
• Время доставки: 30-60 минут

📞 Поддержка: +7(XXX)XXX-XX-XX
```

## Тестирование Telegram Web App

### 1. Локальное тестирование

Для тестирования в разработке используйте:

```bash
# Установите ngrok для туннелирования
npm install -g ngrok

# Запустите локальный сервер
npm run dev

# В другом терминале создайте туннель
ngrok http 5173

# Обновите URL Web App у @BotFather
/setmenubutton
@DimboPizzaBot
Заказать пиццу 🍕
https://your-ngrok-url.ngrok.io
```

### 2. Проверка Web App

1. Откройте бота в Telegram
2. Нажмите кнопку "Заказать пиццу 🍕"
3. Проверьте:
   - Загрузка приложения
   - Получение данных пользователя
   - Работу haptic feedback
   - MainButton/SecondaryButton
   - Темную/светлую тему

### 3. Debug режим

Добавьте в Web App для отладки:

```javascript
// В development режиме показываем debug info
if (import.meta.env.DEV && window.Telegram?.WebApp) {
  console.log('🔍 Telegram Web App Debug:', {
    initData: window.Telegram.WebApp.initData,
    user: window.Telegram.WebApp.initDataUnsafe.user,
    colorScheme: window.Telegram.WebApp.colorScheme,
    themeParams: window.Telegram.WebApp.themeParams
  })
}
```

## Безопасность

### Валидация данных Telegram

Backend должен валидировать `initData` от Telegram:

```java
public boolean validateTelegramData(String initData, String botToken) {
    // Проверка HMAC подписи согласно документации Telegram
    // https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app
    return true; // или false если данные невалидны
}
```

### HTTPS обязательно

Telegram Web Apps работают только по HTTPS:

- Production: `https://dimbopizza.ru`
- Development: используйте ngrok

## Deployment

### 1. Обновите переменные окружения

```bash
# Production .env
VITE_TELEGRAM_BOT_NAME=DimboPizzaBot
VITE_TELEGRAM_WEBAPP_URL=https://dimbopizza.ru
```

### 2. Обновите URL у @BotFather

```
/setmenubutton
@DimboPizzaBot
Заказать пиццу 🍕
https://dimbopizza.ru
```

### 3. Настройте webhook (если нужен)

```
https://api.telegram.org/bot<token>/setWebhook?url=https://api.dimbopizza.ru/api/v1/telegram/webhook
```

## Мониторинг

Отслеживайте в Яндекс.Метрике события:

- `TELEGRAM_WEBAPP_OPENED` - открытие Web App
- `TELEGRAM_AUTH_SUCCESS` - успешная авторизация
- `TELEGRAM_ORDER_COMPLETE` - завершение заказа через Telegram

---

**Готово!** Ваш Telegram Web App настроен и готов к использованию. 🚀