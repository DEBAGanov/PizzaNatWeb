/**
 * @file: FoodSEOPage.tsx
 * @description: SEO-оптимизированная страница для продвижения общих запросов "доставка еды волжск"
 * @dependencies: Mantine, SEOHead, ProductsContext
 * @created: 2025-01-27
 */

import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconPizza, IconFish, IconGrill, IconBurger } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../../components/SEOHead'
import { ProductCardImage } from '../../components/common/OptimizedImage'
import { AllProductsLinks } from '../../components/seo/RelatedProducts'
import { SchemaMarkup, FOOD_FAQ } from '../../components/seo/SchemaMarkup'

export function FoodSEOPage() {
  const navigate = useNavigate()

  const seoData = {
    title: "Заказать еду с доставкой в Волжске - ДИМБО | Доставка еды на дом в Волжске",
    description: "🍕 Заказать еду с доставкой в Волжске ⭐ Пицца, суши, шашлык, бургеры с доставкой на дом ⭐ Доставка еды за 30-60 минут ⭐ Бесплатная доставка от 800₽ ⭐ +7(902)105-34-34",
    keywords: "заказать еду волжск, доставка еды волжск, доставка еды на дом волжск, заказать еду с доставкой волжск, еда волжск доставка",
    imageUrl: "https://dimbopizza.ru/images/food-hero.jpg"
  }

  return (
    <SEOPageWrapper {...seoData}>
      <SchemaMarkup pageType="food" includeFAQ={true} faqData={FOOD_FAQ} />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="gradient-to-r from-orange-50 to-yellow-50">
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Title order={1} size="h1" c="orange.7">
                    Заказать еду с доставкой в Волжске
                  </Title>
                  <Text size="xl" c="dark.6">
                    Вкусная еда с доставкой на дом в Волжске! Пицца, суши, шашлык, бургеры и многое другое. 
                    Быстрая доставка еды по всему Волжску за 30-60 минут.
                  </Text>
                  <Group>
                    <Badge size="lg" color="green">Бесплатная доставка от 800₽</Badge>
                    <Badge size="lg" color="orange">Работаем до 20:00</Badge>
                  </Group>
                  <Group>
                    <Button 
                      size="lg" 
                      color="orange" 
                      leftSection={<IconShoppingCart size={20} />}
                      onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}
                    >
                      Заказать еду сейчас
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
                  src="https://api.dimbopizza.ru/images/food-variety.jpg"
                  alt="Заказать еду с доставкой в Волжске"
                  style={{ borderRadius: '12px' }}
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Все категории еды */}
          <AllProductsLinks />

          {/* Популярные блюда */}
          <Box>
            <Title order={2} c="dark" mb="md">Популярная еда с доставкой в Волжске</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/pizza-margherita.jpg"
                    alt="Пицца Маргарита - заказать еду"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Пицца Маргарита</Title>
                    <Text size="sm" c="dimmed">Классическая итальянская пицца</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">380 ₽</Text>
                      <Button size="sm" color="orange" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/sushi-set.jpg"
                    alt="Суши сет - доставка еды"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Суши сет</Title>
                    <Text size="sm" c="dimmed">Ассорти из популярных суши и роллов</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="blue">980 ₽</Text>
                      <Button size="sm" color="blue" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/shashlyk-pork.jpg"
                    alt="Шашлык из свинины - заказать еду"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Шашлык из свинины</Title>
                    <Text size="sm" c="dimmed">Сочный шашлык, приготовленный на углях</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="red">650 ₽</Text>
                      <Button size="sm" color="red" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/burger-classic.jpg"
                    alt="Классический бургер - доставка еды"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Классический бургер</Title>
                    <Text size="sm" c="dimmed">Сочный бургер с картофелем фри</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="yellow.8">350 ₽</Text>
                      <Button size="sm" color="yellow" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Как заказать еду */}
          <Card shadow="sm" radius="md" withBorder p="xl">
            <Title order={2} c="dark" mb="md">Как заказать еду с доставкой в Волжске?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <List spacing="md" size="lg">
                  <List.Item icon={<IconShoppingCart size={24} color="orange" />}>
                    <strong>Выберите блюда</strong> - пицца, суши, шашлык, бургеры и другая вкусная еда
                  </List.Item>
                  <List.Item icon={<IconMapPin size={24} color="orange" />}>
                    <strong>Укажите адрес доставки</strong> в Волжске - доставляем по всему городу
                  </List.Item>
                  <List.Item icon={<IconPhone size={24} color="orange" />}>
                    <strong>Подтвердите заказ</strong> по телефону +7(902)105-34-34
                  </List.Item>
                  <List.Item icon={<IconTruck size={24} color="orange" />}>
                    <strong>Получите горячую еду</strong> через 30-60 минут прямо к двери
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card bg="orange.1" p="md">
                  <Stack gap="xs" align="center">
                    <IconClock size={40} color="orange" />
                    <Title order={4} c="orange.7">Работаем до 20:00</Title>
                    <Text ta="center" size="sm">Принимаем заказы на еду ежедневно с 10:00 до 20:00</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Преимущества доставки еды */}
          <Box>
            <Title order={2} c="dark" mb="md">Почему заказывают еду именно у нас?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconTruck size={48} color="orange" />
                    <Title order={4} ta="center">Быстрая доставка</Title>
                    <Text ta="center" size="sm">Доставка еды по Волжску за 30-60 минут в любую точку города</Text>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconShoppingCart size={48} color="green" />
                    <Title order={4} ta="center">Большой выбор</Title>
                    <Text ta="center" size="sm">Пицца, суши, шашлык, бургеры - более 100 блюд на любой вкус</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconMapPin size={48} color="blue" />
                    <Title order={4} ta="center">Доставляем везде</Title>
                    <Text ta="center" size="sm">Доставка еды во все районы Волжска: центр, спальные районы, окраины</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconPhone size={48} color="violet" />
                    <Title order={4} ta="center">Удобная оплата</Title>
                    <Text ta="center" size="sm">Наличными курьеру, картой или через СБП - выбирайте как удобно</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Зоны доставки еды в Волжске */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="blue.0">
            <Title order={2} c="dark" mb="md">Доставка еды по всему Волжску</Title>
            <Text size="lg" c="dimmed" ta="center" mb="xl">
              Доставляем вкусную еду в любую точку Волжска быстро и горячей
            </Text>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box ta="center">
                  <Title order={4} c="green.7" mb="sm">Центральные районы</Title>
                  <Text size="sm" mb="xs">Бесплатная доставка от 800₽</Text>
                  <Text size="sm" c="green.6" fw={600}>Время доставки: 30-45 мин</Text>
                  <Text size="xs" c="dimmed" mt="xs">
                    Центр, ул. Ленина, пл. Ленина, ул. Чкалова
                  </Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box ta="center">
                  <Title order={4} c="blue.7" mb="sm">Спальные районы</Title>
                  <Text size="sm" mb="xs">Бесплатная доставка от 1000₽</Text>
                  <Text size="sm" c="blue.6" fw={600}>Время доставки: 40-60 мин</Text>
                  <Text size="xs" c="dimmed" mt="xs">
                    Дружба, Заря, Промузел, Восточный
                  </Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box ta="center">
                  <Title order={4} c="violet.7" mb="sm">Окраины города</Title>
                  <Text size="sm" mb="xs">Бесплатная доставка от 1200₽</Text>
                  <Text size="sm" c="violet.6" fw={600}>Время доставки: 50-60 мин</Text>
                  <Text size="xs" c="dimmed" mt="xs">
                    Пригороды, частный сектор, дачи
                  </Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Способы оплаты */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="gray.0">
            <Title order={2} c="dark" mb="md" ta="center">Способы оплаты еды</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box ta="center">
                  <Title order={4} c="green.7" mb="sm">Наличными</Title>
                  <Text size="sm" c="dimmed">Оплата курьеру при получении заказа</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box ta="center">
                  <Title order={4} c="blue.7" mb="sm">Банковской картой</Title>
                  <Text size="sm" c="dimmed">Visa, MasterCard, МИР через терминал курьера</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box ta="center">
                  <Title order={4} c="violet.7" mb="sm">СБП</Title>
                  <Text size="sm" c="dimmed">Система быстрых платежей по QR-коду</Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Контакты и заказ */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="orange.0">
            <Group justify="space-between" align="center">
              <Box>
                <Title order={2} c="orange.7">Заказать еду в Волжске сейчас!</Title>
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
                Открыть меню
              </Button>
            </Group>
          </Card>

          {/* SEO текст */}
          <Box>
            <Divider my="xl" />
            <Title order={3} c="dark" mb="md">Доставка еды в Волжске - ДИМБО</Title>
            <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
              <strong>Доставка еды в Волжске</strong> от ДИМБО - это возможность заказать вкусную еду с доставкой 
              на дом, не выходя из дома. Мы предлагаем широкий выбор блюд: пиццу, суши, шашлык, бургеры, 
              крылышки и многое другое.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              Когда вы <strong>заказываете еду</strong> у нас, мы готовим каждое блюдо из свежих ингредиентов 
              сразу после получения заказа. Наши повара используют только качественные продукты и проверенные 
              рецепты, чтобы каждое блюдо получилось идеальным.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              <strong>Заказать еду в Волжске</strong> можно ежедневно с 10:00 до 20:00. Мы доставляем по всему 
              городу: в центральные районы, спальные кварталы и даже на окраины. Время доставки составляет 
              от 30 до 60 минут в зависимости от района.
            </Text>
          </Box>
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
