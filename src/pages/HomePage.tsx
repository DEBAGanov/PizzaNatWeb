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
import { HomePageSEOContent, AboutUsSEOBlock, SEOQuestionsBlock } from '../components/seo/IndexingContent'
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '../utils/seo'
import { AppInstallButtons } from '../components/AppInstallButtons'
import { CategoryImage, ProductCardImage } from '../components/common/OptimizedImage'

export function HomePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  
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

  // Проверка авторизации перед выполнением действий
  const handleActionWithAuth = (action: () => void) => {
    if (!user) {
      // Перенаправляем на внешнюю страницу авторизации
      window.location.href = 'https://dimbopizza.ru/auth'
      return
    }
    
    // Если пользователь авторизован, выполняем действие
    action()
  }

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
        title: 'ДИМБО Пицца Волжск - быстрая доставка пиццы на дом | Заказать онлайн',
        description: 'Доставка пиццы на дом в Волжске за 30-60 минут ⭐ Горячая пицца с доставкой от 800₽ ⭐ Лучше чем Додо Пицца на ул. Ленина 52 ⭐ Заказать пиццу с доставкой 24 часа',
        keywords: ['доставка пиццы на дом', 'быстрая доставка пиццы', 'заказать пиццу с доставкой', 'горячая пицца с доставкой', 'пицца волжск', 'димбо пицца', 'закрытая пицца', 'купить пиццу онлайн', 'бесплатная доставка пиццы', 'водитель доставит пиццу', 'самая вкусная пицца с доставкой', 'время доставки пиццы', 'режим работы пиццерий с доставкой']
      }}
    >
      <Container size="lg">
      <Stack gap="md">
        {/* Блок с установкой приложения */}
        <Card shadow="sm" padding="sm" radius="sm" withBorder>
          <Stack gap="sm">
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
                  onClick={() => handleActionWithAuth(() => navigate(`/menu?category=${category.id}`))}
                >
                  <Card.Section>
                    <CategoryImage 
                      src={category.imageUrl}
                      alt={category.name}
                    />
                  </Card.Section>

                  <Group justify="center" mt="md">
                    <Text fw={500} ta="center" className="category-title">{category.name}</Text>
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
                    <Text fw={500} lineClamp={2} className="product-title">{product.name}</Text>
                    <Badge 
                      color={product.available ? "orange" : "gray"} 
                      variant="light"
                      className="product-price"
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
                      className="telegram-button-mobile"
                      onClick={() => handleActionWithAuth(() => navigate(`/product/${product.id}`))}
                    >
                      Подробнее
                    </Button>
                    <Button 
                      color="orange" 
                      radius="md"
                      className="telegram-button-mobile"
                      disabled={!product.available}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleActionWithAuth(() => addToCart({ 
                          productId: product.id, 
                          quantity: 1 
                        }))
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

        
        {/* SEO контент для главной страницы */}
        <HomePageSEOContent />
        
        {/* SEO блок с вопросами про доставку пиццы */}
        <SEOQuestionsBlock />

          {/* Блок "О нас" */}
          <AboutUsSEOBlock />
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
} 