/**
 * @file: FriesSEOPage.tsx
 * @description: SEO-оптимизированная страница для продвижения картофеля фри по ключевым запросам
 * @dependencies: Mantine, SEOHead, ProductsContext
 * @created: 2025-01-27
 */

import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconCarrot, IconLeaf } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../../components/SEOHead'
import { ProductCardImage } from '../../components/common/OptimizedImage'
import { RelatedProducts } from '../../components/seo/RelatedProducts'
import { SchemaMarkup } from '../../components/seo/SchemaMarkup'

export function FriesSEOPage() {
  const navigate = useNavigate()

  const seoData = {
    title: "Заказать картофель фри с доставкой в Волжске - ДИМБО | Доставка картошки фри на дом",
    description: "🍟 Заказать картофель фри с доставкой в Волжске ⭐ Хрустящая картошка фри с соусами ⭐ Доставка картофеля фри за 30-60 минут ⭐ Бесплатная доставка от 800₽ ⭐ +7(902)105-34-34",
    keywords: "заказать картофель фри, доставка картошки фри, картофель фри волжск, доставка картофеля фри волжск, заказать картошку фри волжск",
    imageUrl: "https://dimbopizza.ru/images/fries-hero.jpg"
  }

  return (
    <SEOPageWrapper {...seoData}>
      <SchemaMarkup pageType="fries" />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="yellow.0">
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Title order={1} size="h1" c="yellow.8">
                    Заказать картофель фри с доставкой в Волжске
                  </Title>
                  <Text size="xl" c="dark.6">
                    Хрустящий картофель фри с фирменными соусами и доставкой на дом! Золотистая картошка, приготовленная из отборных сортов. Доставка картофеля фри по всему Волжску за 30-60 минут.
                  </Text>
                  <Group>
                    <Badge size="lg" color="green">Бесплатная доставка от 800₽</Badge>
                    <Badge size="lg" color="yellow">Хрустящий снаружи</Badge>
                  </Group>
                  <Group>
                    <Button 
                      size="lg" 
                      color="yellow" 
                      leftSection={<IconShoppingCart size={20} />}
                      onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}
                    >
                      Заказать картофель фри сейчас
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
                  src="https://api.dimbopizza.ru/images/fries-classic.jpg"
                  alt="Заказать картофель фри с доставкой в Волжске"
                  style={{ borderRadius: '12px' }}
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Виды картофеля фри */}
          <Box>
            <Title order={2} c="dark" mb="md">Популярный картофель фри с доставкой</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/fries-classic.jpg"
                    alt="Классический картофель фри - заказать с доставкой"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Классический фри</Title>
                    <Text size="sm" c="dimmed">Хрустящий картофель фри, приготовленный по классическому рецепту</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="yellow.8">180 ₽</Text>
                      <Button size="sm" color="yellow" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/fries-cheese.jpg"
                    alt="Картофель фри с сыром - доставка картошки фри"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Фри с сыром</Title>
                    <Text size="sm" c="dimmed">Картофель фри, посыпанный расплавленным сыром чеддер</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="yellow.8">220 ₽</Text>
                      <Button size="sm" color="yellow" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/fries-spicy.jpg"
                    alt="Острый картофель фри - заказать доставку"
                    style={{ height: '200px' }}
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Острый фри</Title>
                    <Text size="sm" c="dimmed">Картофель фри с острыми специями и паприкой</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="yellow.8">200 ₽</Text>
                      <Button size="sm" color="yellow" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Как заказать картофель фри */}
          <Card shadow="sm" radius="md" withBorder p="xl">
            <Title order={2} c="dark" mb="md">Как заказать картофель фри с доставкой?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <List spacing="md" size="lg">
                  <List.Item icon={<IconCarrot size={24} color="orange" />}>
                    <strong>Выберите картофель фри</strong> - классический, с сыром, острый или с беконом
                  </List.Item>
                  <List.Item icon={<IconMapPin size={24} color="orange" />}>
                    <strong>Укажите адрес доставки</strong> в Волжске - доставляем горячий картофель по всему городу
                  </List.Item>
                  <List.Item icon={<IconPhone size={24} color="orange" />}>
                    <strong>Подтвердите заказ</strong> по телефону +7(902)105-34-34
                  </List.Item>
                  <List.Item icon={<IconTruck size={24} color="orange" />}>
                    <strong>Получите хрустящий фри</strong> через 30-60 минут в специальной упаковке
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card bg="yellow.1" p="md">
                  <Stack gap="xs" align="center">
                    <IconLeaf size={40} color="green" />
                    <Title order={4} c="yellow.8">Из отборного картофеля</Title>
                    <Text ta="center" size="sm">Используем только качественные сорта картофеля для лучшего вкуса</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Преимущества нашего картофеля фри */}
          <Box>
            <Title order={2} c="dark" mb="md">Почему заказывают картофель фри именно у нас?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconLeaf size={48} color="green" />
                    <Title order={4} ta="center">Отборный картофель</Title>
                    <Text ta="center" size="sm">Используем только качественные сорта картофеля от проверенных фермеров</Text>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconCarrot size={48} color="orange" />
                    <Title order={4} ta="center">Идеальная обжарка</Title>
                    <Text ta="center" size="sm">Золотистый снаружи, мягкий внутри - секрет идеального картофеля фри</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconTruck size={48} color="blue" />
                    <Title order={4} ta="center">Быстрая доставка</Title>
                    <Text ta="center" size="sm">Доставка картофеля фри по Волжску за 30-60 минут в термоупаковке</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconClock size={48} color="purple" />
                    <Title order={4} ta="center">Всегда свежий</Title>
                    <Text ta="center" size="sm">Готовим картофель фри только после получения заказа</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Соусы к картофелю фри */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="orange.0">
            <Title order={2} c="dark" mb="md">Соусы к картофелю фри</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Box>
                  <Title order={4} c="orange.7" mb="sm">Кетчуп</Title>
                  <Text size="sm" mb="xs">Классический томатный кетчуп</Text>
                  <Text size="lg" c="orange.6" fw={600}>Бесплатно</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Box>
                  <Title order={4} c="yellow.7" mb="sm">Сырный соус</Title>
                  <Text size="sm" mb="xs">Нежный соус на основе сыра чеддер</Text>
                  <Text size="lg" c="yellow.6" fw={600}>30 ₽</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Box>
                  <Title order={4} c="red.7" mb="sm">Острый соус</Title>
                  <Text size="sm" mb="xs">Пикантный соус с перцем чили</Text>
                  <Text size="lg" c="red.6" fw={600}>25 ₽</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Box>
                  <Title order={4} c="green.7" mb="sm">Чесночный соус</Title>
                  <Text size="sm" mb="xs">Ароматный соус с чесноком и зеленью</Text>
                  <Text size="lg" c="green.6" fw={600}>25 ₽</Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Размеры порций */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="gray.0">
            <Title order={2} c="dark" mb="md">Размеры порций картофеля фри</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box ta="center">
                  <Title order={4} c="gray.7" mb="sm">Маленькая порция</Title>
                  <Text size="sm" mb="xs">Идеально для перекуса - 100г</Text>
                  <Text size="lg" c="gray.6" fw={600}>150 ₽</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box ta="center">
                  <Title order={4} c="yellow.7" mb="sm">Средняя порция</Title>
                  <Text size="sm" mb="xs">Стандартная порция - 150г</Text>
                  <Text size="lg" c="yellow.6" fw={600}>180 ₽</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box ta="center">
                  <Title order={4} c="orange.7" mb="sm">Большая порция</Title>
                  <Text size="sm" mb="xs">Для большой компании - 250г</Text>
                  <Text size="lg" c="orange.6" fw={600}>250 ₽</Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Контакты и заказ */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="yellow.0">
            <Group justify="space-between" align="center">
              <Box>
                <Title order={2} c="yellow.8">Заказать картофель фри сейчас!</Title>
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
          <RelatedProducts currentProduct="fries" />

          {/* SEO текст */}
          <Box>
            <Divider my="xl" />
            <Title order={3} c="dark" mb="md">Доставка картофеля фри в Волжске - ДИМБО</Title>
            <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
              <strong>Доставка картофеля фри</strong> в Волжске от ДИМБО - это возможность насладиться хрустящим 
              золотистым картофелем, не выходя из дома. Мы готовим картофель фри из отборных сортов картофеля, 
              обжаривая до идеальной текстуры.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              Когда вы <strong>заказываете картофель фри</strong> у нас, мы начинаем готовить его сразу после 
              получения заказа. Картофель нарезается соломкой и обжаривается в качественном масле до золотистой 
              корочки. Каждая порция получается хрустящей снаружи и мягкой внутри.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              <strong>Доставка картошки фри в Волжске</strong> осуществляется в специальной перфорированной упаковке, 
              которая сохраняет хрустящую текстуру и не дает картофелю размокнуть. Время доставки составляет 
              от 30 до 60 минут в зависимости от района Волжска.
            </Text>
          </Box>
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
