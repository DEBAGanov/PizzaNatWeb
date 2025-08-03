/**
 * @file: TelegramContext.tsx
 * @description: React контекст для управления Telegram Web App состоянием
 * @dependencies: React, useTelegramWebApp
 * @created: 2025-01-24
 */

import React, { createContext, useContext, useEffect, ReactNode } from 'react'
import { useTelegramWebApp } from '../hooks/useTelegramWebApp'

interface TelegramContextType {
  isInTelegram: boolean
  user: any | null
  themeParams: any
  colorScheme: 'light' | 'dark'
  showMainButton: (text: string, onClick: () => void) => void
  hideMainButton: () => void
  showSecondaryButton: (text: string, onClick: () => void) => void
  hideSecondaryButton: () => void
  hapticFeedback: {
    impact: (style?: 'light' | 'medium' | 'heavy') => void
    notification: (type: 'error' | 'success' | 'warning') => void
    selection: () => void
  }
  close: () => void
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined)

interface TelegramProviderProps {
  children: ReactNode
}

export const TelegramProvider: React.FC<TelegramProviderProps> = ({ children }) => {
  const {
    isInTelegram,
    user,
    themeParams,
    colorScheme,
    showMainButton,
    hideMainButton,
    showSecondaryButton,
    hideSecondaryButton,
    hapticFeedback,
    close,
    ready,
    expand
  } = useTelegramWebApp()

  useEffect(() => {
    if (isInTelegram) {
      // Инициализация Telegram Web App
      ready()
      expand()
      
      // Скрываем кнопки по умолчанию
      hideMainButton()
      hideSecondaryButton()
      
      console.log('🚀 Telegram Web App готов к работе')
    }
  }, [isInTelegram, ready, expand, hideMainButton, hideSecondaryButton])

  const contextValue: TelegramContextType = {
    isInTelegram,
    user,
    themeParams,
    colorScheme,
    showMainButton,
    hideMainButton,
    showSecondaryButton,
    hideSecondaryButton,
    hapticFeedback,
    close
  }

  return (
    <TelegramContext.Provider value={contextValue}>
      {children}
    </TelegramContext.Provider>
  )
}

export const useTelegram = (): TelegramContextType => {
  const context = useContext(TelegramContext)
  if (context === undefined) {
    throw new Error('useTelegram must be used within a TelegramProvider')
  }
  return context
}

// Хук для проверки платформы (упрощенный)
export const useIsTelegram = (): boolean => {
  const context = useContext(TelegramContext)
  return context?.isInTelegram || false
}