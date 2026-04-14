/**
 * @file: PizzaOrderDeliverySEOPage.tsx
 * @description: SEO-страница для запроса "пицца заказать с доставкой" - высокочастотный коммерческий запрос
 * @dependencies: Mantine, SEOHead, ProductsContext
 * @created: 2025-01-27
 */

import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box, Alert } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconStars, IconCheck, IconGift } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../../components/SEOHead'
import { ProductCardImage } from '../../components/common/OptimizedImage'
import { RelatedProducts } from '../../components/seo/RelatedProducts'
import { SchemaMarkup, PIZZA_FAQ } from '../../components/seo/SchemaMarkup'

export function PizzaOrderDeliverySEOPage() {
  const navigate = useNavigate()

  const seoData = {
    title: "Пицца заказать с доставкой в Волжске - ДИМБО Пицца | Быстрый заказ пиццы на дом",
    description: "🍕 Пицца заказать с доставкой в Волжске ⭐ Быстрый заказ пиццы на дом за 30-60 минут ⭐ Бесплатная доставка от 800₽ ⭐ Горячая пицца до двери ⭐ +7(902)105-34-34",
    keywords: "пицца заказать с доставкой, заказать пиццу с доставкой волжск, быстрый заказ пиццы, пицца на дом волжск, заказ пиццы онлайн, горячая пицца доставка",
    imageUrl: "https://dimbopizza.ru/images/pizza-order-delivery.jpg",
    page: "pizza-order-delivery"
  }

  return (
    <SEOPageWrapper {...seoData}>
      <SchemaMarkup pageType="pizza" includeFAQ={true} faqData={PIZZA_FAQ} />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="gradient-to-r from-orange-50 to-red-50">
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Badge size="lg" color="red" variant="filled">🔥 ХИТ ПРОДАЖ</Badge>
                  <Title order={1} size="h1" c="orange.7">
                    Пицца заказать с доставкой в Волжске
                  </Title>
                  <Text size="xl" c="dark.6" fw={500}>
                    ⚡ Быстрый заказ пиццы на дом! Горячая пицца с доставкой за 30-60 минут. 
                    Более 20 видов вкусной пиццы от 380₽. Бесплатная доставка от 800₽!
                  </Text>
                  <Group>
                    <Badge size="lg" color="green" leftSection={<IconGift size={16} />}>
                      Бесплатная доставка от 800₽
                    </Badge>
                    <Badge size="lg" color="blue" leftSection={<IconClock size={16} />}>
                      30-60 минут
                    </Badge>
                  </Group>
                  <Alert color="orange" title="🎉 Акция!" icon={<IconGift />}>
                    При заказе от 1200₽ - газировка в подарок!
                  </Alert>
                  <Group>
                    <Button 
                      size="xl" 
                      color="orange" 
                      leftSection={<IconShoppingCart size={24} />}
                      onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}
                      style={{ fontSize: '18px' }}
                    >
                      Заказать пиццу сейчас
                    </Button>
                    <Button 
                      size="xl" 
                      variant="outline" 
                      color="orange"
                      leftSection={<IconPhone size={24} />}
                      component="a"
                      href="tel:+79021053434"
                      style={{ fontSize: '18px' }}
                    >
                      +7(902)105-34-34
                    </Button>
                  </Group>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <ProductCardImage
                  src="https://api.dimbopizza.ru/images/pizza-margherita.jpg"
                  alt="Пицца заказать с доставкой в Волжске - ДИМБО Пицца"
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Топ пиццы для заказа */}
          <Box>
            <Title order={2} c="dark" mb="md">🍕 Топ пиццы для заказа с доставкой</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <Badge color="red" variant="filled" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    ХИТ
                  </Badge>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/pizza-margherita.jpg"
                    alt="Пицца Маргарита заказать с доставкой"
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Пицца Маргарита</Title>
                    <Text size="sm" c="dimmed">Классическая итальянская пицца с томатным соусом, сыром "Моцарелла" и свежими помидорами</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">380 ₽</Text>
                      <Button size="sm" color="orange" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <Badge color="green" variant="filled" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    НОВИНКА
                  </Badge>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/pizza-pepperoni.jpg"
                    alt="Пицца Пепперони заказать с доставкой"
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
                  <Badge color="blue" variant="filled" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    АКЦИЯ
                  </Badge>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/pizza-hawaiian.jpg"
                    alt="Гавайская пицца заказать с доставкой"
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

          {/* Как быстро заказать пиццу */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="blue.0">
            <Title order={2} c="dark" mb="md">🚀 Как быстро заказать пиццу с доставкой?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <List spacing="md" size="lg">
                  <List.Item icon={<IconShoppingCart size={24} color="orange" />}>
                    <strong>1. Выберите пиццу</strong> в нашем меню - более 20 видов от классических до авторских
                  </List.Item>
                  <List.Item icon={<IconMapPin size={24} color="orange" />}>
                    <strong>2. Укажите адрес</strong> доставки в Волжске - доставляем по всему городу
                  </List.Item>
                  <List.Item icon={<IconPhone size={24} color="orange" />}>
                    <strong>3. Подтвердите заказ</strong> по телефону +7(902)105-34-34 или через сайт
                  </List.Item>
                  <List.Item icon={<IconTruck size={24} color="orange" />}>
                    <strong>4. Получите горячую пиццу</strong> через 30-60 минут прямо к двери
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card bg="orange.1" p="md">
                  <Stack gap="xs" align="center">
                    <IconClock size={48} color="orange" />
                    <Title order={4} c="orange.7">Экспресс-заказ</Title>
                    <Text ta="center" size="sm">Заказ пиццы за 2 минуты! Быстрее, чем в любой другой пиццерии Волжска</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Преимущества заказа у нас */}
          <Box>
            <Title order={2} c="dark" mb="md">⭐ Почему заказывают пиццу именно у нас?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconTruck size={48} color="orange" />
                    <Title order={4} ta="center">Быстрая доставка</Title>
                    <Text ta="center" size="sm">Горячая пицца с доставкой по Волжску за 30-60 минут. Гарантируем точность времени!</Text>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconStars size={48} color="green" />
                    <Title order={4} ta="center">Качество ингредиентов</Title>
                    <Text ta="center" size="sm">Итальянская мука, натуральная моцарелла, свежие овощи - только лучшие продукты</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconCheck size={48} color="blue" />
                    <Title order={4} ta="center">Гарантия качества</Title>
                    <Text ta="center" size="sm">Если пицца не понравилась - вернем деньги или приготовим новую бесплатно</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconGift size={48} color="violet" />
                    <Title order={4} ta="center">Выгодные акции</Title>
                    <Text ta="center" size="sm">Регулярные скидки, акции и подарки при заказе пиццы с доставкой</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Зоны доставки пиццы */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="green.0">
            <Title order={2} c="dark" mb="md">🗺️ Зоны доставки пиццы в Волжске</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="green.7" mb="sm">🏢 Центр города</Title>
                  <Text size="sm" mb="xs">Бесплатная доставка от 800₽</Text>
                  <Text size="sm" c="green.6" fw={600}>⏰ Время доставки: 30-45 мин</Text>
                  <Text size="xs" c="dimmed" mt="xs">ул. Ленина, ул. Шестакова, центральные районы</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="blue.7" mb="sm">🏘️ Спальные районы</Title>
                  <Text size="sm" mb="xs">Бесплатная доставка от 1000₽</Text>
                  <Text size="sm" c="blue.6" fw={600}>⏰ Время доставки: 40-60 мин</Text>
                  <Text size="xs" c="dimmed" mt="xs">Жилые массивы, новостройки</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="violet.7" mb="sm">🌲 Окраины</Title>
                  <Text size="sm" mb="xs">Бесплатная доставка от 1200₽</Text>
                  <Text size="sm" c="violet.6" fw={600}>⏰ Время доставки: 50-60 мин</Text>
                  <Text size="xs" c="dimmed" mt="xs">Частный сектор, дачные поселки</Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Контакты и заказ */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="orange.0">
            <Group justify="space-between" align="center">
              <Box>
                <Title order={2} c="orange.7">🍕 Заказать пиццу прямо сейчас!</Title>
                <Group mt="md" wrap="wrap">
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
                style={{ fontSize: '18px' }}
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
            <Title order={3} c="dark" mb="md">Пицца заказать с доставкой в Волжске - ДИМБО Пицца</Title>
            <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
              <strong>Пицца заказать с доставкой</strong> в Волжске стало проще! ДИМБО Пицца предлагает быстрый заказ 
              пиццы на дом с доставкой за 30-60 минут. Мы готовим пиццу из качественных ингредиентов: используем 
              итальянскую муку для теста, натуральную моцареллу, свежие овощи и отборные мясные продукты.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              Когда вы решаете <strong>заказать пиццу с доставкой</strong>, важно выбрать надежную пиццерию. 
              ДИМБО Пицца - это семейный бизнес в Волжске, где каждая пицца готовится с душой. Наши повара - 
              настоящие мастера, которые знают секреты идеального теста и правильного сочетания ингредиентов.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              <strong>Заказ пиццы с доставкой</strong> в нашей пиццерии - это гарантия качества и скорости. 
              Мы доставляем горячую пиццу в специальных термосумках по всему Волжску. Бесплатная доставка 
              действует при заказе от 800₽ в центре города. Работаем ежедневно с 10:00 до 20:00.
            </Text>
          </Box>
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
