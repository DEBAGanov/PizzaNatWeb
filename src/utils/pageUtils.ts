/**
 * @file: pageUtils.ts
 * @description: Утилиты для работы со страницами и навигацией
 * @dependencies: None
 * @created: 2025-01-26
 */

/**
 * Проверяет, является ли текущая страница публичной (доступной без авторизации)
 * Используется для SEO оптимизации и предотвращения автоматической авторизации
 */
export const isPublicPage = (): boolean => {
  const path = window.location.pathname
  const publicPaths = [
    '/',          // Главная страница
    '/dimbokids', // Страница для детей
    '/auth',      // Страница авторизации
    '/privacy'    // Политика конфиденциальности
  ]
  return publicPaths.includes(path)
}

/**
 * Проверяет, является ли текущая страница страницей авторизации
 */
export const isAuthPage = (): boolean => {
  return window.location.pathname.includes('/auth')
}

/**
 * Проверяет, является ли текущее окружение development
 */
export const isDevelopmentEnvironment = (): boolean => {
  return window.location.hostname === 'localhost' && window.location.port === '8080'
}