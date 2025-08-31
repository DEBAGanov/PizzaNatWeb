/**
 * @file: OrderSuccessPage.tsx
 * @description: Страница благодарности за заказ в стиле кассового чека
 * @dependencies: Mantine, React Router
 * @created: 2025-01-24
 */

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Container,
  Stack,
  Title,
  Text,
  Button,
  Paper,
  Group,
  Divider,
  Center,
  ThemeIcon,
  Box,
  Loader,
  Alert
} from '@mantine/core'
import {
  IconCheck,
  IconHome
} from '@tabler/icons-react'
import { useAuth } from '../contexts/AuthContext'
import { YandexReviewsWidget } from '../components/common/YandexReviewsWidget'
import { productsApi } from '../services/productsApi'
import type { Order } from '../types/products'

// Типы импортированы из types/products.ts

const OrderSuccessPage: React.FC = () => {
  console.log('🟢 OrderSuccessPage: компонент рендерится')
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const { user, tokens } = useAuth()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Загрузка деталей заказа
  useEffect(() => {
    const loadOrderDetails = async () => {
      if (!orderId || !user) {
        setError('Заказ не найден')
        setLoading(false)
        return
      }

      try {
        console.log('🔍 OrderSuccessPage: загружаем заказ', orderId, 'для пользователя', user?.username)
        
        if (!tokens?.access_token) {
          console.warn('❌ OrderSuccessPage: нет токена')
          setError('Ошибка авторизации')
          setLoading(false)
          return
        }

        const orderData = await productsApi.getOrderById(parseInt(orderId))
        setOrder(orderData)
        console.log('✅ Детали заказа загружены:', orderData)
      } catch (error: any) {
        console.error('❌ Ошибка загрузки заказа:', error)
        setError('Не удалось загрузить информацию о заказе')
      } finally {
        setLoading(false)
      }
    }

    loadOrderDetails()
  }, [orderId, user, navigate])

  // Форматирование даты для чека
  const formatReceiptDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }) + ' ' + date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  // Форматирование номера для отображения
  const formatPrice = (price: number) => {
    return price.toFixed(2)
  }

  const handleGoHome = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <Container size="sm" py="xl">
        <Center>
          <Stack align="center" gap="md">
            <Loader size="lg" />
            <Text>Загружаем информацию о заказе...</Text>
          </Stack>
        </Center>
      </Container>
    )
  }

  if (error || !order) {
    return (
      <Container size="sm" py="xl">
        <Stack align="center" gap="md">
          <Alert color="red" title="Ошибка">
            {error || 'Заказ не найден'}
          </Alert>
          <Button leftSection={<IconHome size={16} />} onClick={handleGoHome}>
            На главную
          </Button>
        </Stack>
      </Container>
    )
  }

  const itemsTotal = order.items.reduce((sum, item) => sum + item.subtotal, 0)
  const deliveryCost = order.deliveryCost || 0
  const finalTotal = itemsTotal + deliveryCost

  return (
    <Container size="sm" py="md">
      <Stack align="center" gap="xl">
        {/* Успешное оформление */}
        <Stack align="center" gap="md">
          <ThemeIcon size={80} radius="xl" color="green" variant="light">
            <IconCheck size={40} />
          </ThemeIcon>
          <Title order={2} ta="center" c="green">
            Заказ успешно оформлен!
          </Title>
          <Text size="lg" c="dimmed" ta="center">
            Номер заказа: #{order.id}
          </Text>
        </Stack>

        {/* Кассовый чек */}
        <Paper 
          shadow="sm" 
          p="lg" 
          radius="md" 
          withBorder 
          style={{ 
            maxWidth: 400, 
            width: '100%',
            fontFamily: 'monospace'
          }}
        >
          <Stack gap="xs">
            {/* Заголовок чека */}
            <Center>
              <Text fw={700} size="lg">ДИМБО пицца</Text>
            </Center>
            <Center>
              <Text size="sm">Заказ № {order.id}</Text>
            </Center>
            <Center>
              <Text size="sm">Кассир: Система</Text>
            </Center>
            
            <Text ta="center" style={{ fontSize: '12px' }}>
              {'='.repeat(35)}
            </Text>

            {/* Товары */}
            <Stack gap="xs">
              {order.items.map((item, index) => (
                <Box key={item.id}>
                  <Group justify="space-between" gap="xs">
                    <Text size="sm" style={{ flex: 1 }}>
                      {index + 1}. {item.productName}
                    </Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm">
                      {item.quantity} шт × {formatPrice(item.price)}
                    </Text>
                    <Text size="sm" fw={500}>
                      {formatPrice(item.subtotal)}
                    </Text>
                  </Group>
                </Box>
              ))}
            </Stack>

            <Text ta="center" style={{ fontSize: '12px' }}>
              {'='.repeat(35)}
            </Text>

            {/* Итоги */}
            <Group justify="space-between">
              <Text size="sm">Товары:</Text>
              <Text size="sm">{formatPrice(itemsTotal)}</Text>
            </Group>
            
            <Group justify="space-between">
              <Text size="sm">Доставка:</Text>
              <Text size="sm">{formatPrice(deliveryCost)}</Text>
            </Group>

            <Box 
              p="sm" 
              style={{ 
                border: '2px solid black', 
                borderRadius: '4px',
                margin: '8px 0'
              }}
            >
              <Group justify="space-between">
                <Text fw={700} size="lg">ИТОГО</Text>
                <Text fw={700} size="lg">={formatPrice(finalTotal)}</Text>
              </Group>
            </Box>

            <Group justify="space-between">
              <Text size="sm" fw={600}>
                {order.paymentMethod === 'SBP' ? 'СБП' : 
                 order.paymentMethod === 'CASH' ? 'НАЛИЧНЫМИ' : 
                 order.paymentMethod?.toUpperCase()}
              </Text>
              <Text size="sm" fw={600}>
                ={formatPrice(finalTotal)}
              </Text>
            </Group>

            <Center mt="md">
              <Text size="xs" c="dimmed">
                {formatReceiptDate(order.createdAt)}
              </Text>
            </Center>
          </Stack>
        </Paper>

        {/* Информация о доставке */}
        {order.deliveryType === 'DELIVERY' && order.deliveryAddress && (
          <Paper shadow="sm" p="md" radius="md" withBorder style={{ width: '100%' }}>
            <Stack gap="xs">
              <Text fw={600} size="sm">Доставка:</Text>
              <Text size="sm">{order.deliveryAddress}</Text>
              <Text size="xs" c="dimmed">
                Ожидайте звонка курьера
              </Text>
            </Stack>
          </Paper>
        )}

        {order.deliveryType === 'PICKUP' && (
          <Paper shadow="sm" p="md" radius="md" withBorder style={{ width: '100%' }}>
            <Stack gap="xs">
              <Text fw={600} size="sm">Самовывоз:</Text>
              <Text size="sm">г. Волжск, ул. Шестакова, д.1Б</Text>
              <Text size="xs" c="dimmed">
                Режим работы: 10:00 - 22:00
              </Text>
            </Stack>
          </Paper>
        )}

        {/* Кнопка возврата */}
        <Button
          leftSection={<IconHome size={16} />}
          size="lg"
          color="orange"
          fullWidth
          onClick={handleGoHome}
          style={{ maxWidth: 400 }}
        >
          На главную
        </Button>
      </Stack>

      {/* Виджет отзывов Яндекс Карт */}
      <YandexReviewsWidget />
    </Container>
  )
}

export default OrderSuccessPage