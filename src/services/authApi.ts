/**
 * @file: authApi.ts
 * @description: API сервис для аутентификации
 * @dependencies: api.ts, auth types
 * @created: 2024-12-19
 */

import { apiClient } from './api'
import { API_ENDPOINTS } from '../config/api'
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  SmsAuthRequest,
  SmsVerifyRequest,
  SmsAuthResponse,
  TelegramAuthResponse,
  User
} from '../types/auth'

export class AuthApi {
  // Email/Password Authentication
  static async login(request: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, request)
    return response.data
  }

  static async register(request: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, request)
    return response.data
  }

  // SMS Authentication
  static async sendSmsCode(request: SmsAuthRequest): Promise<SmsAuthResponse> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.SMS_SEND, request)
    return response.data
  }

  static async verifySmsCode(request: SmsVerifyRequest): Promise<AuthResponse> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.SMS_VERIFY, request)
    return response.data
  }

  // Telegram Authentication
  static async initTelegramAuth(): Promise<TelegramAuthResponse> {
    try {
      console.log('🔵 Инициализация Telegram аутентификации...')
      
      // Генерируем deviceId как в тестовом скрипте
      const deviceId = `web_telegram_${Date.now()}`
      console.log('🔧 Используем deviceId:', deviceId)
      
      // API работает с deviceId параметром (проверено тестами)
      const response = await apiClient.post(API_ENDPOINTS.AUTH.TELEGRAM_INIT, {
        deviceId: deviceId
      })
      
      console.log('✅ Telegram инициализация успешна:', response.data)
      return response.data
    } catch (error: any) {
      console.error('❌ Ошибка инициализации Telegram:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url,
        method: error.config?.method
      })
      
      // Более детальная обработка ошибок
      if (error.response?.status === 400) {
        const errorData = error.response?.data
        let errorMessage = 'Неверный запрос к Telegram API'
        
        if (errorData?.message) {
          errorMessage = errorData.message
        } else if (errorData?.error) {
          errorMessage = errorData.error
        } else if (errorData?.detail) {
          errorMessage = errorData.detail
        }
        
        throw new Error(`Ошибка 400: ${errorMessage}`)
      } else if (error.response?.status === 404) {
        throw new Error('Telegram аутентификация не поддерживается на сервере')
      } else if (error.response?.status === 405) {
        throw new Error('Неподдерживаемый метод HTTP. Возможно, API ожидает GET вместо POST')
      } else if (error.response?.status >= 500) {
        throw new Error('Ошибка сервера. Попробуйте позже.')
      }
      
      throw error
    }
  }

  static async checkTelegramStatus(sessionId: string): Promise<AuthResponse | null> {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.AUTH.TELEGRAM_STATUS}/${sessionId}`)
      return response.data
    } catch (error) {
      // Если статус еще не готов, возвращаем null
      return null
    }
  }

  // Token Management
  static async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH, {
      refresh_token: refreshToken
    })
    return response.data
  }

  static async logout(refreshToken: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, {
      refresh_token: refreshToken
    })
  }

  // User Profile
  static async getProfile(): Promise<User> {
    const response = await apiClient.get(API_ENDPOINTS.USER.PROFILE)
    return response.data
  }

  static async updateProfile(data: Partial<User>): Promise<User> {
    const response = await apiClient.put(API_ENDPOINTS.USER.PROFILE, data)
    return response.data
  }
} 