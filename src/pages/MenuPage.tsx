/**
 * @file: MenuPage.tsx
 * @description: Страница меню с категориями и продуктами
 * @dependencies: Mantine, ProductsContext, компоненты категорий и продуктов
 * @created: 2025-01-07
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  TextInput,
  Select,
  ScrollArea,
  ActionIcon,
  Divider
} from '@mantine/core'
import {
  IconSearch,
  IconFilter,
  IconPizza,
  IconHeart,
  IconHeartFilled,
  IconShoppingCart,
  IconStar
} from '@tabler/icons-react'
import { useProducts } from '../contexts/ProductsContext'
import type { Product } from '../types/products'
import { PRODUCT_SORT_OPTIONS } from '../types/products'

export function MenuPage() {
  const navigate = useNavigate()
  const {
    state: {
      categories,
      products,
      categoriesLoading,
      productsLoading,
      categoriesError,
      productsError
    },
    loadCategories,
    loadProducts,
    searchProducts,
    setFilters,
    clearFilters,
    addToCart,
    toggleFavorite,
    isFavorite
  } = useProducts()

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<string>('popularity')
  const [searchValue, setSearchValue] = useState('')

  // Загружаем данные при инициализации
  useEffect(() => {
    loadCategories()
    loadProducts({ limit: 20 })
  }, [])

  // Обработка изменения категории
  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId)
    setFilters({
      categories: categoryId ? [categoryId] : [],
      is_available: true
    })
    
    const sortOption = PRODUCT_SORT_OPTIONS.find(opt => opt.value === sortBy)
    loadProducts({
      category_id: categoryId || undefined,
      sort_by: sortOption?.value,
      sort_order: sortOption?.order,
      limit: 20
    })
  }

  // Обработка изменения сортировки
  const handleSortChange = (value: string | null) => {
    if (!value) return
    setSortBy(value)
    
    const sortOption = PRODUCT_SORT_OPTIONS.find(opt => opt.value === value)
    loadProducts({
      category_id: selectedCategory || undefined,
      sort_by: sortOption?.value,
      sort_order: sortOption?.order,
      limit: 20
    })
  }

  // Обработка поиска
  const handleSearch = (value: string) => {
    setSearchValue(value)
    if (value.trim()) {
      searchProducts(value.trim())
    } else {
      loadProducts({
        category_id: selectedCategory || undefined,
        limit: 20
      })
    }
  }

  // Обработка добавления в корзину
  const handleAddToCart = (product: Product) => {
    addToCart({
      product_id: product.id,
      quantity: 1
    })
  }

  // Обработка избранного
  const handleToggleFavorite = (productId: number) => {
    toggleFavorite(productId)
  }

  // Обработка клика на продукт
  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`)
  }

  return (
    <Container size="lg" py="md">
      <Stack gap="lg">
        {/* Заголовок страницы */}
        <Group justify="space-between" align="center">
          <Title order={1} c="orange.7">
            🍕 Меню PizzaNat
          </Title>
          <Badge size="lg" color="orange" variant="light">
            {products.length} блюд
          </Badge>
        </Group>

        {/* Поиск и фильтры */}
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <Stack gap="md">
            <Group grow>
              <TextInput
                placeholder="Поиск по меню..."
                leftSection={<IconSearch size={16} />}
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Select
                placeholder="Сортировка"
                leftSection={<IconFilter size={16} />}
                data={PRODUCT_SORT_OPTIONS.map(opt => ({
                  value: opt.value || 'popularity',
                  label: opt.label
                }))}
                value={sortBy}
                onChange={handleSortChange}
              />
            </Group>
            
            {(selectedCategory || searchValue) && (
              <Group>
                <Button
                  variant="light"
                  size="xs"
                  onClick={() => {
                    setSelectedCategory(null)
                    setSearchValue('')
                    clearFilters()
                    loadProducts({ limit: 20 })
                  }}
                >
                  Очистить фильтры
                </Button>
              </Group>
            )}
          </Stack>
        </Card>

        {/* Категории */}
        {!searchValue && (
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Stack gap="md">
              <Title order={3} size="h4">Категории</Title>
              
              {categoriesLoading && (
                <Center>
                  <Loader size="sm" />
                  <Text ml="md" size="sm">Загрузка категорий...</Text>
                </Center>
              )}
              
              {categoriesError && (
                <Text c="red" size="sm">Ошибка загрузки категорий: {categoriesError}</Text>
              )}
              
              {!categoriesLoading && !categoriesError && (
                <ScrollArea>
                  <Group gap="xs" wrap="nowrap">
                    <Button
                      variant={selectedCategory === null ? "filled" : "light"}
                      color="orange"
                      size="sm"
                      onClick={() => handleCategoryChange(null)}
                    >
                      Все категории
                    </Button>
                    
                    {categories
                      .filter(cat => cat.is_active)
                      .sort((a, b) => a.sort_order - b.sort_order)
                      .map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "filled" : "light"}
                          color="orange"
                          size="sm"
                          onClick={() => handleCategoryChange(category.id)}
                        >
                          {category.name}
                        </Button>
                      ))}
                  </Group>
                </ScrollArea>
              )}
            </Stack>
          </Card>
        )}

        {/* Продукты */}
        <div>
          {productsLoading && (
            <Center py="xl">
              <Stack align="center">
                <Loader size="lg" />
                <Text>Загрузка продуктов...</Text>
              </Stack>
            </Center>
          )}
          
          {productsError && (
            <Card shadow="sm" padding="lg" radius="md" withBorder bg="red.0">
              <Text c="red.7">Ошибка загрузки продуктов: {productsError}</Text>
              <Button
                mt="md"
                variant="light"
                color="red"
                onClick={() => loadProducts({ limit: 20 })}
              >
                Попробовать снова
              </Button>
            </Card>
          )}
          
          {!productsLoading && !productsError && products.length === 0 && (
            <Card shadow="sm" padding="lg" radius="md" withBorder bg="yellow.0">
              <Stack align="center">
                <IconPizza size={48} color="#ffa500" />
                <Text c="yellow.7" size="lg" fw={500}>
                  {searchValue ? 'Ничего не найдено' : 'Продукты не найдены'}
                </Text>
                <Text c="dimmed" ta="center">
                  {searchValue 
                    ? `По запросу "${searchValue}" ничего не найдено. Попробуйте изменить поисковый запрос.`
                    : 'В данной категории пока нет продуктов.'
                  }
                </Text>
              </Stack>
            </Card>
          )}
          
          {!productsLoading && !productsError && products.length > 0 && (
            <Grid>
              {products.map((product) => (
                <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                  <Card 
                    shadow="sm" 
                    padding="lg" 
                    radius="md" 
                    withBorder 
                    h="100%"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleProductClick(product.id)}
                  >
                    <Card.Section pos="relative">
                      {/* Изображение продукта */}
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images.find(img => img.is_primary)?.url || product.images[0]?.url}
                          height={200}
                          alt={product.name}
                          fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 24 24'%3E%3Cpath fill='%23ff8000' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E"
                        />
                      ) : (
                        <div style={{ 
                          height: 200, 
                          backgroundColor: '#f8f9fa',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <IconPizza size={64} color="#ff8000" />
                        </div>
                      )}
                      
                      {/* Кнопка избранного */}
                      <ActionIcon
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          backgroundColor: 'rgba(255, 255, 255, 0.9)'
                        }}
                        variant="filled"
                        color={isFavorite(product.id) ? "pink" : "gray"}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleToggleFavorite(product.id)
                        }}
                      >
                        {isFavorite(product.id) ? (
                          <IconHeartFilled size={16} />
                        ) : (
                          <IconHeart size={16} />
                        )}
                      </ActionIcon>
                      
                      {/* Бейджи */}
                      <Group
                        style={{
                          position: 'absolute',
                          top: 8,
                          left: 8
                        }}
                        gap="xs"
                      >
                        {product.is_popular && (
                          <Badge color="orange" variant="filled" size="sm" leftSection={<IconStar size={12} />}>
                            Популярное
                          </Badge>
                        )}
                        {product.is_new && (
                          <Badge color="green" variant="filled" size="sm">
                            Новинка
                          </Badge>
                        )}
                      </Group>
                    </Card.Section>

                    <Stack gap="xs" mt="md" style={{ flexGrow: 1 }}>
                      {/* Название и цена */}
                      <Group justify="space-between" align="flex-start">
                        <Text fw={600} lineClamp={2} style={{ flexGrow: 1 }}>
                          {product.name}
                        </Text>
                        <Badge 
                          color={product.is_available ? "orange" : "gray"} 
                          variant="light"
                          size="lg"
                        >
                          {product.base_price} ₽
                        </Badge>
                      </Group>

                      {/* Описание */}
                      <Text size="sm" c="dimmed" lineClamp={3} style={{ flexGrow: 1 }}>
                        {product.description || 'Описание отсутствует'}
                      </Text>

                      {/* Ингредиенты */}
                      {product.ingredients && product.ingredients.length > 0 && (
                        <Text size="xs" c="dimmed" lineClamp={2}>
                          <strong>Состав:</strong> {product.ingredients.join(', ')}
                        </Text>
                      )}

                      <Divider my="xs" />

                      {/* Кнопка добавления в корзину */}
                      <Button 
                        color="orange" 
                        fullWidth 
                        radius="md"
                        disabled={!product.is_available}
                        leftSection={<IconShoppingCart size={16} />}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddToCart(product)
                        }}
                      >
                        {product.is_available ? 'В корзину' : 'Недоступно'}
                      </Button>
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          )}
        </div>
      </Stack>
    </Container>
  )
} 