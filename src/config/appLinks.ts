/**
 * @file: appLinks.ts
 * @description: Конфигурация ссылок на мобильные приложения
 * @dependencies: Нет
 * @created: 2025-01-07
 */

export interface AppLinks {
  googlePlay: string
  ruStore: string
  appStore?: string // На будущее для iOS
}

// Централизованная конфигурация ссылок на приложения
export const APP_LINKS: AppLinks = {
  // Google Play Store
  googlePlay: 'https://play.google.com/store/apps/details?id=ru.pizzanat.app',
  
  // RuStore
  ruStore: 'https://apps.rustore.ru/app/ru.pizzanat.app',
  
  // App Store (для будущего использования)
  appStore: 'https://apps.apple.com/ru/app/pizzanat/id123456789'
}

// Функция для получения ссылок (с возможностью переопределения)
export const getAppLinks = (overrides?: Partial<AppLinks>): AppLinks => {
  return {
    ...APP_LINKS,
    ...overrides
  }
} 