/**
 * @file: api.ts
 * @description: Конфигурация API эндпоинтов для PizzaNat
 * @dependencies: Переменные окружения
 * @created: 2025-01-07
 */

// Базовые настройки API
export const API_CONFIG = {
  // Основной домен API - легко заменяемый (Vite использует VITE_ префикс)
  BASE_URL: import.meta.env.VITE_API_URL || 'https://api.dimbopizza.ru/api/v1/',

  // Альтернативные домены для быстрого переключения
  DOMAINS: {
    PRODUCTION: 'https://api.dimbopizza.ru/api/v1/',
    STAGING: 'https://staging-api.dimbopizza.ru/api/v1/',
    DEVELOPMENT: 'http://localhost:8080/api/v1',
    LOCAL: 'http://127.0.0.1:8080/api/v1'
  },

  // Таймауты
  TIMEOUT: 30000, // 30 секунд

  // Заголовки по умолчанию
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Client-Type': 'web',
    'X-Client-Version': '0.1.6'
  }
} as const

// Функция для получения текущего базового URL
export const getApiBaseUrl = (): string => {
  // В режиме разработки используем прокси для обхода CORS
  if (import.meta.env.DEV) {
    console.info('🔧 Development mode: using proxy to avoid CORS', '/api/v1')
    return '/api/v1' // Используем прокси из vite.config.ts
  }

  // Проверяем переменную окружения (Vite использует import.meta.env)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }

  // Определяем по hostname для автоматического переключения
  const hostname = window.location.hostname

  if (hostname.includes('staging') || hostname.includes('test')) {
    return API_CONFIG.DOMAINS.STAGING
  }

  // По умолчанию используем production
  return API_CONFIG.DOMAINS.PRODUCTION
}

// Конфигурация эндпоинтов
export const API_ENDPOINTS = {
  // Аутентификация
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',

    // SMS аутентификация
    SMS_SEND: '/auth/sms/send-code',
    SMS_VERIFY: '/auth/sms/verify-code',

    // Telegram аутентификация
    TELEGRAM_INIT: '/auth/telegram/init',
    TELEGRAM_STATUS: '/auth/telegram/status'
  },

  // Продукты
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: number) => `/products/${id}`,
    SEARCH: '/products/search',
    POPULAR: '/products/popular',
    NEW: '/products/new'
  },

  // Категории
  CATEGORIES: {
    LIST: '/categories',
    DETAIL: (id: number) => `/categories/${id}`
  },

  // Корзина
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: (itemId: number) => `/cart/items/${itemId}`,
    REMOVE: (itemId: number) => `/cart/items/${itemId}`,
    CLEAR: '/cart/clear'
  },

  // Заказы
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders',
    DETAIL: (id: number) => `/orders/${id}`,
    CANCEL: (id: number) => `/orders/${id}/cancel`
  },

  // Избранное
  FAVORITES: {
    LIST: '/favorites',
    ADD: '/favorites',
    REMOVE: (productId: number) => `/favorites/${productId}`
  },

  // Доставка
  DELIVERY: {
    ZONES: '/delivery/zones',
    COST: '/delivery/cost',
    ADDRESS_SUGGESTIONS: '/delivery/address-suggestions'
  },

  // Платежи
  PAYMENTS: {
    YOOKASSA: '/payments/yookassa',
    STATUS: (paymentId: string) => `/payments/${paymentId}/status`
  },

  // Пользователь
  USER: {
    PROFILE: '/user/profile',
    ADDRESSES: '/user/addresses',
    NOTIFICATIONS: '/user/notifications'
  }
} as const

// Функция для построения полного URL
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl()
  return `${baseUrl}${endpoint}`
}

// Функция для логирования API запросов в development
export const logApiRequest = (method: string, url: string, data?: any) => {
  if (import.meta.env.DEV) {
    console.group(`🌐 API ${method.toUpperCase()} ${url}`)
    if (data) {
      console.log('📤 Request data:', data)
    }
    console.groupEnd()
  }
}

// Функция для логирования API ответов в development
export const logApiResponse = (method: string, url: string, response: any, error?: any) => {
  if (import.meta.env.DEV) {
    console.group(`🌐 API ${method.toUpperCase()} ${url} Response`)
    if (error) {
      console.error('❌ Error:', error)
    } else {
      console.log('✅ Success:', response)
    }
    console.groupEnd()
  }
}