/**
 * @file: AuthPage.tsx
 * @description: Основная страница аутентификации с переключением между методами
 * @dependencies: Auth components, Mantine
 * @created: 2024-12-19
 */

import React, { useState } from 'react'
import { 
  Container, 
  Center, 
  Stack, 
  SegmentedControl, 
  Paper,
  Title,
  Text,
  Group,
  ThemeIcon
} from '@mantine/core'
import { IconPizza } from '@tabler/icons-react'
import { LoginForm } from '../components/auth/LoginForm'
import { SmsAuthForm } from '../components/auth/SmsAuthForm'
import { TelegramAuthForm } from '../components/auth/TelegramAuthForm'
import { RegisterForm } from '../components/auth/RegisterForm'
import { AppStoreLinks } from '../components/AppStoreLinks'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

type AuthMethod = 'email' | 'sms' | 'telegram'
type AuthMode = 'login' | 'register'

export const AuthPage: React.FC = () => {
  const { user, isLoading } = useAuth()
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email')
  const [authMode, setAuthMode] = useState<AuthMode>('login')

  // Если пользователь уже авторизован, перенаправляем на главную
  if (user && !isLoading) {
    return <Navigate to="/" replace />
  }

  // Обработчик успешной аутентификации
  const handleAuthSuccess = () => {
    console.log('✅ Аутентификация успешна, перенаправление...')
    // Навигация произойдет автоматически через useAuth
  }

  // Обработчик переключения на другой метод
  const handleMethodSwitch = (method: AuthMethod, mode: AuthMode = 'login') => {
    setAuthMethod(method)
    setAuthMode(mode)
  }

  // Рендер формы аутентификации
  const renderAuthForm = () => {
    // Общие пропсы для всех форм
    const commonProps = {
      onSuccess: handleAuthSuccess,
      onBack: () => setAuthMode('login') // Возврат к выбору метода
    }

    if (authMode === 'register') {
      return (
        <RegisterForm
          {...commonProps}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      )
    }

    switch (authMethod) {
      case 'email':
        return (
          <LoginForm
            {...commonProps}
            onSwitchToRegister={() => setAuthMode('register')}
            onSwitchToSms={() => handleMethodSwitch('sms')}
            onSwitchToTelegram={() => handleMethodSwitch('telegram')}
          />
        )
      case 'sms':
        return (
          <SmsAuthForm
            {...commonProps}
            onSwitchToLogin={() => handleMethodSwitch('email')}
            onSwitchToTelegram={() => handleMethodSwitch('telegram')}
          />
        )
      case 'telegram':
        return (
          <TelegramAuthForm
            {...commonProps}
            onBack={() => handleMethodSwitch('email')}
          />
        )
      default:
        return null
    }
  }

  // Показать загрузку, если AuthContext еще инициализируется
  if (isLoading) {
    return (
      <Container size="sm" py="xl">
        <Center style={{ minHeight: '100vh' }}>
          <Stack gap="md" align="center">
            <ThemeIcon size="xl" variant="light" color="orange">
              <IconPizza size={32} />
            </ThemeIcon>
            <Text size="lg" c="dimmed">
              Загрузка...
            </Text>
          </Stack>
        </Center>
      </Container>
    )
  }

  return (
    <Container size="sm" py="xl">
      <Center style={{ minHeight: '100vh' }}>
        <Stack gap="xl" w="100%" maw={400}>
          {/* Логотип и заголовок */}
          <Center>
            <Stack gap="md" align="center">
              <Group gap="sm">
                <ThemeIcon size="xl" variant="light" color="orange">
                  <IconPizza size={32} />
                </ThemeIcon>
                <Title order={1} c="orange">
                  PizzaNat
                </Title>
              </Group>
              <Text size="lg" c="dimmed" ta="center">
                {authMode === 'register' ? 'Создание аккаунта' : 'Добро пожаловать!'}
              </Text>
            </Stack>
          </Center>

          {/* Переключатель методов аутентификации (только для входа) */}
          {authMode === 'login' && (
            <Center>
              <SegmentedControl
                value={authMethod}
                onChange={(value) => handleMethodSwitch(value as AuthMethod)}
                data={[
                  { label: 'Email', value: 'email' },
                  { label: 'SMS', value: 'sms' },
                  { label: 'Telegram', value: 'telegram' },
                ]}
                size="sm"
                radius="md"
              />
            </Center>
          )}

          {/* Форма аутентификации */}
          <div>
            {renderAuthForm()}
          </div>

          {/* Ссылки на мобильные приложения */}
          <Center>
            <AppStoreLinks 
              googlePlayUrl="#google-play-placeholder"
              ruStoreUrl="#rustore-placeholder"
            />
          </Center>

          {/* Дополнительная информация */}
          <Center>
            <Paper p="md" radius="md" bg="gray.0" withBorder>
              <Text size="xs" c="dimmed" ta="center">
                Нужна помощь? Свяжитесь с нами по телефону{' '}
                <Text component="span" fw={500}>
                  +7 (999) 123-45-67
                </Text>
              </Text>
            </Paper>
          </Center>
        </Stack>
      </Center>
    </Container>
  )
} 