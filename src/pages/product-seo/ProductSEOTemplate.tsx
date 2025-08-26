/**
 * @file: ProductSEOTemplate.tsx
 * @description: Универсальный шаблон для индивидуальных SEO страниц товаров
 * @dependencies: Mantine, SEOHead, ProductsContext
 * @created: 2025-01-27
 */

import React from 'react'
import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconStars, IconLeaf } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../../components/SEOHead'
import { ProductCardImage } from '../../components/common/OptimizedImage'
import { RelatedProducts } from '../../components/seo/RelatedProducts'
import { SchemaMarkup } from '../../components/seo/SchemaMarkup'
import { LocalInfo } from '../../components/seo/LocalInfo'
import { 
  getProductCategory, 
  generateProductDescription, 
  generateProductKeywords,
  type Product 
} from '../../utils/transliteration'

interface ProductSEOTemplateProps {
  product: Product
  page: string
}

/**
 * Универсальный компонент для SEO страниц отдельных товаров
 */
export const ProductSEOTemplate: React.FC<ProductSEOTemplateProps> = ({ product, page }) => {
  const navigate = useNavigate()
  const category = getProductCategory(product.name)

  const seoData = {
    title: `${product.name} за ${product.price}₽ - заказать с доставкой в Волжске | ДИМБО`,
    description: generateProductDescription(product.name, product.price, category),
    keywords: generateProductKeywords(product.name, category),
    imageUrl: product.imageUrl,
    page
  }

  // Определяем цвет темы в зависимости от категории
  const getCategoryColor = (cat: string): string => {
    const colors: Record<string, string> = {
      'pizza': 'orange',
      'burger': 'yellow',
      'sushi': 'blue',
      'wings': 'grape',
      'fries': 'yellow',
      'nuggets': 'orange',
      'closed-pizza': 'red',
      'drinks': 'cyan'
    }
    return colors[cat] || 'orange'
  }

  const color = getCategoryColor(category)

  // Генерируем описание товара в зависимости от категории
  const getProductDescription = (): string => {
    const descriptions: Record<string, string> = {
      'pizza': `Вкусная ${product.name.toLowerCase()} приготовленная по итальянским традициям из свежих ингредиентов. Тонкое тесто, качественная моцарелла и отборные продукты.`,
      'burger': `Сочный ${product.name.toLowerCase()} с свежими ингредиентами. Мягкая булочка, сочная котлета и свежие овощи для идеального вкуса.`,
      'sushi': `Свежие ${product.name.toLowerCase()} приготовленные по японским традициям. Качественная рыба, специальный рис и нори высшего сорта.`,
      'wings': `Сочные ${product.name.toLowerCase()} в хрустящей панировке. Готовим из отборного куриного мяса с пряными специями.`,
      'fries': `Хрустящий ${product.name.toLowerCase()} из отборного картофеля. Золотистая корочка и нежная мякоть внутри.`,
      'nuggets': `Сочные ${product.name.toLowerCase()} в хрустящей панировке. Нежное куриное филе в золотистой корочке.`,
      'closed-pizza': `Сытная ${product.name.toLowerCase()} с сочной начинкой в хрустящем тесте. Идеальное сочетание вкуса и сытности.`,
      'drinks': `Освежающий ${product.name.toLowerCase()} из натуральных ингредиентов. Идеально утоляет жажду и дополняет любое блюдо.`
    }
    return descriptions[category] || `Вкусный ${product.name.toLowerCase()} высокого качества по доступной цене.`
  }

  // Генерируем преимущества товара
  const getProductAdvantages = (): string[] => {
    const advantages: Record<string, string[]> = {
      'pizza': ['Тонкое итальянское тесто', 'Натуральная моцарелла', 'Свежие ингредиенты', 'Готовим в дровяной печи'],
      'burger': ['Сочная котлета', 'Свежие овощи', 'Мягкая булочка', 'Фирменные соусы'],
      'sushi': ['Свежая рыба ежедневно', 'Японский рис премиум', 'Нори высшего сорта', 'Готовят мастера суши'],
      'wings': ['Отборное куриное мясо', 'Хрустящая панировка', 'Пряные специи', 'Сочность гарантирована'],
      'fries': ['Отборный картофель', 'Золотистая корочка', 'Хрустящая текстура', 'Идеальная прожарка'],
      'nuggets': ['Куриное филе', 'Хрустящая панировка', 'Нежная текстура', 'Без консервантов'],
      'closed-pizza': ['Сочная начинка', 'Хрустящее тесто', 'Сытное блюдо', 'Удобно есть руками'],
      'drinks': ['Натуральные ингредиенты', 'Освежающий вкус', 'Без консервантов', 'Идеально охлажден']
    }
    return advantages[category] || ['Высокое качество', 'Свежие ингредиенты', 'Доступная цена', 'Быстрое приготовление']
  }

  return (
    <SEOPageWrapper {...seoData}>
      <SchemaMarkup pageType={category} includeFAQ={false} />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg={`${color}.0`}>
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Title order={1} size="h1" c={`${color}.7`}>
                    {product.name}
                  </Title>
                  <Text size="xl" c="dark.6">
                    {getProductDescription()}
                  </Text>
                  <Group>
                    <Badge size="xl" color="green" variant="filled">
                      {product.price} ₽
                    </Badge>
                    <Badge size="lg" color={color}>Бесплатная доставка от 800₽</Badge>
                    <Badge size="lg" color="blue">Готовим за 15-20 минут</Badge>
                  </Group>
                  <Group>
                    <Button 
                      size="lg" 
                      color={color} 
                      leftSection={<IconShoppingCart size={20} />}
                      onClick={() => navigate('/')}
                    >
                      Заказать сейчас
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      color={color}
                      leftSection={<IconPhone size={20} />}
                      component="a"
                      href="tel:+79021053434"
                    >
                      +7(902)105-34-34
                    </Button>
                  </Group>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <ProductCardImage
                  src={product.imageUrl}
                  alt={`${product.name} - заказать с доставкой в Волжске`}
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Преимущества товара */}
          <Box>
            <Title order={2} c="dark" mb="md">Почему стоит заказать {product.name.toLowerCase()}?</Title>
            <Grid>
              {getProductAdvantages().map((advantage, index) => (
                <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
                  <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                    <Stack align="center" gap="md">
                      <IconStars size={48} color={`var(--mantine-color-${color}-6)`} />
                      <Title order={4} ta="center">{advantage}</Title>
                      <Text ta="center" size="sm" c="dimmed">
                        Мы используем только качественные ингредиенты для приготовления
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Box>

          {/* Как заказать */}
          <Card shadow="sm" radius="md" withBorder p="xl">
            <Title order={2} c="dark" mb="md">Как заказать {product.name.toLowerCase()}?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <List spacing="md" size="lg">
                  <List.Item icon={<IconShoppingCart size={24} color={`var(--mantine-color-${color}-6)`} />}>
                    <strong>Выберите {product.name.toLowerCase()}</strong> в нашем меню или позвоните по телефону
                  </List.Item>
                  <List.Item icon={<IconMapPin size={24} color={`var(--mantine-color-${color}-6)`} />}>
                    <strong>Укажите адрес доставки</strong> в Волжске - доставляем по всему городу
                  </List.Item>
                  <List.Item icon={<IconPhone size={24} color={`var(--mantine-color-${color}-6)`} />}>
                    <strong>Подтвердите заказ</strong> по телефону +7(902)105-34-34
                  </List.Item>
                  <List.Item icon={<IconTruck size={24} color={`var(--mantine-color-${color}-6)`} />}>
                    <strong>Получите {product.name.toLowerCase()}</strong> через 30-60 минут горячим и свежим
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card bg={`${color}.1`} p="md">
                  <Stack gap="xs" align="center">
                    <IconClock size={40} color={`var(--mantine-color-${color}-6)`} />
                    <Title order={4} c={`${color}.7`}>Быстрое приготовление</Title>
                    <Text ta="center" size="sm">
                      {product.name} готовится за 15-20 минут из свежих ингредиентов
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Локальная информация */}
          <LocalInfo variant="compact" showRating={true} showDeliveryInfo={true} />

          {/* Связанные продукты */}
          <RelatedProducts currentProduct={category} />

          {/* Контакты и заказ */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg={`${color}.0`}>
            <Group justify="space-between" align="center">
              <Box>
                <Title order={2} c={`${color}.7`}>Заказать {product.name.toLowerCase()} сейчас!</Title>
                <Group mt="md">
                  <Group gap="xs">
                    <IconPhone size={20} />
                    <Text size="lg" fw={600}>+7(902)105-34-34</Text>
                  </Group>
                  <Group gap="xs">
                    <IconMapPin size={20} />
                    <Text size="lg">г. Волжск, ул. Шестакова, д.1Б</Text>
                  </Group>
                  <Group gap="xs">
                    <IconClock size={20} />
                    <Text size="lg">Ежедневно с 10:00 до 20:00</Text>
                  </Group>
                </Group>
              </Box>
              <Button 
                size="xl" 
                color={color}
                leftSection={<IconShoppingCart size={24} />}
                onClick={() => navigate('/')}
              >
                Перейти в меню
              </Button>
            </Group>
          </Card>

          {/* SEO текст */}
          <Box>
            <Divider my="xl" />
            <Title order={3} c="dark" mb="md">{product.name} с доставкой в Волжске - ДИМБО</Title>
            <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
              <strong>{product.name}</strong> от ДИМБО - это гарантия качества и вкуса. Мы готовим каждое блюдо 
              из свежих ингредиентов сразу после получения заказа. Наши повара используют только проверенные 
              рецепты и качественные продукты.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              Когда вы <strong>заказываете {product.name.toLowerCase()}</strong> у нас, вы получаете не просто 
              готовое блюдо, а настоящее гастрономическое впечатление. Мы доставляем по всему Волжску в 
              специальных термосумках, которые сохраняют температуру и свежесть.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              <strong>Доставка {product.name.toLowerCase()} в Волжске</strong> осуществляется ежедневно с 10:00 до 20:00. 
              Время доставки составляет от 30 до 60 минут в зависимости от района. Бесплатная доставка при 
              заказе от 800₽. Цена {product.name.toLowerCase()} - {product.price}₽.
            </Text>
          </Box>
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}

export default ProductSEOTemplate
