/**
 * @file: BurgerSEOPage.tsx
 * @description: SEO-оптимизированная страница для продвижения бургеров по ключевым запросам
 * @dependencies: Mantine, SEOHead, ProductsContext
 * @created: 2025-01-27
 */

import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconBurger, IconCarrot } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../../components/SEOHead'
import { ProductCardImage } from '../../components/common/OptimizedImage'
import { RelatedProducts } from '../../components/seo/RelatedProducts'
import { SchemaMarkup } from '../../components/seo/SchemaMarkup'
import { YandexReviewsWidget } from '../../components/common/YandexReviewsWidget'

export function BurgerSEOPage() {
  const navigate = useNavigate()

  const seoData = {
    title: "Заказать бургеры с доставкой в Волжске - ДИМБО | Доставка бургеров на дом",
    description: "🍔 Заказать бургеры с доставкой в Волжске ⭐ Сочные бургеры с картофелем фри ⭐ Доставка бургеров за 30-60 минут ⭐ Бесплатная доставка от 800₽ ⭐ +7(902)105-34-34",
    keywords: "заказать бургеры, доставка бургеров, бургеры волжск, доставка бургеров волжск, заказать бургеры волжск, сочные бургеры доставка",
    imageUrl: "https://dimbopizza.ru/images/burger-hero.jpg"
  }

  return (
    <SEOPageWrapper {...seoData}>
      <SchemaMarkup pageType="burgers" />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="yellow.0">
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Title order={1} size="h1" c="yellow.8">
                    Заказать бургеры с доставкой в Волжске
                  </Title>
                  <Text size="xl" c="dark.6">
                    Сочные бургеры с картофелем фри и доставкой на дом! Свежие котлеты, хрустящие овощи и фирменные соусы. Доставка бургеров по всему Волжску за 30-60 минут.
                  </Text>
                  <Group>
                    <Badge size="lg" color="green">Бесплатная доставка от 800₽</Badge>
                    <Badge size="lg" color="yellow">Свежие котлеты</Badge>
                  </Group>
                  <Group>
                    <Button 
                      size="lg" 
                      color="yellow" 
                      leftSection={<IconShoppingCart size={20} />}
                      onClick={() => navigate('/')}
                    >
                      Заказать бургеры сейчас
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      color="yellow"
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
                  src="https://api.dimbopizza.ru/images/burger-classic.jpg"
                  alt="Заказать бургеры с доставкой в Волжске"
                  style={{ borderRadius: '12px' }}
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Виды бургеров */}
          <Box>
            <Title order={2} c="dark" mb="md">Популярные бургеры с доставкой</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/burger-classic.jpg"
                    alt="Классический бургер - заказать с доставкой"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Классический бургер</Title>
                    <Text size="sm" c="dimmed">Сочная говяжья котлета, свежие овощи, сыр и фирменный соус</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="yellow.8">350 ₽</Text>
                      <Button size="sm" color="yellow">Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/burger-cheese.jpg"
                    alt="Чизбургер - доставка бургеров"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Двойной чизбургер</Title>
                    <Text size="sm" c="dimmed">Две говяжьи котлеты, двойной сыр и фирменный соус</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="yellow.8">420 ₽</Text>
                      <Button size="sm" color="yellow">Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/burger-chicken.jpg"
                    alt="Куриный бургер - заказать доставку"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Куриный бургер</Title>
                    <Text size="sm" c="dimmed">Сочная куриная котлета в панировке с овощами и соусом</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="yellow.8">320 ₽</Text>
                      <Button size="sm" color="yellow">Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Как заказать бургеры */}
          <Card shadow="sm" radius="md" withBorder p="xl">
            <Title order={2} c="dark" mb="md">Как заказать бургеры с доставкой?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <List spacing="md" size="lg">
                  <List.Item icon={<IconBurger size={24} color="orange" />}>
                    <strong>Выберите бургер</strong> - у нас есть классические и авторские бургеры на любой вкус
                  </List.Item>
                  <List.Item icon={<IconMapPin size={24} color="orange" />}>
                    <strong>Укажите адрес доставки</strong> в Волжске - доставляем горячие бургеры по всему городу
                  </List.Item>
                  <List.Item icon={<IconPhone size={24} color="orange" />}>
                    <strong>Подтвердите заказ</strong> по телефону +7(902)105-34-34
                  </List.Item>
                  <List.Item icon={<IconTruck size={24} color="orange" />}>
                    <strong>Получите горячие бургеры</strong> через 30-60 минут в специальной упаковке
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card bg="yellow.1" p="md">
                  <Stack gap="xs" align="center">
                    <IconCarrot size={40} color="orange" />
                    <Title order={4} c="yellow.8">Картофель фри в подарок</Title>
                    <Text ta="center" size="sm">К каждому бургеру добавляем порцию хрустящего картофеля фри</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Преимущества наших бургеров */}
          <Box>
            <Title order={2} c="dark" mb="md">Почему заказывают бургеры именно у нас?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconBurger size={48} color="orange" />
                    <Title order={4} ta="center">Свежие котлеты</Title>
                    <Text ta="center" size="sm">Котлеты готовим из отборного мяса ежедневно. Никаких заморозок!</Text>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconCarrot size={48} color="yellow" />
                    <Title order={4} ta="center">Картофель фри</Title>
                    <Text ta="center" size="sm">Хрустящий картофель фри идет в комплекте с каждым бургером</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconTruck size={48} color="blue" />
                    <Title order={4} ta="center">Быстрая доставка</Title>
                    <Text ta="center" size="sm">Доставка бургеров по Волжску за 30-60 минут в специальной термоупаковке</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconClock size={48} color="green" />
                    <Title order={4} ta="center">Всегда горячие</Title>
                    <Text ta="center" size="sm">Готовим бургеры только после получения заказа - гарантируем свежесть</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Комбо предложения */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="orange.0">
            <Title order={2} c="dark" mb="md">Комбо предложения с доставкой</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="orange.7" mb="sm">Комбо "Классик"</Title>
                  <Text size="sm" mb="xs">Бургер + картофель фри + напиток</Text>
                  <Text size="lg" c="orange.6" fw={600}>450 ₽</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="yellow.7" mb="sm">Комбо "Двойной"</Title>
                  <Text size="sm" mb="xs">2 бургера + большой картофель + 2 напитка</Text>
                  <Text size="lg" c="yellow.6" fw={600}>720 ₽</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="red.7" mb="sm">Комбо "Семейный"</Title>
                  <Text size="sm" mb="xs">4 бургера + 2 больших картофеля + 4 напитка</Text>
                  <Text size="lg" c="red.6" fw={600}>1280 ₽</Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Контакты и заказ */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="yellow.0">
            <Group justify="space-between" align="center">
              <Box>
                <Title order={2} c="yellow.8">Заказать бургеры сейчас!</Title>
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
                color="yellow"
                leftSection={<IconShoppingCart size={24} />}
                onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}
              >
                Перейти в меню
              </Button>
            </Group>
          </Card>

          {/* Связанные продукты */}
          <RelatedProducts currentProduct="burgers" />

          {/* SEO текст */}
          <Box>
            <Divider my="xl" />
            <Title order={3} c="dark" mb="md">Доставка бургеров в Волжске - ДИМБО</Title>
            <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
              <strong>Доставка бургеров</strong> в Волжске от ДИМБО - это возможность насладиться сочными бургерами 
              с хрустящим картофелем фри, не выходя из дома. Мы готовим бургеры из отборного мяса, используя 
              свежие котлеты и качественные ингредиенты.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              Когда вы <strong>заказываете бургеры</strong> у нас, мы начинаем готовить их сразу после получения 
              заказа. Котлеты жарятся на гриле до идеальной готовности, овощи всегда свежие, а булочки 
              поджариваются до золотистой корочки.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              <strong>Доставка бургеров в Волжске</strong> осуществляется в специальной термоупаковке, которая 
              сохраняет температуру и не дает бургерам остыть. Время доставки составляет от 30 до 60 минут 
              в зависимости от района Волжска. Мы работаем ежедневно с 10:00 до 20:00.
            </Text>
          </Box>
        </Stack>

        {/* Виджет отзывов Яндекс Карт */}
        <YandexReviewsWidget />
      </Container>
    </SEOPageWrapper>
  )
}
