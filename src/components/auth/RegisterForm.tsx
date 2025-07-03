/**
 * @file: RegisterForm.tsx
 * @description: Компонент для регистрации нового пользователя
 * @dependencies: AuthContext, authApi, Mantine forms
 * @created: 2024-12-19
 */

import React, { useState } from 'react'
import {
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Alert,
  Group,
  Anchor,
  Checkbox,
  Divider,
  Box
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconUser, IconMail, IconPhone, IconInfoCircle, IconArrowLeft } from '@tabler/icons-react'
import { useAuth } from '../../contexts/AuthContext'
import type { RegisterRequest } from '../../types/auth'

interface RegisterFormProps {
  onBack?: () => void
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

interface FormValues {
  username: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ 
  onBack, 
  onSuccess, 
  onSwitchToLogin 
}) => {
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  // Форма с валидацией
  const form = useForm<FormValues>({
    initialValues: {
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    },
    validate: {
      username: (value) => {
        if (!value?.trim()) return 'Имя обязательно'
        if (value.trim().length < 2) return 'Имя должно содержать минимум 2 символа'
        if (value.trim().length > 50) return 'Имя не должно превышать 50 символов'
        return null
      },
      email: (value) => {
        if (!value?.trim()) return 'Email обязателен'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return 'Некорректный формат email'
        return null
      },
      phone: (value) => {
        if (!value?.trim()) return 'Телефон обязателен'
        // Нормализуем номер для валидации
        const normalizedPhone = value.replace(/\D/g, '')
        if (normalizedPhone.length < 10) return 'Некорректный номер телефона'
        if (normalizedPhone.length > 12) return 'Слишком длинный номер телефона'
        return null
      },
      password: (value) => {
        if (!value) return 'Пароль обязателен'
        if (value.length < 6) return 'Пароль должен содержать минимум 6 символов'
        if (value.length > 100) return 'Пароль не должен превышать 100 символов'
        
        // Проверка на сложность пароля
        const hasUpperCase = /[A-Z]/.test(value)
        const hasLowerCase = /[a-z]/.test(value)
        const hasNumbers = /\d/.test(value)
        
        if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
          return 'Пароль должен содержать заглавные и строчные буквы, цифры'
        }
        
        return null
      },
      confirmPassword: (value, values) => {
        if (!value) return 'Подтверждение пароля обязательно'
        if (value !== values.password) return 'Пароли не совпадают'
        return null
      },
      agreeToTerms: (value) => {
        if (!value) return 'Необходимо согласие с условиями использования'
        return null
      }
    }
  })

  // Нормализация номера телефона
  const normalizePhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '')
    
    // Если номер начинается с 8, заменяем на 7
    if (cleaned.startsWith('8')) {
      return '7' + cleaned.slice(1)
    }
    
    // Если номер начинается с 9 (без кода страны), добавляем 7
    if (cleaned.startsWith('9') && cleaned.length === 10) {
      return '7' + cleaned
    }
    
    // Если номер начинается с 7, оставляем как есть
    if (cleaned.startsWith('7')) {
      return cleaned
    }
    
    return cleaned
  }

  // Обработка регистрации
  const handleRegister = async (values: FormValues) => {
    try {
      setIsLoading(true)
      
      console.log('🚀 Начинаем регистрацию пользователя...')
      
      // Подготавливаем данные для отправки
      const registerData: RegisterRequest = {
        username: values.email.trim().toLowerCase(),
        fullName: values.username.trim(),
        phoneNumber: normalizePhoneNumber(values.phone),
        password: values.password
      }
      
      console.log('📤 Отправляем данные регистрации:', {
        ...registerData,
        password: '[СКРЫТО]'
      })
      
      // Отправляем запрос на регистрацию через AuthContext
      await register(registerData)
      
      console.log('✅ Регистрация успешна!')
      
      notifications.show({
        title: 'Добро пожаловать!',
        message: 'Регистрация завершена, вы автоматически вошли в систему',
        color: 'green'
      })
      
      onSuccess?.()
    } catch (error) {
      console.error('❌ Ошибка регистрации:', error)
      
      let errorMessage = 'Произошла ошибка при регистрации'
      
      if (error instanceof Error) {
        errorMessage = error.message
      }
      
      // Обработка специфичных ошибок
      if (errorMessage.includes('email')) {
        form.setFieldError('email', 'Email уже используется')
      } else if (errorMessage.includes('phone')) {
        form.setFieldError('phone', 'Телефон уже используется')
      } else {
        notifications.show({
          title: 'Ошибка регистрации',
          message: errorMessage,
          color: 'red'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Форматирование номера телефона для отображения
  const formatPhoneDisplay = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    
    if (cleaned.length === 0) return ''
    if (cleaned.length <= 1) return `+${cleaned}`
    if (cleaned.length <= 4) return `+${cleaned.slice(0, 1)} (${cleaned.slice(1)}`
    if (cleaned.length <= 7) return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4)}`
    if (cleaned.length <= 9) return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
    return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`
  }

  return (
    <Paper p="xl" radius="md" withBorder>
      <Stack gap="lg">
        {/* Заголовок */}
        <div>
          <Title order={2} ta="center">
            Создать аккаунт
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt="xs">
            Заполните форму для регистрации
          </Text>
        </div>

        <Divider />

        {/* Форма регистрации */}
        <form onSubmit={form.onSubmit(handleRegister)}>
          <Stack gap="md">
            {/* Имя */}
            <TextInput
              label="Имя"
              placeholder="Введите ваше имя"
              leftSection={<IconUser size={16} />}
              required
              {...form.getInputProps('username')}
            />

            {/* Email */}
            <TextInput
              label="Email"
              placeholder="example@email.com"
              leftSection={<IconMail size={16} />}
              type="email"
              required
              {...form.getInputProps('email')}
            />

            {/* Телефон */}
            <TextInput
              label="Телефон"
              placeholder="+7 (999) 123-45-67"
              leftSection={<IconPhone size={16} />}
              required
              {...form.getInputProps('phone')}
              onChange={(event) => {
                const formatted = formatPhoneDisplay(event.currentTarget.value)
                form.setFieldValue('phone', formatted)
              }}
            />

            {/* Пароль */}
            <PasswordInput
              label="Пароль"
              placeholder="Минимум 6 символов"
              required
              {...form.getInputProps('password')}
            />

            {/* Подтверждение пароля */}
            <PasswordInput
              label="Подтвердите пароль"
              placeholder="Повторите пароль"
              required
              {...form.getInputProps('confirmPassword')}
            />

            {/* Требования к паролю */}
            <Alert
              icon={<IconInfoCircle size={16} />}
              title="Требования к паролю"
              color="blue"
              variant="light"
            >
              <Text size="sm">
                • Минимум 6 символов
                <br />
                • Заглавные и строчные буквы
                <br />
                • Цифры
              </Text>
            </Alert>

            {/* Согласие с условиями */}
            <Checkbox
              label={
                <Text size="sm">
                  Я согласен с{' '}
                  <Anchor href="#" size="sm">
                    условиями использования
                  </Anchor>
                  {' '}и{' '}
                  <Anchor href="#" size="sm">
                    политикой конфиденциальности
                  </Anchor>
                </Text>
              }
              required
              {...form.getInputProps('agreeToTerms', { type: 'checkbox' })}
            />

            {/* Кнопка регистрации */}
            <Button
              type="submit"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={!form.isValid() || !form.values.agreeToTerms}
            >
              Создать аккаунт
            </Button>
          </Stack>
        </form>

        <Divider />

        {/* Навигация */}
        <Stack gap="sm">
          {/* Переход к входу */}
          <Group justify="center">
            <Text size="sm" c="dimmed">
              Уже есть аккаунт?
            </Text>
            {onSwitchToLogin && (
              <Anchor
                component="button"
                type="button"
                size="sm"
                onClick={onSwitchToLogin}
                disabled={isLoading}
              >
                Войти
              </Anchor>
            )}
          </Group>

          {/* Кнопка назад */}
          {onBack && (
            <Button
              variant="subtle"
              color="gray"
              leftSection={<IconArrowLeft size={16} />}
              onClick={onBack}
              disabled={isLoading}
            >
              Назад к выбору способа входа
            </Button>
          )}
        </Stack>

        {/* Дополнительная информация */}
        <Box>
          <Text size="xs" c="dimmed" ta="center">
            Регистрируясь, вы соглашаетесь на обработку персональных данных
            в соответствии с законодательством РФ
          </Text>
        </Box>
      </Stack>
    </Paper>
  )
} 