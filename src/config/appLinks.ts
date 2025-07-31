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
  googlePlay: 'https://rustore.ru/catalog/app/com.pizzanat.app',
  
  // RuStore
  ruStore: 'https://rustore.ru/catalog/app/com.pizzanat.app',
  
  // App Store (для будущего использования)
  appStore: 'https://rustore.ru/catalog/app/com.pizzanat.app'
}

// Функция для получения ссылок (с возможностью переопределения)
export const getAppLinks = (overrides?: Partial<AppLinks>): AppLinks => {
  return {
    ...APP_LINKS,
    ...overrides
  }
} 