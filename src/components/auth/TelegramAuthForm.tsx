/**
 * @file: TelegramAuthForm.tsx
 * @description: Компонент аутентификации через Telegram с интеграцией PizzaNat API
 * @dependencies: AuthContext, Mantine UI, Tabler Icons
 * @created: 2025-01-07
 * @updated: 2025-01-20
 */

import React, { useState, useEffect } from 'react'
import {
  Paper,
  Stack,
  Group,
  Title,
  Text,
  Button,
  Loader,
  Center,
  ThemeIcon,
  Divider,
  Alert,
  CopyButton,
  ActionIcon,
  Tooltip,
  Progress,
  Badge
} from '@mantine/core'
import {
  IconBrandTelegram,
  IconInfoCircle,
  IconCopy,
  IconCheck,
  IconExternalLink,
  IconRefresh
} from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import { useAuth } from '../../contexts/AuthContext'

interface TelegramAuthFormProps {
  onBack?: () => void
  onSuccess?: () => void
}

export const TelegramAuthForm: React.FC<TelegramAuthFormProps> = ({ onBack, onSuccess }) => {
  const { initTelegramAuth, checkTelegramStatus } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [telegramUrl, setTelegramUrl] = useState<string | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [isPolling, setIsPolling] = useState(false)
  const [pollAttempts, setPollAttempts] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [initAttempted, setInitAttempted] = useState(false)
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [retryCountdown, setRetryCountdown] = useState(0)

  const MAX_POLL_ATTEMPTS = 60 // 5 минут (60 * 5 секунд)
  const POLL_INTERVAL = 5000 // 5 секунд
  const RATE_LIMIT_RETRY_DELAY = 60 // 60 секунд

  // Инициализация Telegram аутентификации
  const initTelegramAuthHandler = async () => {
    try {
      setIsLoading(true)
      setError(null)

      console.log('🚀 Инициализация Telegram аутентификации...')
      const response = await initTelegramAuth()

      console.log('🔍 Полученный ответ от initTelegramAuth:', response)
      console.log('🔍 Проверка полей:', {
        hasAuthToken: !!response.authToken,
        hasTelegramBotUrl: !!response.telegramBotUrl,
        authTokenValue: response.authToken,
        telegramBotUrlValue: response.telegramBotUrl,
        allFields: Object.keys(response)
      })

      if (response.authToken && response.telegramBotUrl) {
        setAuthToken(response.authToken)
        setTelegramUrl(response.telegramBotUrl)
        console.log('✅ Получена Telegram Bot URL:', response.telegramBotUrl)

        notifications.show({
          title: 'Telegram аутентификация',
          message: 'Перейдите по ссылке в Telegram бот и поделитесь номером телефона',
          color: 'blue',
          icon: <IconBrandTelegram size={20} />
        })
      } else {
        console.error('❌ Неполные данные от API:', {
          response,
          missingAuthToken: !response.authToken,
          missingTelegramBotUrl: !response.telegramBotUrl
        })
        throw new Error(`Не удалось получить данные для Telegram аутентификации. Получены поля: ${Object.keys(response).join(', ')}`)
      }
    } catch (error: any) {
      console.error('❌ Ошибка инициализации Telegram:', error)
      console.error('❌ Тип ошибки:', typeof error)
      console.error('❌ Конструктор ошибки:', error.constructor.name)

      let errorMessage = 'Неизвестная ошибка'

      // Специальная обработка для различных типов ошибок
      if (error.code === 'ERR_BAD_REQUEST' && (error.message?.includes('429') || error.message?.includes('Too Many Requests') || error.message?.includes('Слишком много попыток'))) {
        errorMessage = 'Слишком много попыток подключения к Telegram. Попробуйте через несколько минут.'
        setIsRateLimited(true)
        setRetryCountdown(RATE_LIMIT_RETRY_DELAY)

        // Запускаем таймер обратного отсчета
        const countdownInterval = setInterval(() => {
          setRetryCountdown(prev => {
            if (prev <= 1) {
              clearInterval(countdownInterval)
              setIsRateLimited(false)
              return 0
            }
            return prev - 1
          })
        }, 1000)

      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Ошибка сети. Проверьте подключение к интернету.'
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Превышено время ожидания ответа от сервера.'
      } else if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      } else if (error && typeof error === 'object') {
        // Специальная обработка для объектов ошибок с details
        if (error.details && error.details.message) {
          errorMessage = error.details.message

          // Проверяем, является ли это rate limiting ошибкой
          if (error.details.message.includes('Слишком много попыток')) {
            setIsRateLimited(true)
            setRetryCountdown(RATE_LIMIT_RETRY_DELAY)

            // Запускаем таймер обратного отсчета
            const countdownInterval = setInterval(() => {
              setRetryCountdown(prev => {
                if (prev <= 1) {
                  clearInterval(countdownInterval)
                  setIsRateLimited(false)
                  return 0
                }
                return prev - 1
              })
            }, 1000)
          }
        } else if (error.message) {
          errorMessage = error.message
        } else {
          errorMessage = `Ошибка API: ${JSON.stringify(error)}`
        }
      } else {
        errorMessage = `Неизвестная ошибка: ${JSON.stringify(error)}`
      }

      console.log('🔧 Финальное сообщение об ошибке:', errorMessage)

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
    if (!authToken) return false

    try {
      console.log(`🔄 Проверка статуса аутентификации (попытка ${pollAttempts + 1}/${MAX_POLL_ATTEMPTS})`)
      const response = await checkTelegramStatus(authToken)

      if (response) {
        console.log('✅ Telegram аутентификация успешна!')

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
    if (isPolling) return // Предотвращаем множественный запуск

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

    // Сохраняем интервал для возможной очистки
    return () => clearInterval(pollInterval)
  }

  // Открытие Telegram ссылки
  const openTelegramLink = () => {
    if (telegramUrl) {
      window.open(telegramUrl, '_blank')
      if (!isPolling) {
        startPolling()
      }
    }
  }

  // Сброс состояния
  const resetState = () => {
    setTelegramUrl(null)
    setAuthToken(null)
    setIsPolling(false)
    setPollAttempts(0)
    setError(null)
    setInitAttempted(false)
    setIsRateLimited(false)
    setRetryCountdown(0)
  }

  // Повторная попытка
  const retryInit = () => {
    if (isRateLimited) {
      notifications.show({
        title: 'Подождите',
        message: `Повторная попытка будет доступна через ${retryCountdown} секунд`,
        color: 'orange'
      })
      return
    }

    resetState()
    initTelegramAuthHandler()
  }

  // Автоматическая инициализация при монтировании (только один раз)
  useEffect(() => {
    console.log('🔄 useEffect TelegramAuthForm:', {
      initAttempted,
      isLoading,
      telegramUrl,
      authToken,
      isRateLimited,
      retryCountdown
    })

    // Не инициализируем, если уже есть rate limiting
    if (isRateLimited) {
      console.log('⏭️ Пропускаем инициализацию из-за rate limiting')
      return
    }

    if (!initAttempted) {
      console.log('🚀 Начинаем первую инициализацию Telegram аутентификации')
      setInitAttempted(true)
      initTelegramAuthHandler()
    } else {
      console.log('⏭️ Инициализация уже была выполнена, пропускаем')
    }

    // Очистка при размонтировании
    return () => {
      console.log('🧹 Очистка TelegramAuthForm при размонтировании')
      setIsPolling(false)
    }
  }, [initAttempted, isRateLimited])

  // Прогресс поллинга
  const pollProgress = (pollAttempts / MAX_POLL_ATTEMPTS) * 100

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
            title={isRateLimited ? "Слишком много попыток" : "Ошибка"}
            color={isRateLimited ? "orange" : "red"}
            variant="light"
            withCloseButton
            onClose={() => setError(null)}
          >
            {error}
            {isRateLimited && retryCountdown > 0 && (
              <Text size="sm" mt="xs" c="dimmed">
                Повторная попытка будет доступна через {retryCountdown} секунд
              </Text>
            )}
            <Group mt="sm">
              <Button
                size="xs"
                variant="light"
                color={isRateLimited ? "orange" : "red"}
                leftSection={<IconRefresh size={14} />}
                onClick={retryInit}
                disabled={isRateLimited && retryCountdown > 0}
              >
                {isRateLimited && retryCountdown > 0
                  ? `Подождите ${retryCountdown}с`
                  : "Попробовать снова"
                }
              </Button>
            </Group>
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
        {telegramUrl && !isLoading && (
          <Stack gap="md">
            <Button
              size="lg"
              leftSection={<IconBrandTelegram size={20} />}
              rightSection={<IconExternalLink size={16} />}
              onClick={openTelegramLink}
              variant="filled"
              color="blue"
              fullWidth
            >
              Открыть Telegram бот
            </Button>

            {/* Копирование ссылки */}
            <Group gap="xs" justify="center">
              <Text size="xs" c="dimmed">
                Или скопируйте ссылку:
              </Text>
              <CopyButton value={telegramUrl}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Скопировано!' : 'Копировать ссылку'}>
                    <ActionIcon
                      color={copied ? 'teal' : 'gray'}
                      variant="subtle"
                      onClick={copy}
                      size="sm"
                    >
                      {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          </Stack>
        )}

        {/* Статус поллинга */}
        {isPolling && (
          <Stack gap="sm">
            <Group justify="space-between" align="center">
              <Text size="sm" fw={500}>
                Ожидание подтверждения...
              </Text>
              <Badge variant="light" color="blue" size="sm">
                {pollAttempts}/{MAX_POLL_ATTEMPTS}
              </Badge>
            </Group>

            <Progress
              value={pollProgress}
              color="blue"
              size="sm"
              animated
            />

            <Text size="xs" c="dimmed" ta="center">
              Подтвердите вход в Telegram боте. Проверка каждые 5 секунд.
            </Text>
          </Stack>
        )}

        {/* Инструкции */}
        {telegramUrl && !isLoading && (
          <Alert
            icon={<IconInfoCircle size={16} />}
            title="Как войти через Telegram"
            color="blue"
            variant="light"
          >
            <Stack gap="xs">
              <Text size="sm">1. Нажмите кнопку "Открыть Telegram бот"</Text>
              <Text size="sm">2. В открывшемся боте нажмите "Start" или отправьте /start</Text>
              <Text size="sm">3. Поделитесь своим номером телефона с ботом</Text>
              <Text size="sm">4. Дождитесь автоматического входа на сайт</Text>
            </Stack>
          </Alert>
        )}

        {/* Кнопки управления */}
        <Group justify="space-between">
          {onBack && (
            <Button variant="subtle" onClick={onBack}>
              Назад
            </Button>
          )}

          {telegramUrl && !isPolling && (
            <Button
              variant="light"
              leftSection={<IconRefresh size={16} />}
              onClick={retryInit}
            >
              Обновить
            </Button>
          )}
        </Group>
      </Stack>
    </Paper>
  )
} 