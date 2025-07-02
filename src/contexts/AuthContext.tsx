/**
 * @file: AuthContext.tsx
 * @description: React контекст для управления аутентификацией
 * @dependencies: React, auth types, authApi
 * @created: 2024-12-19
 */

import { createContext, useContext, useReducer, useEffect } from 'react'
import type { ReactNode } from 'react'
import { notifications } from '@mantine/notifications'
import { AuthApi } from '../services/authApi'
import type {
  AuthState,
  AuthContextType,
  AuthTokens,
  User,
  LoginRequest,
  RegisterRequest,
  SmsAuthRequest,
  SmsVerifyRequest,
  TelegramAuthResponse,
  SmsAuthResponse
} from '../types/auth'

// Типы действий для reducer
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: { user: User; tokens: AuthTokens } }
  | { type: 'LOGOUT' }

// Начальное состояние
const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true
}

// Reducer для управления состоянием
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isAuthenticated: true,
        isLoading: false
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false
      }
    default:
      return state
  }
}

// Создаем контекст
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Ключи для localStorage
const STORAGE_KEYS = {
  USER: 'pizzanat_user',
  TOKENS: 'pizzanat_tokens'
} as const

// Провайдер контекста
interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Сохранение данных в localStorage
  const saveToStorage = (user: User, tokens: AuthTokens) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    localStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(tokens))
  }

  // Удаление данных из localStorage
  const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEYS.USER)
    localStorage.removeItem(STORAGE_KEYS.TOKENS)
  }

  // Загрузка данных из localStorage при инициализации
  useEffect(() => {
    const loadStoredAuth = () => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER)
        const storedTokens = localStorage.getItem(STORAGE_KEYS.TOKENS)

        if (storedUser && storedTokens) {
          const user = JSON.parse(storedUser)
          const tokens = JSON.parse(storedTokens)
          
          // Проверяем срок действия токена (если есть expires_in)
          if (tokens.expires_in) {
            const now = Date.now()
            const tokenExpiry = tokens.expires_in * 1000 // переводим в миллисекунды
            
            if (now < tokenExpiry) {
              dispatch({ type: 'SET_USER', payload: { user, tokens } })
            } else {
              // Токен истек, очищаем данные
              clearStorage()
              dispatch({ type: 'SET_LOADING', payload: false })
            }
          } else {
            // Если нет информации о сроке действия, просто восстанавливаем сессию
            dispatch({ type: 'SET_USER', payload: { user, tokens } })
          }
        } else {
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      } catch (error) {
        console.error('Ошибка загрузки данных аутентификации:', error)
        clearStorage()
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    loadStoredAuth()
  }, [])

  // Email/Password аутентификация
  const login = async (request: LoginRequest) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await AuthApi.login(request)
      
      // Преобразуем ответ API в нужный формат
      const user: User = {
        userId: response.userId,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName
      }
      
      const tokens: AuthTokens = {
        access_token: response.token
      }
      
      saveToStorage(user, tokens)
      dispatch({ type: 'SET_USER', payload: { user, tokens } })
      
      notifications.show({
        title: 'Успешно!',
        message: 'Вы успешно вошли в систему',
        color: 'green'
      })
    } catch (error: any) {
      notifications.show({
        title: 'Ошибка входа',
        message: error.message || 'Неверное имя пользователя или пароль',
        color: 'red'
      })
      throw error
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const register = async (request: RegisterRequest) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await AuthApi.register(request)
      
      // Преобразуем ответ API в нужный формат
      const user: User = {
        userId: response.userId,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName
      }
      
      const tokens: AuthTokens = {
        access_token: response.token
      }
      
      saveToStorage(user, tokens)
      dispatch({ type: 'SET_USER', payload: { user, tokens } })
      
      notifications.show({
        title: 'Добро пожаловать!',
        message: 'Регистрация прошла успешно',
        color: 'green'
      })
    } catch (error: any) {
      notifications.show({
        title: 'Ошибка регистрации',
        message: error.message || 'Не удалось создать аккаунт',
        color: 'red'
      })
      throw error
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  // SMS аутентификация
  const sendSmsCode = async (request: SmsAuthRequest): Promise<SmsAuthResponse> => {
    try {
      const response = await AuthApi.sendSmsCode(request)
      notifications.show({
        title: 'SMS отправлено',
        message: `Код отправлен на ${response.maskedPhoneNumber}`,
        color: 'blue'
      })
      return response
    } catch (error: any) {
      notifications.show({
        title: 'Ошибка отправки SMS',
        message: error.message || 'Не удалось отправить SMS',
        color: 'red'
      })
      throw error
    }
  }

  const verifySmsCode = async (request: SmsVerifyRequest) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await AuthApi.verifySmsCode(request)
      
      // Преобразуем ответ API в нужный формат
      const user: User = {
        userId: response.userId,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName
      }
      
      const tokens: AuthTokens = {
        access_token: response.token
      }
      
      saveToStorage(user, tokens)
      dispatch({ type: 'SET_USER', payload: { user, tokens } })
      
      notifications.show({
        title: 'Успешно!',
        message: 'Вы успешно вошли в систему',
        color: 'green'
      })
    } catch (error: any) {
      notifications.show({
        title: 'Ошибка подтверждения',
        message: error.message || 'Неверный код подтверждения',
        color: 'red'
      })
      throw error
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  // Telegram аутентификация
  const initTelegramAuth = async (): Promise<TelegramAuthResponse> => {
    try {
      return await AuthApi.initTelegramAuth()
    } catch (error: any) {
      notifications.show({
        title: 'Ошибка Telegram',
        message: error.message || 'Не удалось инициализировать Telegram аутентификацию',
        color: 'red'
      })
      throw error
    }
  }

  const checkTelegramStatus = async (sessionId: string) => {
    try {
      const response = await AuthApi.checkTelegramStatus(sessionId)
      if (response) {
        // Преобразуем ответ API в нужный формат
        const user: User = {
          userId: response.userId,
          username: response.username,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName
        }
        
        const tokens: AuthTokens = {
          access_token: response.token
        }
        
        saveToStorage(user, tokens)
        dispatch({ type: 'SET_USER', payload: { user, tokens } })
        
        notifications.show({
          title: 'Успешно!',
          message: 'Вы успешно вошли через Telegram',
          color: 'green'
        })
      }
      return response
    } catch (error: any) {
      notifications.show({
        title: 'Ошибка Telegram',
        message: error.message || 'Ошибка проверки статуса Telegram',
        color: 'red'
      })
      throw error
    }
  }

  // Выход из системы
  const logout = async () => {
    try {
      if (state.tokens?.refresh_token) {
        await AuthApi.logout(state.tokens.refresh_token)
      }
    } catch (error) {
      console.error('Ошибка при выходе:', error)
    } finally {
      clearStorage()
      dispatch({ type: 'LOGOUT' })
      notifications.show({
        title: 'До свидания!',
        message: 'Вы успешно вышли из системы',
        color: 'blue'
      })
    }
  }

  // Обновление токена
  const refreshToken = async () => {
    try {
      const storedTokens = localStorage.getItem(STORAGE_KEYS.TOKENS)
      if (!storedTokens) return

      const tokens = JSON.parse(storedTokens)
      const response = await AuthApi.refreshToken(tokens.refresh_token)
      
      // Преобразуем ответ API в нужный формат
      const user: User = {
        userId: response.userId,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName
      }
      
      const newTokens: AuthTokens = {
        access_token: response.token
      }
      
      saveToStorage(user, newTokens)
      dispatch({ type: 'SET_USER', payload: { user, tokens: newTokens } })
    } catch (error) {
      console.error('Ошибка обновления токена:', error)
      clearStorage()
      dispatch({ type: 'LOGOUT' })
    }
  }

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    sendSmsCode,
    verifySmsCode,
    initTelegramAuth,
    checkTelegramStatus,
    logout,
    refreshToken
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// Хук для использования контекста
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext 