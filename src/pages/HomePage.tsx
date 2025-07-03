/**
 * @file: HomePage.tsx
 * @description: Главная страница PizzaNat Web с популярными продуктами
 * @dependencies: Mantine, ProductsContext, AppStoreLinks
 * @created: 2025-01-07
 */

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Stack,
  Title,
  Card,
  Badge,
  Grid,
  Center,
  Loader,
  Image,
  Text,
  Group,
  Button
} from '@mantine/core'
import { IconPizza } from '@tabler/icons-react'
import { useAuth } from '../contexts/AuthContext'
import { useProducts } from '../contexts/ProductsContext'
import { AppStoreLinks } from '../components/AppStoreLinks'

export function HomePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { 
    state: { 
      products, 
      productsLoading, 
      productsError 
    },
    addToCart,
    loadProducts
  } = useProducts()

  // Загружаем популярные продукты при инициализации
  useEffect(() => {
    loadProducts({ limit: 8, is_popular: true })
  }, [])

  return (
    <Container size="lg">
      <Stack gap="lg">
        {/* Приветственный блок с информацией о пользователе */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between">
              <Title order={2} c="orange.7">
                Добро пожаловать, {user?.fullName || 'в PizzaNat'}! 🍕
              </Title>
              <Badge color="green" variant="light">Аутентифицирован</Badge>
            </Group>
            <Text c="dimmed">
              Система аутентификации работает корректно! 
              Пользователь: {user?.username || user?.phoneNumber || user?.telegramId}
            </Text>
            <Button 
              color="orange" 
              size="md"
              onClick={() => navigate('/menu')}
            >
              Перейти к меню
            </Button>
          </Stack>
        </Card>

        {/* Продукты из API */}
        <Title order={3} c="dark">Популярные пиццы</Title>
        
        {productsLoading && (
          <Center>
            <Loader size="md" />
            <Text ml="md">Загрузка продуктов...</Text>
          </Center>
        )}
        
        {productsError && (
          <Card shadow="sm" padding="lg" radius="md" withBorder bg="red.0">
            <Text c="red.7">Ошибка загрузки продуктов: {productsError}</Text>
          </Card>
        )}
        
        {!productsLoading && !productsError && products && products.length > 0 && (
          <Grid>
            {products.slice(0, 8).map((product) => (
              <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images.find(img => img.is_primary)?.url || product.images[0]?.url}
                        height={160}
                        alt={product.name}
                        fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 24 24'%3E%3Cpath fill='%23ff8000' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E"
                      />
                    ) : (
                      <div style={{ 
                        height: 160, 
                        backgroundColor: '#f8f9fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <IconPizza size={48} color="#ff8000" />
                      </div>
                    )}
                  </Card.Section>

                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500} lineClamp={2}>{product.name}</Text>
                    <Badge 
                      color={product.is_available ? "orange" : "gray"} 
                      variant="light"
                    >
                      {product.base_price} ₽
                    </Badge>
                  </Group>

                  <Text size="sm" c="dimmed" lineClamp={3}>
                    {product.description || 'Описание отсутствует'}
                  </Text>

                  <Group mt="md" grow>
                    <Button 
                      variant="outline"
                      color="orange" 
                      radius="md"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      Подробнее
                    </Button>
                    <Button 
                      color="orange" 
                      radius="md"
                      disabled={!product.is_available}
                      onClick={() => addToCart({ 
                        product_id: product.id, 
                        quantity: 1 
                      })}
                    >
                      {product.is_available ? 'В корзину' : 'Недоступно'}
                    </Button>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        )}
        
        {!productsLoading && !productsError && (!products || products.length === 0) && (
          <Card shadow="sm" padding="lg" radius="md" withBorder bg="yellow.0">
            <Text c="yellow.7">Продукты не найдены</Text>
          </Card>
        )}

        {/* Кнопка "Смотреть все" */}
        {!productsLoading && !productsError && products && products.length > 0 && (
          <Center>
            <Button 
              variant="outline" 
              color="orange" 
              size="md"
              onClick={() => navigate('/menu')}
            >
              Смотреть все блюда
            </Button>
          </Center>
        )}

        {/* Ссылки на мобильные приложения */}
        <AppStoreLinks 
          googlePlayUrl="#google-play-placeholder"
          ruStoreUrl="#rustore-placeholder"
        />

        {/* Статус разработки - обновлен */}
        <Card shadow="sm" padding="lg" radius="md" withBorder bg="green.0">
          <Stack gap="xs">
            <Title order={4} c="green.7">Статус разработки - Фаза 3 в процессе!</Title>
            <Text size="sm" c="dimmed">
              ✅ Базовая настройка проекта<br/>
              ✅ Интеграция Mantine<br/>
              ✅ Мобильная адаптивность<br/>
              ✅ Система аутентификации (Email, SMS, Telegram)<br/>
              ✅ Управление состоянием пользователя<br/>
              ✅ Персистентность и автообновление токенов<br/>
              ✅ Интеграция с API продуктов<br/>
              ✅ Контекст управления продуктами<br/>
              ✅ Отображение реальных продуктов<br/>
              🔄 Страница меню с категориями<br/>
              ⏳ Корзина и заказы<br/>
              ⏳ Система платежей
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  )
} 