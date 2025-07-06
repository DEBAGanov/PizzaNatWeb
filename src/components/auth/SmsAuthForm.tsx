/**
 * @file: SmsAuthForm.tsx
 * @description: Компонент SMS аутентификации
 * @dependencies: Mantine, useAuth, React
 * @created: 2024-12-19
 */

import { useState, useEffect } from 'react'
import {
  Paper,
  TextInput,
  Button,
  Title,
  Text,
  Stack,
  Anchor,
  Center,
  PinInput,
  Group,
  Alert
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconPhone, IconInfoCircle } from '@tabler/icons-react'
import { useAuth } from '../../contexts/AuthContext'
import { AppInstallButtons } from '../AppInstallButtons'
import type { SmsAuthRequest } from '../../types/auth'

interface SmsAuthFormProps {
  // Пропсы оставляем для совместимости, но не используем
  onSwitchToLogin?: () => void
  onSwitchToTelegram?: () => void
}

export function SmsAuthForm({ }: SmsAuthFormProps) {
  const { sendSmsCode, verifySmsCode, isLoading } = useAuth()
  const [step, setStep] = useState<'phone' | 'code'>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [requestId, setRequestId] = useState<string | undefined>(undefined)
  const [countdown, setCountdown] = useState(0)
  const [smsCode, setSmsCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Форма для ввода номера телефона
  const phoneForm = useForm<SmsAuthRequest>({
    initialValues: {
      phoneNumber: ''
    },
    validate: {
      phoneNumber: (value) => {
        if (!value) return 'Номер телефона обязателен'
        // Простая валидация российского номера
        const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
        if (!phoneRegex.test(value.replace(/\s+/g, ''))) {
          return 'Неверный формат номера телефона'
        }
        return null
      }
    }
  })

  // Обратный отсчет для повторной отправки SMS
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSendSms = async (values: SmsAuthRequest) => {
    try {
      setIsSubmitting(true)
      // Нормализуем номер телефона
      const normalizedPhone = values.phoneNumber.replace(/\D/g, '')
      const formattedPhone = normalizedPhone.startsWith('8') 
        ? '+7' + normalizedPhone.slice(1)
        : normalizedPhone.startsWith('7')
        ? '+' + normalizedPhone
        : '+7' + normalizedPhone

      const response = await sendSmsCode({ phoneNumber: formattedPhone })
      setPhoneNumber(formattedPhone)
      // requestId может отсутствовать в реальном API
      if (response.requestId) {
        setRequestId(response.requestId)
      }
      setStep('code')
      setCountdown(60) // 60 секунд до повторной отправки
    } catch (error) {
      console.error('Ошибка отправки SMS:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifyCode = async () => {
    if (smsCode.length !== 4) return

    try {
      setIsSubmitting(true)
      await verifySmsCode({
        phoneNumber: phoneNumber,
        code: smsCode,
        requestId: requestId // может быть undefined
      })
    } catch (error) {
      console.error('Ошибка подтверждения кода:', error)
      setSmsCode('') // Очищаем код при ошибке
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendSms = async () => {
    try {
      setIsSubmitting(true)
      const response = await sendSmsCode({ phoneNumber: phoneNumber })
      if (response.requestId) {
        setRequestId(response.requestId)
      }
      setCountdown(60)
      setSmsCode('')
    } catch (error) {
      console.error('Ошибка повторной отправки SMS:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackToPhone = () => {
    setStep('phone')
    setSmsCode('')
    setCountdown(0)
  }

  return (
    <Paper p="xl" shadow="md" radius="md" style={{ maxWidth: 400, width: '100%' }}>
      <Title order={2} ta="center" mb="md">
        Вход по SMS
      </Title>

      {step === 'phone' ? (
        <>
          <Text c="dimmed" size="sm" ta="center" mb="xl">
            Введите номер телефона для получения кода подтверждения
          </Text>

          <form onSubmit={phoneForm.onSubmit(handleSendSms)}>
            <Stack gap="md">
              <TextInput
                label="Номер телефона"
                placeholder="+7 (999) 123-45-67"
                leftSection={<IconPhone size={16} />}
                {...phoneForm.getInputProps('phoneNumber')}
                disabled={isLoading || isSubmitting}
              />

              <Button
                type="submit"
                fullWidth
                loading={isLoading || isSubmitting}
                size="md"
                mt="md"
              >
                Получить код
              </Button>
            </Stack>
          </form>
        </>
      ) : (
        <>
          <Text c="dimmed" size="sm" ta="center" mb="md">
            Код отправлен на номер
          </Text>
          <Text fw={500} ta="center" mb="xl">
            {phoneNumber}
          </Text>

          <Stack gap="md">
            <Center>
              <PinInput
                length={4}
                value={smsCode}
                onChange={setSmsCode}
                onComplete={handleVerifyCode}
                disabled={isLoading || isSubmitting}
                size="lg"
                type="number"
              />
            </Center>

            <Alert icon={<IconInfoCircle size={16} />} color="blue" variant="light">
              Введите 4-значный код из SMS
            </Alert>

            <Button
              fullWidth
              loading={isLoading || isSubmitting}
              disabled={smsCode.length !== 4}
              onClick={handleVerifyCode}
              size="md"
            >
              Подтвердить код
            </Button>

            <Group justify="space-between">
              <Anchor
                component="button"
                type="button"
                onClick={handleBackToPhone}
                disabled={isLoading || isSubmitting}
                size="sm"
              >
                Изменить номер
              </Anchor>

              {countdown > 0 ? (
                <Text size="sm" c="dimmed">
                  Повторить через {countdown}с
                </Text>
              ) : (
                <Anchor
                  component="button"
                  type="button"
                  onClick={handleResendSms}
                  disabled={isLoading || isSubmitting}
                  size="sm"
                >
                  Отправить повторно
                </Anchor>
              )}
            </Group>
          </Stack>
        </>
      )}

      {/* Кнопки установки приложений */}
      <AppInstallButtons />
    </Paper>
  )
} 