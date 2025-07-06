# Конфигурация ссылок на мобильные приложения

## Как изменить ссылки на приложения

Все ссылки на мобильные приложения настраиваются в файле `src/config/appLinks.ts`.

### Настройка ссылок

Откройте файл `src/config/appLinks.ts` и измените значения в объекте `APP_LINKS`:

```typescript
export const APP_LINKS: AppLinks = {
  // Google Play Store - замените на вашу ссылку
  googlePlay: 'https://play.google.com/store/apps/details?id=ru.pizzanat.app',
  
  // RuStore - замените на вашу ссылку  
  ruStore: 'https://apps.rustore.ru/app/ru.pizzanat.app',
  
  // App Store (для будущего использования)
  appStore: 'https://apps.apple.com/ru/app/pizzanat/id123456789'
}
```

### Где применяются ссылки

После изменения ссылок в конфиге, они автоматически применятся во всех местах:

- ✅ Формы аутентификации (LoginForm, SmsAuthForm, TelegramAuthForm, RegisterForm)
- ✅ Главная страница (HomePage)
- ✅ Любые другие компоненты, использующие `AppInstallButtons`

### Переопределение ссылок в отдельных компонентах

Если нужно использовать другие ссылки в конкретном месте:

```typescript
<AppInstallButtons 
  googlePlayUrl="https://custom-google-play-link.com"
  ruStoreUrl="https://custom-rustore-link.com"
/>
```

### Получение ссылок в коде

```typescript
import { APP_LINKS, getAppLinks } from '../config/appLinks'

// Использование дефолтных ссылок
const links = APP_LINKS

// Переопределение части ссылок
const customLinks = getAppLinks({
  googlePlay: 'https://custom-link.com'
})
``` 