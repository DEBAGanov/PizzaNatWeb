/**
 * @file: PizzeriaLeninaSEOPage.tsx
 * @description: SEO-страница для запроса "пиццерия ленина" - гиперлокальный запрос по адресу
 * @dependencies: Mantine, SEOHead, ProductsContext
 * @created: 2025-01-27
 */

import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box, Alert } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconStars, IconRoute, IconParking, IconBus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../../components/SEOHead'
import { ProductCardImage } from '../../components/common/OptimizedImage'
import { RelatedProducts } from '../../components/seo/RelatedProducts'
import { SchemaMarkup, PIZZA_FAQ } from '../../components/seo/SchemaMarkup'

export function PizzeriaLeninaSEOPage() {
  const navigate = useNavigate()

  const seoData = {
    title: "Пиццерия на Ленина в Волжске - ДИМБО Пицца | Доставка пиццы на улицу Ленина",
    description: "🍕 Пиццерия на улице Ленина в Волжске - ДИМБО Пицца ⭐ Доставка пиццы на ул. Ленина за 20-40 минут ⭐ Ближайшая пиццерия к улице Ленина ⭐ Бесплатная доставка от 800₽ ⭐ +7(902)105-34-34",
    keywords: "пиццерия ленина, пиццерия на ленина волжск, доставка пиццы ленина, пицца улица ленина, ближайшая пиццерия ленина волжск",
    imageUrl: "https://dimbopizza.ru/images/pizzeria-lenina.jpg",
    page: "pizzeria-lenina"
  }

  return (
    <SEOPageWrapper {...seoData}>
      <SchemaMarkup pageType="restaurant" includeFAQ={true} faqData={PIZZA_FAQ} />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="gradient-to-r from-blue-50 to-green-50">
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Badge size="lg" color="blue" variant="filled">📍 БЛИЖАЙШАЯ К УЛ. ЛЕНИНА</Badge>
                  <Title order={1} size="h1" c="blue.7">
                    Пиццерия на Ленина в Волжске
                  </Title>
                  <Text size="xl" c="dark.6" fw={500}>
                    🏠 Ближайшая пиццерия к улице Ленина! Находимся всего в 5 минутах ходьбы от центра улицы Ленина. 
                    Быстрая доставка пиццы на ул. Ленина за 20-40 минут. Знаем каждый дом на этой улице!
                  </Text>
                  <Group>
                    <Badge size="lg" color="green" leftSection={<IconRoute size={16} />}>
                      5 минут от ул. Ленина
                    </Badge>
                    <Badge size="lg" color="orange" leftSection={<IconTruck size={16} />}>
                      Доставка 20-40 мин
                    </Badge>
                  </Group>
                  <Alert color="blue" title="🗺️ Удобное расположение" icon={<IconMapPin />}>
                    Мы находимся на ул. Шестакова, д.1Б - это ближайшая пиццерия к улице Ленина в Волжске!
                  </Alert>
                  <Group>
                    <Button 
                      size="xl" 
                      color="blue" 
                      leftSection={<IconShoppingCart size={24} />}
                      onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}
                      style={{ fontSize: '18px' }}
                    >
                      Заказать на Ленина
                    </Button>
                    <Button 
                      size="xl" 
                      variant="outline" 
                      color="blue"
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
                  src="https://api.dimbopizza.ru/images/lenina-street-map.jpg"
                  alt="Карта доставки пиццы на улицу Ленина в Волжске"
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Как добраться до пиццерии с улицы Ленина */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="green.0">
            <Title order={2} c="dark" mb="md">🚶 Как добраться до пиццерии с улицы Ленина</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <List spacing="md" size="lg">
                  <List.Item icon={<IconRoute size={24} color="blue" />}>
                    <strong>Пешком (5 минут)</strong> - идите по ул. Ленина до пересечения с ул. Шестакова, поверните направо
                  </List.Item>
                  <List.Item icon={<IconBus size={24} color="green" />}>
                    <strong>На транспорте</strong> - автобусы №2, №5 до остановки "Центральная площадь"
                  </List.Item>
                  <List.Item icon={<IconParking size={24} color="orange" />}>
                    <strong>На автомобиле</strong> - есть парковка рядом с пиццерией, бесплатная для клиентов
                  </List.Item>
                  <List.Item icon={<IconTruck size={24} color="violet" />}>
                    <strong>Доставка</strong> - заказывайте доставку прямо на ул. Ленина, привезем за 20-40 минут
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card bg="blue.1" p="md">
                  <Stack gap="xs" align="center">
                    <IconMapPin size={48} color="blue" />
                    <Title order={4} c="blue.7">Адрес пиццерии</Title>
                    <Text ta="center" size="sm" fw={600}>г. Волжск, ул. Шестакова, д.1Б</Text>
                    <Text ta="center" size="xs" c="dimmed">Ближайшая к ул. Ленина пиццерия</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Доставка на улицу Ленина */}
          <Box>
            <Title order={2} c="dark" mb="md">🚚 Доставка пиццы на улицу Ленина</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconClock size={48} color="green" />
                    <Title order={4} ta="center">Быстрая доставка</Title>
                    <Text ta="center" size="sm">
                      На улицу Ленина доставляем пиццу за 20-40 минут - мы находимся очень близко!
                    </Text>
                    <Badge color="green">20-40 минут</Badge>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconRoute size={48} color="blue" />
                    <Title order={4} ta="center">Знаем каждый дом</Title>
                    <Text ta="center" size="sm">
                      Наши курьеры отлично знают улицу Ленина - найдем любой дом быстро и точно
                    </Text>
                    <Badge color="blue">Опытные курьеры</Badge>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconTruck size={48} color="orange" />
                    <Title order={4} ta="center">Бесплатная доставка</Title>
                    <Text ta="center" size="sm">
                      На ул. Ленина бесплатная доставка от 800₽ - это центральная зона города
                    </Text>
                    <Badge color="orange">От 800₽</Badge>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Популярные заказы на улице Ленина */}
          <Box>
            <Title order={2} c="dark" mb="md">🍕 Популярные заказы на улице Ленина</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <Badge color="red" variant="filled" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    №1 НА ЛЕНИНА
                  </Badge>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/pizza-margherita.jpg"
                    alt="Пицца Маргарита - популярная на улице Ленина"
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Пицца Маргарита</Title>
                    <Text size="sm" c="dimmed">Самая популярная пицца среди жителей ул. Ленина - классический вкус</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">380 ₽</Text>
                      <Button size="sm" color="blue" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <Badge color="green" variant="filled" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    №2 НА ЛЕНИНА
                  </Badge>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/pizza-pepperoni.jpg"
                    alt="Пицца Пепперони - популярная на улице Ленина"
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Пицца Пепперони</Title>
                    <Text size="sm" c="dimmed">Вторая по популярности пицца на ул. Ленина - для любителей острого</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">450 ₽</Text>
                      <Button size="sm" color="blue" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <Badge color="blue" variant="filled" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    №3 НА ЛЕНИНА
                  </Badge>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/pizza-quattro-formaggi.jpg"
                    alt="Пицца Четыре сыра - популярная на улице Ленина"
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Четыре сыра</Title>
                    <Text size="sm" c="dimmed">Третья по популярности на ул. Ленина - для настоящих сырных гурманов</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">490 ₽</Text>
                      <Button size="sm" color="blue" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Особенности доставки на разные участки улицы Ленина */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="orange.0">
            <Title order={2} c="dark" mb="md">🏘️ Доставка по участкам улицы Ленина</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="green.7" mb="sm">🏢 Начало ул. Ленина</Title>
                  <Text size="sm" mb="xs">Дома 1-50 (ближе к центру)</Text>
                  <Text size="sm" c="green.6" fw={600}>⏰ Доставка: 20-30 минут</Text>
                  <Text size="xs" c="dimmed" mt="xs">Самая быстрая доставка</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="blue.7" mb="sm">🏠 Середина ул. Ленина</Title>
                  <Text size="sm" mb="xs">Дома 51-100 (центральная часть)</Text>
                  <Text size="sm" c="blue.6" fw={600}>⏰ Доставка: 25-35 минут</Text>
                  <Text size="xs" c="dimmed" mt="xs">Стандартное время</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="violet.7" mb="sm">🌳 Конец ул. Ленина</Title>
                  <Text size="sm" mb="xs">Дома 101+ (дальняя часть)</Text>
                  <Text size="sm" c="violet.6" fw={600}>⏰ Доставка: 30-40 минут</Text>
                  <Text size="xs" c="dimmed" mt="xs">Чуть дольше, но тоже быстро</Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Отзывы жителей улицы Ленина */}
          <Box>
            <Title order={2} c="dark" mb="md">💬 Отзывы жителей улицы Ленина</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text fw={600}>Марина (ул. Ленина, 23)</Text>
                      <Group gap="xs">
                        {[1,2,3,4,5].map(i => <IconStars key={i} size={16} color="orange" />)}
                      </Group>
                    </Group>
                    <Text size="sm" c="dimmed">
                      "Живу на Ленина, заказываю пиццу только в ДИМБО. Привозят всегда быстро, 
                      курьеры знают где мой дом. Очень удобно!"
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text fw={600}>Алексей (ул. Ленина, 67)</Text>
                      <Group gap="xs">
                        {[1,2,3,4,5].map(i => <IconStars key={i} size={16} color="orange" />)}
                      </Group>
                    </Group>
                    <Text size="sm" c="dimmed">
                      "Ближайшая к нам пиццерия, и самая вкусная! За 25 минут привозят горячую пиццу. 
                      Рекомендую всем соседям!"
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text fw={600}>Ольга (ул. Ленина, 89)</Text>
                      <Group gap="xs">
                        {[1,2,3,4,5].map(i => <IconStars key={i} size={16} color="orange" />)}
                      </Group>
                    </Group>
                    <Text size="sm" c="dimmed">
                      "Заказываем семьей каждые выходные. Пицца отличная, цены приемлемые, 
                      доставка точно в срок. Спасибо!"
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Контакты и заказ */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="blue.0">
            <Group justify="space-between" align="center">
              <Box>
                <Title order={2} c="blue.7">🍕 Заказать пиццу на улицу Ленина!</Title>
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
                    <Text size="lg">Доставка на Ленина: 20-40 мин</Text>
                  </Group>
                </Group>
              </Box>
              <Button 
                size="xl" 
                color="blue"
                leftSection={<IconShoppingCart size={24} />}
                onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}
                style={{ fontSize: '18px' }}
              >
                Заказать доставку
              </Button>
            </Group>
          </Card>

          {/* Связанные продукты */}
          <RelatedProducts currentProduct="pizza" />

          {/* SEO текст */}
          <Box>
            <Divider my="xl" />
            <Title order={3} c="dark" mb="md">Пиццерия на Ленина в Волжске - ДИМБО Пицца</Title>
            <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
              Если вы ищете <strong>пиццерию на Ленина</strong> в Волжске, то ДИМБО Пицца - это ваш лучший выбор! 
              Мы находимся на ул. Шестакова, д.1Б, что делает нас ближайшей пиццерией к улице Ленина. 
              Всего 5 минут пешком от центра улицы Ленина, и вы уже в нашей уютной семейной пиццерии.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              <strong>Доставка пиццы на улицу Ленина</strong> - это наша специализация! Мы знаем каждый дом 
              на этой улице и доставляем пиццу за рекордные 20-40 минут. Наши курьеры отлично ориентируются 
              в районе и всегда найдут ваш адрес быстро и точно. Бесплатная доставка действует при заказе 
              от 800₽, так как улица Ленина находится в центральной зоне Волжска.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              Жители <strong>улицы Ленина</strong> особенно ценят нашу пиццу за качество и скорость доставки. 
              Мы готовим пиццу из свежих ингредиентов: используем итальянскую муку, натуральную моцареллу, 
              свежие овощи и качественные мясные продукты. Каждая пицца готовится индивидуально после 
              получения заказа, поэтому вы всегда получаете горячую и свежую пиццу прямо к двери.
            </Text>
          </Box>
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
