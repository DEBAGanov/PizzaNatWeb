/**
 * @file: WingsSEOPage.tsx
 * @description: SEO-оптимизированная страница для продвижения крылышек по ключевым запросам
 * @dependencies: Mantine, SEOHead, ProductsContext
 * @created: 2025-01-27
 */

import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconMeat, IconFlame } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../../components/SEOHead'
import { ProductCardImage } from '../../components/common/OptimizedImage'
import { RelatedProducts } from '../../components/seo/RelatedProducts'
import { SchemaMarkup } from '../../components/seo/SchemaMarkup'

export function WingsSEOPage() {
  const navigate = useNavigate()

  const seoData = {
    title: "Заказать крылышки с доставкой в Волжске - ДИМБО | Доставка крылышек на дом",
    description: "🍗 Заказать крылышки с доставкой в Волжске ⭐ Острые куриные крылышки с соусами ⭐ Доставка крылышек за 30-60 минут ⭐ Бесплатная доставка от 800₽ ⭐ +7(902)105-34-34",
    keywords: "заказать крылышки, доставка крылышек, крылышки волжск, доставка крылышек волжск, заказать крылышки волжск, острые крылышки доставка",
    imageUrl: "https://dimbopizza.ru/images/wings-hero.jpg"
  }

  return (
    <SEOPageWrapper {...seoData}>
      <SchemaMarkup pageType="wings" />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="grape.0">
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Title order={1} size="h1" c="grape.7">
                    Заказать крылышки с доставкой в Волжске
                  </Title>
                  <Text size="xl" c="dark.6">
                    Острые куриные крылышки с фирменными соусами и доставкой на дом! Сочные, хрустящие крылышки в различных вкусах. Доставка крылышек по всему Волжску за 30-60 минут.
                  </Text>
                  <Group>
                    <Badge size="lg" color="green">Бесплатная доставка от 800₽</Badge>
                    <Badge size="lg" color="grape">5 видов соусов</Badge>
                  </Group>
                  <Group>
                    <Button 
                      size="lg" 
                      color="grape" 
                      leftSection={<IconShoppingCart size={20} />}
                      onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}
                    >
                      Заказать крылышки сейчас
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      color="grape"
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
                  src="https://api.dimbopizza.ru/images/wings-bbq.jpg"
                  alt="Заказать крылышки с доставкой в Волжске"
                  style={{ borderRadius: '12px' }}
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Виды крылышек */}
          <Box>
            <Title order={2} c="dark" mb="md">Популярные крылышки с доставкой</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/wings-bbq.jpg"
                    alt="Крылышки BBQ - заказать с доставкой"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Крылышки BBQ</Title>
                    <Text size="sm" c="dimmed">Сочные крылышки в фирменном соусе барбекю с дымным ароматом</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="grape">420 ₽</Text>
                      <Button size="sm" color="grape" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/wings-buffalo.jpg"
                    alt="Острые крылышки Буффало - доставка крылышек"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Крылышки Буффало</Title>
                    <Text size="sm" c="dimmed">Очень острые крылышки в классическом соусе Буффало</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="grape">450 ₽</Text>
                      <Button size="sm" color="grape" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/wings-honey.jpg"
                    alt="Медовые крылышки - заказать доставку"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Медовые крылышки</Title>
                    <Text size="sm" c="dimmed">Сладкие крылышки в медово-горчичном соусе с кунжутом</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="grape">480 ₽</Text>
                      <Button size="sm" color="grape" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Как заказать крылышки */}
          <Card shadow="sm" radius="md" withBorder p="xl">
            <Title order={2} c="dark" mb="md">Как заказать крылышки с доставкой?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <List spacing="md" size="lg">
                  <List.Item icon={<IconMeat size={24} color="grape" />}>
                    <strong>Выберите крылышки</strong> - у нас есть острые, сладкие и пряные крылышки в разных соусах
                  </List.Item>
                  <List.Item icon={<IconMapPin size={24} color="grape" />}>
                    <strong>Укажите адрес доставки</strong> в Волжске - доставляем горячие крылышки по всему городу
                  </List.Item>
                  <List.Item icon={<IconPhone size={24} color="grape" />}>
                    <strong>Подтвердите заказ</strong> по телефону +7(902)105-34-34
                  </List.Item>
                  <List.Item icon={<IconTruck size={24} color="grape" />}>
                    <strong>Получите горячие крылышки</strong> через 30-60 минут в специальной упаковке
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card bg="grape.1" p="md">
                  <Stack gap="xs" align="center">
                    <IconFlame size={40} color="red" />
                    <Title order={4} c="grape.7">5 уровней остроты</Title>
                    <Text ta="center" size="sm">От мягких медовых до обжигающих крылышек Буффало</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Преимущества наших крылышек */}
          <Box>
            <Title order={2} c="dark" mb="md">Почему заказывают крылышки именно у нас?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconMeat size={48} color="grape" />
                    <Title order={4} ta="center">Сочное мясо</Title>
                    <Text ta="center" size="sm">Используем только свежие куриные крылышки от проверенных поставщиков</Text>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconFlame size={48} color="red" />
                    <Title order={4} ta="center">Фирменные соусы</Title>
                    <Text ta="center" size="sm">5 видов авторских соусов: от мягкого медового до острого Буффало</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconTruck size={48} color="blue" />
                    <Title order={4} ta="center">Быстрая доставка</Title>
                    <Text ta="center" size="sm">Доставка крылышек по Волжску за 30-60 минут в термоупаковке</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconClock size={48} color="green" />
                    <Title order={4} ta="center">Готовим на заказ</Title>
                    <Text ta="center" size="sm">Крылышки готовятся только после получения заказа для максимальной свежести</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Наборы крылышек */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="pink.0">
            <Title order={2} c="dark" mb="md">Наборы крылышек с доставкой</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="pink.7" mb="sm">Набор "Мини"</Title>
                  <Text size="sm" mb="xs">6 крылышек в одном соусе</Text>
                  <Text size="lg" c="pink.6" fw={600}>320 ₽</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="grape.7" mb="sm">Набор "Стандарт"</Title>
                  <Text size="sm" mb="xs">12 крылышек в двух разных соусах</Text>
                  <Text size="lg" c="grape.6" fw={600}>580 ₽</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="red.7" mb="sm">Набор "Мега"</Title>
                  <Text size="sm" mb="xs">20 крылышек в трех соусах + напитки</Text>
                  <Text size="lg" c="red.6" fw={600}>920 ₽</Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Контакты и заказ */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="grape.0">
            <Group justify="space-between" align="center">
              <Box>
                <Title order={2} c="grape.7">Заказать крылышки сейчас!</Title>
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
                color="grape"
                leftSection={<IconShoppingCart size={24} />}
                onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}
              >
                Перейти в меню
              </Button>
            </Group>
          </Card>

          {/* Связанные продукты */}
          <RelatedProducts currentProduct="wings" />

          {/* SEO текст */}
          <Box>
            <Divider my="xl" />
            <Title order={3} c="dark" mb="md">Доставка крылышек в Волжске - ДИМБО</Title>
            <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
              <strong>Доставка крылышек</strong> в Волжске от ДИМБО - это возможность насладиться сочными куриными 
              крылышками в фирменных соусах, не выходя из дома. Мы готовим крылышки из свежего куриного мяса, 
              используя авторские рецепты соусов.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              Когда вы <strong>заказываете крылышки</strong> у нас, мы начинаем готовить их сразу после получения 
              заказа. Крылышки обжариваются до золотистой корочки, а затем покрываются одним из пяти фирменных 
              соусов: BBQ, Буффало, медовым, терияки или чесночным.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              <strong>Доставка крылышек в Волжске</strong> осуществляется в специальной термоупаковке, которая 
              сохраняет температуру и хрустящую корочку. Время доставки составляет от 30 до 60 минут 
              в зависимости от района Волжска. Мы работаем ежедневно с 10:00 до 20:00.
            </Text>
          </Box>
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
