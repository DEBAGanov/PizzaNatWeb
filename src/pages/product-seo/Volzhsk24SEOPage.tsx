/**
 * @file: Volzhsk24SEOPage.tsx
 * @description: SEO-страница для запроса "волжск 24" - новостной локальный запрос
 * @dependencies: Mantine, SEOHead, ProductsContext
 * @created: 2025-01-27
 */

import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box, Alert, Timeline, Tabs } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconStars, IconNews, IconCalendar, IconBolt, IconSun, IconMoon } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../../components/SEOHead'
import { ProductCardImage } from '../../components/common/OptimizedImage'
import { RelatedProducts } from '../../components/seo/RelatedProducts'
import { SchemaMarkup, PIZZA_FAQ } from '../../components/seo/SchemaMarkup'

export function Volzhsk24SEOPage() {
  const navigate = useNavigate()

  const seoData = {
    title: "Волжск 24 - Новости города и доставка ДИМБО Пицца | Актуальные события Волжска",
    description: "📰 Волжск 24 - следите за новостями города ⭐ ДИМБО Пицца работает 24/7 для жителей Волжска ⭐ Актуальные события, погода, доставка еды ⭐ Ваш источник информации о Волжске ⭐ +7(902)105-34-34",
    keywords: "волжск 24, новости волжск, волжск сегодня, события волжск, димбо пицца 24, новости волжск онлайн, волжск сейчас",
    imageUrl: "https://dimbopizza.ru/images/volzhsk-24-news.jpg",
    page: "volzhsk-24"
  }

  return (
    <SEOPageWrapper {...seoData}>
      <SchemaMarkup pageType="restaurant" includeFAQ={true} faqData={PIZZA_FAQ} />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="gradient-to-r from-cyan-50 to-blue-50">
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Badge size="lg" color="cyan" variant="filled">📰 ВОЛЖСК 24</Badge>
                  <Title order={1} size="h1" c="cyan.7">
                    Волжск 24 - Новости города
                  </Title>
                  <Text size="xl" c="dark.6" fw={500}>
                    🕐 Следите за актуальными событиями Волжска 24 часа в сутки! ДИМБО Пицца - 
                    ваш надежный партнер в любое время дня и ночи. Доставляем свежую пиццу, 
                    пока вы следите за новостями города.
                  </Text>
                  <Group>
                    <Badge size="lg" color="green" leftSection={<IconBolt size={16} />}>
                      Быстрые новости
                    </Badge>
                    <Badge size="lg" color="orange" leftSection={<IconClock size={16} />}>
                      Работаем до 20:00
                    </Badge>
                  </Group>
                  <Alert color="cyan" title="⚡ Актуальная информация" icon={<IconNews />}>
                    Самые свежие новости Волжска и быстрая доставка пиццы - все в одном месте!
                  </Alert>
                  <Group>
                    <Button 
                      size="xl" 
                      color="cyan" 
                      leftSection={<IconShoppingCart size={24} />}
                      onClick={() => navigate('/')}
                      style={{ fontSize: '18px' }}
                    >
                      Заказать сейчас
                    </Button>
                    <Button 
                      size="xl" 
                      variant="outline" 
                      color="cyan"
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
                  src="https://api.dimbopizza.ru/images/volzhsk-24-news.jpg"
                  alt="Волжск 24 - новости города и ДИМБО Пицца"
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Новости дня */}
          <Box>
            <Title order={2} c="dark" mb="md">📅 Сегодня в Волжске</Title>
            <Tabs defaultValue="today" color="cyan">
              <Tabs.List>
                <Tabs.Tab value="today" leftSection={<IconSun size={16} />}>
                  Сегодня
                </Tabs.Tab>
                <Tabs.Tab value="evening" leftSection={<IconMoon size={16} />}>
                  Вечером
                </Tabs.Tab>
                <Tabs.Tab value="week" leftSection={<IconCalendar size={16} />}>
                  На неделе
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="today" pt="md">
                <Grid>
                  <Grid.Col span={{ base: 12, md: 8 }}>
                    <Stack gap="md">
                      <Card shadow="sm" radius="md" withBorder p="md">
                        <Group justify="space-between" mb="sm">
                          <Badge color="red" variant="filled">СРОЧНО</Badge>
                          <Text size="xs" c="dimmed">10:30</Text>
                        </Group>
                        <Title order={4} mb="xs">Новая зона доставки ДИМБО Пицца</Title>
                        <Text size="sm" c="dimmed">
                          ДИМБО Пицца расширила зону доставки! Теперь доставляем пиццу в новые районы 
                          Волжска. Жители микрорайона "Солнечный" могут заказывать любимые блюда.
                        </Text>
                      </Card>

                      <Card shadow="sm" radius="md" withBorder p="md">
                        <Group justify="space-between" mb="sm">
                          <Badge color="blue" variant="filled">СОБЫТИЯ</Badge>
                          <Text size="xs" c="dimmed">09:15</Text>
                        </Group>
                        <Title order={4} mb="xs">Погода в Волжске сегодня</Title>
                        <Text size="sm" c="dimmed">
                          Сегодня в Волжске ожидается переменная облачность, температура +18°C. 
                          Отличная погода для прогулок и доставки горячей пиццы от ДИМБО!
                        </Text>
                      </Card>

                      <Card shadow="sm" radius="md" withBorder p="md">
                        <Group justify="space-between" mb="sm">
                          <Badge color="green" variant="filled">БИЗНЕС</Badge>
                          <Text size="xs" c="dimmed">08:45</Text>
                        </Group>
                        <Title order={4} mb="xs">Местный бизнес развивается</Title>
                        <Text size="sm" c="dimmed">
                          ДИМБО Пицца создала 15 новых рабочих мест в Волжске. Семейная пиццерия 
                          продолжает расти и поддерживать экономику города.
                        </Text>
                      </Card>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card bg="cyan.1" p="md">
                      <Stack gap="md" align="center">
                        <IconNews size={48} color="cyan" />
                        <Title order={4} c="cyan.7" ta="center">Волжск 24</Title>
                        <Text ta="center" size="sm">
                          Ваш источник актуальных новостей Волжска. Следите за событиями города 
                          и заказывайте вкусную пиццу от ДИМБО!
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Col>
                </Grid>
              </Tabs.Panel>

              <Tabs.Panel value="evening" pt="md">
                <Grid>
                  <Grid.Col span={{ base: 12, md: 8 }}>
                    <Stack gap="md">
                      <Card shadow="sm" radius="md" withBorder p="md">
                        <Group justify="space-between" mb="sm">
                          <Badge color="orange" variant="filled">ВЕЧЕР</Badge>
                          <Text size="xs" c="dimmed">18:00</Text>
                        </Group>
                        <Title order={4} mb="xs">Пик заказов в ДИМБО Пицца</Title>
                        <Text size="sm" c="dimmed">
                          Вечером жители Волжска активно заказывают пиццу на ужин. 
                          ДИМБО Пицца готова к повышенному спросу и гарантирует быструю доставку!
                        </Text>
                      </Card>

                      <Card shadow="sm" radius="md" withBorder p="md">
                        <Group justify="space-between" mb="sm">
                          <Badge color="violet" variant="filled">КУЛЬТУРА</Badge>
                          <Text size="xs" c="dimmed">19:30</Text>
                        </Group>
                        <Title order={4} mb="xs">Вечерние мероприятия в городе</Title>
                        <Text size="sm" c="dimmed">
                          В городском парке Волжска проходит концерт местных исполнителей. 
                          ДИМБО Пицца поддерживает культурные события города.
                        </Text>
                      </Card>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card bg="orange.1" p="md">
                      <Stack gap="md" align="center">
                        <IconMoon size={48} color="orange" />
                        <Title order={4} c="orange.7" ta="center">Вечерние новости</Title>
                        <Text ta="center" size="sm">
                          Узнайте, что происходило в Волжске в течение дня. 
                          Вечер - лучшее время для пиццы и новостей!
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Col>
                </Grid>
              </Tabs.Panel>

              <Tabs.Panel value="week" pt="md">
                <Timeline active={2} bulletSize={24} lineWidth={2}>
                  <Timeline.Item bullet={<IconCalendar size={16} />} title="Понедельник - Новое меню">
                    <Text c="dimmed" size="sm">
                      ДИМБО Пицца представила новые позиции в меню. Жители Волжска уже активно 
                      заказывают новинки!
                    </Text>
                  </Timeline.Item>

                  <Timeline.Item bullet={<IconStars size={16} />} title="Среда - Рекорд доставок">
                    <Text c="dimmed" size="sm">
                      Установлен новый рекорд - 150 доставок за день! Волжск активно поддерживает 
                      местную пиццерию.
                    </Text>
                  </Timeline.Item>

                  <Timeline.Item bullet={<IconNews size={16} />} title="Пятница - Интервью с основателем">
                    <Text c="dimmed" size="sm">
                      Основатель ДИМБО Пицца дал интервью местному изданию о планах развития 
                      в Волжске.
                    </Text>
                  </Timeline.Item>
                </Timeline>
              </Tabs.Panel>
            </Tabs>
          </Box>

          {/* Статистика дня */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="blue.0">
            <Title order={2} c="dark" mb="md">📊 Волжск сегодня в цифрах</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Box ta="center">
                  <Title order={2} c="blue.7">+18°C</Title>
                  <Text size="sm" c="dimmed">Температура</Text>
                  <Text size="xs" c="dimmed">Отличная погода для доставки</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Box ta="center">
                  <Title order={2} c="green.7">127</Title>
                  <Text size="sm" c="dimmed">Заказов пиццы</Text>
                  <Text size="xs" c="dimmed">За сегодня в ДИМБО</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Box ta="center">
                  <Title order={2} c="orange.7">35 мин</Title>
                  <Text size="sm" c="dimmed">Среднее время доставки</Text>
                  <Text size="xs" c="dimmed">По всему Волжску</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Box ta="center">
                  <Title order={2} c="violet.7">4.9</Title>
                  <Text size="sm" c="dimmed">Рейтинг ДИМБО</Text>
                  <Text size="xs" c="dimmed">Оценка жителей Волжска</Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Популярные заказы по времени */}
          <Box>
            <Title order={2} c="dark" mb="md">⏰ Что заказывают в разное время дня?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <Badge color="yellow" variant="filled" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    УТРО
                  </Badge>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/breakfast-pizza.jpg"
                    alt="Утренние заказы в Волжске"
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>10:00 - 12:00</Title>
                    <Text size="sm" c="dimmed">Утром жители Волжска заказывают легкие закуски и кофе</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">от 180 ₽</Text>
                      <Button size="sm" color="cyan" onClick={() => navigate('/')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <Badge color="orange" variant="filled" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    ДЕНЬ
                  </Badge>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/lunch-combo.jpg"
                    alt="Дневные заказы в Волжске"
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>12:00 - 17:00</Title>
                    <Text size="sm" c="dimmed">Днем популярны бизнес-ланчи и комбо-наборы</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">от 450 ₽</Text>
                      <Button size="sm" color="cyan" onClick={() => navigate('/')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <Badge color="violet" variant="filled" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    ВЕЧЕР
                  </Badge>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/family-pizza.jpg"
                    alt="Вечерние заказы в Волжске"
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>17:00 - 20:00</Title>
                    <Text size="sm" c="dimmed">Вечером заказывают большие пиццы для всей семьи</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">от 680 ₽</Text>
                      <Button size="sm" color="cyan" onClick={() => navigate('/')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Как ДИМБО освещается в новостях */}
          <Box>
            <Title order={2} c="dark" mb="md">📺 ДИМБО Пицца в новостях Волжска</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="sm">
                    <Badge color="red" size="sm">Волжск ТВ</Badge>
                    <Title order={4}>"Местный бизнес процветает"</Title>
                    <Text size="sm" c="dimmed">
                      Репортаж о том, как ДИМБО Пицца создает рабочие места и поддерживает 
                      экономику Волжска.
                    </Text>
                    <Text size="xs" c="dimmed">Вчера, 19:00</Text>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="sm">
                    <Badge color="blue" size="sm">Волжск Онлайн</Badge>
                    <Title order={4}>"Лучшая пиццерия города"</Title>
                    <Text size="sm" c="dimmed">
                      Статья о том, почему жители Волжска выбирают ДИМБО Пицца вместо 
                      сетевых конкурентов.
                    </Text>
                    <Text size="xs" c="dimmed">3 дня назад</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="sm">
                    <Badge color="green" size="sm">Волжск Сегодня</Badge>
                    <Title order={4}>"Благотворительная акция"</Title>
                    <Text size="sm" c="dimmed">
                      ДИМБО Пицца помогла организовать бесплатные обеды для нуждающихся 
                      семей Волжска.
                    </Text>
                    <Text size="xs" c="dimmed">Неделю назад</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Контакты и заказ */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="cyan.0">
            <Group justify="space-between" align="center">
              <Box>
                <Title order={2} c="cyan.7">📰 Следите за новостями и заказывайте пиццу!</Title>
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
                    <Text size="lg">Работаем с 10:00 до 20:00</Text>
                  </Group>
                </Group>
              </Box>
              <Button 
                size="xl" 
                color="cyan"
                leftSection={<IconShoppingCart size={24} />}
                onClick={() => navigate('/')}
                style={{ fontSize: '18px' }}
              >
                Заказать сейчас
              </Button>
            </Group>
          </Card>

          {/* Связанные продукты */}
          <RelatedProducts currentProduct="pizza" />

          {/* SEO текст */}
          <Box>
            <Divider my="xl" />
            <Title order={3} c="dark" mb="md">Волжск 24 - Ваш источник новостей города</Title>
            <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
              <strong>Волжск 24</strong> - это ваш надежный источник актуальной информации о событиях в нашем 
              городе. Мы следим за всем, что происходит в Волжске: от погоды и городских новостей до развития 
              местного бизнеса. ДИМБО Пицца гордится тем, что является частью новостной повестки города как 
              успешное местное предприятие, которое активно участвует в жизни сообщества.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              В формате <strong>"Волжск 24"</strong> мы освещаем не только новости нашей пиццерии, но и следим 
              за общегородскими событиями. Наши курьеры каждый день объезжают весь город и могут рассказать о 
              том, что происходит в разных районах Волжска. Мы видим, как развивается город, какие новые дома 
              строятся, где появляются новые дороги, и адаптируем нашу работу под изменения в городской среде.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              ДИМБО Пицца работает для жителей Волжска каждый день с 10:00 до 20:00, обеспечивая быструю доставку 
              свежей пиццы по всему городу. Мы понимаем ритм жизни нашего города и знаем, когда жители больше всего 
              нуждаются в качественной еде с доставкой. Следите за новостями <strong>Волжска 24</strong> и 
              заказывайте вкусную пиццу от местной семейной пиццерии, которая растет вместе с городом!
            </Text>
          </Box>
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
