# Руководство по тестированию системы аутентификации PizzaNat Web

## Запуск приложения

1. Убедитесь, что dev сервер запущен:
   ```bash
   npm run dev
   ```

2. Откройте браузер и перейдите по адресу: `http://localhost:5173` (или другой порт, указанный в консоли)

## Тестирование аутентификации

### 1. Email/Password аутентификация

#### Тестирование входа:
- Выберите вкладку "Email" (по умолчанию)
- Введите email: `test@example.com`
- Введите пароль: `password123`
- Нажмите "Войти"

**Ожидаемый результат**: Должно появиться уведомление об ошибке, так как backend API не настроен

#### Тестирование регистрации:
- Нажмите "Зарегистрироваться" внизу формы
- Заполните форму:
  - Имя: `Тест`
  - Фамилия: `Пользователь`
  - Email: `test@example.com`
  - Телефон: `+7 999 123 45 67` (необязательно)
  - Пароль: `password123`
- Нажмите "Зарегистрироваться"

**Ожидаемый результат**: Должно появиться уведомление об ошибке из-за отсутствия backend

### 2. SMS аутентификация

- Выберите вкладку "SMS"
- Введите номер телефона: `+7 999 123 45 67`
- Нажмите "Отправить код"

**Ожидаемый результат**: Должно появиться уведомление об ошибке, но форма должна корректно валидировать и нормализовать номер

### 3. Telegram аутентификация

- Выберите вкладку "Telegram"
- Нажмите "Начать вход через Telegram"

**Ожидаемый результат**: Должно появиться уведомление об ошибке, так как backend API не настроен

## Тестирование UI компонентов

### 1. Валидация форм
- Попробуйте отправить пустые формы
- Введите некорректный email
- Введите короткий пароль (менее 6 символов)
- Введите некорректный номер телефона

**Ожидаемый результат**: Должны появляться соответствующие сообщения об ошибках

### 2. Переключение между методами
- Переключайтесь между вкладками Email, SMS, Telegram
- Убедитесь, что формы сбрасываются при переключении

### 3. Responsive дизайн
- Измените размер окна браузера
- Проверьте отображение на мобильных устройствах (Developer Tools > Device Toolbar)

### 4. Главный экран (после входа)
Поскольку backend не настроен, для тестирования главного экрана можно временно изменить состояние:

1. Откройте Developer Tools (F12)
2. В консоли выполните:
   ```javascript
   localStorage.setItem('pizzanat_auth', JSON.stringify({
     user: { email: 'test@example.com', first_name: 'Тест' },
     tokens: { access: 'fake_token', refresh: 'fake_refresh' }
   }))
   ```
3. Обновите страницу

**Ожидаемый результат**: Должен отобразиться главный экран с:
- Приветствием пользователя
- Навигационным меню
- Демо карточками пиццы
- Компонентом ссылок на магазины приложений (Google Play, RuStore)

## Тестирование магазинов приложений

1. На главном экране найдите блок "Скачайте мобильное приложение PizzaNat"
2. Нажмите на кнопку "Google Play"
3. Нажмите на кнопку "RuStore"

**Ожидаемый результат**: В консоли браузера должны появиться сообщения о том, что URL не настроены

## Проверка состояния загрузки

1. Откройте Developer Tools > Network
2. Включите throttling (Slow 3G)
3. Обновите страницу

**Ожидаемый результат**: Должен отображаться индикатор загрузки с текстом "Загрузка PizzaNat..."

## Известные ограничения

1. **Backend API не настроен**: Все запросы к API будут возвращать ошибки CORS или 404
2. **Telegram аутентификация**: Требует настройки Telegram бота на backend
3. **SMS аутентификация**: Требует интеграции с SMS провайдером на backend
4. **Токены**: Автообновление токенов не работает без backend

## Что работает без backend

- ✅ Валидация форм
- ✅ UI компоненты и анимации
- ✅ Переключение между методами аутентификации
- ✅ Responsive дизайн
- ✅ Состояние загрузки
- ✅ Локальное хранение данных (localStorage)
- ✅ Уведомления пользователю

## Следующие шаги

1. Настройка backend API на `https://api.dimbopizza.ru`
2. Настройка CORS политик
3. Тестирование с реальными данными
4. Интеграция с продуктовым каталогом