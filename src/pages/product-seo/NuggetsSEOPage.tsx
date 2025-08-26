/**
 * @file: NuggetsSEOPage.tsx
 * @description: SEO-оптимизированная страница для продвижения нагетсов по ключевым запросам
 * @dependencies: Mantine, SEOHead, ProductsContext
 * @created: 2025-01-27
 */

import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconMeat, IconLeaf } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../../components/SEOHead'
import { ProductCardImage } from '../../components/common/OptimizedImage'
import { RelatedProducts } from '../../components/seo/RelatedProducts'
import { SchemaMarkup } from '../../components/seo/SchemaMarkup'

export function NuggetsSEOPage() {
  const navigate = useNavigate()

  const seoData = {
    title: "Заказать нагетсы с доставкой в Волжске - ДИМБО | Нагетсы на дом",
    description: "🍗 Заказать нагетсы с доставкой в Волжске ⭐ Хрустящие куриные нагетсы в панировке ⭐ Доставка нагетсов за 30-60 минут ⭐ Бесплатная доставка от 800₽ ⭐ +7(902)105-34-34",
    keywords: "заказать нагетсы, доставка нагетсов, нагетсы волжск, доставка нагетсов волжск, заказать нагетсы волжск, куриные нагетсы доставка",
    imageUrl: "https://dimbopizza.ru/images/nuggets-hero.jpg"
  }

  return (
    <SEOPageWrapper {...seoData}>
      <SchemaMarkup pageType="wings" />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="orange.0">
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Title order={1} size="h1" c="orange.7">
                    Заказать нагетсы с доставкой в Волжске
                  </Title>
                  <Text size="xl" c="dark.6">
                    Хрустящие куриные нагетсы в золотистой панировке с доставкой на дом! Сочное куриное филе в хрустящей корочке. Доставка нагетсов по всему Волжску за 30-60 минут.
                  </Text>
                  <Group>
                    <Badge size="lg" color="green">Бесплатная доставка от 800₽</Badge>
                    <Badge size="lg" color="orange">Хрустящая панировка</Badge>
                  </Group>
                  <Group>
                    <Button 
                      size="lg" 
                      color="orange" 
                      leftSection={<IconShoppingCart size={20} />}
                      onClick={() => navigate('/')}
                    >
                      Заказать нагетсы сейчас
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
                  src="https://api.dimbopizza.ru/images/nuggets-classic.jpg"
                  alt="Заказать нагетсы с доставкой в Волжске"
                  style={{ borderRadius: '12px' }}
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Виды нагетсов */}
          <Box>
            <Title order={2} c="dark" mb="md">Популярные нагетсы с доставкой</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/nuggets-classic.jpg"
                    alt="Классические нагетсы - заказать с доставкой"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Классические нагетсы</Title>
                    <Text size="sm" c="dimmed">Хрустящие куриные нагетсы в традиционной панировке</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">280 ₽</Text>
                      <Button size="sm" color="orange">Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/nuggets-spicy.jpg"
                    alt="Острые нагетсы - доставка нагетсов"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Острые нагетсы</Title>
                    <Text size="sm" c="dimmed">Пикантные нагетсы с острыми специями в панировке</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">320 ₽</Text>
                      <Button size="sm" color="orange">Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/nuggets-cheese.jpg"
                    alt="Сырные нагетсы - заказать доставку"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Сырные нагетсы</Title>
                    <Text size="sm" c="dimmed">Нагетсы с расплавленным сыром внутри хрустящей панировки</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">350 ₽</Text>
                      <Button size="sm" color="orange">Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Как заказать нагетсы */}
          <Card shadow="sm" radius="md" withBorder p="xl">
            <Title order={2} c="dark" mb="md">Как заказать нагетсы с доставкой?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <List spacing="md" size="lg">
                  <List.Item icon={<IconMeat size={24} color="orange" />}>
                    <strong>Выберите нагетсы</strong> - классические, острые или сырные нагетсы
                  </List.Item>
                  <List.Item icon={<IconMapPin size={24} color="orange" />}>
                    <strong>Укажите адрес доставки</strong> в Волжске - доставляем горячие нагетсы по всему городу
                  </List.Item>
                  <List.Item icon={<IconPhone size={24} color="orange" />}>
                    <strong>Подтвердите заказ</strong> по телефону +7(902)105-34-34
                  </List.Item>
                  <List.Item icon={<IconTruck size={24} color="orange" />}>
                    <strong>Получите хрустящие нагетсы</strong> через 30-60 минут в специальной упаковке
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card bg="orange.1" p="md">
                  <Stack gap="xs" align="center">
                    <IconLeaf size={40} color="green" />
                    <Title order={4} c="orange.7">Сочное куриное филе</Title>
                    <Text ta="center" size="sm">Используем только отборное куриное филе без костей и кожи</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Преимущества наших нагетсов */}
          <Box>
            <Title order={2} c="dark" mb="md">Почему заказывают нагетсы именно у нас?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconMeat size={48} color="orange" />
                    <Title order={4} ta="center">100% куриное филе</Title>
                    <Text ta="center" size="sm">Нагетсы из цельного куриного филе без добавок и консервантов</Text>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconLeaf size={48} color="green" />
                    <Title order={4} ta="center">Хрустящая панировка</Title>
                    <Text ta="center" size="sm">Золотистая панировка из натуральных сухарей и специй</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconTruck size={48} color="blue" />
                    <Title order={4} ta="center">Быстрая доставка</Title>
                    <Text ta="center" size="sm">Доставка нагетсов по Волжску за 30-60 минут в термоупаковке</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconClock size={48} color="purple" />
                    <Title order={4} ta="center">Готовим на заказ</Title>
                    <Text ta="center" size="sm">Нагетсы готовятся только после получения заказа для максимальной свежести</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Соусы к нагетсам */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="yellow.0">
            <Title order={2} c="dark" mb="md">Соусы к нагетсам</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="red.7" mb="sm">Кетчуп</Title>
                  <Text size="sm" mb="xs">Классический томатный кетчуп</Text>
                  <Text size="lg" c="red.6" fw={600}>Бесплатно</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="yellow.7" mb="sm">Сырный соус</Title>
                  <Text size="sm" mb="xs">Нежный соус на основе сыра чеддер</Text>
                  <Text size="lg" c="yellow.6" fw={600}>30 ₽</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="orange.7" mb="sm">Барбекю соус</Title>
                  <Text size="sm" mb="xs">Дымный соус барбекю с пряностями</Text>
                  <Text size="lg" c="orange.6" fw={600}>25 ₽</Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Размеры порций */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="gray.0">
            <Title order={2} c="dark" mb="md">Размеры порций нагетсов</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box ta="center">
                  <Title order={4} c="gray.7" mb="sm">6 штук</Title>
                  <Text size="sm" mb="xs">Идеально для перекуса</Text>
                  <Text size="lg" c="gray.6" fw={600}>280 ₽</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box ta="center">
                  <Title order={4} c="orange.7" mb="sm">10 штук</Title>
                  <Text size="sm" mb="xs">Стандартная порция</Text>
                  <Text size="lg" c="orange.6" fw={600}>420 ₽</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box ta="center">
                  <Title order={4} c="red.7" mb="sm">20 штук</Title>
                  <Text size="sm" mb="xs">Для большой компании</Text>
                  <Text size="lg" c="red.6" fw={600}>780 ₽</Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Контакты и заказ */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="orange.0">
            <Group justify="space-between" align="center">
              <Box>
                <Title order={2} c="orange.7">Заказать нагетсы сейчас!</Title>
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
                onClick={() => navigate('/')}
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
            <Title order={3} c="dark" mb="md">Доставка нагетсов в Волжске - ДИМБО</Title>
            <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
              <strong>Доставка нагетсов</strong> в Волжске от ДИМБО - это возможность насладиться хрустящими 
              куриными нагетсами в золотистой панировке, не выходя из дома. Мы готовим нагетсы из цельного 
              куриного филе, покрывая его хрустящей панировкой из натуральных сухарей.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              Когда вы <strong>заказываете нагетсы</strong> у нас, мы начинаем готовить их сразу после получения 
              заказа. Каждый нагетс панируется вручную и обжаривается до золотистой корочки. Внутри остается 
              сочное и нежное куриное мясо.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              <strong>Доставка нагетсов в Волжске</strong> осуществляется в специальной перфорированной упаковке, 
              которая сохраняет хрустящую текстуру панировки и не дает нагетсам размокнуть. Время доставки 
              составляет от 30 до 60 минут в зависимости от района Волжска.
            </Text>
          </Box>
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
