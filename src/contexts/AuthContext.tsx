/**
 * @file: AuthContext.tsx
 * @description: Контекст аутентификации с интеграцией PizzaNat API
 * @dependencies: AuthApi, типы аутентификации
 * @created: 2025-01-07
 * @updated: 2025-01-20
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { notifications } from '@mantine/notifications'
import { AuthApi } from '../services/authApi'
import type {
  User,
  AuthTokens,
  AuthState,
  AuthAction,
  LoginRequest,
  RegisterRequest,
  SmsAuthRequest,
  SmsVerifyRequest,
  SmsAuthResponse,
  TelegramAuthResponse,
  TelegramStatusResponse
} from '../types/auth'

// Интерфейс контекста
interface AuthContextType extends AuthState {
  login: (request: LoginRequest) => Promise<void>
  register: (request: RegisterRequest) => Promise<void>
  sendSmsCode: (request: SmsAuthRequest) => Promise<SmsAuthResponse>
  verifySmsCode: (request: SmsVerifyRequest) => Promise<void>
  initTelegramAuth: (phoneNumber?: string) => Promise<TelegramAuthResponse>
  checkTelegramStatus: (authToken: string) => Promise<TelegramStatusResponse | null>
  logout: () => Promise<void>
  refreshToken: () => Promise<void>
}

// Создание контекста
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Редьюсер для управления состоянием
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload, error: null }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isLoading: false,
        error: null
      }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    case 'LOGOUT':
      return { user: null, tokens: null, isLoading: false, error: null }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}

// Начальное состояние
const initialState: AuthState = {
  user: null,
  tokens: null,
  isLoading: true,
  error: null
}

// Утилиты для работы с localStorage
const STORAGE_KEYS = {
  USER: 'pizzanat_user',
  TOKENS: 'pizzanat_tokens'
}

const saveToStorage = (user: User, tokens: AuthTokens) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    localStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(tokens))
  } catch (error) {
    console.error('Ошибка сохранения в localStorage:', error)
  }
}

const clearStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.USER)
  localStorage.removeItem(STORAGE_KEYS.TOKENS)
}

const loadFromStorage = (): { user: User; tokens: AuthTokens } | null => {
  try {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER)
    const tokensStr = localStorage.getItem(STORAGE_KEYS.TOKENS)

    if (userStr && tokensStr) {
      const user = JSON.parse(userStr)
      const tokens = JSON.parse(tokensStr)
      return { user, tokens }
    }
  } catch (error) {
    console.error('Ошибка загрузки из localStorage:', error)
    clearStorage()
  }

  return null
}

// Провайдер контекста
interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Загрузка сохраненных данных при инициализации
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const stored = loadFromStorage()
        if (stored) {
          // Проверяем валидность токена через получение профиля
          try {
            const profile = await AuthApi.getProfile()
            // Обновляем пользователя из профиля
            const updatedUser: User = {
              id: profile.id,
              username: profile.username,
              fullName: profile.fullName,
              phoneNumber: profile.phoneNumber,
              telegramId: profile.telegramId,
              role: profile.role,
              createdAt: profile.createdAt
            }

            dispatch({ type: 'SET_USER', payload: { user: updatedUser, tokens: stored.tokens } })
            console.log('✅ Автоматический вход выполнен')
          } catch (error) {
            console.log('❌ Токен недействителен, требуется повторная авторизация')
            clearStorage()
            dispatch({ type: 'SET_LOADING', payload: false })
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

      console.log('🔍 Полный ответ логина:', response)

      // Проверяем структуру ответа
      if (!response.user || !response.token) {
        console.error('❌ Неполная структура ответа при логине:', response)
        throw new Error('Неполные данные от сервера')
      }

      // Преобразуем ответ API в нужный формат
      const user: User = {
        id: response.user!.id,
        username: response.user!.username,
        fullName: response.user!.fullName,
        phoneNumber: response.user!.phoneNumber,
        telegramId: response.user!.telegramId,
        role: response.user!.role
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
      console.error('❌ Ошибка логина:', error)
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Ошибка входа' })
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

      console.log('🔍 Полный ответ регистрации:', response)

      // Проверяем структуру ответа
      if (!response.user || !response.token) {
        console.error('❌ Неполная структура ответа при регистрации:', response)
        throw new Error('Неполные данные от сервера')
      }

      // Преобразуем ответ API в нужный формат
      const user: User = {
        id: response.user!.id,
        username: response.user!.username,
        fullName: response.user!.fullName,
        phoneNumber: response.user!.phoneNumber,
        telegramId: response.user!.telegramId,
        role: response.user!.role
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
      console.error('❌ Ошибка регистрации:', error)
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Ошибка регистрации' })
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
        message: `Код отправлен на ${response.maskedPhoneNumber || request.phoneNumber}`,
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

      console.log('🔍 Полный ответ SMS верификации:', response)

      // Проверяем структуру ответа и адаптируем под разные варианты
      let user: User
      let tokens: AuthTokens

      if (response.user && response.token) {
        // Стандартный формат AuthResponse
        user = {
          id: response.user!.id,
          username: response.user!.username,
          fullName: response.user!.fullName,
          phoneNumber: response.user!.phoneNumber,
          telegramId: response.user!.telegramId,
          role: response.user!.role
        }
        tokens = {
          access_token: response.token
        }
      } else if (response.token && !response.user) {
        // Если есть только токен, создаем пользователя из номера телефона
        user = {
          id: Date.now(), // временный ID
          username: request.phoneNumber,
          phoneNumber: request.phoneNumber,
          role: 'USER'
        }
        tokens = {
          access_token: response.token
        }
        console.log('⚠️ Создан временный пользователь из номера телефона')
      } else {
        // Если структура неожиданная, логируем и выбрасываем ошибку
        console.error('❌ Неожиданная структура ответа API:', response)
        throw new Error('Неожиданная структура ответа от сервера')
      }

      saveToStorage(user, tokens)
      dispatch({ type: 'SET_USER', payload: { user, tokens } })

      notifications.show({
        title: 'Успешно!',
        message: 'Вы успешно вошли в систему',
        color: 'green'
      })
    } catch (error: any) {
      console.error('❌ Ошибка SMS верификации:', error)
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Ошибка подтверждения' })
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
  const initTelegramAuth = async (phoneNumber?: string): Promise<TelegramAuthResponse> => {
    try {
      return await AuthApi.initTelegramAuth(phoneNumber)
    } catch (error: any) {
      notifications.show({
        title: 'Ошибка Telegram',
        message: error.message || 'Не удалось инициализировать Telegram аутентификацию',
        color: 'red'
      })
      throw error
    }
  }

  const checkTelegramStatus = async (authToken: string) => {
    try {
      const response = await AuthApi.checkTelegramStatus(authToken)
      console.log('🔍 Ответ checkTelegramStatus в AuthContext:', response)

      // Поддерживаем оба статуса: COMPLETED и CONFIRMED
      if (response && (response.status === 'COMPLETED' || response.status === 'CONFIRMED')) {
        console.log('🎉 Telegram авторизация успешна! Обрабатываем ответ...')

        // Извлекаем токен и данные пользователя из разных возможных мест
        let token = response.token || response.authData?.token
        let userData = response.user || response.authData?.user

        console.log('🔍 Извлеченные данные:', { token: !!token, userData: !!userData })
        console.log('🔍 Полная структура authData:', response.authData)

        // Проверяем наличие токена
        if (!token) {
          console.error('❌ Отсутствует токен в ответе Telegram API:', response)
          console.error('❌ Проверяемые поля:', {
            'response.token': response.token,
            'response.authData?.token': response.authData?.token,
            'response.authData': response.authData
          })
          throw new Error('Сервер не вернул токен авторизации')
        }

        // Если есть пользователь в ответе, используем его
        if (userData) {
          const user: User = {
            id: userData.id,
            username: userData.phoneNumber || `user_${userData.id}`,
            fullName: undefined,
            phoneNumber: userData.phoneNumber,
            telegramId: userData.telegramId,
            role: userData.role
          }

          const tokens: AuthTokens = {
            access_token: token
          }

          console.log('👤 Создан пользователь из Telegram ответа:', user)
          console.log('🔑 Токены:', tokens)

          saveToStorage(user, tokens)
          dispatch({ type: 'SET_USER', payload: { user, tokens } })

          notifications.show({
            title: 'Успешно!',
            message: 'Вы успешно вошли через Telegram',
            color: 'green'
          })
        } else {
          // Если нет данных пользователя, пытаемся получить профиль по токену
          console.log('⚠️ Нет данных пользователя в ответе, получаем профиль...')

          try {
            // Временно сохраняем токен для запроса профиля
            const tempTokens: AuthTokens = {
              access_token: token
            }

            // Устанавливаем токен в localStorage для API запроса
            localStorage.setItem('pizzanat_tokens', JSON.stringify(tempTokens))

            // Получаем профиль пользователя
            const profile = await AuthApi.getProfile()

            const user: User = {
              id: profile.id,
              username: profile.username,
              fullName: profile.fullName,
              phoneNumber: profile.phoneNumber,
              telegramId: profile.telegramId,
              role: profile.role,
              createdAt: profile.createdAt
            }

            console.log('👤 Создан пользователь из профиля:', user)

            saveToStorage(user, tempTokens)
            dispatch({ type: 'SET_USER', payload: { user, tokens: tempTokens } })

            notifications.show({
              title: 'Успешно!',
              message: 'Вы успешно вошли через Telegram',
              color: 'green'
            })
          } catch (profileError) {
            console.error('❌ Ошибка получения профиля:', profileError)
            throw new Error('Не удалось получить данные пользователя')
          }
        }
      }
      return response
    } catch (error: any) {
      console.error('❌ Ошибка в checkTelegramStatus:', error)
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
      if (!state.tokens?.refresh_token) {
        throw new Error('Нет refresh токена')
      }

      const response = await AuthApi.refreshToken(state.tokens.refresh_token)

      const tokens: AuthTokens = {
        access_token: response.token,
        refresh_token: state.tokens.refresh_token
      }

      const user: User = {
        id: response.user!.id,
        username: response.user!.username,
        fullName: response.user!.fullName,
        phoneNumber: response.user!.phoneNumber,
        telegramId: response.user!.telegramId,
        role: response.user!.role
      }

      saveToStorage(user, tokens)
      dispatch({ type: 'SET_USER', payload: { user, tokens } })
    } catch (error) {
      console.error('Ошибка обновления токена:', error)
      await logout()
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
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider')
  }
  return context
}

export default AuthContext