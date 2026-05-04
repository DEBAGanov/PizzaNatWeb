/**
 * @file: api.ts
 * @description: Базовый API сервис для работы с backend PizzaNat
 * @dependencies: axios, типы API
 * @created: 2025-01-07
 */

import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { ApiError } from '../types/api'
import { getApiBaseUrl, API_CONFIG, logApiRequest, logApiResponse } from '../config/api'
import { isPublicPage, isAuthPage, isSEOPage } from '../utils/pageUtils'

// Создаем экземпляр axios
const apiClient: AxiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.DEFAULT_HEADERS,
  withCredentials: false, // PizzaNat API не использует cookies
})

// Функция для получения токена из localStorage
export const getAuthToken = (): string | null => {
  try {
    const tokens = localStorage.getItem('pizzanat_tokens')
    if (tokens) {
      const parsedTokens = JSON.parse(tokens)
      return parsedTokens.access_token || null
    }
    return null
  } catch (error) {
    console.error('❌ Ошибка получения токена:', error)
    return null
  }
}

// Интерсептор для добавления токена
apiClient.interceptors.request.use(
  (config) => {
    // Логируем запрос в development
    logApiRequest(config.method?.toUpperCase() || 'GET', config.url || '', config.data)

    // Добавляем токен в заголовок Authorization
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Интерсептор для обработки ответов
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Логируем успешный ответ в development
    logApiResponse(
      response.config.method?.toUpperCase() || 'GET',
      response.config.url || '',
      response.data
    )
    return response
  },
  (error) => {
    // Логируем ошибку в development
    logApiResponse(
      error.config?.method?.toUpperCase() || 'GET',
      error.config?.url || '',
      null,
      error
    )

    // Получаем статус ошибки
    const status = error.response?.status
    const url = error.config?.url || ''

    // Обработка ошибок авторизации (401 - неавторизован, 403 - нет доступа)
    if (status === 401 || status === 403) {
      console.warn(`🔒 Ошибка авторизации ${status} для ${url}`)
      
      // Очищаем токены при 401/403
      localStorage.removeItem('pizzanat_tokens')
      localStorage.removeItem('pizzanat_user')
      
      // НЕ ПЕРЕНАПРАВЛЯЕМ на авторизацию с публичных и SEO страниц
      const isPublic = isPublicPage()
      const isAuth = isAuthPage()
      const isSEO = isSEOPage()
      
      if (!isPublic && !isAuth && !isSEO) {
        console.log('🔄 Перенаправление в MAX бот')
        window.location.href = 'https://max.ru/id121603899498_bot'
      } else if (isPublic || isSEO) {
        console.log('🏠 Остаемся на публичной/SEO странице, ошибка авторизации игнорируется')
      }
    }

    // Проверяем защищенные endpoints которые должны требовать авторизацию
    const protectedEndpoints = ['/cart', '/orders', '/admin', '/payments']
    const isProtectedEndpoint = protectedEndpoints.some(endpoint => url.includes(endpoint))
    
    if (isProtectedEndpoint && status === 200) {
      console.warn(`⚠️ Защищенный endpoint ${url} вернул 200 без авторизации - это проблема безопасности!`)
    }

    // Стандартизация ошибок для ДИМБО Пицца API
    const apiError: ApiError = {
      code: error.response?.data?.error || error.code || 'UNKNOWN_ERROR',
      message: error.response?.data?.message || error.message || 'Произошла ошибка',
      details: {
        ...error.response?.data,
        status,
        url,
        isProtectedEndpoint
      }
    }

    return Promise.reject(apiError)
  }
)

// Базовый класс для API сервисов
export class BaseApiService {
  protected client = apiClient

  protected async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response = await this.client.get<T>(url, { params })
    return response.data
  }

  protected async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.post<T>(url, data)
    return response.data
  }

  protected async put<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.put<T>(url, data)
    return response.data
  }

  protected async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url)
    return response.data
  }
}

// Экспорт клиента для прямого использования
export { apiClient }
export default apiClient