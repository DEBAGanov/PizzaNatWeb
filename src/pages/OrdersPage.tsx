/**
 * @file: OrdersPage.tsx
 * @description: Страница просмотра истории заказов пользователя
 * @dependencies: Mantine, AuthContext, API типы
 * @created: 2025-01-24
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Stack,
  Title,
  Card,
  Text,
  Group,
  Button,
  Badge,
  Paper,
  Center,
  Loader,
  Alert,
  ActionIcon,
  Divider,
  Timeline,
  ThemeIcon,
  ScrollArea,
  Select
} from '@mantine/core'
import {
  IconArrowLeft,
  IconPackage,
  IconClock,
  IconCheck,
  IconTruck,
  IconMapPin,
  IconPhone,
  IconCreditCard,
  IconCash,
  IconAlertTriangle,
  IconInfoCircle,
  IconRefresh
} from '@tabler/icons-react'
import { useAuth } from '../contexts/AuthContext'
import { YandexReviewsWidget } from '../components/common/YandexReviewsWidget'
import { notifications } from '@mantine/notifications'
import { getAuthToken } from '../services/api'

interface OrderItem {
  id: number
  product: {
    id: number
    name: string
    image_url?: string
  }
  quantity: number
  price: number
  total_price: number
}

interface Order {
  id: number
  status: string
  total_amount: number
  delivery_address?: string
  contact_name: string
  contact_phone: string
  comment?: string
  items: OrderItem[]
  created_at: string
  updated_at: string
}

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'created':
    case 'pending':
      return 'blue'
    case 'confirmed':
      return 'cyan'
    case 'preparing':
      return 'yellow'
    case 'ready':
      return 'orange'
    case 'delivering':
      return 'grape'
    case 'delivered':
      return 'green'
    case 'cancelled':
      return 'red'
    default:
      return 'gray'
  }
}

const getStatusLabel = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'created':
      return 'Создан'
    case 'pending':
      return 'Ожидает подтверждения'
    case 'confirmed':
      return 'Подтвержден'
    case 'preparing':
      return 'Готовится'
    case 'ready':
      return 'Готов'
    case 'delivering':
      return 'Доставляется'
    case 'delivered':
      return 'Доставлен'
    case 'cancelled':
      return 'Отменен'
    default:
      return status
  }
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'created':
    case 'pending':
      return <IconClock size={16} />
    case 'confirmed':
      return <IconCheck size={16} />
    case 'preparing':
      return <IconPackage size={16} />
    case 'ready':
      return <IconCheck size={16} />
    case 'delivering':
      return <IconTruck size={16} />
    case 'delivered':
      return <IconCheck size={16} />
    case 'cancelled':
      return <IconAlertTriangle size={16} />
    default:
      return <IconInfoCircle size={16} />
  }
}

export function OrdersPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('')

  const loadOrders = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/v1/orders', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${getAuthToken() || ''}`
        }
      })

      if (response.ok) {
        const ordersData = await response.json()
        setOrders(Array.isArray(ordersData) ? ordersData : ordersData.data || [])
      } else if (response.status === 401) {
        setError('Необходима авторизация')
        navigate('/auth')
      } else {
        throw new Error('Ошибка загрузки заказов')
      }
    } catch (err: any) {
      setError(err.message || 'Не удалось загрузить заказы')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      loadOrders()
    } else {
      navigate('/auth')
    }
  }, [user, navigate])

  const filteredOrders = statusFilter 
    ? orders.filter(order => order.status.toLowerCase() === statusFilter.toLowerCase())
    : orders

  const handleOrderClick = (orderId: number) => {
    navigate(`/orders/${orderId}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!user) {
    return (
      <Container size="md" py="xl">
        <Alert 
          icon={<IconAlertTriangle size={16} />} 
          title="Необходима авторизация" 
          color="orange"
        >
          Войдите в аккаунт для просмотра истории заказов
          <Group mt="md">
            <Button variant="light" onClick={() => navigate('/auth')}>
              Войти
            </Button>
          </Group>
        </Alert>
      </Container>
    )
  }

  if (loading) {
    return (
      <Container size="md" py="xl">
        <Center>
          <Stack align="center" gap="md">
            <Loader size="lg" color="orange" />
            <Text>Загрузка заказов...</Text>
          </Stack>
        </Center>
      </Container>
    )
  }

  if (error) {
    return (
      <Container size="md" py="xl">
        <Alert 
          icon={<IconAlertTriangle size={16} />} 
          title="Ошибка загрузки" 
          color="red"
        >
          {error}
          <Group mt="md">
            <Button variant="light" onClick={loadOrders}>
              Попробовать снова
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              На главную
            </Button>
          </Group>
        </Alert>
      </Container>
    )
  }

  return (
    <Container size="lg" py="md">
      <Stack gap="lg">
        {/* Заголовок */}
        <Group justify="space-between" align="center">
          <Group>
            <ActionIcon 
              variant="light" 
              size="lg"
              onClick={() => navigate('/')}
            >
              <IconArrowLeft size={20} />
            </ActionIcon>
            <Title order={1} c="orange.7">
              📦 Мои заказы
            </Title>
          </Group>
          
          <Group>
            <ActionIcon variant="light" onClick={loadOrders}>
              <IconRefresh size={18} />
            </ActionIcon>
            <Badge size="lg" color="orange" variant="light">
              {orders.length} заказ{orders.length !== 1 ? 'ов' : ''}
            </Badge>
          </Group>
        </Group>

        {/* Фильтр по статусу */}
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <Group>
            <Text fw={600}>Фильтр по статусу:</Text>
            <Select
              placeholder="Все статусы"
              value={statusFilter}
              onChange={(value) => setStatusFilter(value || '')}
              data={[
                { value: '', label: 'Все статусы' },
                { value: 'created', label: 'Создан' },
                { value: 'confirmed', label: 'Подтвержден' },
                { value: 'preparing', label: 'Готовится' },
                { value: 'delivering', label: 'Доставляется' },
                { value: 'delivered', label: 'Доставлен' },
                { value: 'cancelled', label: 'Отменен' }
              ]}
              clearable
              w={200}
            />
            <Text size="sm" c="dimmed">
              Найдено: {filteredOrders.length}
            </Text>
          </Group>
        </Card>

        {/* Список заказов */}
        {filteredOrders.length === 0 ? (
          <Paper p="xl" ta="center">
            <ThemeIcon size={80} color="orange" variant="light" mb="md">
              <IconPackage size={40} />
            </ThemeIcon>
            <Title order={3} mb="sm">
              {statusFilter ? 'Заказов с таким статусом нет' : 'У вас пока нет заказов'}
            </Title>
            <Text c="dimmed" mb="lg">
              {statusFilter 
                ? 'Попробуйте изменить фильтр или оформите новый заказ'
                : 'Перейдите в меню и оформите свой первый заказ'
              }
            </Text>
            <Button color="orange" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>
              Перейти в меню
            </Button>
          </Paper>
        ) : (
          <Stack gap="md">
            {filteredOrders.map((order) => (
              <Card 
                key={order.id} 
                shadow="sm" 
                padding="lg" 
                radius="md" 
                withBorder
                style={{ cursor: 'pointer' }}
                onClick={() => handleOrderClick(order.id)}
              >
                <Stack gap="md">
                  {/* Заголовок заказа */}
                  <Group justify="space-between" align="flex-start">
                    <div>
                      <Group gap="sm" mb="xs">
                        <Text fw={700} size="lg">Заказ №{order.id}</Text>
                        <Badge 
                          color={getStatusColor(order.status)} 
                          variant="light"
                          leftSection={getStatusIcon(order.status)}
                        >
                          {getStatusLabel(order.status)}
                        </Badge>
                      </Group>
                      <Text size="sm" c="dimmed">
                        {formatDate(order.created_at)}
                      </Text>
                    </div>
                    
                    <Text fw={700} size="xl" c="orange.7">
                      {order.total_amount} ₽
                    </Text>
                  </Group>

                  <Divider />

                  {/* Информация о доставке */}
                  <Group gap="md" wrap="nowrap">
                    <ThemeIcon size="sm" color="gray" variant="light">
                      <IconMapPin size={14} />
                    </ThemeIcon>
                    <Text size="sm" style={{ flex: 1 }}>
                      {order.delivery_address || 'Самовывоз'}
                    </Text>
                  </Group>

                  <Group gap="md" wrap="nowrap">
                    <ThemeIcon size="sm" color="gray" variant="light">
                      <IconPhone size={14} />
                    </ThemeIcon>
                    <Text size="sm">
                      {order.contact_name} • {order.contact_phone}
                    </Text>
                  </Group>

                  {/* Товары */}
                  <Stack gap="xs">
                    <Text fw={600} size="sm">Товары:</Text>
                    <ScrollArea.Autosize mah={120}>
                      <Stack gap="xs">
                        {order.items.map((item) => (
                          <Group key={item.id} justify="space-between">
                            <Text size="sm" style={{ flex: 1 }}>
                              {item.product.name} x{item.quantity}
                            </Text>
                            <Text size="sm" fw={600}>
                              {item.total_price} ₽
                            </Text>
                          </Group>
                        ))}
                      </Stack>
                    </ScrollArea.Autosize>
                  </Stack>

                  {order.comment && (
                    <>
                      <Divider />
                      <Group gap="md" wrap="nowrap">
                        <ThemeIcon size="sm" color="blue" variant="light">
                          <IconInfoCircle size={14} />
                        </ThemeIcon>
                        <Text size="sm" c="dimmed" style={{ flex: 1 }}>
                          {order.comment}
                        </Text>
                      </Group>
                    </>
                  )}

                  {/* Кнопка подробнее */}
                  <Button 
                    variant="light" 
                    color="orange" 
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOrderClick(order.id)
                    }}
                  >
                    Подробнее
                  </Button>
                </Stack>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>

      {/* Виджет отзывов Яндекс Карт */}
      <YandexReviewsWidget />
    </Container>
  )
}