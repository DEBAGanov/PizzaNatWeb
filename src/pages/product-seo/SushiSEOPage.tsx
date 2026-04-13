/**
 * @file: SushiSEOPage.tsx
 * @description: SEO-оптимизированная страница для продвижения суши по ключевым запросам
 * @dependencies: Mantine, SEOHead, ProductsContext
 * @created: 2025-01-27
 */

import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconFish, IconLeaf } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../../components/SEOHead'
import { ProductCardImage } from '../../components/common/OptimizedImage'
import { RelatedProducts } from '../../components/seo/RelatedProducts'
import { SchemaMarkup, SUSHI_FAQ } from '../../components/seo/SchemaMarkup'

export function SushiSEOPage() {
  const navigate = useNavigate()

  const seoData = {
    title: "Заказать суши с доставкой в Волжске - ДИМБО | Доставка суши и ролов на дом",
    description: "🍣 Заказать суши с доставкой в Волжске ⭐ Свежие суши и роллы из качественной рыбы ⭐ Доставка суши за 30-60 минут ⭐ Бесплатная доставка от 800₽ ⭐ +7(902)105-34-34",
    keywords: "заказать суши, доставка суши, суши волжск, доставка ролов, заказать роллы, суши доставка волжск, роллы заказать волжск",
    imageUrl: "https://dimbopizza.ru/images/sushi-hero.jpg"
  }

  return (
    <SEOPageWrapper {...seoData}>
      <SchemaMarkup pageType="sushi" includeFAQ={true} faqData={SUSHI_FAQ} />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="blue.0">
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Title order={1} size="h1" c="blue.7">
                    Заказать суши с доставкой в Волжске
                  </Title>
                  <Text size="xl" c="dark.6">
                    Свежие суши и роллы из качественной рыбы с доставкой на дом! Готовим из отборных ингредиентов по японским традициям. Доставка суши по всему Волжску за 30-60 минут.
                  </Text>
                  <Group>
                    <Badge size="lg" color="green">Бесплатная доставка от 800₽</Badge>
                    <Badge size="lg" color="blue">Свежая рыба ежедневно</Badge>
                  </Group>
                  <Group>
                    <Button 
                      size="lg" 
                      color="blue" 
                      leftSection={<IconShoppingCart size={20} />}
                      onClick={() => navigate('/')}
                    >
                      Заказать суши сейчас
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      color="blue"
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
                  src="https://api.dimbopizza.ru/images/sushi-set.jpg"
                  alt="Заказать суши с доставкой в Волжске"
                  style={{ borderRadius: '12px' }}
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Популярные суши и роллы */}
          <Box>
            <Title order={2} c="dark" mb="md">Популярные суши и роллы с доставкой</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/roll-philadelphia.jpg"
                    alt="Ролл Филадельфия - заказать с доставкой"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Ролл Филадельфия</Title>
                    <Text size="sm" c="dimmed">Классический ролл с лососем, огурцом и сливочным сыром в кунжуте</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="blue">420 ₽</Text>
                      <Button size="sm" color="blue">Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/roll-california.jpg"
                    alt="Ролл Калифорния - доставка суши"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Ролл Калифорния</Title>
                    <Text size="sm" c="dimmed">Ролл с крабовым мясом, авокадо и огурцом в икре масаго</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="blue">380 ₽</Text>
                      <Button size="sm" color="blue">Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/sushi-salmon.jpg"
                    alt="Суши с лососем - заказать доставку"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Суши с лососем</Title>
                    <Text size="sm" c="dimmed">Классические суши с свежим лососем на рисовой подушке</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="blue">280 ₽</Text>
                      <Button size="sm" color="blue">Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Как заказать суши */}
          <Card shadow="sm" radius="md" withBorder p="xl">
            <Title order={2} c="dark" mb="md">Как заказать суши с доставкой?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <List spacing="md" size="lg">
                  <List.Item icon={<IconFish size={24} color="blue" />}>
                    <strong>Выберите суши или роллы</strong> - у нас более 30 видов свежих суши и роллов
                  </List.Item>
                  <List.Item icon={<IconMapPin size={24} color="blue" />}>
                    <strong>Укажите адрес доставки</strong> в Волжске - доставляем свежие суши по всему городу
                  </List.Item>
                  <List.Item icon={<IconPhone size={24} color="blue" />}>
                    <strong>Подтвердите заказ</strong> по телефону +7(902)105-34-34
                  </List.Item>
                  <List.Item icon={<IconTruck size={24} color="blue" />}>
                    <strong>Получите свежие суши</strong> через 30-60 минут в специальной упаковке
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card bg="blue.1" p="md">
                  <Stack gap="xs" align="center">
                    <IconLeaf size={40} color="blue" />
                    <Title order={4} c="blue.7">Только свежие ингредиенты</Title>
                    <Text ta="center" size="sm">Рыба доставляется ежедневно, рис готовится по японским традициям</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Преимущества наших суши */}
          <Box>
            <Title order={2} c="dark" mb="md">Почему заказывают суши именно у нас?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconFish size={48} color="blue" />
                    <Title order={4} ta="center">Свежая рыба</Title>
                    <Text ta="center" size="sm">Рыба доставляется ежедневно от проверенных поставщиков. Гарантируем свежесть</Text>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconLeaf size={48} color="green" />
                    <Title order={4} ta="center">Японские традиции</Title>
                    <Text ta="center" size="sm">Готовим по традиционным японским рецептам с использованием качественного риса</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconTruck size={48} color="orange" />
                    <Title order={4} ta="center">Быстрая доставка</Title>
                    <Text ta="center" size="sm">Доставка суши по Волжску за 30-60 минут в специальной холодильной сумке</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconClock size={48} color="violet" />
                    <Title order={4} ta="center">Готовим на заказ</Title>
                    <Text ta="center" size="sm">Суши и роллы готовятся только после получения заказа для максимальной свежести</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Наборы суши */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="cyan.0">
            <Title order={2} c="dark" mb="md">Наборы суши с доставкой</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="cyan.7" mb="sm">Набор "Семейный"</Title>
                  <Text size="sm" mb="xs">32 штуки - микс популярных роллов</Text>
                  <Text size="lg" c="cyan.6" fw={600}>1280 ₽</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="blue.7" mb="sm">Набор "Классический"</Title>
                  <Text size="sm" mb="xs">24 штуки - классические суши и роллы</Text>
                  <Text size="lg" c="blue.6" fw={600}>980 ₽</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="indigo.7" mb="sm">Набор "Премиум"</Title>
                  <Text size="sm" mb="xs">40 штук - роллы с лососем и тунцом</Text>
                  <Text size="lg" c="indigo.6" fw={600}>1680 ₽</Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Контакты и заказ */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="blue.0">
            <Group justify="space-between" align="center">
              <Box>
                <Title order={2} c="blue.7">Заказать суши сейчас!</Title>
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
                color="blue"
                leftSection={<IconShoppingCart size={24} />}
                onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}
              >
                Перейти в меню
              </Button>
            </Group>
          </Card>

          {/* Связанные продукты */}
          <RelatedProducts currentProduct="sushi" />

          {/* SEO текст */}
          <Box>
            <Divider my="xl" />
            <Title order={3} c="dark" mb="md">Доставка суши в Волжске - ДИМБО</Title>
            <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
              <strong>Доставка суши</strong> в Волжске от ДИМБО - это возможность насладиться настоящими японскими 
              суши и роллами, не выходя из дома. Мы используем только свежую рыбу, которая доставляется к нам 
              ежедневно, и готовим рис по традиционным японским рецептам.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              Когда вы <strong>заказываете суши</strong> у нас, мы начинаем готовить их сразу после получения заказа. 
              Каждый ролл скручивается вручную нашими мастерами, которые прошли специальное обучение японской кухне. 
              Мы используем только качественные ингредиенты: свежую рыбу, нори, специальный рис для суши.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              <strong>Доставка ролов в Волжске</strong> осуществляется в специальной термоупаковке с холодильными 
              элементами, которая сохраняет свежесть и температуру блюд. Время доставки составляет от 30 до 60 минут 
              в зависимости от района Волжска. Мы работаем ежедневно с 10:00 до 20:00.
            </Text>
          </Box>
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
