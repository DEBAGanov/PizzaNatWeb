/**
 * @file: CartPage.tsx
 * @description: Страница корзины с управлением товарами и переходом к оформлению заказа
 * @dependencies: Mantine, ProductsContext, React Router
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
  Image,
  NumberInput,
  ActionIcon,
  Divider,
  Paper,
  Badge,
  Center,
  Loader,
  Alert,
  ThemeIcon,
  SimpleGrid,
  ScrollArea
} from '@mantine/core'
import {
  IconShoppingCart,
  IconTrash,
  IconPlus,
  IconMinus,
  IconArrowLeft,
  IconCreditCard,
  IconInfoCircle,
  IconCheck,
  IconAlertTriangle
} from '@tabler/icons-react'
import { useProducts } from '../contexts/ProductsContext'
import { SEOPageWrapper } from '../components/SEOHead'
import { OrderButton } from '../components/telegram/TelegramButton'
import { useTelegramPage } from '../components/telegram/TelegramApp'
import { notifications } from '@mantine/notifications'
import type { CartItem } from '../types/products'

export function CartPage() {
  const navigate = useNavigate()
  const { 
    state: { cartLoading, cartError },
    updateCartItem, 
    removeFromCart, 
    loadCart,
    getFilteredCart
  } = useProducts()

  // Используем отфильтрованную корзину (без удаленных элементов)
  const cart = getFilteredCart()
  console.log('🛒 CartPage: получили корзину от getFilteredCart =', cart?.items?.map(item => ({ id: item.id, name: item.productName })))

  const [updateLoading, setUpdateLoading] = useState<number | null>(null)

  // Telegram Web App специфичная логика
  useTelegramPage('cart')

  useEffect(() => {
    loadCart()
  }, [loadCart])

  // Обновление количества товара
  const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    
    if (!productId) {
      console.error('❌ Попытка обновить элемент с пустым productId')
      return
    }
    
    // Устанавливаем локальный loading для конкретного элемента
    setUpdateLoading(productId)
    try {
      console.log('📊 Обновляем количество товара по productId:', { productId, newQuantity })
      await updateCartItem(productId, { quantity: newQuantity })
      // Успех - updateCartItem уже показал уведомление если нужно
    } catch (error: any) {
      // Ошибки уже обрабатываются в updateCartItem, здесь только логируем
      console.error('❌ Необработанная ошибка обновления:', error)
    } finally {
      // Сбрасываем локальный loading только после завершения всех операций
      setUpdateLoading(null)
    }
  }

  // Удаление товара из корзины
  const handleRemoveItem = async (productId: number) => {
    if (!productId) {
      console.error('❌ Попытка удалить товар с пустым productId')
      return
    }
    
    // Устанавливаем локальный loading для конкретного элемента
    setUpdateLoading(productId)
    try {
      console.log('🗑️ Удаляем товар по productId:', productId)
      await removeFromCart(productId)
      // Успех - removeFromCart уже показал уведомление
    } catch (error: any) {
      // Ошибки уже обрабатываются в removeFromCart, здесь только логируем
      console.error('❌ Необработанная ошибка удаления:', error)
    } finally {
      // Сбрасываем локальный loading только после завершения всех операций
      setUpdateLoading(null)
    }
  }

  // Переход к оформлению заказа
  const handleCheckout = () => {
    navigate('/checkout')
  }

  // Возврат к меню
  const handleBackToMenu = () => {
    navigate('/menu')
  }

  if (cartLoading && !cart) {
    return (
      <Container size="md" py="xl">
        <Center>
          <Stack align="center" gap="md">
            <Loader size="lg" color="orange" />
            <Text>Загрузка корзины...</Text>
          </Stack>
        </Center>
      </Container>
    )
  }

  if (cartError) {
    return (
      <Container size="md" py="xl">
        <Alert 
          icon={<IconAlertTriangle size={16} />} 
          title="Ошибка загрузки корзины" 
          color="red"
        >
          {cartError}
          <Group mt="md">
            <Button variant="light" onClick={() => loadCart()}>
              Попробовать снова
            </Button>
            <Button variant="outline" onClick={handleBackToMenu}>
              Вернуться в меню
            </Button>
          </Group>
        </Alert>
      </Container>
    )
  }

  const isEmpty = !cart || cart.items.length === 0

  if (isEmpty) {
    return (
      <Container size="md" py="xl">
        <Stack align="center" gap="xl">
          <ThemeIcon size={120} color="orange" variant="light">
            <IconShoppingCart size={60} />
          </ThemeIcon>
          
          <Stack align="center" gap="md">
            <Title order={2} ta="center">Ваша корзина пуста</Title>
            <Text size="lg" c="dimmed" ta="center">
              Добавьте товары из меню, чтобы оформить заказ
            </Text>
          </Stack>

          <Button 
            size="lg" 
            color="orange"
            leftSection={<IconArrowLeft size={20} />}
            onClick={handleBackToMenu}
          >
            Перейти в меню
          </Button>
        </Stack>
      </Container>
    )
  }

  return (
    <SEOPageWrapper 
      page="cart"
      customSeo={{
        noIndex: true // Корзина не должна индексироваться
      }}
    >
      <Container size="md" py="md">
        <Stack gap="lg">
        {/* Заголовок страницы */}
        <Group justify="space-between" align="center">
          <Group>
            <ActionIcon 
              variant="light" 
              size="lg"
              onClick={handleBackToMenu}
            >
              <IconArrowLeft size={20} />
            </ActionIcon>
            <Title order={1} c="orange.7">
              🛒 Корзина
            </Title>
          </Group>
          <Badge size="lg" color="orange" variant="light">
            {cart.items.length} товар{cart.items.length > 1 ? 'а' : ''}
          </Badge>
        </Group>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          {/* Список товаров */}
          <Stack gap="md">
            <ScrollArea.Autosize mah={600} offsetScrollbars>
              <Stack gap="md">
                {cart.items.map((item: CartItem) => {
                  if (!item.id) {
                    console.warn('⚠️ Элемент корзины без ID:', item)
                    return null
                  }
                  return (
                  <Card key={item.id} shadow="sm" padding="md" radius="md" withBorder>
                    <Group gap="md" align="flex-start">
                      {/* Изображение товара */}
                      <Image
                        src={item.productImageUrl}
                        alt={item.productName}
                        w={80}
                        h={80}
                        radius="md"
                        fallbackSrc="/placeholder-food.jpg"
                      />

                      {/* Информация о товаре */}
                      <Stack gap="xs" style={{ flex: 1 }}>
                        <Group justify="space-between" align="flex-start">
                          <div>
                            <Text fw={600} size="md">{item.productName}</Text>
                            {item.notes && (
                              <Text size="sm" c="dimmed">{item.notes}</Text>
                            )}
                          </div>
                          <ActionIcon
                            color="red"
                            variant="light"
                            size="sm"
                            loading={updateLoading === item.productId}
                            disabled={cartLoading || updateLoading === item.productId}
                            onClick={() => handleRemoveItem(item.productId)}
                          >
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Group>

                        {/* Управление количеством */}
                        <Group justify="space-between" align="center">
                          <Group gap="xs">
                            <ActionIcon
                              variant="outline"
                              size="sm"
                              disabled={item.quantity <= 1 || cartLoading || updateLoading === item.productId}
                              onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                            >
                              <IconMinus size={14} />
                            </ActionIcon>
                            
                            <NumberInput
                              value={item.quantity}
                              onChange={(value) => handleUpdateQuantity(item.productId, Number(value) || 1)}
                              min={1}
                              max={99}
                              size="sm"
                              w={60}
                              hideControls
                              disabled={cartLoading || updateLoading === item.productId}
                            />
                            
                            <ActionIcon
                              variant="outline"
                              size="sm"
                              disabled={item.quantity >= 99 || cartLoading || updateLoading === item.productId}
                              onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                            >
                              <IconPlus size={14} />
                            </ActionIcon>
                          </Group>

                          <Text fw={600} size="lg" c="orange.7">
                            {item.subtotal} ₽
                          </Text>
                        </Group>
                      </Stack>
                    </Group>
                  </Card>
                  )
                })}
              </Stack>
            </ScrollArea.Autosize>
          </Stack>

          {/* Итоги и оформление заказа */}
          <Stack gap="md">
            <Paper shadow="sm" p="md" radius="md" withBorder>
              <Stack gap="md">
                <Title order={3}>Итого</Title>
                
                <Divider />
                
                <Group justify="space-between">
                  <Text>Товары ({cart.items.length})</Text>
                  <Text>{cart.totalAmount} ₽</Text>
                </Group>
                
                <Group justify="space-between">
                  <Text>Доставка</Text>
                  <Text c="dimmed">Рассчитается при оформлении</Text>
                </Group>
                
                <Divider />
                
                <Group justify="space-between">
                  <Text fw={600} size="lg">К оплате</Text>
                  <Text fw={700} size="xl" c="orange.7">
                    от {cart.totalAmount} ₽
                  </Text>
                </Group>

                <OrderButton
                  total={cart?.totalAmount || 0}
                  itemsCount={cart?.items?.length || 0}
                  onClick={handleCheckout}
                  disabled={cartLoading}
                />

                <Alert 
                  icon={<IconInfoCircle size={16} />} 
                  color="blue" 
                  variant="light"
                >
                  <Text size="sm">
                    Минимальная сумма заказа: 300 ₽
                  </Text>
                </Alert>
              </Stack>
            </Paper>

            {/* Дополнительная информация */}
            <Paper shadow="sm" p="md" radius="md" withBorder>
              <Stack gap="sm">
                <Group>
                  <ThemeIcon size="sm" color="green" variant="light">
                    <IconCheck size={14} />
                  </ThemeIcon>
                  <Text size="sm">Бесплатная доставка от 1000 ₽</Text>
                </Group>
                
                <Group>
                  <ThemeIcon size="sm" color="blue" variant="light">
                    <IconInfoCircle size={14} />
                  </ThemeIcon>
                  <Text size="sm">Доставка 30-60 минут</Text>
                </Group>
                
                <Group>
                  <ThemeIcon size="sm" color="orange" variant="light">
                    <IconCreditCard size={14} />
                  </ThemeIcon>
                  <Text size="sm">Оплата картой или наличными</Text>
                </Group>
              </Stack>
            </Paper>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Container>
    </SEOPageWrapper>
  )
}