/**
 * @file: TelegramAuthForm.tsx
 * @description: Компонент для аутентификации через Telegram
 * @dependencies: AuthContext, authApi, Mantine UI
 * @created: 2024-12-19
 */

import React, { useState, useEffect } from 'react'
import {
  Paper,
  Title,
  Text,
  Button,
  Stack,
  Alert,
  Loader,
  Center,
  Group,
  ThemeIcon,
  Box,
  Divider
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconBrandTelegram, IconInfoCircle, IconArrowLeft, IconExternalLink } from '@tabler/icons-react'
import { useAuth } from '../../contexts/AuthContext'
import { authApi } from '../../services/authApi'

interface TelegramAuthFormProps {
  onBack?: () => void
  onSuccess?: () => void
}

export const TelegramAuthForm: React.FC<TelegramAuthFormProps> = ({ onBack, onSuccess }) => {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [telegramUrl, setTelegramUrl] = useState<string | null>(null)
  const [isPolling, setIsPolling] = useState(false)
  const [pollAttempts, setPollAttempts] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const MAX_POLL_ATTEMPTS = 60 // 5 минут (60 * 5 секунд)
  const POLL_INTERVAL = 5000 // 5 секунд

  // Инициализация Telegram аутентификации
  const initTelegramAuth = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      console.log('🚀 Инициализация Telegram аутентификации...')
      const response = await authApi.initTelegramAuth()
      
      if (response.success && response.data?.url) {
        setTelegramUrl(response.data.url)
        console.log('✅ Получена Telegram URL:', response.data.url)
        
        notifications.show({
          title: 'Telegram аутентификация',
          message: 'Перейдите по ссылке и подтвердите вход в Telegram',
          color: 'blue',
          icon: <IconBrandTelegram size={20} />
        })
      } else {
        throw new Error('Не удалось получить ссылку для Telegram аутентификации')
      }
    } catch (error) {
      console.error('❌ Ошибка инициализации Telegram:', error)
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
      setError(errorMessage)
      
      notifications.show({
        title: 'Ошибка',
        message: errorMessage,
        color: 'red'
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Проверка статуса аутентификации
  const pollAuthStatus = async () => {
    try {
      console.log(`🔄 Проверка статуса аутентификации (попытка ${pollAttempts + 1}/${MAX_POLL_ATTEMPTS})`)
      const response = await authApi.checkTelegramAuth()
      
      if (response.success && response.data) {
        console.log('✅ Telegram аутентификация успешна!')
        
        // Сохраняем токены через AuthContext
        await login(response.data.access_token, response.data.refresh_token)
        
        notifications.show({
          title: 'Успешно!',
          message: 'Вы успешно вошли через Telegram',
          color: 'green',
          icon: <IconBrandTelegram size={20} />
        })
        
        setIsPolling(false)
        onSuccess?.()
        return true
      }
      
      return false
    } catch (error) {
      console.error('❌ Ошибка проверки статуса:', error)
      return false
    }
  }

  // Запуск поллинга
  const startPolling = () => {
    setIsPolling(true)
    setPollAttempts(0)
    
    const pollInterval = setInterval(async () => {
      const success = await pollAuthStatus()
      
      if (success) {
        clearInterval(pollInterval)
        return
      }
      
      setPollAttempts(prev => {
        const newAttempts = prev + 1
        
        if (newAttempts >= MAX_POLL_ATTEMPTS) {
          clearInterval(pollInterval)
          setIsPolling(false)
          
          notifications.show({
            title: 'Время истекло',
            message: 'Превышено время ожидания подтверждения. Попробуйте еще раз.',
            color: 'orange'
          })
        }
        
        return newAttempts
      })
    }, POLL_INTERVAL)
  }

  // Открытие Telegram ссылки
  const openTelegramLink = () => {
    if (telegramUrl) {
      window.open(telegramUrl, '_blank')
      startPolling()
    }
  }

  // Сброс состояния
  const resetState = () => {
    setTelegramUrl(null)
    setIsPolling(false)
    setPollAttempts(0)
    setError(null)
  }

  // Автоматическая инициализация при монтировании
  useEffect(() => {
    initTelegramAuth()
    
    // Очистка при размонтировании
    return () => {
      setIsPolling(false)
    }
  }, [])

  return (
    <Paper p="xl" radius="md" withBorder>
      <Stack gap="lg">
        {/* Заголовок */}
        <Group gap="sm">
          <ThemeIcon size="lg" variant="light" color="blue">
            <IconBrandTelegram size={24} />
          </ThemeIcon>
          <div>
            <Title order={3}>Вход через Telegram</Title>
            <Text size="sm" c="dimmed">
              Быстрый и безопасный способ входа
            </Text>
          </div>
        </Group>

        <Divider />

        {/* Ошибка */}
        {error && (
          <Alert
            icon={<IconInfoCircle size={16} />}
            title="Ошибка"
            color="red"
            variant="light"
          >
            {error}
          </Alert>
        )}

        {/* Загрузка инициализации */}
        {isLoading && (
          <Center p="xl">
            <Stack gap="sm" align="center">
              <Loader size="lg" color="blue" />
              <Text size="sm" c="dimmed">
                Подготовка Telegram аутентификации...
              </Text>
            </Stack>
          </Center>
        )}

        {/* Кнопка для открытия Telegram */}
        {telegramUrl && !isPolling && (
          <Stack gap="md">
            <Alert
              icon={<IconInfoCircle size={16} />}
              title="Инструкция"
              color="blue"
              variant="light"
            >
              <Text size="sm">
                1. Нажмите кнопку "Открыть Telegram"
                <br />
                2. Подтвердите вход в боте
                <br />
                3. Дождитесь автоматического входа в приложение
              </Text>
            </Alert>

            <Button
              size="lg"
              leftSection={<IconBrandTelegram size={20} />}
              rightSection={<IconExternalLink size={16} />}
              onClick={openTelegramLink}
              fullWidth
              variant="filled"
              color="blue"
            >
              Открыть Telegram
            </Button>
          </Stack>
        )}

        {/* Процесс ожидания подтверждения */}
        {isPolling && (
          <Stack gap="md">
            <Alert
              icon={<IconInfoCircle size={16} />}
              title="Ожидание подтверждения"
              color="blue"
              variant="light"
            >
              <Text size="sm">
                Подтвердите вход в Telegram боте.
                <br />
                Автоматическая проверка: {pollAttempts}/{MAX_POLL_ATTEMPTS}
              </Text>
            </Alert>

            <Center>
              <Stack gap="sm" align="center">
                <Loader size="md" color="blue" />
                <Text size="sm" c="dimmed">
                  Ожидание подтверждения...
                </Text>
              </Stack>
            </Center>

            <Group justify="center">
              <Button
                variant="light"
                color="gray"
                onClick={() => {
                  setIsPolling(false)
                  setPollAttempts(0)
                }}
              >
                Отменить ожидание
              </Button>
            </Group>
          </Stack>
        )}

        {/* Кнопки управления */}
        <Stack gap="sm">
          {!isLoading && !isPolling && telegramUrl && (
            <Button
              variant="light"
              color="gray"
              onClick={() => {
                resetState()
                initTelegramAuth()
              }}
            >
              Обновить ссылку
            </Button>
          )}

          {onBack && (
            <Button
              variant="subtle"
              color="gray"
              leftSection={<IconArrowLeft size={16} />}
              onClick={onBack}
              disabled={isLoading || isPolling}
            >
              Назад к выбору способа входа
            </Button>
          )}
        </Stack>

        {/* Дополнительная информация */}
        <Box>
          <Text size="xs" c="dimmed" ta="center">
            Используя Telegram аутентификацию, вы соглашаетесь с передачей
            базовой информации профиля из Telegram
          </Text>
        </Box>
      </Stack>
    </Paper>
  )
} 