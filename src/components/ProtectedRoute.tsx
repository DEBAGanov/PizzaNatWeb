/**
 * @file: ProtectedRoute.tsx
 * @description: Улучшенный компонент для защиты маршрутов с проверкой токенов
 * @dependencies: AuthContext, React Router
 * @created: 2024-12-19
 * @updated: 2025-01-24 - Исправление проблем безопасности из comprehensive тестов
 */

import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Center, Loader, Stack, Text, ThemeIcon, Alert } from '@mantine/core'
import { IconPizza, IconLock } from '@tabler/icons-react'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean // По умолчанию true
  requiredRole?: 'USER' | 'ADMIN' // Опциональная проверка роли
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true,
  requiredRole 
}) => {
  const { user, isLoading, tokens } = useAuth()
  const location = useLocation()

  // Показываем загрузку пока инициализируется AuthContext
  if (isLoading) {
    return (
      <Center style={{ minHeight: '100vh' }}>
        <Stack gap="md" align="center">
          <ThemeIcon size="xl" variant="light" color="orange">
            <IconPizza size={32} />
          </ThemeIcon>
          <Loader size="lg" color="orange" />
          <Text size="lg" c="dimmed">
            Проверка авторизации...
          </Text>
        </Stack>
      </Center>
    )
  }

  // Дополнительная проверка токенов для повышения безопасности
  const hasValidTokens = tokens?.access_token && user
  
  // Проверяем защищенные routes (исправление проблемы из comprehensive тестов)
  const protectedPaths = ['/cart', '/checkout', '/orders', '/profile', '/order-success', '/admin', '/payments']
  const isProtectedPath = protectedPaths.some(path => location.pathname.startsWith(path))
  
  // Если это защищенный путь, всегда требуется авторизация
  if (isProtectedPath) {
    // Строгая проверка для защищенных путей
    if (!hasValidTokens) {
      console.warn(`🔒 Заблокирован доступ к защищенному пути: ${location.pathname}`)
      window.location.href = 'https://max.ru/id121603899498_bot'
      return null
    }
    
    // Проверка роли если требуется
    if (requiredRole && user?.role !== requiredRole) {
      return (
        <Center style={{ minHeight: '100vh' }}>
          <Alert 
            icon={<IconLock size={16} />} 
            title="Доступ запрещен" 
            color="red"
            variant="filled"
          >
            У вас недостаточно прав для доступа к этой странице.
            <br />
            Требуется роль: {requiredRole}, ваша роль: {user?.role || 'неизвестна'}
          </Alert>
        </Center>
      )
    }
  }

  // Если требуется авторизация, но пользователь не авторизован (только для не-защищенных путей)
  if (requireAuth && !isProtectedPath && !user) {
    console.warn(`🔒 Неавторизованный доступ к: ${location.pathname}`)
    window.location.href = 'https://max.ru/id121603899498_bot'
    return null
  }

  // Если не требуется авторизация, но пользователь авторизован
  // Редиректим только со страницы авторизации, НЕ с SEO-страниц!
  if (!requireAuth && user && location.pathname === '/auth') {
    const from = location.state?.from?.pathname || '/'
    return <Navigate to={from} replace />
  }

  // Логирование для отладки проблем безопасности
  React.useEffect(() => {
    if (isProtectedPath && hasValidTokens) {
      console.log(`✅ Авторизованный доступ к защищенному пути: ${location.pathname}`)
    }
  }, [isProtectedPath, hasValidTokens, location.pathname])

  // Отображаем защищенный контент
  return <>{children}</>
} 