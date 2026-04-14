/**
 * @file: PizzaSEOPage.tsx
 * @description: SEO-оптимизированная страница для продвижения пиццы по ключевым запросам
 * @dependencies: Mantine, SEOHead, ProductsContext
 * @created: 2025-01-27
 */

import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconStars } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../../components/SEOHead'
import { ProductCardImage } from '../../components/common/OptimizedImage'
import { RelatedProducts } from '../../components/seo/RelatedProducts'
import { SchemaMarkup, PIZZA_FAQ } from '../../components/seo/SchemaMarkup'
import { YandexReviewsWidget } from '../../components/common/YandexReviewsWidget'

export function PizzaSEOPage() {
  const navigate = useNavigate()

  const seoData = {
    title: "Заказать пиццу с доставкой в Волжске - ДИМБО Пицца | Быстрая доставка пиццы на дом",
    description: "🍕 Заказать пиццу с доставкой в Волжске за 30-60 минут ⭐ Доставка пиццы на дом от 800₽ ⭐ Горячая закрытая пицца ⭐ Лучше чем Додо Пицца ⭐ +7(902)105-34-34",
    keywords: "заказать пиццу, доставка пиццы, пицца волжск, доставка пиццы волжск, заказать пиццу волжск, горячая пицца доставка, закрытая пицца доставка",
    imageUrl: "https://dimbopizza.ru/images/pizza-hero.jpg"
  }

  return (
    <SEOPageWrapper {...seoData}>
      <SchemaMarkup pageType="pizza" includeFAQ={true} faqData={PIZZA_FAQ} />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="orange.0">
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Title order={1} size="h1" c="orange.7">
                    Заказать пиццу с доставкой в Волжске
                  </Title>
                  <Text size="xl" c="dark.6">
                    Горячая пицца с доставкой на дом за 30-60 минут! Лучшие рецепты, свежие ингредиенты и быстрая доставка пиццы по всему Волжску.
                  </Text>
                  <Group>
                    <Badge size="lg" color="green">Бесплатная доставка от 800₽</Badge>
                    <Badge size="lg" color="blue">Работаем до 20:00</Badge>
                  </Group>
                  <Group>
                    <Button 
                      size="lg" 
                      color="orange" 
                      leftSection={<IconShoppingCart size={20} />}
                      onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}
                    >
                      Заказать пиццу сейчас
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      color="orange"
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
                  src="https://api.dimbopizza.ru/images/pizza-margherita.jpg"
                  alt="Заказать пиццу с доставкой в Волжске - ДИМБО Пицца"
                  style={{ borderRadius: '12px' }}
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Популярные пиццы */}
          <Box>
            <Title order={2} c="dark" mb="md">Популярные пиццы с доставкой</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/pizza-margherita.jpg"
                    alt="Пицца Маргарита - заказать с доставкой"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Пицца Маргарита</Title>
                    <Text size="sm" c="dimmed">Классическая итальянская пицца с томатным соусом, сыром "Моцарелла" и помидорами</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">380 ₽</Text>
                      <Button size="sm" color="orange" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/pizza-pepperoni.jpg"
                    alt="Пицца Пепперони - доставка пиццы"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Пицца Пепперони</Title>
                    <Text size="sm" c="dimmed">Острая пицца с пепперони, томатным соусом и сыром "Моцарелла"</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">450 ₽</Text>
                      <Button size="sm" color="orange" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/pizza-hawaiian.jpg"
                    alt="Гавайская пицца - заказать доставку"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Гавайская пицца</Title>
                    <Text size="sm" c="dimmed">Экзотическая пицца с ананасами, ветчиной и сыром "Моцарелла"</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">480 ₽</Text>
                      <Button size="sm" color="orange" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Как заказать пиццу */}
          <Card shadow="sm" radius="md" withBorder p="xl">
            <Title order={2} c="dark" mb="md">Как заказать пиццу с доставкой?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <List spacing="md" size="lg">
                  <List.Item icon={<IconShoppingCart size={24} color="orange" />}>
                    <strong>Выберите пиццу</strong> в нашем меню - у нас более 20 видов вкусной пиццы
                  </List.Item>
                  <List.Item icon={<IconMapPin size={24} color="orange" />}>
                    <strong>Укажите адрес доставки</strong> в Волжске - доставляем по всему городу
                  </List.Item>
                  <List.Item icon={<IconPhone size={24} color="orange" />}>
                    <strong>Подтвердите заказ</strong> по телефону +7(902)105-34-34
                  </List.Item>
                  <List.Item icon={<IconTruck size={24} color="orange" />}>
                    <strong>Получите горячую пиццу</strong> через 30-60 минут прямо к двери
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card bg="orange.1" p="md">
                  <Stack gap="xs" align="center">
                    <IconClock size={40} color="orange" />
                    <Title order={4} c="orange.7">Быстрая доставка</Title>
                    <Text ta="center" size="sm">Доставка пиццы за 30-60 минут в любую точку Волжска</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Преимущества доставки пиццы */}
          <Box>
            <Title order={2} c="dark" mb="md">Почему заказывают пиццу именно у нас?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconTruck size={48} color="orange" />
                    <Title order={4} ta="center">Быстрая доставка пиццы</Title>
                    <Text ta="center" size="sm">Горячая пицца с доставкой по Волжску за 30-60 минут. Водитель доставит пиццу точно в срок!</Text>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconStars size={48} color="green" />
                    <Title order={4} ta="center">Качество ингредиентов</Title>
                    <Text ta="center" size="sm">Используем только свежие ингредиенты: итальянскую муку, натуральную моцареллу, качественные мясные продукты</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconMapPin size={48} color="blue" />
                    <Title order={4} ta="center">Доставка по всему Волжску</Title>
                    <Text ta="center" size="sm">Доставляем пиццу в любую точку Волжска. Бесплатная доставка при заказе от 800₽</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconPhone size={48} color="violet" />
                    <Title order={4} ta="center">Удобная оплата</Title>
                    <Text ta="center" size="sm">Оплата наличными курьеру, банковской картой или через СБП - выбирайте как удобно</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Зоны доставки */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="blue.0">
            <Title order={2} c="dark" mb="md">Доставка пиццы по всему Волжску</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="green.7" mb="sm">Центральные районы</Title>
                  <Text size="sm" mb="xs">Бесплатная доставка от 800₽</Text>
                  <Text size="sm" c="green.6" fw={600}>Время доставки: 30-45 мин</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="blue.7" mb="sm">Спальные районы</Title>
                  <Text size="sm" mb="xs">Бесплатная доставка от 1000₽</Text>
                  <Text size="sm" c="blue.6" fw={600}>Время доставки: 40-60 мин</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="violet.7" mb="sm">Окраины города</Title>
                  <Text size="sm" mb="xs">Бесплатная доставка от 1200₽</Text>
                  <Text size="sm" c="violet.6" fw={600}>Время доставки: 50-60 мин</Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Контакты и заказ */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="orange.0">
            <Group justify="space-between" align="center">
              <Box>
                <Title order={2} c="orange.7">Заказать пиццу сейчас!</Title>
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
                color="orange"
                leftSection={<IconShoppingCart size={24} />}
                onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}
              >
                Перейти в меню
              </Button>
            </Group>
          </Card>

          {/* Связанные продукты */}
          <RelatedProducts currentProduct="pizza" />

          {/* SEO текст */}
          <Box>
            <Divider my="xl" />
            <Title order={3} c="dark" mb="md">Доставка пиццы в Волжске - ДИМБО Пицца</Title>
            <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
              <strong>ДИМБО Пицца</strong> - это семейная пиццерия в Волжске, где каждое блюдо готовится с душой. 
              Мы специализируемся на <strong>доставке пиццы на дом</strong> и гордимся тем, что используем только 
              качественные ингредиенты: итальянскую муку для теста, натуральную моцареллу, свежие овощи и 
              качественные мясные продукты.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              Когда вы <strong>заказываете пиццу</strong> у нас, вы получаете не просто готовое блюдо, а настоящее 
              гастрономическое впечатление. Наши повара - настоящие мастера своего дела, которые знают секреты 
              приготовления идеального теста и правильного сочетания ингредиентов.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              <strong>Доставка пиццы в Волжске</strong> осуществляется ежедневно с 10:00 до 20:00. Мы доставляем 
              горячую пиццу в специальных термосумках, которые сохраняют температуру и не дают пицце остыть. 
              Время доставки составляет от 30 до 60 минут в зависимости от района Волжска.
            </Text>
          </Box>
        </Stack>

        {/* Виджет отзывов Яндекс Карт */}
        <YandexReviewsWidget />
      </Container>
    </SEOPageWrapper>
  )
}
