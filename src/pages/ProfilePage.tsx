/**
 * @file: ProfilePage.tsx
 * @description: Страница профиля пользователя с историей заказов и функцией выхода
 * @dependencies: Mantine, AuthContext, ProductsContext
 * @created: 2025-01-24
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Stack,
  Title,
  Text,
  Group,
  Button,
  Paper,
  Avatar,
  Badge,
  Divider,
  Box,
  Loader,
  Alert,
  ActionIcon
} from '@mantine/core'
import {
  IconUser,
  IconLogout,
  IconPhone,
  IconMail,
  IconCalendar,
  IconMoneybag,
  IconMapPin,
  IconTruck,
  IconRefresh
} from '@tabler/icons-react'
import { useAuth } from '../contexts/AuthContext'
import { notifications } from '@mantine/notifications'
import { productsApi } from '../services/productsApi'
import type { Order } from '../types/products'

// Типы импортированы из types/products.ts

const ProfilePage: React.FC = () => {
  console.log('🟢 ProfilePage: компонент рендерится')
  const { user, logout, tokens } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Загрузка заказов пользователя
  const loadOrders = async (showRefreshLoader = false) => {
    if (showRefreshLoader) setRefreshing(true)
    
    try {
      console.log('🔍 ProfilePage: загружаем заказы для пользователя', user?.username)
      
      if (!user || !tokens?.access_token) {
        console.warn('❌ ProfilePage: нет пользователя или токена')
        setOrders([])
        setLoading(false)
        return
      }

      const ordersResponse = await productsApi.getOrders()
      setOrders(ordersResponse.content || [])
      console.log('✅ Заказы загружены:', ordersResponse)
    } catch (error: any) {
      console.error('❌ Ошибка загрузки заказов:', error)
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось загрузить историю заказов',
        color: 'red'
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    console.log('🔄 ProfilePage useEffect: пользователь изменился', user?.username, 'токен:', !!tokens?.access_token)
    if (user && tokens?.access_token) {
      loadOrders()
    } else {
      console.warn('⚠️ ProfilePage: нет пользователя или токена, заказы не загружаются')
      setLoading(false)
    }
  }, [user, tokens])

  // Обработка выхода из аккаунта
  const handleLogout = () => {
    logout()
    notifications.show({
      title: 'Выход выполнен',
      message: 'Вы успешно вышли из аккаунта',
      color: 'blue'
    })
    navigate('/')
  }

  // Форматирование даты
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  // Статус заказа
  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { label: 'Ожидает подтверждения', color: 'yellow' }
      case 'confirmed':
        return { label: 'Подтвержден', color: 'blue' }
      case 'preparing':
        return { label: 'Готовится', color: 'orange' }
      case 'ready':
        return { label: 'Готов', color: 'green' }
      case 'delivering':
        return { label: 'Доставляется', color: 'cyan' }
      case 'delivered':
        return { label: 'Доставлен', color: 'green' }
      case 'completed':
        return { label: 'Завершен', color: 'green' }
      case 'cancelled':
        return { label: 'Отменен', color: 'red' }
      default:
        return { label: status, color: 'gray' }
    }
  }

  if (!user) {
    return (
      <Container size="sm" py="xl">
        <Alert color="red">
          Для доступа к профилю необходимо авторизоваться
        </Alert>
      </Container>
    )
  }

  return (
    <Container size="sm" py="md">
      <Stack gap="lg">
        {/* Информация о пользователе */}
        <Paper shadow="sm" p="lg" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between">
              <Group gap="md">
                <Avatar size={60} color="orange">
                  <IconUser size={30} />
                </Avatar>
                <Box>
                  <Title order={3}>
                    {(user as any).first_name 
                      ? `${(user as any).first_name} ${(user as any).last_name || ''}`.trim()
                      : user.fullName || user.username || 'Пользователь'
                    }
                  </Title>
                  <Text size="sm" c="dimmed">@{user.username}</Text>
                </Box>
              </Group>
              <ActionIcon
                variant="light"
                color="orange"
                size="lg"
                onClick={() => loadOrders(true)}
                loading={refreshing}
              >
                <IconRefresh size={18} />
              </ActionIcon>
            </Group>

            <Divider />

            <Stack gap="xs">
              {(user as any).email && (
                <Group gap="xs">
                  <IconMail size={16} />
                  <Text size="sm">{(user as any).email}</Text>
                </Group>
              )}
              {((user as any).phone || user.phoneNumber) && (
                <Group gap="xs">
                  <IconPhone size={16} />
                  <Text size="sm">{(user as any).phone || user.phoneNumber}</Text>
                </Group>
              )}
            </Stack>

            <Button
              leftSection={<IconLogout size={16} />}
              variant="filled"
              color="red"
              onClick={handleLogout}
              fullWidth
            >
              Выйти из аккаунта
            </Button>
          </Stack>
        </Paper>

        {/* История заказов */}
        <Paper shadow="sm" p="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={3}>История заказов</Title>
            
            {loading ? (
              <Group justify="center" py="xl">
                <Loader size="md" />
                <Text>Загружаем заказы...</Text>
              </Group>
            ) : orders.length === 0 ? (
              <Alert color="blue" icon={<IconTruck size={16} />}>
                <Text>У вас пока нет заказов</Text>
                <Text size="sm" c="dimmed">Самое время заказать что-нибудь вкусное!</Text>
              </Alert>
            ) : (
              <Stack gap="md">
                {orders.map((order) => {
                  const statusInfo = getStatusInfo(order.status)
                  return (
                    <Paper key={order.id} p="md" withBorder radius="md">
                      <Stack gap="sm">
                        <Group justify="space-between">
                          <Text fw={600}>Заказ #{order.id}</Text>
                          <Badge color={statusInfo.color} variant="light">
                            {statusInfo.label}
                          </Badge>
                        </Group>

                        <Group gap="md" wrap="wrap">
                          <Group gap="xs">
                            <IconCalendar size={14} />
                            <Text size="sm">{formatDate(order.createdAt)}</Text>
                          </Group>
                          <Group gap="xs">
                            <IconMoneybag size={14} />
                            <Text size="sm" fw={500}>{order.totalAmount} ₽</Text>
                          </Group>
                          {order.deliveryAddress && (
                            <Group gap="xs">
                              <IconMapPin size={14} />
                              <Text size="sm" lineClamp={1}>{order.deliveryAddress}</Text>
                            </Group>
                          )}
                          <Group gap="xs">
                            <IconTruck size={14} />
                            <Text size="sm">
                              {order.deliveryType === 'DELIVERY' ? 'Доставка курьером' : 'Самовывоз'}
                            </Text>
                          </Group>
                        </Group>

                        {/* Товары в заказе */}
                        <Box>
                          <Text size="sm" fw={500} mb="xs">Товары:</Text>
                          <Stack gap="xs">
                            {order.items.map((item) => (
                              <Group key={item.id} justify="space-between">
                                <Text size="sm" lineClamp={1}>
                                  {item.productName}
                                </Text>
                                <Text size="sm" c="dimmed">
                                  {item.quantity} шт. × {item.price} ₽
                                </Text>
                              </Group>
                            ))}
                          </Stack>
                        </Box>
                      </Stack>
                    </Paper>
                  )
                })}
              </Stack>
            )}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}

export default ProfilePage