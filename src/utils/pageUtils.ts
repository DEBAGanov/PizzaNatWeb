/**
 * @file: pageUtils.ts
 * @description: Утилиты для работы со страницами и навигацией
 * @dependencies: None
 * @created: 2025-01-26
 */

/**
 * Проверяет, является ли текущая страница SEO страницей (где нужно восстанавливать токены, но не требовать авторизацию)
 * Главная страница должна восстанавливать токены для авторизованных пользователей
 */
export const isSEOPage = (): boolean => {
  const path = window.location.pathname
  // SEO страницы где нужно восстанавливать токены
  return path.startsWith('/dostavka-') || 
         path.startsWith('/zakazat-') || 
         path.startsWith('/kids-') ||
         path.startsWith('/zelenodolsk-kids-') ||
         path.startsWith('/dodo-pizza-volzhsk') ||
         path.startsWith('/podslushano-volzhsk') ||
         path.startsWith('/volzhsk-24') ||    
         path.startsWith('/goryachie-blyuda') ||
         path.startsWith('/kholodnye-zakuski') ||
         path.startsWith('/napitki-dostavka') ||
         path.startsWith('/deserty-dostavka') ||
         path.startsWith('/dostavka-burgerov') ||
         path.startsWith('/zakazat-burgery') ||
         path.startsWith('/dostavka-krylyshek') ||
         path.startsWith('/zakazat-krylyshki') ||
         path.startsWith('/dostavka-kartoshki-fri') ||
         path.startsWith('/zakazat-kartoshku-fri') ||
         path.startsWith('/dostavka-edy-volzhsk') ||
         path.startsWith('/zakazat-edu-volzhsk') ||
         path.startsWith('/dostavka-nagetcov') ||
         path.startsWith('/zakazat-nagetsy') ||
         path.startsWith('/dostavka-rolov') ||
         path.startsWith('/zakazat-roly') ||
         path.startsWith('/dostavka-sushi') ||
         path.startsWith('/zakazat-sushi') ||
         path.startsWith('/dostavka-shashlyka') ||
         path.startsWith('/zakazat-shashlyk') ||
         path.startsWith('/dostavka-pizzy') ||
         path.startsWith('/zakazat-pizzu') ||
         path.startsWith('/dostavka-volzhsk') ||
         path.startsWith('/dostavka-tsentr-volzhsk') ||
         path.startsWith('/dostavka-po-rayonam') ||
         path.startsWith('/detskiy-denь-rozhdeniya') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-tsentr-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-po-rayonam') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-tsentr-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-po-rayonam') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-tsentr-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-po-rayonam') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-tsentr-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-po-rayonam') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-tsentr-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-po-rayonam') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-tsentr-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-po-rayonam') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-tsentr-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-po-rayonam') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-tsentr-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-po-rayonam') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-tsentr-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-po-rayonam') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-tsentr-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-po-rayonam') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-tsentr-volzhsk') ||
         path.startsWith('/detskiy-denь-rozhdeniya-gde-po-rayonam') ||
         path === '/dimbokids' ||
         path === '/' // Главная страница - восстанавливаем токены!
}

/**
 * Проверяет, является ли текущая страница чисто публичной (БЕЗ восстановления токенов)
 * Используется только для страниц где токены не нужны вообще
 */
export const isPublicPage = (): boolean => {
  const path = window.location.pathname
  const publicPaths = [
    '/auth',      // Страница авторизации - токены не нужны
    '/privacy'    // Политика конфиденциальности - токены не нужны
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