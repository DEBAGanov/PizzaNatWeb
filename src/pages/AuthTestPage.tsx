/**
 * @file: AuthTestPage.tsx
 * @description: Тестовая страница для проверки авторизации
 * @dependencies: Mantine, AuthContext, auth forms
 * @created: 2025-01-07
 */

import { useState } from 'react'
import {
  Container,
  Paper,
  Tabs,
  Stack,
  Title,
  Text,
  Button,
  Group,
  Alert,
  Code,
  Divider
} from '@mantine/core'
import { IconInfoCircle, IconUser, IconLogout } from '@tabler/icons-react'
import { LoginForm } from '../components/auth/LoginForm'
import { RegisterForm } from '../components/auth/RegisterForm'
import { SmsAuthForm } from '../components/auth/SmsAuthForm'
import { TelegramAuthForm } from '../components/auth/TelegramAuthForm'
import { useAuth } from '../contexts/AuthContext'

export function AuthTestPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<string>('login')

  // Если пользователь авторизован, показываем информацию о нем
  if (isAuthenticated && user) {
    return (
      <Container size="md" py="xl">
        <Paper p="xl" shadow="md" radius="md">
          <Stack gap="md">
            <Group justify="space-between">
              <Title order={2}>
                <IconUser size={24} style={{ marginRight: 8 }} />
                Добро пожаловать!
              </Title>
              <Button
                variant="light"
                color="red"
                leftSection={<IconLogout size={16} />}
                onClick={logout}
                loading={isLoading}
              >
                Выйти
              </Button>
            </Group>

            <Alert icon={<IconInfoCircle size={16} />} color="green">
              Авторизация прошла успешно! CORS настроен корректно.
            </Alert>

            <Divider />

            <Stack gap="xs">
              <Text size="lg" fw={600}>Информация о пользователе:</Text>
              <Code block>
                {JSON.stringify(user, null, 2)}
              </Code>
            </Stack>

            <Divider />

            <Text size="sm" c="dimmed">
              Теперь вы можете использовать все функции приложения.
              API подключен к: <Code>{window.location.origin}/api/v1</Code>
            </Text>
          </Stack>
        </Paper>
      </Container>
    )
  }

  // Форма авторизации
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Paper p="md" shadow="sm" radius="md">
          <Alert icon={<IconInfoCircle size={16} />} color="blue">
            <Text size="sm">
              <strong>Тестирование авторизации PizzaNat</strong><br />
              API: <Code>{window.location.origin}/api/v1</Code><br />
              CORS настроен для: pizzanat.ru, www.pizzanat.ru, localhost:5173, localhost:3000
            </Text>
          </Alert>
        </Paper>

        <Paper p="xl" shadow="md" radius="md">
          <Tabs value={activeTab} onChange={(value) => setActiveTab(value || 'login')}>
            <Tabs.List grow>
              <Tabs.Tab value="login">Email/Password</Tabs.Tab>
              <Tabs.Tab value="register">Регистрация</Tabs.Tab>
              <Tabs.Tab value="sms">SMS</Tabs.Tab>
              <Tabs.Tab value="telegram">Telegram</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="login" pt="md">
              <LoginForm
                onSwitchToRegister={() => setActiveTab('register')}
                onSwitchToSms={() => setActiveTab('sms')}
                onSwitchToTelegram={() => setActiveTab('telegram')}
              />
            </Tabs.Panel>

            <Tabs.Panel value="register" pt="md">
              <RegisterForm
                onSwitchToLogin={() => setActiveTab('login')}
              />
            </Tabs.Panel>

            <Tabs.Panel value="sms" pt="md">
              <SmsAuthForm
                onSwitchToTelegram={() => setActiveTab('telegram')}
              />
            </Tabs.Panel>

            <Tabs.Panel value="telegram" pt="md">
              <TelegramAuthForm />
            </Tabs.Panel>
          </Tabs>
        </Paper>

        <Paper p="md" shadow="sm" radius="md">
          <Text size="sm" c="dimmed" ta="center">
            Для тестирования используйте реальные данные из PizzaNat backend
          </Text>
        </Paper>
      </Stack>
    </Container>
  )
} 