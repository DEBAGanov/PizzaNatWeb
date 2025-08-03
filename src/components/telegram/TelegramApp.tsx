/**
 * @file: TelegramApp.tsx
 * @description: Основной компонент приложения для Telegram Web App
 * @dependencies: React Router, Mantine, Telegram компоненты
 * @created: 2025-01-24
 */

import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Container, Stack, MantineProvider } from '@mantine/core'
import { useTelegram } from '../../contexts/TelegramContext'
import { useTelegramTheme } from '../../utils/telegramTheme'
import { TelegramHeader, TelegramSafeArea } from './TelegramNavigation'

// Импорт страниц
import { HomePage } from '../../pages/HomePage'
import { MenuPage } from '../../pages/MenuPage'
import { ProductPage } from '../../pages/ProductPage'
import { CartPage } from '../../pages/CartPage'
import { CheckoutPage } from '../../pages/CheckoutPage'
import { OrdersPage } from '../../pages/OrdersPage'
import { AuthPage } from '../../pages/AuthPage'
import PrivacyPolicyPage from '../../pages/PrivacyPolicyPage'

// Компонент-обертка для страниц в Telegram
const TelegramPageWrapper: React.FC<{
  children: React.ReactNode
  title?: string
  showBackButton?: boolean
}> = ({ children, title, showBackButton = false }) => {
  return (
    <TelegramSafeArea bottom>
      <Stack gap={0} style={{ minHeight: '100vh' }}>
        <TelegramHeader title={title} showBackButton={showBackButton} />
        <Container size="lg" style={{ flex: 1 }} p="md">
          {children}
        </Container>
      </Stack>
    </TelegramSafeArea>
  )
}

export const TelegramApp: React.FC = () => {
  const location = useLocation()
  const { themeParams, colorScheme, hapticFeedback, user } = useTelegram()
  
  // Создаем адаптированную тему для Telegram
  const telegramTheme = useTelegramTheme(themeParams, colorScheme, true)

  // Определяем заголовок и нужность кнопки "Назад"
  const getPageConfig = (pathname: string) => {
    switch (pathname) {
      case '/':
        return { title: 'ДИМБО Пицца', showBack: false }
      case '/menu':
        return { title: 'Меню', showBack: true }
      case '/cart':
        return { title: 'Корзина', showBack: true }
      case '/checkout':
        return { title: 'Оформление заказа', showBack: true }
      case '/orders':
        return { title: 'Мои заказы', showBack: true }
      case '/auth':
        return { title: 'Вход', showBack: true }
      case '/privacy':
        return { title: 'Политика конфиденциальности', showBack: true }
      default:
        if (pathname.startsWith('/product/')) {
          return { title: 'Товар', showBack: true }
        }
        if (pathname.startsWith('/orders/')) {
          return { title: 'Заказ', showBack: true }
        }
        return { title: 'ДИМБО Пицца', showBack: true }
    }
  }

  const pageConfig = getPageConfig(location.pathname)

  // Haptic feedback при навигации
  useEffect(() => {
    hapticFeedback.impact('light')
  }, [location.pathname])

  return (
    <MantineProvider theme={telegramTheme}>
      <div style={{ backgroundColor: telegramTheme.other?.telegramTheme?.bgColor }}>
        <Routes>
          <Route
            path="/"
            element={
              <TelegramPageWrapper
                title={pageConfig.title}
                showBackButton={pageConfig.showBack}
              >
                <HomePage />
              </TelegramPageWrapper>
            }
          />
          
          <Route
            path="/menu"
            element={
              <TelegramPageWrapper
                title={pageConfig.title}
                showBackButton={pageConfig.showBack}
              >
                <MenuPage />
              </TelegramPageWrapper>
            }
          />
          
          <Route
            path="/product/:id"
            element={
              <TelegramPageWrapper
                title={pageConfig.title}
                showBackButton={pageConfig.showBack}
              >
                <ProductPage />
              </TelegramPageWrapper>
            }
          />
          
          <Route
            path="/cart"
            element={
              <TelegramPageWrapper
                title={pageConfig.title}
                showBackButton={pageConfig.showBack}
              >
                <CartPage />
              </TelegramPageWrapper>
            }
          />
          
          <Route
            path="/checkout"
            element={
              <TelegramPageWrapper
                title={pageConfig.title}
                showBackButton={pageConfig.showBack}
              >
                <CheckoutPage />
              </TelegramPageWrapper>
            }
          />
          
          <Route
            path="/orders"
            element={
              <TelegramPageWrapper
                title={pageConfig.title}
                showBackButton={pageConfig.showBack}
              >
                <OrdersPage />
              </TelegramPageWrapper>
            }
          />
          
          <Route
            path="/orders/:id"
            element={
              <TelegramPageWrapper
                title={pageConfig.title}
                showBackButton={pageConfig.showBack}
              >
                <div>Order Details - TODO</div>
              </TelegramPageWrapper>
            }
          />
          
          <Route
            path="/auth"
            element={
              <TelegramPageWrapper
                title={pageConfig.title}
                showBackButton={pageConfig.showBack}
              >
                <AuthPage />
              </TelegramPageWrapper>
            }
          />
          
          <Route
            path="/privacy"
            element={
              <TelegramPageWrapper
                title={pageConfig.title}
                showBackButton={pageConfig.showBack}
              >
                <PrivacyPolicyPage />
              </TelegramPageWrapper>
            }
          />
        </Routes>
      </div>
    </MantineProvider>
  )
}

// Хук для Telegram-специфичной логики на страницах
export const useTelegramPage = (config: string | { title?: string; backButton?: boolean; backButtonText?: string }) => {
  const { hapticFeedback, showMainButton, hideMainButton, isInTelegram } = useTelegram()
  
  // Поддерживаем старый формат (строка) для совместимости
  const pageName = typeof config === 'string' ? config : (config.title || 'Unknown')
  
  useEffect(() => {
    // Логика только для Telegram
    if (isInTelegram) {
      // Аналитика для Telegram
      console.log(`📱 Telegram Web App: открыта страница ${pageName}`)
      
      // Скрываем main button по умолчанию при входе на страницу
      hideMainButton()
      
      return () => {
        hideMainButton()
      }
    }
  }, [pageName, isInTelegram]) // eslint-disable-line react-hooks/exhaustive-deps
  
  return {
    hapticFeedback,
    showMainButton,
    hideMainButton
  }
}