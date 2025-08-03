/**
 * @file: TelegramAuth.tsx
 * @description: Компонент для аутентификации через Telegram в Web App
 * @dependencies: useTelegram, AuthContext
 * @created: 2025-01-24
 */

import React, { useEffect, useState } from 'react'
import { Button, Stack, Text, Alert, Paper, Group } from '@mantine/core'
import { IconBrandTelegram, IconInfoCircle, IconCheck } from '@tabler/icons-react'
import { useTelegram } from '../../contexts/TelegramContext'
import { useAuth } from '../../contexts/AuthContext'

interface TelegramAuthProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export const TelegramAuth: React.FC<TelegramAuthProps> = ({
  onSuccess,
  onError
}) => {
  const { isInTelegram, user: tgUser } = useTelegram()
  const { loginWithTelegram, user, loading } = useAuth()
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  // Автоматическая аутентификация если мы в Telegram и есть данные пользователя
  useEffect(() => {
    if (isInTelegram && tgUser && !user && !authLoading) {
      handleTelegramAuth()
    }
  }, [isInTelegram, tgUser, user])

  const handleTelegramAuth = async () => {
    if (!isInTelegram || !tgUser) {
      setAuthError('Telegram Web App данные недоступны')
      onError?.('Telegram Web App данные недоступны')
      return
    }

    setAuthLoading(true)
    setAuthError(null)

    try {
      // Создаем объект с данными Telegram пользователя
      const telegramData = {
        id: tgUser.id,
        first_name: tgUser.first_name,
        last_name: tgUser.last_name,
        username: tgUser.username,
        language_code: tgUser.language_code,
        is_premium: tgUser.is_premium
      }

      await loginWithTelegram(telegramData)
      
      console.log('✅ Аутентификация через Telegram успешна:', telegramData)
      onSuccess?.()
    } catch (error: any) {
      const errorMessage = error.message || 'Ошибка аутентификации через Telegram'
      setAuthError(errorMessage)
      onError?.(errorMessage)
      console.error('❌ Ошибка Telegram аутентификации:', error)
    } finally {
      setAuthLoading(false)
    }
  }

  // Если не в Telegram, не показываем компонент
  if (!isInTelegram) {
    return null
  }

  // Если уже авторизован, показываем успешный статус
  if (user) {
    return (
      <Alert icon={<IconCheck size={16} />} color="green" variant="light">
        <Stack gap="xs">
          <Text fw={500}>Вы вошли через Telegram</Text>
          <Text size="sm" c="dimmed">
            Добро пожаловать, {user.name || tgUser?.first_name}!
          </Text>
        </Stack>
      </Alert>
    )
  }

  return (
    <Paper p="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group>
          <IconBrandTelegram size={24} color="#0088cc" />
          <Text fw={600} size="lg">Вход через Telegram</Text>
        </Group>

        {tgUser ? (
          <Stack gap="sm">
            <Text size="sm" c="dimmed">
              Обнаружены данные Telegram:
            </Text>
            <Text size="sm">
              👤 {tgUser.first_name} {tgUser.last_name}
              {tgUser.username && ` (@${tgUser.username})`}
            </Text>
            
            {authError && (
              <Alert icon={<IconInfoCircle size={16} />} color="red" variant="light">
                {authError}
              </Alert>
            )}
            
            <Button
              fullWidth
              color="blue"
              loading={authLoading || loading}
              leftSection={<IconBrandTelegram size={18} />}
              onClick={handleTelegramAuth}
            >
              {authLoading ? 'Авторизация...' : 'Войти через Telegram'}
            </Button>
          </Stack>
        ) : (
          <Alert icon={<IconInfoCircle size={16} />} color="orange" variant="light">
            <Stack gap="xs">
              <Text fw={500}>Данные Telegram недоступны</Text>
              <Text size="sm">
                Убедитесь, что приложение запущено через Telegram Web App
              </Text>
            </Stack>
          </Alert>
        )}
      </Stack>
    </Paper>
  )
}

// Хук для проверки возможности Telegram аутентификации
export const useTelegramAuth = () => {
  const { isInTelegram, user: tgUser } = useTelegram()
  const { user } = useAuth()

  return {
    canUseTelegramAuth: isInTelegram && tgUser && !user,
    isAuthenticated: Boolean(user),
    telegramUser: tgUser,
    isInTelegram
  }
}