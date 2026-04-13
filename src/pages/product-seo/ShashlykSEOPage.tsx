/**
 * @file: ShashlykSEOPage.tsx
 * @description: SEO-оптимизированная страница для продвижения шашлыка по ключевым запросам
 * @dependencies: Mantine, SEOHead, ProductsContext
 * @created: 2025-01-27
 */

import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconFlame, IconGrill } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../../components/SEOHead'
import { ProductCardImage } from '../../components/common/OptimizedImage'
import { RelatedProducts } from '../../components/seo/RelatedProducts'
import { SchemaMarkup, SHASHLYK_FAQ } from '../../components/seo/SchemaMarkup'

export function ShashlykSEOPage() {
  const navigate = useNavigate()

  const seoData = {
    title: "Заказать шашлык с доставкой в Волжске - ДИМБО | Шашлык доставка на дом",
    description: "🔥 Заказать шашлык с доставкой в Волжске ⭐ Сочный шашлык из свежего мяса ⭐ Доставка шашлыка за 30-60 минут ⭐ Бесплатная доставка от 800₽ ⭐ +7(902)105-34-34",
    keywords: "заказать шашлык, шашлык доставка, доставка шашлыка, шашлык волжск, шашлык заказать волжск, доставка шашлыка волжск",
    imageUrl: "https://dimbopizza.ru/images/shashlyk-hero.jpg"
  }

  return (
    <SEOPageWrapper {...seoData}>
      <SchemaMarkup pageType="shashlyk" includeFAQ={true} faqData={SHASHLYK_FAQ} />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="red.0">
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Title order={1} size="h1" c="red.7">
                    Заказать шашлык с доставкой в Волжске
                  </Title>
                  <Text size="xl" c="dark.6">
                    Сочный шашлык из отборного мяса с доставкой на дом! Готовим на углях для настоящего вкуса. Доставка шашлыка по всему Волжску за 30-60 минут.
                  </Text>
                  <Group>
                    <Badge size="lg" color="green">Бесплатная доставка от 800₽</Badge>
                    <Badge size="lg" color="red">Готовим на углях</Badge>
                  </Group>
                  <Group>
                    <Button 
                      size="lg" 
                      color="red" 
                      leftSection={<IconShoppingCart size={20} />}
                      onClick={() => navigate('/')}
                    >
                      Заказать шашлык сейчас
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      color="red"
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
                  src="https://api.dimbopizza.ru/images/shashlyk-pork.jpg"
                  alt="Заказать шашлык с доставкой в Волжске"
                  style={{ borderRadius: '12px' }}
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Виды шашлыка */}
          <Box>
            <Title order={2} c="dark" mb="md">Виды шашлыка с доставкой</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/shashlyk-pork.jpg"
                    alt="Шашлык из свинины - заказать с доставкой"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Шашлык из свинины</Title>
                    <Text size="sm" c="dimmed">Сочный шашлык из отборной свинины, маринованный в специальном соусе</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="red">650 ₽</Text>
                      <Button size="sm" color="red">Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/shashlyk-beef.jpg"
                    alt="Шашлык из говядины - доставка шашлыка"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Шашлык из говядины</Title>
                    <Text size="sm" c="dimmed">Нежный шашлык из молодой говядины с ароматными специями</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="red">720 ₽</Text>
                      <Button size="sm" color="red">Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/shashlyk-chicken.jpg"
                    alt="Шашлык из курицы - заказать доставку"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Шашлык из курицы</Title>
                    <Text size="sm" c="dimmed">Диетический шашлык из куриного филе с травами и специями</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="red">550 ₽</Text>
                      <Button size="sm" color="red">Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Как заказать шашлык */}
          <Card shadow="sm" radius="md" withBorder p="xl">
            <Title order={2} c="dark" mb="md">Как заказать шашлык с доставкой?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <List spacing="md" size="lg">
                  <List.Item icon={<IconGrill size={24} color="red" />}>
                    <strong>Выберите шашлык</strong> - у нас есть шашлык из свинины, говядины, курицы и баранины
                  </List.Item>
                  <List.Item icon={<IconMapPin size={24} color="red" />}>
                    <strong>Укажите адрес доставки</strong> в Волжске - доставляем горячий шашлык по всему городу
                  </List.Item>
                  <List.Item icon={<IconPhone size={24} color="red" />}>
                    <strong>Подтвердите заказ</strong> по телефону +7(902)105-34-34
                  </List.Item>
                  <List.Item icon={<IconTruck size={24} color="red" />}>
                    <strong>Получите горячий шашлык</strong> через 30-60 минут в специальной упаковке
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card bg="red.1" p="md">
                  <Stack gap="xs" align="center">
                    <IconFlame size={40} color="red" />
                    <Title order={4} c="red.7">Готовим на углях</Title>
                    <Text ta="center" size="sm">Настоящий шашлык готовится только на углях для неповторимого вкуса</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Преимущества нашего шашлыка */}
          <Box>
            <Title order={2} c="dark" mb="md">Почему заказывают шашлык именно у нас?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconFlame size={48} color="red" />
                    <Title order={4} ta="center">Готовим на углях</Title>
                    <Text ta="center" size="sm">Используем только березовые угли для приготовления шашлыка. Это дает неповторимый аромат и вкус</Text>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconGrill size={48} color="orange" />
                    <Title order={4} ta="center">Отборное мясо</Title>
                    <Text ta="center" size="sm">Используем только свежее мясо высшего сорта от проверенных поставщиков</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconTruck size={48} color="blue" />
                    <Title order={4} ta="center">Быстрая доставка</Title>
                    <Text ta="center" size="sm">Доставка шашлыка по Волжску за 30-60 минут в специальной термоупаковке</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconClock size={48} color="green" />
                    <Title order={4} ta="center">Всегда свежий</Title>
                    <Text ta="center" size="sm">Готовим шашлык только после получения заказа - гарантируем свежесть</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Контакты и заказ */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="red.0">
            <Group justify="space-between" align="center">
              <Box>
                <Title order={2} c="red.7">Заказать шашлык сейчас!</Title>
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
                color="red"
                leftSection={<IconShoppingCart size={24} />}
                onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}
              >
                Перейти в меню
              </Button>
            </Group>
          </Card>

          {/* Связанные продукты */}
          <RelatedProducts currentProduct="shashlyk" />

          {/* SEO текст */}
          <Box>
            <Divider my="xl" />
            <Title order={3} c="dark" mb="md">Доставка шашлыка в Волжске - ДИМБО</Title>
            <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
              <strong>Шашлык доставка</strong> в Волжске от ДИМБО - это возможность насладиться настоящим шашлыком, 
              приготовленным на углях, не выходя из дома. Мы готовим шашлык из отборного мяса, используя 
              традиционные рецепты маринования и специальные березовые угли.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              Когда вы <strong>заказываете шашлык</strong> у нас, мы начинаем готовить его сразу после получения 
              заказа. Мясо маринуется заранее в течение нескольких часов в специальном маринаде с травами и 
              специями. Это обеспечивает нежность и сочность каждого кусочка.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              <strong>Доставка шашлыка в Волжске</strong> осуществляется в специальной термоупаковке, которая 
              сохраняет температуру и аромат блюда. Время доставки составляет от 30 до 60 минут в зависимости 
              от района Волжска. Мы работаем ежедневно с 10:00 до 20:00.
            </Text>
          </Box>
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
