/**
 * @file: CategoryProductsPage.tsx
 * @description: Страница продуктов по категории
 * @dependencies: Mantine, ProductsContext, React Router
 * @created: 2024-12-19
 */

import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Container,
  Title,
  Grid,
  Card,
  Image,
  Text,
  Group,
  Loader,
  Center,
  Stack,
  Alert,
  Badge,
  Button,
  TextInput,
  Select,
  Divider
} from '@mantine/core'
import { 
  IconAlertCircle,
  IconPizza,
  IconSearch,
  IconHeart,
  IconHeartFilled,
  IconShoppingCart,
  IconStar
} from '@tabler/icons-react'
import { useProducts } from '../contexts/ProductsContext'
import { productsApi } from '../services/productsApi'
import { SEOPageWrapper } from '../components/SEOHead'
import { AddToCartButton } from '../components/telegram/TelegramButton'
import { useTelegramPage } from '../components/telegram/TelegramApp'
import { ProductCardImage } from '../components/common/OptimizedImage'
import type { Product } from '../types/products'
import { PRODUCT_SORT_OPTIONS } from '../types/products'

export function CategoryProductsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const {
    state: {
      categories,
      categoriesLoading,
      categoriesError,
      cart
    },
    loadCategories,
    addToCart,
    toggleFavorite,
    isFavorite
  } = useProducts()

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [categoryName, setCategoryName] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('popularity')
  const [searchValue, setSearchValue] = useState('')
  
  // Локальное состояние для продуктов с фильтрацией по категории
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoadingFiltered, setIsLoadingFiltered] = useState(false)
  const [productsError, setProductsError] = useState<string | null>(null)

  // Функция для загрузки продуктов по категории
  const loadProductsWithCategory = async (categoryId: number, sortParam?: string) => {
    try {
      setIsLoadingFiltered(true)
      setProductsError(null)
      
      const response = await productsApi.getProductsByCategory(categoryId, {
        size: 20,
        page: 0,
        sort: sortParam
      })
      
      setFilteredProducts(response.products)
    } catch (error) {
      console.error('Ошибка загрузки продуктов:', error)
      setProductsError('Не удалось загрузить продукты')
      setFilteredProducts([])
    } finally {
      setIsLoadingFiltered(false)
    }
  }

  // Загружаем данные при инициализации
  useEffect(() => {
    loadCategories()
    
    // Проверяем URL параметр category
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      const categoryId = parseInt(categoryParam)
      setSelectedCategory(categoryId)
      loadProductsWithCategory(categoryId)
    }
  }, [searchParams])

  // Находим название категории
  useEffect(() => {
    if (selectedCategory && categories && categories.length > 0) {
      const category = categories.find(cat => cat.id === selectedCategory)
      setCategoryName(category?.name || '')
    }
  }, [selectedCategory, categories])

  // Telegram интеграция
  useTelegramPage({
    title: 'Категория - ДИМБО Пицца',
    backButton: true,
    backButtonText: 'Назад к меню'
  })

  // Обработка изменения сортировки
  const handleSortChange = (value: string | null) => {
    if (!value || !selectedCategory) return
    setSortBy(value)
    
    // Преобразуем значение сортировки в формат API
    let sortParam: string | undefined
    switch (value) {
      case 'price_asc':
        sortParam = 'price,asc'
        break
      case 'price_desc':
        sortParam = 'price,desc'
        break
      case 'name':
        sortParam = 'name,asc'
        break
      case 'newest':
        sortParam = 'id,desc'
        break
      case 'popularity':
      default:
        sortParam = undefined // По умолчанию без сортировки
        break
    }
    
    loadProductsWithCategory(selectedCategory, sortParam)
  }

  // Обработка добавления в корзину
  const handleAddToCart = (product: Product) => {
    console.log('🛒 CategoryProductsPage: добавляем товар в корзину', product.name)
    addToCart({
      productId: product.id,
      quantity: 1
    })
  }

  // Обработка клика по продукту
  const handleProductClick = (productId: number) => {
    console.log('🔗 CategoryProductsPage: переход на карточку товара', productId)
    navigate(`/product/${productId}`)
  }

  return (
    <SEOPageWrapper
      title={`${categoryName} - Меню ДИМБО Пицца - Волжск`}
      description={`${categoryName} с доставкой в Волжске. Большой выбор, быстрая доставка.`}
      keywords={`${categoryName}, меню, Волжск, доставка`}
      breadcrumbs={[
        { title: 'Главная', href: '/' },
        { title: 'Меню', href: '/menu' },
        { title: categoryName, href: `/menu?category=${selectedCategory}` }
      ]}
    >
      <Container size="lg">
        <Stack gap="lg">
          {/* Заголовок */}
          <Title order={2} c="dark">
            🍕 {categoryName}
          </Title>

          {/* Поиск и сортировка */}
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <TextInput
                  placeholder="Поиск по меню..."
                  leftSection={<IconSearch size="1rem" />}
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.currentTarget.value)}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Select
                  placeholder="Сортировка"
                  data={PRODUCT_SORT_OPTIONS}
                  value={sortBy}
                  onChange={handleSortChange}
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Загрузка */}
          {isLoadingFiltered && (
            <Center py="xl">
              <Stack align="center">
                <Loader size="lg" />
                <Text>Загрузка продуктов...</Text>
              </Stack>
            </Center>
          )}

          {/* Ошибка загрузки */}
          {productsError && (
            <Alert 
              variant="light" 
              color="red" 
              icon={<IconAlertCircle size="1rem" />}
              title="Ошибка загрузки"
            >
              {productsError}
            </Alert>
          )}

          {/* Продукты */}
          {!isLoadingFiltered && !productsError && filteredProducts.length > 0 && (
            <Grid>
              {filteredProducts.map((product) => (
                <Grid.Col key={product.id} span={{ base: 6, sm: 6, md: 4, lg: 3 }}>
                  <Card 
                    shadow="sm" 
                    padding="lg" 
                    radius="md" 
                    withBorder 
                    h="100%"
                    className="product-card-compact"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleProductClick(product.id)}
                  >
                    <Card.Section pos="relative">
                      {/* Изображение продукта */}
                      <ProductCardImage 
                        src={product.imageUrl}
                        alt={product.name}
                      />

                      {/* Скидка */}
                      {product.discountPercent && product.discountPercent > 0 && (
                        <Badge
                          color="red"
                          variant="filled"
                          pos="absolute"
                          top={10}
                          right={10}
                          size="lg"
                        >
                          -{product.discountPercent}%
                        </Badge>
                      )}

                      {/* Избранное */}
                      <div 
                        style={{
                          position: 'absolute',
                          top: 10,
                          left: 10,
                          cursor: 'pointer'
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(product.id)
                        }}
                      >
                        {isFavorite(product.id) ? (
                          <IconHeartFilled size={24} color="#ff6b6b" />
                        ) : (
                          <IconHeart size={24} color="#fff" stroke={2} />
                        )}
                      </div>
                    </Card.Section>

                    <Stack justify="space-between" h="100%" pt="md">
                      {/* Название и цена */}
                      <Group justify="space-between" align="flex-start">
                        <Text fw={600} lineClamp={2} style={{ flexGrow: 1 }} className="product-title">
                          {product.name}
                        </Text>
                        <Badge 
                          color={product.available ? "orange" : "gray"} 
                          variant="light"
                          size="lg"
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

                      {/* Описание */}
                      <Text size="sm" c="dimmed" lineClamp={3} style={{ flexGrow: 1 }}>
                        {product.description || 'Описание отсутствует'}
                      </Text>

                      {/* Дополнительная информация */}
                      {product.weight && (
                        <Text size="xs" c="dimmed">
                          <strong>Вес:</strong> {product.weight} г
                        </Text>
                      )}

                      <Divider my="xs" />

                      {/* Кнопка добавления в корзину */}
                      <AddToCartButton
                        productName={product.name}
                        price={product.discountedPrice || product.price}
                        onClick={(e) => {
                          e?.stopPropagation()
                          console.log('🛑 CategoryProductsPage: stopPropagation вызван')
                          handleAddToCart(product)
                        }}
                        disabled={!product.available}
                        inCart={cart?.items.some(item => item.productId === product.id) || false}
                      />
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          )}

          {/* Пустое состояние */}
          {!isLoadingFiltered && !productsError && filteredProducts.length === 0 && (
            <Card shadow="sm" padding="lg" radius="md" withBorder bg="yellow.0">
              <Stack align="center">
                <IconPizza size={48} color="#ffa500" />
                <Text c="yellow.7" size="lg" fw={500}>
                  Продукты не найдены
                </Text>
                <Text c="dimmed" ta="center">
                  В данной категории пока нет продуктов.
                </Text>
              </Stack>
            </Card>
          )}
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}