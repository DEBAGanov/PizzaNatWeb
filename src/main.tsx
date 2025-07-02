/**
 * @file: main.tsx
 * @description: Точка входа приложения с настройкой Mantine
 * @dependencies: React, Mantine, App
 * @created: 2025-01-07
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { AuthProvider } from './contexts/AuthContext'
import { ProductsProvider } from './contexts/ProductsContext'
import App from './App.tsx'

// Импорт стилей Mantine
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
// В Mantine 8.x стили модалов включены в основные стили

// Создаем клиент для React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// Тема для мобильного приложения PizzaNat
const theme = {
  primaryColor: 'orange',
  colors: {
    orange: [
      '#fff4e6',
      '#ffe8cc',
      '#ffd09b',
      '#ffb366',
      '#ff9c3a',
      '#ff8c1a',
      '#ff8000', // Основной цвет PizzaNat
      '#e6720a',
      '#cc6600',
      '#b35900',
    ] as const,
  },
  fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
  defaultRadius: 'md',
  breakpoints: {
    xs: '320px',
    sm: '480px', 
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <AuthProvider>
            <ProductsProvider>
              <Notifications />
    <App />
            </ProductsProvider>
          </AuthProvider>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
)
