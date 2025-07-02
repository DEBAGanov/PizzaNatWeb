/**
 * @file: ProductPage.tsx
 * @description: Детальная страница продукта с галереей, вариантами и характеристиками
 * @dependencies: Mantine, ProductsContext, React Router
 * @created: 2025-01-07
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
  Tabs,
  NumberInput,
  Select,
  Alert,
  Breadcrumbs,
  Anchor,
  SimpleGrid,
  ThemeIcon,
  List,
  Paper,
  Rating,
  Avatar
} from '@mantine/core'
import {
  IconPizza,
  IconHeart,
  IconHeartFilled,
  IconShoppingCart,
  IconStar,
  IconArrowLeft,
  IconShare,
  IconClock,
  IconWeight,
  IconFlame,
  IconInfoCircle,
  IconAlertTriangle,
  IconCheck,
  IconMinus,
  IconPlus
} from '@tabler/icons-react'
import { useProducts } from '../contexts/ProductsContext'
import type { ProductVariant, AddToCartRequest } from '../types/products'

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const {
    state: {
      currentProduct,
      currentProductLoading,
      currentProductError
    },
    loadProduct,
    addToCart,
    toggleFavorite,
    isFavorite
  } = useProducts()

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<string | null>('description')

  // Загружаем продукт при изменении ID
  useEffect(() => {
    if (id) {
      const productId = parseInt(id, 10)
      if (!isNaN(productId)) {
        loadProduct(productId)
      }
    }
  }, [id, loadProduct])

  // Устанавливаем первый вариант по умолчанию
  useEffect(() => {
    if (currentProduct && currentProduct.variants.length > 0 && !selectedVariant) {
      setSelectedVariant(currentProduct.variants[0])
    }
  }, [currentProduct, selectedVariant])

  // Показываем загрузку
  if (currentProductLoading) {
    return (
      <Container size="lg" py="xl">
        <Center style={{ minHeight: '50vh' }}>
          <Stack align="center">
            <Loader size="lg" />
            <Text>Загрузка продукта...</Text>
          </Stack>
        </Center>
      </Container>
    )
  }

  // Показываем ошибку
  if (currentProductError || !currentProduct) {
    return (
      <Container size="lg" py="xl">
        <Alert
          icon={<IconInfoCircle size={16} />}
          title="Продукт не найден"
          color="red"
        >
          {currentProductError || 'Продукт с указанным ID не существует'}
        </Alert>
        <Button mt="md" variant="light" onClick={() => navigate('/menu')}>
          Вернуться к меню
        </Button>
      </Container>
    )
  }

  const product = currentProduct

  // Обработка добавления в корзину
  const handleAddToCart = () => {
    const cartItem: AddToCartRequest = {
      product_id: product.id,
      variant_id: selectedVariant?.id,
      quantity,
      notes: selectedVariant ? `Вариант: ${selectedVariant.name}` : undefined
    }
    addToCart(cartItem)
  }

  // Обработка избранного
  const handleToggleFavorite = () => {
    toggleFavorite(product.id)
  }

  // Получаем цену для отображения
  const getPrice = () => {
    return selectedVariant ? selectedVariant.price : product.base_price
  }

  // Проверяем доступность
  const isAvailable = () => {
    return product.is_available && (selectedVariant ? selectedVariant.is_available : true)
  }

  // Хлебные крошки
  const breadcrumbItems = [
    { title: 'Главная', href: '/' },
    { title: 'Меню', href: '/menu' },
    { title: product.category.name, href: `/menu?category=${product.category.id}` },
    { title: product.name, href: '#' }
  ]

  return (
    <Container size="lg" py="md">
      <Stack gap="lg">
        {/* Хлебные крошки */}
        <Breadcrumbs>
          {breadcrumbItems.map((item, index) => (
            <Anchor
              key={index}
              onClick={() => item.href !== '#' && navigate(item.href)}
              style={{ cursor: item.href !== '#' ? 'pointer' : 'default' }}
              c={item.href === '#' ? 'dimmed' : undefined}
            >
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>

        {/* Кнопка назад */}
        <Group>
          <ActionIcon
            variant="subtle"
            size="lg"
            onClick={() => navigate(-1)}
          >
            <IconArrowLeft size={20} />
          </ActionIcon>
          <Text size="sm" c="dimmed">Назад</Text>
        </Group>

        {/* Основная информация о продукте */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            {/* Галерея изображений */}
            <Stack gap="md">
              {/* Основное изображение */}
              <Card shadow="sm" padding={0} radius="md" withBorder>
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[selectedImageIndex]?.url}
                    height={400}
                    alt={product.name}
                    fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 24 24'%3E%3Cpath fill='%23ff8000' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E"
                  />
                ) : (
                  <Center h={400} bg="gray.1">
                    <IconPizza size={80} color="#ff8000" />
                  </Center>
                )}
              </Card>

              {/* Миниатюры */}
              {product.images && product.images.length > 1 && (
                <SimpleGrid cols={4} spacing="xs">
                  {product.images.map((image, index) => (
                    <Card
                      key={image.id}
                      shadow="sm"
                      padding={0}
                      radius="md"
                      withBorder
                      style={{
                        cursor: 'pointer',
                        border: selectedImageIndex === index ? '2px solid #ff8000' : undefined
                      }}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image
                        src={image.url}
                        height={80}
                        alt={`${product.name} ${index + 1}`}
                        fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24'%3E%3Cpath fill='%23ff8000' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E"
                      />
                    </Card>
                  ))}
                </SimpleGrid>
              )}
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            {/* Информация о продукте */}
            <Stack gap="md">
              {/* Заголовок и бейджи */}
              <Stack gap="xs">
                <Group justify="space-between" align="flex-start">
                  <Title order={1} size="h2">
                    {product.name}
                  </Title>
                  <Group gap="xs">
                    <ActionIcon
                      variant="subtle"
                      size="lg"
                      color={isFavorite(product.id) ? "pink" : "gray"}
                      onClick={handleToggleFavorite}
                    >
                      {isFavorite(product.id) ? (
                        <IconHeartFilled size={20} />
                      ) : (
                        <IconHeart size={20} />
                      )}
                    </ActionIcon>
                    <ActionIcon variant="subtle" size="lg">
                      <IconShare size={20} />
                    </ActionIcon>
                  </Group>
                </Group>

                <Group gap="xs">
                  {product.is_popular && (
                    <Badge color="orange" variant="filled" leftSection={<IconStar size={12} />}>
                      Популярное
                    </Badge>
                  )}
                  {product.is_new && (
                    <Badge color="green" variant="filled">
                      Новинка
                    </Badge>
                  )}
                  <Badge color="blue" variant="light">
                    {product.category.name}
                  </Badge>
                </Group>
              </Stack>

              {/* Краткое описание */}
              <Text size="lg" c="dimmed">
                {product.short_description || product.description}
              </Text>

              {/* Цена */}
              <Paper p="md" withBorder bg="orange.0">
                <Group justify="space-between" align="center">
                  <Text size="xl" fw={700} c="orange.7">
                    {getPrice()} ₽
                  </Text>
                  {selectedVariant && (
                    <Text size="sm" c="dimmed">
                      {selectedVariant.name}
                    </Text>
                  )}
                </Group>
              </Paper>

              {/* Варианты продукта */}
              {product.variants && product.variants.length > 0 && (
                <Stack gap="xs">
                  <Text fw={600}>Выберите вариант:</Text>
                  <Select
                    placeholder="Выберите размер/вариант"
                    data={product.variants
                      .filter(variant => variant.is_available)
                      .map(variant => ({
                        value: variant.id.toString(),
                        label: `${variant.name} - ${variant.price} ₽`
                      }))}
                    value={selectedVariant?.id.toString()}
                    onChange={(value) => {
                      const variant = product.variants.find(v => v.id.toString() === value)
                      setSelectedVariant(variant || null)
                    }}
                  />
                </Stack>
              )}

              {/* Быстрая информация */}
              <SimpleGrid cols={2} spacing="xs">
                {product.cooking_time && (
                  <Group gap="xs">
                    <ThemeIcon size="sm" color="blue" variant="light">
                      <IconClock size={14} />
                    </ThemeIcon>
                    <Text size="sm">{product.cooking_time} мин</Text>
                  </Group>
                )}
                {product.weight && (
                  <Group gap="xs">
                    <ThemeIcon size="sm" color="green" variant="light">
                      <IconWeight size={14} />
                    </ThemeIcon>
                    <Text size="sm">{product.weight} г</Text>
                  </Group>
                )}
                {product.nutritional_info && (
                  <Group gap="xs">
                    <ThemeIcon size="sm" color="red" variant="light">
                      <IconFlame size={14} />
                    </ThemeIcon>
                    <Text size="sm">{product.nutritional_info.calories} ккал</Text>
                  </Group>
                )}
              </SimpleGrid>

              {/* Количество и добавление в корзину */}
              <Stack gap="md">
                <Group>
                  <Text fw={600}>Количество:</Text>
                  <Group gap="xs">
                    <ActionIcon
                      variant="outline"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <IconMinus size={16} />
                    </ActionIcon>
                    <NumberInput
                      value={quantity}
                      onChange={(value) => setQuantity(Number(value) || 1)}
                      min={1}
                      max={10}
                      style={{ width: 80 }}
                      hideControls
                    />
                    <ActionIcon
                      variant="outline"
                      disabled={quantity >= 10}
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    >
                      <IconPlus size={16} />
                    </ActionIcon>
                  </Group>
                </Group>

                <Button
                  color="orange"
                  size="lg"
                  fullWidth
                  disabled={!isAvailable()}
                  leftSection={<IconShoppingCart size={20} />}
                  onClick={handleAddToCart}
                >
                  {isAvailable() 
                    ? `Добавить в корзину за ${getPrice() * quantity} ₽`
                    : 'Недоступно'
                  }
                </Button>

                {!isAvailable() && (
                  <Alert
                    icon={<IconAlertTriangle size={16} />}
                    title="Товар недоступен"
                    color="yellow"
                  >
                    К сожалению, данный товар временно недоступен для заказа
                  </Alert>
                )}
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Детальная информация в табах */}
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="description">Описание</Tabs.Tab>
            <Tabs.Tab value="ingredients">Состав</Tabs.Tab>
            <Tabs.Tab value="nutrition">Пищевая ценность</Tabs.Tab>
            <Tabs.Tab value="reviews">Отзывы</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="description" pt="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <Title order={3}>Описание</Title>
                <Text>{product.description}</Text>
                
                {product.allergens && product.allergens.length > 0 && (
                  <Alert
                    icon={<IconAlertTriangle size={16} />}
                    title="Аллергены"
                    color="yellow"
                  >
                    <Text size="sm">
                      Содержит: {product.allergens.join(', ')}
                    </Text>
                  </Alert>
                )}
              </Stack>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="ingredients" pt="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <Title order={3}>Состав</Title>
                {product.ingredients && product.ingredients.length > 0 ? (
                  <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={
                      <ThemeIcon color="green" size={20} radius="xl">
                        <IconCheck size={12} />
                      </ThemeIcon>
                    }
                  >
                    {product.ingredients.map((ingredient, index) => (
                      <List.Item key={index}>{ingredient}</List.Item>
                    ))}
                  </List>
                ) : (
                  <Text c="dimmed">Информация о составе не указана</Text>
                )}
              </Stack>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="nutrition" pt="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <Title order={3}>Пищевая ценность (на 100г)</Title>
                {product.nutritional_info ? (
                  <SimpleGrid cols={2} spacing="md">
                    <Paper p="sm" withBorder>
                      <Text ta="center" fw={600} c="orange">
                        {product.nutritional_info.calories}
                      </Text>
                      <Text ta="center" size="sm" c="dimmed">
                        ккал
                      </Text>
                    </Paper>
                    <Paper p="sm" withBorder>
                      <Text ta="center" fw={600} c="blue">
                        {product.nutritional_info.proteins}г
                      </Text>
                      <Text ta="center" size="sm" c="dimmed">
                        белки
                      </Text>
                    </Paper>
                    <Paper p="sm" withBorder>
                      <Text ta="center" fw={600} c="yellow">
                        {product.nutritional_info.fats}г
                      </Text>
                      <Text ta="center" size="sm" c="dimmed">
                        жиры
                      </Text>
                    </Paper>
                    <Paper p="sm" withBorder>
                      <Text ta="center" fw={600} c="green">
                        {product.nutritional_info.carbohydrates}г
                      </Text>
                      <Text ta="center" size="sm" c="dimmed">
                        углеводы
                      </Text>
                    </Paper>
                  </SimpleGrid>
                ) : (
                  <Text c="dimmed">Информация о пищевой ценности не указана</Text>
                )}
              </Stack>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="reviews" pt="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <Title order={3}>Отзывы покупателей</Title>
                
                {/* Заглушка для отзывов */}
                <Group justify="center">
                  <Stack align="center" gap="xs">
                    <IconStar size={48} color="#ffd700" />
                    <Text size="lg" fw={600}>4.8</Text>
                    <Rating value={4.8} readOnly />
                    <Text size="sm" c="dimmed">На основе 127 отзывов</Text>
                  </Stack>
                </Group>

                <Divider />

                {/* Примеры отзывов */}
                <Stack gap="md">
                  {[1, 2, 3].map((review) => (
                    <Paper key={review} p="md" withBorder>
                      <Group gap="md" align="flex-start">
                        <Avatar color="orange" radius="xl">
                          {review}
                        </Avatar>
                        <Stack gap="xs" style={{ flex: 1 }}>
                          <Group justify="space-between">
                            <Text fw={600}>Пользователь {review}</Text>
                            <Rating value={5} size="sm" readOnly />
                          </Group>
                          <Text size="sm">
                            Отличная пицца! Очень вкусная и быстро доставили. 
                            Обязательно закажу еще раз.
                          </Text>
                          <Text size="xs" c="dimmed">
                            2 дня назад
                          </Text>
                        </Stack>
                      </Group>
                    </Paper>
                  ))}
                </Stack>

                <Button variant="outline" fullWidth>
                  Показать все отзывы
                </Button>
              </Stack>
            </Card>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  )
}