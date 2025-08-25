/**
 * @file: ProductPage.tsx
 * @description: Упрощенная страница продукта (без вариантов)
 * @dependencies: Mantine, ProductsContext, React Router
 * @created: 2024-12-19
 */

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Stack,
  Title,
  Grid,
  Card,
  Badge,
  Button,
  Image,
  Text,
  Group,
  Center,
  Loader,
  ActionIcon,
  Divider,
  NumberInput,
  Alert,
  Breadcrumbs,
  Anchor
} from '@mantine/core'
import {
  IconPizza,
  IconHeart,
  IconHeartFilled,
  IconShoppingCart,
  IconArrowLeft,
  IconInfoCircle,
  IconAlertTriangle
} from '@tabler/icons-react'
import { useProducts } from '../contexts/ProductsContext'
import { productsApi } from '../services/productsApi'
import { SEOPageWrapper } from '../components/SEOHead'
import { AddToCartButton } from '../components/telegram/TelegramButton'
import { useTelegramPage } from '../components/telegram/TelegramApp'
import { ProductDetailImage } from '../components/common/OptimizedImage'
import { useYandexMetrika } from '../components/analytics/YandexMetrika'
import { productToEcommerce, getListForTracking } from '../utils/ecommerceHelpers'
import type { Product } from '../types/products'

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { 
    addToCart, 
    toggleFavorite, 
    isFavorite,
    state: { cart }
  } = useProducts()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  // Аналитика
  const YANDEX_METRIKA_ID = import.meta.env.VITE_YANDEX_METRIKA_ID || '103585127'
  const { trackProductView, trackAddToCart } = useYandexMetrika(YANDEX_METRIKA_ID)

  // Telegram интеграция
  useTelegramPage({
    title: 'Продукт',
    backButton: true,
    backButtonText: 'Назад'
  })

  // Загружаем продукт
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError('ID продукта не указан')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const productData = await productsApi.getProduct(parseInt(id))
        setProduct(productData)
        
        // Отслеживаем просмотр товара
        const ecommerceProduct = productToEcommerce(productData, {
          list: getListForTracking(window.location.pathname)
        })
        trackProductView(ecommerceProduct)
        
      } catch (err: any) {
        console.error('Ошибка загрузки продукта:', err)
        setError('Не удалось загрузить информацию о продукте')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  // Обработка добавления в корзину
  const handleAddToCart = async () => {
    if (!product) return

    try {
      // Отслеживаем добавление в корзину
      const ecommerceProduct = productToEcommerce(product, {
        quantity,
        list: getListForTracking(window.location.pathname)
      })
      trackAddToCart(ecommerceProduct)
      
      await addToCart({
        productId: product.id,
        quantity: quantity
      })
    } catch (error) {
      console.error('Ошибка добавления в корзину:', error)
    }
  }

  // Обработка назад
  const handleBack = () => {
    navigate(-1)
  }

  // Проверяем есть ли товар в корзине
  const isInCart = cart?.items.some(item => item.productId === product?.id) || false

  if (loading) {
    return (
      <Center py="xl">
        <Stack align="center">
          <Loader size="lg" />
          <Text>Загрузка продукта...</Text>
        </Stack>
      </Center>
    )
  }

  if (error || !product) {
    return (
      <Container size="sm">
        <Alert 
          variant="light" 
          color="red" 
          icon={<IconAlertTriangle size="1rem" />}
          title="Ошибка"
        >
          {error || 'Продукт не найден'}
          <Button 
            variant="light" 
            size="sm" 
            mt="md"
            onClick={handleBack}
          >
            Вернуться назад
          </Button>
        </Alert>
      </Container>
    )
  }

  return (
    <SEOPageWrapper
      title={`${product.name} - ДИМБО Пицца - Волжск`}
      description={product.description || `${product.name} с доставкой в Волжске`}
      keywords={`${product.name}, ${product.categoryName}, пицца, доставка, Волжск`}
      breadcrumbs={[
        { title: 'Главная', href: '/' },
        { title: 'Меню', href: '/menu' },
        { title: product.categoryName, href: `/menu?category=${product.categoryId}` },
        { title: product.name, href: `/product/${product.id}` }
      ]}
    >
      <Container size="lg">
        <Stack gap="lg">
          {/* Кнопка назад */}
          <Group>
            <ActionIcon
              variant="light"
              size="lg"
              onClick={handleBack}
            >
              <IconArrowLeft size="1.2rem" />
            </ActionIcon>
            <Breadcrumbs>
              <Anchor onClick={() => navigate('/')}>Главная</Anchor>
              <Anchor onClick={() => navigate('/menu')}>Меню</Anchor>
              <Anchor onClick={() => navigate(`/menu?category=${product.categoryId}`)}>
                {product.categoryName}
              </Anchor>
              <Text>{product.name}</Text>
            </Breadcrumbs>
          </Group>

          {/* Основной контент */}
          <Grid>
            {/* Изображение */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section pos="relative">
                  <ProductDetailImage 
                    src={product.imageUrl}
                    alt={product.name}
                  />

                  {/* Скидка */}
                  {product.discountPercent && product.discountPercent > 0 && (
                    <Badge
                      color="red"
                      variant="filled"
                      pos="absolute"
                      top={15}
                      right={15}
                      size="xl"
                    >
                      -{product.discountPercent}%
                    </Badge>
                  )}

                  {/* Избранное */}
                  <ActionIcon
                    variant="light"
                    pos="absolute"
                    top={15}
                    left={15}
                    size="lg"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    {isFavorite(product.id) ? (
                      <IconHeartFilled size="1.2rem" color="#ff6b6b" />
                    ) : (
                      <IconHeart size="1.2rem" />
                    )}
                  </ActionIcon>
                </Card.Section>
              </Card>
            </Grid.Col>

            {/* Информация о продукте */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="md">
                {/* Заголовок и цена */}
                <div>
                  <Title order={2} mb="xs">{product.name}</Title>
                  <Group>
                    <Badge 
                      color={product.available ? "orange" : "gray"} 
                      variant="light"
                      size="xl"
                    >
                      {product.discountedPrice ? (
                        <>
                          <Text component="span" td="line-through" c="gray">
                            {product.price} ₽
                          </Text>
                          {' '}
                          {product.discountedPrice} ₽
                        </>
                      ) : (
                        `${product.price} ₽`
                      )}
                    </Badge>
                    <Badge color="blue" variant="light">
                      {product.categoryName}
                    </Badge>
                  </Group>
                </div>

                {/* Описание */}
                <div>
                  <Text fw={600} mb="xs">Описание</Text>
                  <Text c="dimmed">
                    {product.description || 'Описание отсутствует'}
                  </Text>
                </div>

                {/* Характеристики */}
                {product.weight && (
                  <div>
                    <Text fw={600} mb="xs">Характеристики</Text>
                    <Text size="sm" c="dimmed">
                      <strong>Вес:</strong> {product.weight} г
                    </Text>
                  </div>
                )}

                <Divider />

                {/* Количество и добавление в корзину */}
                <div>
                  <Text fw={600} mb="xs">Количество</Text>
                  <Group mb="md">
                    <NumberInput
                      value={quantity}
                      onChange={(value) => setQuantity(Number(value) || 1)}
                      min={1}
                      max={10}
                      style={{ width: 120 }}
                    />
                  </Group>

                  <AddToCartButton
                    productName={product.name}
                    price={product.discountedPrice || product.price}
                    quantity={quantity}
                    onClick={handleAddToCart}
                    disabled={!product.available}
                    inCart={isInCart}
                    fullWidth
                  />

                  {!product.available && (
                    <Alert 
                      variant="light" 
                      color="orange" 
                      icon={<IconInfoCircle size="1rem" />}
                      mt="md"
                    >
                      Товар временно недоступен
                    </Alert>
                  )}
                </div>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}