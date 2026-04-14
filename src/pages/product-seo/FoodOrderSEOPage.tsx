/**
 * @file: FoodOrderSEOPage.tsx
 * @description: SEO-страница для запроса "еда на заказ" - широкий коммерческий запрос
 * @dependencies: Mantine, SEOHead, ProductsContext
 * @created: 2025-01-27
 */

import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box, Alert, SimpleGrid } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconStars, IconPizza, IconBurger, IconMeat, IconCarrot, IconFish } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../../components/SEOHead'
import { ProductCardImage } from '../../components/common/OptimizedImage'
import { RelatedProducts } from '../../components/seo/RelatedProducts'
import { SchemaMarkup, PIZZA_FAQ } from '../../components/seo/SchemaMarkup'

export function FoodOrderSEOPage() {
  const navigate = useNavigate()

  const seoData = {
    title: "Еда на заказ в Волжске с доставкой - ДИМБО | Заказать еду на дом быстро и вкусно",
    description: "🍕 Еда на заказ в Волжске с доставкой ⭐ Пицца, бургеры, суши, шашлык ⭐ Быстрая доставка еды на дом за 30-60 минут ⭐ Бесплатная доставка от 800₽ ⭐ +7(902)105-34-34",
    keywords: "еда на заказ, еда на заказ волжск, заказать еду с доставкой, доставка еды волжск, еда на дом, быстрая доставка еды",
    imageUrl: "https://dimbopizza.ru/images/food-order.jpg",
    page: "food-order"
  }

  return (
    <SEOPageWrapper {...seoData}>
      <SchemaMarkup pageType="restaurant" includeFAQ={true} faqData={PIZZA_FAQ} />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="gradient-to-r from-teal-50 to-cyan-50">
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Badge size="lg" color="teal" variant="filled">🍽️ ВСЯ ЕДА В ОДНОМ МЕСТЕ</Badge>
                  <Title order={1} size="h1" c="teal.7">
                    Еда на заказ в Волжске с доставкой
                  </Title>
                  <Text size="xl" c="dark.6" fw={500}>
                    🚀 Заказать еду на дом в Волжске стало проще! Пицца, бургеры, суши, шашлык - 
                    все виды еды с быстрой доставкой за 30-60 минут. Большой выбор блюд на любой вкус!
                  </Text>
                  <Group>
                    <Badge size="lg" color="green" leftSection={<IconTruck size={16} />}>
                      Доставка 30-60 мин
                    </Badge>
                    <Badge size="lg" color="orange" leftSection={<IconStars size={16} />}>
                      Более 50 блюд
                    </Badge>
                  </Group>
                  <Alert color="teal" title="🎉 Большой выбор!" icon={<IconShoppingCart />}>
                    У нас вы найдете любую еду: от классической пиццы до экзотических суши!
                  </Alert>
                  <Group>
                    <Button 
                      size="xl" 
                      color="teal" 
                      leftSection={<IconShoppingCart size={24} />}
                      onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}
                      style={{ fontSize: '18px' }}
                    >
                      Заказать еду сейчас
                    </Button>
                    <Button 
                      size="xl" 
                      variant="outline" 
                      color="teal"
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
                  src="https://api.dimbopizza.ru/images/food-variety.jpg"
                  alt="Еда на заказ в Волжске - большой выбор блюд"
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Категории еды */}
          <Box>
            <Title order={2} c="dark" mb="md">🍽️ Какую еду можно заказать?</Title>
            <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing="md">
              <Card shadow="sm" radius="md" withBorder p="md" style={{ cursor: 'pointer' }} onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>
                <Stack align="center" gap="md">
                  <IconPizza size={48} color="orange" />
                  <Title order={4} ta="center">Пицца</Title>
                  <Text ta="center" size="sm" c="dimmed">Более 20 видов</Text>
                  <Badge color="orange">от 380₽</Badge>
                </Stack>
              </Card>

              <Card shadow="sm" radius="md" withBorder p="md" style={{ cursor: 'pointer' }} onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>
                <Stack align="center" gap="md">
                  <IconBurger size={48} color="yellow" />
                  <Title order={4} ta="center">Бургеры</Title>
                  <Text ta="center" size="sm" c="dimmed">Сочные котлеты</Text>
                  <Badge color="yellow">от 320₽</Badge>
                </Stack>
              </Card>

              <Card shadow="sm" radius="md" withBorder p="md" style={{ cursor: 'pointer' }} onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>
                <Stack align="center" gap="md">
                  <IconFish size={48} color="blue" />
                  <Title order={4} ta="center">Суши</Title>
                  <Text ta="center" size="sm" c="dimmed">Свежая рыба</Text>
                  <Badge color="blue">от 450₽</Badge>
                </Stack>
              </Card>

              <Card shadow="sm" radius="md" withBorder p="md" style={{ cursor: 'pointer' }} onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>
                <Stack align="center" gap="md">
                  <IconMeat size={48} color="red" />
                  <Title order={4} ta="center">Шашлык</Title>
                  <Text ta="center" size="sm" c="dimmed">На углях</Text>
                  <Badge color="red">от 520₽</Badge>
                </Stack>
              </Card>

              <Card shadow="sm" radius="md" withBorder p="md" style={{ cursor: 'pointer' }} onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>
                <Stack align="center" gap="md">
                  <IconCarrot size={48} color="green" />
                  <Title order={4} ta="center">Закуски</Title>
                  <Text ta="center" size="sm" c="dimmed">Картофель, нагетсы</Text>
                  <Badge color="green">от 180₽</Badge>
                </Stack>
              </Card>
            </SimpleGrid>
          </Box>

          {/* Популярные блюда для заказа */}
          <Box>
            <Title order={2} c="dark" mb="md">🔥 Популярная еда для заказа на дом</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <Badge color="red" variant="filled" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    ХИТ
                  </Badge>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/pizza-margherita.jpg"
                    alt="Пицца Маргарита - популярная еда на заказ"
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Пицца Маргарита</Title>
                    <Text size="sm" c="dimmed">Самое популярное блюдо для заказа на дом в Волжске</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">380 ₽</Text>
                      <Button size="sm" color="teal" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <Badge color="green" variant="filled" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    ПОПУЛЯРНО
                  </Badge>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/burger-classic.jpg"
                    alt="Классический бургер - популярная еда на заказ"
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Классический бургер</Title>
                    <Text size="sm" c="dimmed">Второе по популярности блюдо для заказа еды</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">350 ₽</Text>
                      <Button size="sm" color="teal" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <Badge color="blue" variant="filled" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    НОВИНКА
                  </Badge>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/sushi-set.jpg"
                    alt="Суши сет - популярная еда на заказ"
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Суши сет</Title>
                    <Text size="sm" c="dimmed">Набирающее популярность блюдо для заказа</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">680 ₽</Text>
                      <Button size="sm" color="teal" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Как заказать еду */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="blue.0">
            <Title order={2} c="dark" mb="md">📱 Как заказать еду на дом в Волжске?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <List spacing="md" size="lg">
                  <List.Item icon={<IconShoppingCart size={24} color="teal" />}>
                    <strong>1. Выберите блюда</strong> из нашего большого меню - пицца, бургеры, суши, шашлык
                  </List.Item>
                  <List.Item icon={<IconMapPin size={24} color="teal" />}>
                    <strong>2. Укажите адрес</strong> доставки в Волжске - доставляем по всему городу
                  </List.Item>
                  <List.Item icon={<IconPhone size={24} color="teal" />}>
                    <strong>3. Подтвердите заказ</strong> по телефону +7(902)105-34-34
                  </List.Item>
                  <List.Item icon={<IconTruck size={24} color="teal" />}>
                    <strong>4. Получите еду</strong> через 30-60 минут горячей и свежей
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card bg="teal.1" p="md">
                  <Stack gap="xs" align="center">
                    <IconClock size={48} color="teal" />
                    <Title order={4} c="teal.7">Быстрая доставка</Title>
                    <Text ta="center" size="sm">Любая еда будет доставлена за 30-60 минут в любую точку Волжска</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Преимущества заказа еды у нас */}
          <Box>
            <Title order={2} c="dark" mb="md">⭐ Почему заказывают еду именно у нас?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconStars size={48} color="orange" />
                    <Title order={4} ta="center">Большой выбор</Title>
                    <Text ta="center" size="sm">Более 50 блюд: пицца, бургеры, суши, шашлык, закуски - еда на любой вкус</Text>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconTruck size={48} color="blue" />
                    <Title order={4} ta="center">Быстрая доставка</Title>
                    <Text ta="center" size="sm">Доставляем любую еду по Волжску за 30-60 минут в специальной упаковке</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconClock size={48} color="green" />
                    <Title order={4} ta="center">Всегда свежее</Title>
                    <Text ta="center" size="sm">Готовим еду только после получения заказа - гарантируем свежесть</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconMapPin size={48} color="violet" />
                    <Title order={4} ta="center">По всему городу</Title>
                    <Text ta="center" size="sm">Доставляем еду в любую точку Волжска, бесплатно от 800₽</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Время работы и зоны доставки */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="green.0">
            <Title order={2} c="dark" mb="md">🕐 Время работы и доставка еды</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="green.7" mb="sm">⏰ Режим работы</Title>
                  <Text size="md" mb="xs" fw={600}>Ежедневно с 10:00 до 20:00</Text>
                  <Text size="sm" c="dimmed">Принимаем заказы на еду без выходных</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="blue.7" mb="sm">🚚 Время доставки</Title>
                  <Text size="md" mb="xs" fw={600}>30-60 минут по городу</Text>
                  <Text size="sm" c="dimmed">Быстрая доставка любой еды</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="orange.7" mb="sm">💰 Бесплатная доставка</Title>
                  <Text size="md" mb="xs" fw={600}>От 800₽ по центру</Text>
                  <Text size="sm" c="dimmed">От 1000₽ в спальные районы</Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Комбо предложения */}
          <Box>
            <Title order={2} c="dark" mb="md">🎁 Выгодные комбо для заказа еды</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="md">
                    <Badge color="orange" size="lg">СЕМЕЙНЫЙ УЖИН</Badge>
                    <Title order={4}>2 пиццы + напитки</Title>
                    <Text size="sm" c="dimmed">Две большие пиццы на выбор + 4 напитка</Text>
                    <Group justify="space-between" align="center">
                      <Text size="xl" fw={700} c="orange">890 ₽</Text>
                      <Button color="orange" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="md">
                    <Badge color="yellow" size="lg">БУРГЕР КОМБО</Badge>
                    <Title order={4}>Бургер + картофель + напиток</Title>
                    <Text size="sm" c="dimmed">Сочный бургер с картофелем фри и газировкой</Text>
                    <Group justify="space-between" align="center">
                      <Text size="xl" fw={700} c="orange">450 ₽</Text>
                      <Button color="yellow" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="md">
                    <Badge color="blue" size="lg">СУШИ СЕТ</Badge>
                    <Title order={4}>Большой суши сет</Title>
                    <Text size="sm" c="dimmed">24 штуки суши + роллы + имбирь и васаби</Text>
                    <Group justify="space-between" align="center">
                      <Text size="xl" fw={700} c="orange">1290 ₽</Text>
                      <Button color="blue" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Контакты и заказ */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="teal.0">
            <Group justify="space-between" align="center">
              <Box>
                <Title order={2} c="teal.7">🍽️ Заказать еду на дом прямо сейчас!</Title>
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
                color="teal"
                leftSection={<IconShoppingCart size={24} />}
                onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}
                style={{ fontSize: '18px' }}
              >
                Посмотреть меню
              </Button>
            </Group>
          </Card>

          {/* Связанные продукты */}
          <RelatedProducts currentProduct="pizza" />

          {/* SEO текст */}
          <Box>
            <Divider my="xl" />
            <Title order={3} c="dark" mb="md">Еда на заказ в Волжске - ДИМБО</Title>
            <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
              <strong>Еда на заказ</strong> в Волжске стала неотъемлемой частью современной жизни. ДИМБО предлагает 
              широкий выбор блюд для заказа на дом: от классической пиццы до экзотических суши. Мы понимаем, что 
              каждый клиент имеет свои предпочтения, поэтому в нашем меню представлено более 50 различных блюд 
              на любой вкус и бюджет.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              Когда вы решаете <strong>заказать еду на дом</strong>, важно выбрать надежного поставщика, который 
              гарантирует качество и скорость доставки. ДИМБО работает в Волжске уже более 3 лет и за это время 
              завоевал доверие тысяч клиентов. Мы готовим каждое блюдо индивидуально после получения заказа, 
              используя только свежие и качественные ингредиенты.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              <strong>Доставка еды</strong> осуществляется по всему Волжску за 30-60 минут. Мы используем специальную 
              термоупаковку, которая сохраняет температуру блюд и не дает им остыть по дороге. Бесплатная доставка 
              действует при заказе от 800₽ в центральные районы и от 1000₽ в спальные районы. Работаем ежедневно 
              с 10:00 до 20:00, принимаем заказы по телефону и через сайт.
            </Text>
          </Box>
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
