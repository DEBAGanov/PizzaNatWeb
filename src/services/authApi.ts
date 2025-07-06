/**
 * @file: authApi.ts
 * @description: API сервис для аутентификации с полной интеграцией PizzaNat API
 * @dependencies: api.ts, auth types
 * @created: 2025-01-07
 * @updated: 2025-01-20
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
  TelegramInitRequest,
  TelegramStatusResponse,
  User
} from '../types/auth'

export class AuthApi {
  // Email/Password Authentication
  static async login(request: LoginRequest): Promise<AuthResponse> {
    console.log('🔐 Попытка входа:', { username: request.username })
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, request)
    console.log('✅ Успешный вход:', response.data)
    return response.data
  }

  static async register(request: RegisterRequest): Promise<AuthResponse> {
    console.log('📝 Попытка регистрации:', {
      username: request.username,
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      phone: request.phone
    })
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, request)
    console.log('✅ Успешная регистрация:', response.data)
    return response.data
  }

  // SMS Authentication
  static async sendSmsCode(request: SmsAuthRequest): Promise<SmsAuthResponse> {
    console.log('📱 Отправка SMS кода:', { phoneNumber: request.phoneNumber })
    const response = await apiClient.post(API_ENDPOINTS.AUTH.SMS_SEND, request)
    console.log('✅ SMS код отправлен:', response.data)
    return response.data
  }

  static async verifySmsCode(request: SmsVerifyRequest): Promise<AuthResponse> {
    console.log('🔢 Проверка SMS кода:', {
      phoneNumber: request.phoneNumber,
      requestId: request.requestId
    })
    const response = await apiClient.post(API_ENDPOINTS.AUTH.SMS_VERIFY, request)
    console.log('✅ SMS код подтвержден:', response.data)
    return response.data
  }

  // Telegram Authentication
  static async initTelegramAuth(phoneNumber?: string): Promise<TelegramAuthResponse> {
    try {
      console.log('🔵 Инициализация Telegram аутентификации...')
      console.log('🔧 API Base URL:', import.meta.env.DEV ? '/api/v1' : 'https://api.pizzanat.ru/api/v1')
      console.log('🔧 Full URL:', `${import.meta.env.DEV ? '/api/v1' : 'https://api.pizzanat.ru/api/v1'}${API_ENDPOINTS.AUTH.TELEGRAM_INIT}`)

      // Генерируем уникальный deviceId согласно тестовому сценарию
      const deviceId = `web_telegram_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // Согласно тестовому сценарию, отправляем deviceId (обязательно) и phoneNumber (опционально)
      const requestData: TelegramInitRequest = {
        deviceId,
        ...(phoneNumber && { phoneNumber })
      }
      console.log('🔧 Данные запроса:', requestData)

      const response = await apiClient.post(API_ENDPOINTS.AUTH.TELEGRAM_INIT, requestData)

      console.log('✅ Telegram инициализация - полный ответ:', response)
      console.log('✅ Telegram инициализация - данные:', response.data)
      console.log('✅ Telegram инициализация - статус:', response.status)
      console.log('✅ Telegram инициализация - заголовки:', response.headers)

      // Проверяем структуру ответа
      if (!response.data) {
        throw new Error('API вернул пустой ответ')
      }

      const data = response.data
      console.log('🔍 Проверка полей ответа:', {
        hasAuthToken: !!data.authToken,
        hasTelegramBotUrl: !!data.telegramBotUrl,
        hasExpiresAt: !!data.expiresAt,
        allFields: Object.keys(data)
      })

      // Проверяем обязательные поля
      if (!data.authToken) {
        throw new Error(`Отсутствует authToken в ответе API. Получены поля: ${Object.keys(data).join(', ')}`)
      }

      if (!data.telegramBotUrl) {
        throw new Error(`Отсутствует telegramBotUrl в ответе API. Получены поля: ${Object.keys(data).join(', ')}`)
      }

      return response.data
    } catch (error: any) {
      console.error('❌ Ошибка инициализации Telegram:', {
        ...(error.response?.status && { status: error.response.status }),
        ...(error.response?.statusText && { statusText: error.response.statusText }),
        ...(error.response?.data && { data: error.response.data }),
        ...(error.message && { message: error.message }),
        ...(error.config?.url && { url: error.config.url }),
        ...(error.config?.method && { method: error.config.method }),
        ...(error.code && { code: error.code })
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
      } else if (error.response?.status === 429) {
        const errorData = error.response?.data
        let errorMessage = 'Слишком много попыток. Попробуйте позже'

        if (errorData?.message) {
          errorMessage = errorData.message
        }

        // Создаем специальный объект ошибки для 429
        const rateLimitError = {
          code: 'ERR_BAD_REQUEST',
          message: errorMessage,
          details: errorData
        }

        throw rateLimitError
      } else if (error.response?.status >= 500) {
        throw new Error('Ошибка сервера. Попробуйте позже.')
      } else if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
        throw new Error('Ошибка сети. Проверьте подключение к интернету.')
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Превышено время ожидания ответа от сервера.')
      }

      throw error
    }
  }

  static async checkTelegramStatus(authToken: string): Promise<TelegramStatusResponse | null> {
    try {
      console.log('🔄 Проверка статуса Telegram:', { authToken })
      const response = await apiClient.get(`${API_ENDPOINTS.AUTH.TELEGRAM_STATUS}/${authToken}`)

      console.log('📋 Полный ответ статуса Telegram:', response)
      console.log('📋 Данные ответа:', response.data)
      console.log('📋 Статус:', response.data?.status)
      
      // Детальное логирование всех полей ответа
      if (response.data) {
        console.log('🔍 Все поля ответа:', Object.keys(response.data))
        console.log('🔍 Детальный анализ полей:', {
          status: response.data.status,
          token: response.data.token,
          accessToken: response.data.accessToken,
          access_token: response.data.access_token,
          authToken: response.data.authToken,
          jwt: response.data.jwt,
          user: response.data.user,
          userData: response.data.userData,
          userInfo: response.data.userInfo,
          authData: response.data.authData
        })
        
        // Дополнительное логирование authData
        if (response.data.authData) {
          console.log('🔍 Содержимое authData:', response.data.authData)
          console.log('🔍 Поля в authData:', Object.keys(response.data.authData))
          console.log('🔍 Анализ токенов в authData:', {
            token: response.data.authData.token,
            accessToken: response.data.authData.accessToken,
            access_token: response.data.authData.access_token,
            authToken: response.data.authData.authToken,
            jwt: response.data.authData.jwt,
            user: response.data.authData.user
          })
        }
      }

      // Поддерживаем оба статуса: COMPLETED и CONFIRMED
      if (response.data && (response.data.status === 'COMPLETED' || response.data.status === 'CONFIRMED')) {
        console.log('✅ Telegram аутентификация завершена:', response.data)
        return response.data
      }

      console.log('⏳ Telegram аутентификация в процессе:', response.data?.status)
      return null
    } catch (error: any) {
      console.log('⏳ Telegram статус не готов:', error.response?.status)
      console.log('⏳ Детали ошибки:', error.response?.data)
      // Если статус еще не готов, возвращаем null
      return null
    }
  }

  // Token Management (если нужно)
  static async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH, {
      refresh_token: refreshToken
    })
    return response.data
  }

  static async logout(refreshToken?: string): Promise<void> {
    if (refreshToken) {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, {
        refresh_token: refreshToken
      })
    }
  }

  // User Profile
  static async getProfile(): Promise<User> {
    console.log('👤 Получение профиля пользователя...')
    const response = await apiClient.get(API_ENDPOINTS.USER.PROFILE)
    console.log('✅ Профиль получен:', response.data)
    return response.data
  }

  static async updateProfile(data: Partial<User>): Promise<User> {
    console.log('📝 Обновление профиля:', data)
    const response = await apiClient.put(API_ENDPOINTS.USER.PROFILE, data)
    console.log('✅ Профиль обновлен:', response.data)
    return response.data
  }
} 