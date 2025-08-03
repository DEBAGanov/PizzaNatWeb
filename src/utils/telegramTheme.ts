/**
 * @file: telegramTheme.ts
 * @description: Утилиты для адаптации Mantine темы под Telegram Web App
 * @dependencies: Mantine, Telegram Web App
 * @created: 2025-01-24
 */

import { MantineTheme, MantineColorScheme, createTheme } from '@mantine/core'

// Типы для Telegram тем
interface TelegramThemeParams {
  bg_color?: string
  text_color?: string
  hint_color?: string
  link_color?: string
  button_color?: string
  button_text_color?: string
  secondary_bg_color?: string
  header_bg_color?: string
  accent_text_color?: string
  section_bg_color?: string
  section_header_text_color?: string
  subtitle_text_color?: string
  destructive_text_color?: string
}

// Конвертация HEX цветов Telegram в Mantine формат
const hexToMantineColor = (hex: string): string => {
  return hex.startsWith('#') ? hex : `#${hex}`
}

// Создание Mantine темы на основе Telegram параметров
export const createTelegramTheme = (
  themeParams: TelegramThemeParams,
  colorScheme: MantineColorScheme
): MantineTheme => {
  const isLight = colorScheme === 'light'
  
  // Базовые цвета для ДИМБО Пицца
  const brandColors = {
    orange: [
      '#fff8e1',
      '#ffecb3',
      '#ffe082',
      '#ffd54f',
      '#ffca28',
      '#ffc107', // основной бренд
      '#ffb300',
      '#ffa000',
      '#ff8f00',
      '#ff6f00'
    ]
  }

  // Адаптируем цвета под Telegram тему
  const adaptedColors = {
    // Фон приложения
    body: themeParams.bg_color ? hexToMantineColor(themeParams.bg_color) : undefined,
    
    // Основной текст
    text: themeParams.text_color ? hexToMantineColor(themeParams.text_color) : undefined,
    
    // Вторичный текст
    dimmed: themeParams.hint_color ? hexToMantineColor(themeParams.hint_color) : undefined,
    
    // Ссылки
    anchor: themeParams.link_color ? hexToMantineColor(themeParams.link_color) : undefined,
    
    // Основные кнопки
    primaryColor: themeParams.button_color ? hexToMantineColor(themeParams.button_color) : '#ffc107',
    
    // Вторичный фон (карточки)
    cardBg: themeParams.secondary_bg_color ? hexToMantineColor(themeParams.secondary_bg_color) : undefined,
    
    // Заголовки секций
    sectionHeader: themeParams.section_header_text_color ? hexToMantineColor(themeParams.section_header_text_color) : undefined,
    
    // Деструктивные действия
    error: themeParams.destructive_text_color ? hexToMantineColor(themeParams.destructive_text_color) : undefined
  }

  return createTheme({
    colorScheme,
    colors: {
      ...brandColors,
      // Переопределяем системные цвета для Telegram
      dark: isLight ? undefined : [
        adaptedColors.cardBg || '#1a1a1a',
        adaptedColors.cardBg || '#1f1f1f',
        adaptedColors.cardBg || '#242424',
        adaptedColors.body || '#2a2a2a',
        adaptedColors.body || '#2f2f2f',
        adaptedColors.body || '#333333',
        adaptedColors.text || '#ffffff',
        adaptedColors.text || '#ffffff',
        adaptedColors.text || '#ffffff',
        adaptedColors.text || '#ffffff'
      ]
    },
    primaryColor: 'orange',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    
    // Адаптация компонентов под Telegram
    components: {
      Button: {
        styles: {
          root: {
            backgroundColor: adaptedColors.primaryColor,
            color: themeParams.button_text_color ? hexToMantineColor(themeParams.button_text_color) : undefined,
            borderRadius: '12px', // Telegram стиль
            fontWeight: 500
          }
        }
      },
      
      Card: {
        styles: {
          root: {
            backgroundColor: adaptedColors.cardBg,
            borderRadius: '12px',
            border: isLight ? '1px solid #e9ecef' : '1px solid #343a40'
          }
        }
      },
      
      AppShell: {
        styles: {
          main: {
            backgroundColor: adaptedColors.body,
            color: adaptedColors.text
          },
          header: {
            backgroundColor: themeParams.header_bg_color ? hexToMantineColor(themeParams.header_bg_color) : adaptedColors.cardBg,
            borderBottom: isLight ? '1px solid #e9ecef' : '1px solid #343a40'
          }
        }
      },
      
      Paper: {
        styles: {
          root: {
            backgroundColor: adaptedColors.cardBg,
            borderRadius: '12px'
          }
        }
      },
      
      Text: {
        styles: {
          root: {
            color: adaptedColors.text
          }
        }
      },
      
      Title: {
        styles: {
          root: {
            color: adaptedColors.text
          }
        }
      }
    },
    
    // Кастомные CSS переменные для Telegram
    other: {
      telegramTheme: {
        bgColor: adaptedColors.body,
        textColor: adaptedColors.text,
        hintColor: adaptedColors.dimmed,
        linkColor: adaptedColors.anchor,
        buttonColor: adaptedColors.primaryColor,
        buttonTextColor: themeParams.button_text_color,
        secondaryBgColor: adaptedColors.cardBg,
        isInTelegram: true
      }
    }
  })
}

// Базовая тема для обычного веба (когда не в Telegram)
export const createWebTheme = (): MantineTheme => {
  return createTheme({
    colorScheme: 'light',
    colors: {
      orange: [
        '#fff8e1',
        '#ffecb3',
        '#ffe082',
        '#ffd54f',
        '#ffca28',
        '#ffc107',
        '#ffb300',
        '#ffa000',
        '#ff8f00',
        '#ff6f00'
      ]
    },
    primaryColor: 'orange',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    
    components: {
      Button: {
        styles: {
          root: {
            borderRadius: '8px',
            fontWeight: 500
          }
        }
      },
      
      Card: {
        styles: {
          root: {
            borderRadius: '8px'
          }
        }
      }
    },
    
    other: {
      telegramTheme: {
        isInTelegram: false
      }
    }
  })
}

// Хук для получения текущей темы в зависимости от платформы
export const useTelegramTheme = (
  themeParams: TelegramThemeParams = {},
  colorScheme: MantineColorScheme = 'light',
  isInTelegram: boolean = false
): MantineTheme => {
  if (isInTelegram) {
    return createTelegramTheme(themeParams, colorScheme)
  }
  
  return createWebTheme()
}

// Утилиты для работы с цветами Telegram
export const telegramColors = {
  // Получить цвет с учетом темы Telegram
  getColor: (themeParams: TelegramThemeParams, colorKey: keyof TelegramThemeParams, fallback: string): string => {
    const color = themeParams[colorKey]
    return color ? hexToMantineColor(color) : fallback
  },
  
  // Проверить, является ли тема темной
  isDark: (colorScheme: MantineColorScheme): boolean => {
    return colorScheme === 'dark'
  },
  
  // Получить контрастный цвет текста
  getContrastText: (backgroundColor: string): string => {
    // Простая проверка яркости цвета
    const hex = backgroundColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    
    return brightness > 128 ? '#000000' : '#ffffff'
  }
}

// CSS-in-JS стили для Telegram адаптации
export const telegramStyles = {
  // Убираем скроллбар для Telegram (нативный скроллинг)
  hideScrollbar: {
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none'
  },
  
  // Безопасные отступы для Telegram
  safeArea: {
    paddingTop: 'env(safe-area-inset-top)',
    paddingBottom: 'env(safe-area-inset-bottom)',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)'
  },
  
  // Стили для полноэкранного режима Telegram
  fullHeight: {
    height: '100vh',
    minHeight: '100vh',
    maxHeight: '100vh'
  }
}