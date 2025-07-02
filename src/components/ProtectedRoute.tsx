/**
 * @file: ProtectedRoute.tsx
 * @description: Компонент для защиты маршрутов, требующих аутентификации
 * @dependencies: AuthContext, React Router
 * @created: 2024-12-19
 */

import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Center, Loader, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconPizza } from '@tabler/icons-react'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean // По умолчанию true
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { user, isLoading } = useAuth()
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

  // Если требуется авторизация, но пользователь не авторизован
  if (requireAuth && !user) {
    // Сохраняем текущий путь для возврата после авторизации
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  // Если не требуется авторизация, но пользователь авторизован
  // (например, для страницы входа)
  if (!requireAuth && user) {
    // Возвращаем на главную или на сохраненный путь
    const from = location.state?.from?.pathname || '/'
    return <Navigate to={from} replace />
  }

  // Отображаем защищенный контент
  return <>{children}</>
} 