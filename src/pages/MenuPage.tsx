/**
 * @file: MenuPage.tsx
 * @description: Страница меню с категориями (упрощенная версия)
 * @dependencies: Mantine, ProductsContext, React Router
 * @created: 2024-12-19
 */

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Title,
  Grid,
  Card,

  Text,
  Group,
  Loader,
  Center,
  Stack,
  Alert
} from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { useProducts } from '../contexts/ProductsContext'
import { SEOPageWrapper } from '../components/SEOHead'
import { useTelegramPage } from '../components/telegram/TelegramApp'
import { CategoryImage } from '../components/common/OptimizedImage'

export function MenuPage() {
  const navigate = useNavigate()
  const {
    state: {
      categories,
      categoriesLoading,
      categoriesError
    },
    loadCategories
  } = useProducts()

  // Telegram интеграция
  useTelegramPage({
    title: 'Меню ДИМБО Пицца',
    backButton: false
  })

  // Загружаем только категории
  useEffect(() => {
    loadCategories()
  }, [])

  // Обработка клика по категории - переход к продуктам категории
  const handleCategoryClick = (categoryId: number) => {
    navigate(`/menu?category=${categoryId}`)
  }

  return (
    <SEOPageWrapper
      title="Меню ДИМБО Пицца - Волжск"
      description="Выберите категорию: пиццы, бургеры, напитки, закуски. Доставка еды в Волжске."
      keywords="меню, категории, пицца, бургеры, напитки, закуски, Волжск, доставка"
      breadcrumbs={[
        { title: 'Главная', href: '/' },
        { title: 'Меню', href: '/menu' }
      ]}
    >
      <Container size="lg">
        <Stack gap="lg">
          {/* Заголовок */}
          <Title order={2} c="dark" ta="center">
            🍕 Меню ДИМБО Пицца - Волжск
          </Title>

          {/* Загрузка категорий */}
          {categoriesLoading && (
            <Center py="xl">
              <Stack align="center">
                <Loader size="lg" />
                <Text>Загрузка категорий...</Text>
              </Stack>
            </Center>
          )}

          {/* Ошибка загрузки */}
          {categoriesError && (
            <Alert 
              variant="light" 
              color="red" 
              icon={<IconAlertCircle size="1rem" />}
              title="Ошибка загрузки"
            >
              Не удалось загрузить категории. Попробуйте обновить страницу.
            </Alert>
          )}

          {/* Категории */}
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
                    style={{ cursor: 'pointer', height: '100%' }}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <Card.Section>
                      <CategoryImage 
                        src={category.imageUrl}
                        alt={category.name}
                      />
                    </Card.Section>
                    
                    <Group justify="center" mt="md">
                      <Text fw={500} size="lg" ta="center" className="category-title">{category.name}</Text>
                    </Group>
                    
                    <Text size="sm" c="dimmed" ta="center" mt="xs" lineClamp={2}>
                      {category.description}
                    </Text>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          )}

          {/* Пустое состояние */}
          {!categoriesLoading && !categoriesError && (!categories || categories.length === 0) && (
            <Card shadow="sm" padding="lg" radius="md" withBorder bg="yellow.0">
              <Stack align="center">
                <Text c="yellow.7" size="lg" fw={500}>
                  Категории не найдены
                </Text>
                <Text c="dimmed" ta="center">
                  В данный момент категории недоступны. Попробуйте позже.
                </Text>
              </Stack>
            </Card>
          )}
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}