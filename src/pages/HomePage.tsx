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

  Text,
  Group,
  Button
} from '@mantine/core'
import { IconPizza, IconShoppingCart } from '@tabler/icons-react'
import { useAuth } from '../contexts/AuthContext'
import { useProducts } from '../contexts/ProductsContext'
import { SEOPageWrapper } from '../components/SEOHead'
import { HomePageSEOContent, AboutUsSEOBlock } from '../components/seo/IndexingContent'
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '../utils/seo'
import { AppInstallButtons } from '../components/AppInstallButtons'
import { CategoryImage, ProductCardImage } from '../components/common/OptimizedImage'

export function HomePage() {
  const navigate = useNavigate()
  const { } = useAuth()
  const { 
    state: { 
      categories,
      categoriesLoading,
      categoriesError,
      products, 
      productsLoading, 
      productsError 
    },
    addToCart,
    loadProducts
  } = useProducts()

  // Загружаем популярные продукты при инициализации
  // (категории уже загружаются в App.tsx)
  useEffect(() => {
    loadProducts({ size: 8, page: 0 })
  }, [])

  // JSON-LD данные для главной страницы
  const structuredData = {
    businessSchema: generateLocalBusinessSchema(),
    breadcrumbSchema: generateBreadcrumbSchema([
      { name: 'Главная', url: 'https://dimbopizza.ru/' }
    ])
  }

  return (
    <SEOPageWrapper 
      page="home" 
      customSeo={{
        structuredData,
        title: 'ДИМБО Пицца - Доставка вкусной пиццы в Волжске | Заказать онлайн',
        description: 'Заказать пиццу в Волжске с доставкой на дом. Свежие ингредиенты, быстрая доставка 30-60 минут, оплата наличными или картой. Работаем ежедневно!',
        keywords: ['заказать пиццу Волжск', 'доставка пиццы Волжск', 'ДИМБО пицца', 'пицца на дом Волжск']
      }}
    >
      <Container size="lg">
      <Stack gap="lg">
        {/* Блок с установкой приложения */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between">
              <Title order={2} c="orange.7">
                Скачайте мобильное приложение ДИМБО Пицца
              </Title>
              <Badge color="blue" variant="light">Рекомендуем</Badge>
            </Group>
            <Text c="dimmed">
              Получите лучший опыт заказа пиццы с нашим мобильным приложением. 
              Быстрое оформление заказов, эксклюзивные акции и удобное отслеживание доставки.
            </Text>
            <AppInstallButtons title="Установите приложение прямо сейчас" />
          </Stack>
        </Card>

        {/* Категории */}
        <Title order={3} c="dark">Категории</Title>
        
        {categoriesLoading && (
          <Center>
            <Loader size="md" />
            <Text ml="md">Загрузка категорий...</Text>
          </Center>
        )}
        
        {categoriesError && (
          <Card shadow="sm" padding="lg" radius="md" withBorder bg="red.0">
            <Text c="red.7">Ошибка загрузки категорий: {categoriesError}</Text>
          </Card>
        )}
        
        {!categoriesLoading && !categoriesError && categories && categories.length > 0 && (
          <Grid>
            {categories.map((category) => (
              <Grid.Col key={category.id} span={{ base: 6, sm: 6, md: 4 }}>
                <Card 
                  shadow="sm" 
                  padding="lg" 
                  radius="md" 
                  withBorder
                  className="category-card-compact"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/menu?category=${category.id}`)}
                >
                  <Card.Section>
                    <CategoryImage 
                      src={category.imageUrl}
                      alt={category.name}
                    />
                  </Card.Section>

                  <Group justify="center" mt="md">
                    <Text fw={500} ta="center">{category.name}</Text>
                  </Group>

                  <Text size="sm" c="dimmed" ta="center" mt="xs">
                    {category.description}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        )}

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
              <Grid.Col key={product.id} span={{ base: 6, sm: 6, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder className="product-card-compact">
                  <Card.Section>
                    <ProductCardImage 
                      src={product.imageUrl}
                      alt={product.name}
                    />
                  </Card.Section>

                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500} lineClamp={2}>{product.name}</Text>
                    <Badge 
                      color={product.available ? "orange" : "gray"} 
                      variant="light"
                    >
                      {product.discountedPrice ? (
                        <>
                          <Text component="span" td="line-through" c="gray" size="sm">
                            {product.price} ₽
                          </Text>
                          {' '}
                          {product.discountedPrice} ₽
                        </>
                      ) : (
                        `${product.price} ₽`
                      )}
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
                      disabled={!product.available}
                      onClick={(e) => {
                        e.stopPropagation()
                        addToCart({ 
                          productId: product.id, 
                          quantity: 1 
                        })
                      }}
                    >
                      {product.available ? 'В корзину' : 'Недоступно'}
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

        
        {/* Статус разработки - обновлен */}
       
                {/* SEO контент для главной страницы */}
          <HomePageSEOContent />

          {/* Блок "О нас" */}
          <AboutUsSEOBlock />
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
} 