/**
 * @file: auth.ts
 * @description: Типы для системы аутентификации
 * @dependencies: Нет
 * @created: 2024-12-19
 */

export interface User {
  userId: number      // Backend возвращает userId
  username: string    // Backend возвращает username
  email?: string
  phone?: string
  telegram_id?: string
  firstName?: string  // Backend использует firstName
  lastName?: string   // Backend использует lastName
  created_at?: string
  updated_at?: string
}

export interface AuthTokens {
  access_token: string
  refresh_token?: string  // Backend не возвращает refresh токены
  token_type?: string
  expires_in?: number
}

// Реальный ответ API при логине/регистрации
export interface AuthResponse {
  token: string        // Backend возвращает просто token
  userId: number
  username: string
  email: string
  firstName?: string
  lastName?: string
}

// SMS Authentication
export interface SmsAuthRequest {
  phoneNumber: string // Исправлено: API ожидает phoneNumber, а не phone
}

export interface SmsVerifyRequest {
  phoneNumber: string // Исправлено: API ожидает phoneNumber, а не phone
  code: string
}

export interface SmsAuthResponse {
  success: boolean
  message: string
  expiresAt: string
  codeLength: number
  maskedPhoneNumber: string
}

// Email/Password Authentication
export interface LoginRequest {
  username: string  // Backend использует username, не email
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  firstName?: string  // Backend использует firstName, не first_name
  lastName?: string   // Backend использует lastName, не last_name
  phone?: string
}

// Telegram Authentication
export interface TelegramAuthResponse {
  success: boolean
  authToken: string // Исправлено: API возвращает authToken, а не session_id
  telegramBotUrl: string // Исправлено: API возвращает telegramBotUrl, а не auth_url
  expiresAt: string
  message: string
}

export interface TelegramStatusRequest {
  authToken: string  // Backend использует authToken
}

// Auth Context State
export interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthContextType extends AuthState {
  login: (request: LoginRequest) => Promise<void>
  register: (request: RegisterRequest) => Promise<void>
  sendSmsCode: (request: SmsAuthRequest) => Promise<SmsAuthResponse>
  verifySmsCode: (request: SmsVerifyRequest) => Promise<void>
  initTelegramAuth: () => Promise<TelegramAuthResponse>
  checkTelegramStatus: (sessionId: string) => Promise<AuthResponse | null>
  logout: () => void
  refreshToken: () => Promise<void>
} 