/**
 * @file: auth.ts
 * @description: Типы для системы аутентификации PizzaNat API
 * @dependencies: Нет
 * @created: 2025-01-07
 * @updated: 2025-01-20
 */

// Пользователь в системе
export interface User {
  id: number
  username: string
  fullName?: string
  phoneNumber?: string
  telegramId?: number
  role: 'USER' | 'ADMIN'
  createdAt?: string
}

// Токены аутентификации
export interface AuthTokens {
  access_token: string
  refresh_token?: string
}

// Реальный ответ API при логине/регистрации (согласно документации)
export interface AuthResponse {
  token: string        // Backend возвращает просто token
  user?: {             // user может отсутствовать в некоторых ответах
    id: number
    username: string
    fullName?: string
    phoneNumber?: string
    telegramId?: number
    role: 'USER' | 'ADMIN'
  }
}

// Email/Password Authentication
export interface LoginRequest {
  username: string  // Backend использует username, не email
  password: string
}

export interface RegisterRequest {
  username: string      // email пользователя
  password: string
  fullName: string      // полное имя
  phoneNumber: string   // номер телефона
}

// SMS Authentication
export interface SmsAuthRequest {
  phoneNumber: string // API ожидает phoneNumber
}

export interface SmsAuthResponse {
  success: boolean
  message: string
  requestId?: string     // UUID для идентификации запроса (может отсутствовать)
  expiresAt?: string     // Время истечения кода
  codeLength?: number    // Длина кода
  maskedPhoneNumber?: string
}

export interface SmsVerifyRequest {
  phoneNumber: string
  code: string
  requestId?: string     // UUID запроса из SmsAuthResponse (может отсутствовать)
}

// Telegram Authentication
export interface TelegramAuthResponse {
  authToken: string          // Токен для проверки статуса
  telegramBotUrl: string     // URL бота Telegram (не QR код)
  expiresAt: string         // Время истечения
}

// Telegram Init Request
export interface TelegramInitRequest {
  deviceId: string          // Уникальный идентификатор устройства
  phoneNumber?: string      // Опциональный номер телефона
}

// Telegram Status Response
export interface TelegramStatusResponse {
  success?: boolean
  status: 'PENDING' | 'COMPLETED' | 'CONFIRMED' | 'EXPIRED'
  message?: string
  token?: string            // JWT токен при успешной авторизации (может быть на верхнем уровне)
  user?: {                  // Данные пользователя (могут быть на верхнем уровне)
    id: number
    phoneNumber: string
    telegramId: number
    role: 'USER' | 'ADMIN'
  }
  authData?: {              // Или данные могут быть внутри authData
    token?: string
    user?: {
      id: number
      phoneNumber: string
      telegramId: number
      role: 'USER' | 'ADMIN'
    }
  }
}

// Состояние аутентификации
export interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isLoading: boolean
  error: string | null
}

// Действия для AuthContext
export type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: { user: User; tokens: AuthTokens } }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' } 