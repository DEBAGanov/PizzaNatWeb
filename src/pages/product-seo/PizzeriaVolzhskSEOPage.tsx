/**
 * @file: PizzeriaVolzhskSEOPage.tsx
 * @description: SEO-страница для запроса "пиццерия волжск" - локальный коммерческий запрос
 * @dependencies: Mantine, SEOHead, ProductsContext
 * @created: 2025-01-27
 */

import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box, Alert, Image } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconStars, IconUsers, IconAward, IconHeart } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../../components/SEOHead'
import { ProductCardImage } from '../../components/common/OptimizedImage'
import { RelatedProducts } from '../../components/seo/RelatedProducts'
import { SchemaMarkup, PIZZA_FAQ } from '../../components/seo/SchemaMarkup'

export function PizzeriaVolzhskSEOPage() {
  const navigate = useNavigate()

  const seoData = {
    title: "Пиццерия в Волжске - ДИМБО Пицца | Лучшая пиццерия Волжска с доставкой",
    description: "🍕 Лучшая пиццерия в Волжске - ДИМБО Пицца ⭐ Семейная пиццерия с итальянскими традициями ⭐ Доставка пиццы по всему Волжску ⭐ Работаем с 10:00 до 20:00 ⭐ +7(902)105-34-34",
    keywords: "пиццерия волжск, лучшая пиццерия волжск, пиццерия в волжске, семейная пиццерия, итальянская пиццерия волжск, пиццерия с доставкой волжск",
    imageUrl: "https://dimbopizza.ru/images/pizzeria-volzhsk.jpg",
    page: "pizzeria-volzhsk"
  }

  return (
    <SEOPageWrapper {...seoData}>
      <SchemaMarkup pageType="restaurant" includeFAQ={true} faqData={PIZZA_FAQ} />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="gradient-to-r from-orange-50 to-yellow-50">
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Badge size="lg" color="orange" variant="filled">🏆 ЛУЧШАЯ ПИЦЦЕРИЯ ВОЛЖСКА</Badge>
                  <Title order={1} size="h1" c="orange.7">
                    Пиццерия в Волжске - ДИМБО Пицца
                  </Title>
                  <Text size="xl" c="dark.6" fw={500}>
                    🇮🇹 Семейная пиццерия с итальянскими традициями в сердце Волжска! 
                    Готовим пиццу по классическим рецептам из качественных ингредиентов. 
                    Уютная атмосфера и доставка по всему городу.
                  </Text>
                  <Group>
                    <Badge size="lg" color="green" leftSection={<IconHeart size={16} />}>
                      Семейная пиццерия
                    </Badge>
                    <Badge size="lg" color="blue" leftSection={<IconAward size={16} />}>
                      Итальянские традиции
                    </Badge>
                  </Group>
                  <Alert color="orange" title="🎊 О нас" icon={<IconUsers />}>
                    Семейная пиццерия ДИМБО работает в Волжске уже более 3 лет. Мы гордимся качеством наших блюд!
                  </Alert>
                  <Group>
                    <Button 
                      size="xl" 
                      color="orange" 
                      leftSection={<IconShoppingCart size={24} />}
                      onClick={() => navigate('/')}
                      style={{ fontSize: '18px' }}
                    >
                      Посмотреть меню
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
                  src="https://api.dimbopizza.ru/images/pizzeria-interior.jpg"
                  alt="Пиццерия ДИМБО в Волжске - уютный интерьер"
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* О нашей пиццерии */}
          <Box>
            <Title order={2} c="dark" mb="md">🏪 О пиццерии ДИМБО в Волжске</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Stack gap="md">
                  <Text size="lg" c="dark.6" style={{ lineHeight: 1.6 }}>
                    <strong>Пиццерия ДИМБО</strong> - это семейный бизнес в Волжске, который начался с мечты 
                    принести настоящий вкус итальянской пиццы в наш родной город. Мы открылись в 2021 году 
                    и с тех пор радуем жителей Волжска вкусной пиццей, приготовленной с душой.
                  </Text>
                  <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
                    Наша пиццерия расположена по адресу <strong>ул. Шестакова, д.1Б</strong> в центре Волжска. 
                    У нас уютный зал на 20 посадочных мест, где можно насладиться свежеприготовленной пиццей 
                    в теплой семейной атмосфере. Также мы предлагаем доставку по всему Волжску.
                  </Text>
                  <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
                    Наши повара прошли обучение у итальянских мастеров и знают все секреты приготовления 
                    настоящей пиццы: от замешивания теста до правильного сочетания ингредиентов.
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card bg="orange.1" p="md">
                  <Stack gap="md" align="center">
                    <IconStars size={48} color="orange" />
                    <Title order={4} c="orange.7" ta="center">Наши достижения</Title>
                    <List size="sm" spacing="xs">
                      <List.Item>🏆 Лучшая пиццерия Волжска 2023</List.Item>
                      <List.Item>⭐ Рейтинг 4.8/5 в отзывах</List.Item>
                      <List.Item>👥 Более 5000 довольных клиентов</List.Item>
                      <List.Item>🍕 Более 50000 приготовленных пицц</List.Item>
                    </List>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Наши фирменные пиццы */}
          <Box>
            <Title order={2} c="dark" mb="md">🍕 Фирменные пиццы нашей пиццерии</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <Badge color="red" variant="filled" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    ФИРМЕННАЯ
                  </Badge>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/pizza-dimbo-special.jpg"
                    alt="Фирменная пицца ДИМБО"
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Пицца ДИМБО</Title>
                    <Text size="sm" c="dimmed">Наша фирменная пицца с секретным соусом, тремя видами сыра и отборными ингредиентами</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">520 ₽</Text>
                      <Button size="sm" color="orange" onClick={() => navigate('/')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <Badge color="green" variant="filled" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    ПОПУЛЯРНАЯ
                  </Badge>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/pizza-quattro-stagioni.jpg"
                    alt="Пицца Четыре сезона в пиццерии ДИМБО"
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Четыре сезона</Title>
                    <Text size="sm" c="dimmed">Классическая итальянская пицца с четырьмя видами начинки в каждом секторе</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">480 ₽</Text>
                      <Button size="sm" color="orange" onClick={() => navigate('/')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <Badge color="blue" variant="filled" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    ТРАДИЦИОННАЯ
                  </Badge>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/pizza-margherita.jpg"
                    alt="Пицца Маргарита в пиццерии ДИМБО"
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Маргарита</Title>
                    <Text size="sm" c="dimmed">Классическая итальянская пицца с томатным соусом, моцареллой и базиликом</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">380 ₽</Text>
                      <Button size="sm" color="orange" onClick={() => navigate('/')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Почему выбирают нашу пиццерию */}
          <Box>
            <Title order={2} c="dark" mb="md">⭐ Почему выбирают пиццерию ДИМБО в Волжске?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconHeart size={48} color="red" />
                    <Title order={4} ta="center">Семейные традиции</Title>
                    <Text ta="center" size="sm">Готовим пиццу как для своей семьи - с любовью и заботой о каждом клиенте</Text>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconStars size={48} color="orange" />
                    <Title order={4} ta="center">Итальянские рецепты</Title>
                    <Text ta="center" size="sm">Используем оригинальные итальянские рецепты и технологии приготовления</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconMapPin size={48} color="green" />
                    <Title order={4} ta="center">Удобное расположение</Title>
                    <Text ta="center" size="sm">Находимся в центре Волжска на ул. Шестакова - легко добраться из любой точки города</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconTruck size={48} color="blue" />
                    <Title order={4} ta="center">Быстрая доставка</Title>
                    <Text ta="center" size="sm">Доставляем горячую пиццу по всему Волжску за 30-60 минут</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Режим работы и контакты */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="blue.0">
            <Title order={2} c="dark" mb="md">📍 Как найти нашу пиццерию в Волжске</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="md">
                  <Group gap="md">
                    <IconMapPin size={24} color="orange" />
                    <Box>
                      <Text fw={600} size="lg">Адрес пиццерии:</Text>
                      <Text size="md">г. Волжск, ул. Шестакова, д.1Б</Text>
                      <Text size="sm" c="dimmed">Центр города, рядом с главной площадью</Text>
                    </Box>
                  </Group>
                  
                  <Group gap="md">
                    <IconClock size={24} color="green" />
                    <Box>
                      <Text fw={600} size="lg">Режим работы:</Text>
                      <Text size="md">Ежедневно с 10:00 до 20:00</Text>
                      <Text size="sm" c="dimmed">Без выходных и праздников</Text>
                    </Box>
                  </Group>

                  <Group gap="md">
                    <IconPhone size={24} color="blue" />
                    <Box>
                      <Text fw={600} size="lg">Телефон пиццерии:</Text>
                      <Text size="md">+7(902)105-34-34</Text>
                      <Text size="sm" c="dimmed">Заказы, бронирование столиков</Text>
                    </Box>
                  </Group>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card bg="orange.1" p="md">
                  <Stack gap="md" align="center">
                    <IconUsers size={48} color="orange" />
                    <Title order={4} c="orange.7" ta="center">Посетите нашу пиццерию!</Title>
                    <Text ta="center" size="sm">
                      Приходите к нам в гости! У нас уютный зал, дружелюбная атмосфера и всегда свежая пицца. 
                      Мы будем рады видеть вас в нашей семейной пиццерии!
                    </Text>
                    <Button color="orange" onClick={() => navigate('/')}>
                      Забронировать столик
                    </Button>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Отзывы о пиццерии */}
          <Box>
            <Title order={2} c="dark" mb="md">💬 Отзывы о пиццерии ДИМБО</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text fw={600}>Анна М.</Text>
                      <Group gap="xs">
                        {[1,2,3,4,5].map(i => <IconStars key={i} size={16} color="orange" />)}
                      </Group>
                    </Group>
                    <Text size="sm" c="dimmed">
                      "Лучшая пиццерия в Волжске! Очень уютно, вкусная пицца и приятные цены. 
                      Семья теперь заказывает только здесь."
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text fw={600}>Дмитрий К.</Text>
                      <Group gap="xs">
                        {[1,2,3,4,5].map(i => <IconStars key={i} size={16} color="orange" />)}
                      </Group>
                    </Group>
                    <Text size="sm" c="dimmed">
                      "Отличная семейная пиццерия! Пицца как в Италии, персонал дружелюбный. 
                      Рекомендую всем жителям Волжска!"
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text fw={600}>Елена В.</Text>
                      <Group gap="xs">
                        {[1,2,3,4,5].map(i => <IconStars key={i} size={16} color="orange" />)}
                      </Group>
                    </Group>
                    <Text size="sm" c="dimmed">
                      "Заказываем доставку регулярно. Пицца всегда горячая, доставка быстрая. 
                      Спасибо за качественный сервис!"
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Контакты и заказ */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="orange.0">
            <Group justify="space-between" align="center">
              <Box>
                <Title order={2} c="orange.7">🍕 Добро пожаловать в пиццерию ДИМБО!</Title>
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
                onClick={() => navigate('/')}
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
            <Title order={3} c="dark" mb="md">Пиццерия в Волжске - ДИМБО Пицца</Title>
            <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
              <strong>Пиццерия ДИМБО</strong> - это лучшая семейная пиццерия в Волжске, которая объединяет 
              итальянские традиции и домашний уют. Мы открылись в 2021 году с целью принести настоящий 
              вкус итальянской пиццы в наш родной Волжск. За годы работы мы завоевали любовь тысяч клиентов 
              и стали одной из самых популярных пиццерий города.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              Наша <strong>пиццерия в Волжске</strong> расположена в самом центре города по адресу 
              ул. Шестакова, д.1Б. У нас уютный зал на 20 посадочных мест, где можно насладиться 
              свежеприготовленной пиццей в теплой семейной атмосфере. Мы также предлагаем доставку 
              по всему Волжску для тех, кто предпочитает наслаждаться нашей пиццей дома.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              Что делает нашу <strong>пиццерию в Волжске</strong> особенной? Мы используем только качественные 
              ингредиенты: итальянскую муку для теста, натуральную моцареллу, свежие овощи и отборные мясные 
              продукты. Наши повара прошли обучение у итальянских мастеров и знают все секреты приготовления 
              настоящей пиццы. Приходите к нам в гости или заказывайте доставку - мы всегда рады новым и 
              постоянным клиентам!
            </Text>
          </Box>
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
