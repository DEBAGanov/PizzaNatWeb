/**
 * @file: useTelegramWebApp.ts
 * @description: Хук для работы с Telegram Web Apps API
 * @dependencies: @twa-dev/sdk
 * @created: 2025-01-24
 */

import { useEffect, useState, useCallback } from 'react'

// Типы для Telegram Web App (пока SDK не установлен)
interface TelegramWebApp {
  ready(): void
  expand(): void
  close(): void
  MainButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isActive: boolean
    setText(text: string): void
    show(): void
    hide(): void
    enable(): void
    disable(): void
    onClick(callback: () => void): void
    offClick(callback: () => void): void
  }
  SecondaryButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isActive: boolean
    setText(text: string): void
    show(): void
    hide(): void
    enable(): void
    disable(): void
    onClick(callback: () => void): void
    offClick(callback: () => void): void
  }
  HapticFeedback: {
    impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void
    notificationOccurred(type: 'error' | 'success' | 'warning'): void
    selectionChanged(): void
  }
  themeParams: {
    bg_color?: string
    text_color?: string
    hint_color?: string
    link_color?: string
    button_color?: string
    button_text_color?: string
    secondary_bg_color?: string
  }
  initData: string
  initDataUnsafe: {
    user?: {
      id: number
      first_name: string
      last_name?: string
      username?: string
      language_code?: string
      is_premium?: boolean
    }
    auth_date: number
    hash: string
  }
  colorScheme: 'light' | 'dark'
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

interface UseTelegramWebAppReturn {
  webApp: TelegramWebApp | null
  user: TelegramWebApp['initDataUnsafe']['user'] | null
  isInTelegram: boolean
  themeParams: TelegramWebApp['themeParams']
  colorScheme: 'light' | 'dark'
  isExpanded: boolean
  ready: () => void
  expand: () => void
  close: () => void
  showMainButton: (text: string, onClick: () => void) => void
  hideMainButton: () => void
  showSecondaryButton: (text: string, onClick: () => void) => void
  hideSecondaryButton: () => void
  hapticFeedback: {
    impact: (style?: 'light' | 'medium' | 'heavy') => void
    notification: (type: 'error' | 'success' | 'warning') => void
    selection: () => void
  }
}

export const useTelegramWebApp = (): UseTelegramWebAppReturn => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Проверяем наличие Telegram Web App
    const tg = window.Telegram?.WebApp
    
    if (tg) {
      setWebApp(tg)
      // Инициализируем приложение
      tg.ready()
      tg.expand()
      setIsReady(true)
      
      console.log('🔵 Telegram Web App инициализирован:', {
        user: tg.initDataUnsafe.user,
        colorScheme: tg.colorScheme,
        themeParams: tg.themeParams
      })
    } else {
      console.log('🌐 Обычный веб-браузер (не Telegram)')
    }
  }, [])

  const isInTelegram = Boolean(webApp)
  
  const user = webApp?.initDataUnsafe.user || null
  const themeParams = webApp?.themeParams || {}
  const colorScheme = webApp?.colorScheme || 'light'
  const isExpanded = webApp?.isExpanded || false

  // Методы управления приложением
  const ready = useCallback(() => {
    webApp?.ready()
  }, [webApp])

  const expand = useCallback(() => {
    webApp?.expand()
  }, [webApp])

  const close = useCallback(() => {
    webApp?.close()
  }, [webApp])

  // Управление MainButton
  const showMainButton = useCallback((text: string, onClick: () => void) => {
    if (webApp?.MainButton) {
      webApp.MainButton.setText(text)
      webApp.MainButton.show()
      webApp.MainButton.enable()
      webApp.MainButton.onClick(onClick)
    }
  }, [webApp])

  const hideMainButton = useCallback(() => {
    if (webApp?.MainButton) {
      webApp.MainButton.hide()
    }
  }, [webApp])

  // Управление SecondaryButton
  const showSecondaryButton = useCallback((text: string, onClick: () => void) => {
    if (webApp?.SecondaryButton) {
      webApp.SecondaryButton.setText(text)
      webApp.SecondaryButton.show()
      webApp.SecondaryButton.enable()
      webApp.SecondaryButton.onClick(onClick)
    }
  }, [webApp])

  const hideSecondaryButton = useCallback(() => {
    if (webApp?.SecondaryButton) {
      webApp.SecondaryButton.hide()
    }
  }, [webApp])

  // Haptic Feedback
  const hapticFeedback = {
    impact: (style: 'light' | 'medium' | 'heavy' = 'medium') => {
      webApp?.HapticFeedback.impactOccurred(style)
    },
    notification: (type: 'error' | 'success' | 'warning') => {
      webApp?.HapticFeedback.notificationOccurred(type)
    },
    selection: () => {
      webApp?.HapticFeedback.selectionChanged()
    }
  }

  return {
    webApp,
    user,
    isInTelegram,
    themeParams,
    colorScheme,
    isExpanded,
    ready,
    expand,
    close,
    showMainButton,
    hideMainButton,
    showSecondaryButton,
    hideSecondaryButton,
    hapticFeedback
  }
}

// Хук для определения платформы
export const usePlatform = () => {
  const { isInTelegram, user } = useTelegramWebApp()
  
  return {
    isTelegramWebApp: isInTelegram,
    isWeb: !isInTelegram,
    telegramUser: user,
    platform: isInTelegram ? 'telegram' : 'web' as const
  }
}