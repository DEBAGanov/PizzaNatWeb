/**
 * @file: LoginForm.tsx
 * @description: Компонент формы входа через email/password
 * @dependencies: Mantine, useAuth, React Hook Form
 * @created: 2024-12-19
 */

import { useState } from 'react'
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Stack,
  Anchor,
  Center
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconMail, IconLock } from '@tabler/icons-react'
import { useAuth } from '../../contexts/AuthContext'
import { AppInstallButtons } from '../AppInstallButtons'
import type { LoginRequest } from '../../types/auth'

interface LoginFormProps {
  onSwitchToRegister?: () => void
  // Пропсы оставляем для совместимости, но не используем
  onSwitchToSms?: () => void
  onSwitchToTelegram?: () => void
}

export function LoginForm({ 
  onSwitchToRegister
}: LoginFormProps) {
  const { login, isLoading } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<LoginRequest>({
    initialValues: {
      username: '',
      password: ''
    },
    validate: {
      username: (value) => {
        if (!value) return 'Имя пользователя или email обязательны'
        return null
      },
      password: (value) => {
        if (!value) return 'Пароль обязателен'
        if (value.length < 6) return 'Пароль должен содержать минимум 6 символов'
        return null
      }
    }
  })

  const handleSubmit = async (values: LoginRequest) => {
    try {
      setIsSubmitting(true)
      await login(values)
    } catch (error) {
      console.error('Ошибка входа:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Paper p="xl" shadow="md" radius="md" style={{ maxWidth: 400, width: '100%' }}>
      <Title order={2} ta="center" mb="md">
        Вход в PizzaNat
      </Title>
      
      <Text c="dimmed" size="sm" ta="center" mb="xl">
        Войдите в свой аккаунт, чтобы делать заказы
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Имя пользователя или Email"
            placeholder="username или your@email.com"
            leftSection={<IconMail size={16} />}
            {...form.getInputProps('username')}
            disabled={isLoading || isSubmitting}
          />

          <PasswordInput
            label="Пароль"
            placeholder="Ваш пароль"
            leftSection={<IconLock size={16} />}
            {...form.getInputProps('password')}
            disabled={isLoading || isSubmitting}
          />

          <Button
            type="submit"
            fullWidth
            loading={isLoading || isSubmitting}
            size="md"
            mt="md"
          >
            Войти
          </Button>
        </Stack>
      </form>

      {/* Кнопки установки приложений */}
      <AppInstallButtons />

      {/* Ссылка на регистрацию */}
      {onSwitchToRegister && (
        <Center mt="xl">
          <Text size="sm">
            Нет аккаунта?{' '}
            <Anchor
              component="button"
              type="button"
              onClick={onSwitchToRegister}
              disabled={isLoading || isSubmitting}
            >
              Зарегистрироваться
            </Anchor>
          </Text>
        </Center>
      )}
    </Paper>
  )
} 