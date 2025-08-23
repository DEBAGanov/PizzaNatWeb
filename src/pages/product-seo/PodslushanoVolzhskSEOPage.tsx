/**
 * @file: PodslushanoVolzhskSEOPage.tsx
 * @description: SEO-страница для запроса "подслушано в волжске" - локальный информационный запрос
 * @dependencies: Mantine, SEOHead, ProductsContext
 * @created: 2025-01-27
 */

import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box, Alert, Timeline } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconStars, IconNews, IconUsers, IconHeart, IconMessageCircle } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../../components/SEOHead'
import { ProductCardImage } from '../../components/common/OptimizedImage'
import { RelatedProducts } from '../../components/seo/RelatedProducts'
import { SchemaMarkup, PIZZA_FAQ } from '../../components/seo/SchemaMarkup'

export function PodslushanoVolzhskSEOPage() {
  const navigate = useNavigate()

  const seoData = {
    title: "Подслушано в Волжске - ДИМБО Пицца | Новости, события и доставка еды в Волжске",
    description: "📢 Подслушано в Волжске - узнайте последние новости города ⭐ ДИМБО Пицца - часть жизни Волжска ⭐ Доставка пиццы по всем районам ⭐ Следите за событиями города ⭐ +7(902)105-34-34",
    keywords: "подслушано в волжске, подслушано волжск, новости волжск, события волжск, димбо пицца волжск, жизнь волжска, сообщество волжск",
    imageUrl: "https://dimbopizza.ru/images/podslushano-volzhsk.jpg",
    page: "podslushano-volzhsk"
  }

  return (
    <SEOPageWrapper {...seoData}>
      <SchemaMarkup pageType="restaurant" includeFAQ={true} faqData={PIZZA_FAQ} />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="gradient-to-r from-indigo-50 to-purple-50">
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Badge size="lg" color="indigo" variant="filled">📢 ПОДСЛУШАНО В ВОЛЖСКЕ</Badge>
                  <Title order={1} size="h1" c="indigo.7">
                    Подслушано в Волжске - ДИМБО Пицца
                  </Title>
                  <Text size="xl" c="dark.6" fw={500}>
                    🏙️ ДИМБО Пицца - неотъемлемая часть жизни Волжска! Мы следим за всеми событиями города, 
                    участвуем в жизни сообщества и доставляем вкусную пиццу во все районы. 
                    Узнайте, что происходит в нашем любимом городе!
                  </Text>
                  <Group>
                    <Badge size="lg" color="green" leftSection={<IconHeart size={16} />}>
                      Часть сообщества
                    </Badge>
                    <Badge size="lg" color="purple" leftSection={<IconUsers size={16} />}>
                      Местный бизнес
                    </Badge>
                  </Group>
                  <Alert color="indigo" title="🎉 Мы в курсе всех событий!" icon={<IconNews />}>
                    ДИМБО Пицца активно участвует в жизни Волжска и поддерживает местные инициативы!
                  </Alert>
                  <Group>
                    <Button 
                      size="xl" 
                      color="indigo" 
                      leftSection={<IconShoppingCart size={24} />}
                      onClick={() => navigate('/menu')}
                      style={{ fontSize: '18px' }}
                    >
                      Заказать пиццу
                    </Button>
                    <Button 
                      size="xl" 
                      variant="outline" 
                      color="indigo"
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
                  src="https://api.dimbopizza.ru/images/volzhsk-community.jpg"
                  alt="Подслушано в Волжске - ДИМБО Пицца часть сообщества"
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Новости и события Волжска */}
          <Box>
            <Title order={2} c="dark" mb="md">📰 Что происходит в Волжске?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Timeline active={3} bulletSize={24} lineWidth={2}>
                  <Timeline.Item bullet={<IconNews size={16} />} title="Новое в ДИМБО Пицца">
                    <Text c="dimmed" size="sm">
                      Запустили доставку в новые районы Волжска! Теперь доставляем пиццу 
                      даже в самые отдаленные уголки города за 30-60 минут.
                    </Text>
                    <Text size="xs" mt={4} c="dimmed">2 дня назад</Text>
                  </Timeline.Item>

                  <Timeline.Item bullet={<IconHeart size={16} />} title="Поддержка местных событий">
                    <Text c="dimmed" size="sm">
                    </Text>
                    <Text size="xs" mt={4} c="dimmed">5 дней назад</Text>
                  </Timeline.Item>

                  <Timeline.Item bullet={<IconUsers size={16} />} title="Отзывы жителей">
                    <Text c="dimmed" size="sm">
                    </Text>
                    <Text size="xs" mt={4} c="dimmed">1 неделя назад</Text>
                  </Timeline.Item>

                  <Timeline.Item bullet={<IconStars size={16} />} title="Достижения">
                    <Text c="dimmed" size="sm">
                    </Text>
                    <Text size="xs" mt={4} c="dimmed">2 недели назад</Text>
                  </Timeline.Item>
                </Timeline>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card bg="indigo.1" p="md">
                  <Stack gap="md" align="center">
                    <IconMessageCircle size={48} color="indigo" />
                    <Title order={4} c="indigo.7" ta="center">Следите за нами!</Title>
                    <Text ta="center" size="sm">
                      Мы активно участвуем в жизни Волжска и всегда в курсе городских событий. 
                      Следите за новостями в местных группах!
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Популярные заказы в разных районах */}
          <Box>
            <Title order={2} c="dark" mb="md">🏘️ Популярные заказы по районам Волжска</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <Badge color="green" variant="filled" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    ЦЕНТР
                  </Badge>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/pizza-margherita.jpg"
                    alt="Популярная пицца в центре Волжска"
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Центр города</Title>
                    <Text size="sm" c="dimmed">Жители центра Волжска чаще всего заказывают классическую Маргариту</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">380 ₽</Text>
                      <Button size="sm" color="indigo" onClick={() => navigate('/menu')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <Badge color="blue" variant="filled" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    УЛ. ЛЕНИНА
                  </Badge>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/pizza-pepperoni.jpg"
                    alt="Популярная пицца на улице Ленина"
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Улица Ленина</Title>
                    <Text size="sm" c="dimmed">На ул. Ленина предпочитают острую Пепперони - самый популярный выбор</Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">450 ₽</Text>
                      <Button size="sm" color="indigo" onClick={() => navigate('/menu')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder>
                  <Badge color="violet" variant="filled" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    НОВЫЕ РАЙОНЫ
                  </Badge>
                  <ProductCardImage
                    src="https://api.dimbopizza.ru/images/pizza-hawaiian.jpg"
                    alt="Популярная пицца в новых районах Волжска"
                  />
                  <Stack mt="md" gap="xs">
                    <Title order={4}>Новые районы</Title>
                    <Text size="sm" c="dimmed"></Text>
                    <Group justify="space-between" align="center">
                      <Text size="lg" fw={700} c="orange">480 ₽</Text>
                      <Button size="sm" color="indigo" onClick={() => navigate('/menu')}>Заказать</Button>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Как ДИМБО участвует в жизни Волжска */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="purple.0">
            <Title order={2} c="dark" mb="md">🤝 Как ДИМБО участвует в жизни Волжска?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <List spacing="md" size="lg">
                  <List.Item icon={<IconHeart size={24} color="purple" />}>
                    <strong>Поддержка местных событий</strong> - участвуем в городских праздниках
                  </List.Item>
                  <List.Item icon={<IconUsers size={24} color="purple" />}>
                    <strong>Работа с сообществом</strong> - активно участвуем в группах "Подслушано в Волжске"
                  </List.Item>
                  <List.Item icon={<IconStars size={24} color="purple" />}>
                    <strong>Благотворительность</strong> - помогаем семьям Волжска
                  </List.Item>
                  <List.Item icon={<IconTruck size={24} color="purple" />}>
                    <strong>Развитие города</strong> - создаем рабочие места для жителей Волжска
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card bg="purple.1" p="md">
                  <Stack gap="xs" align="center">
                    <IconNews size={48} color="purple" />
                    <Title order={4} c="purple.7">Мы - часть Волжска!</Title>
                    <Text ta="center" size="sm">
                      ДИМБО Пицца не просто доставляет еду - мы строим сообщество, 
                      поддерживаем местные инициативы и делаем Волжск лучше!
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Отзывы из "Подслушано в Волжске" */}
          <Box>
            <Title order={2} c="dark" mb="md">💬 Что пишут о ДИМБО?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text fw={600}>Анонимно</Text>
                      <Badge size="sm" color="indigo">Подслушано</Badge>
                    </Group>
                    <Text size="sm" c="dimmed">
                      "Ребят, кто знает хорошую пиццерию в Волжске? Надоело переплачивать в Додо..."
                      <br/><br/>
                      "ДИМБО Пицца! Семейная пиццерия в городе, дешевле и вкуснее. Сам туда хожу уже год."
                    </Text>
                    <Group gap="xs">
                      {[1,2,3,4,5].map(i => <IconStars key={i} size={16} color="orange" />)}
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text fw={600}>Мария В.</Text>
                      <Badge size="sm" color="indigo">Подслушано</Badge>
                    </Group>
                    <Text size="sm" c="dimmed">
                      "Девочки, заказала в ДИМБО на день рождения дочки - все гости были в восторге! 
                      Пицца огромная, вкусная и недорогая. Теперь только туда!"
                    </Text>
                    <Group gap="xs">
                      {[1,2,3,4,5].map(i => <IconStars key={i} size={16} color="orange" />)}
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text fw={600}>Алексей К.</Text>
                      <Badge size="sm" color="indigo">Подслушано</Badge>
                    </Group>
                    <Text size="sm" c="dimmed">
                      "Работаю в ДИМБО курьером уже полгода. Классные ребята, хорошие условия. 
                      Рад, что в Волжске есть такой достойный работодатель!"
                    </Text>
                    <Group gap="xs">
                      {[1,2,3,4,5].map(i => <IconStars key={i} size={16} color="orange" />)}
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Доставка по всему Волжску */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="green.0">
            <Title order={2} c="dark" mb="md">🗺️ Доставляем по всему Волжску!</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="green.7" mb="sm">🏢 Центральные районы</Title>
                  <Text size="sm" mb="xs">ул. Ленина, ул. Шестакова, центр</Text>
                  <Text size="sm" c="green.6" fw={600}>⏰ Доставка: 20-35 минут</Text>
                  <Text size="xs" c="dimmed" mt="xs">Самые популярные районы в "Подслушано"</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="blue.7" mb="sm">🏘️ Жилые массивы</Title>
                  <Text size="sm" mb="xs">Новостройки, спальные районы</Text>
                  <Text size="sm" c="blue.6" fw={600}>⏰ Доставка: 30-45 минут</Text>
                  <Text size="xs" c="dimmed" mt="xs">Активно растущие районы города</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="violet.7" mb="sm">🌲 Окраины</Title>
                  <Text size="sm" mb="xs">Частный сектор, дачи</Text>
                  <Text size="sm" c="violet.6" fw={600}>⏰ Доставка: 40-60 минут</Text>
                  <Text size="xs" c="dimmed" mt="xs">Доставляем даже в отдаленные места</Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Контакты и заказ */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="indigo.0">
            <Group justify="space-between" align="center">
              <Box>
                <Title order={2} c="indigo.7">🍕 Присоединяйтесь к сообществу ДИМБО!</Title>
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
                    <IconUsers size={20} />
                    <Text size="lg">Часть сообщества Волжска</Text>
                  </Group>
                </Group>
              </Box>
              <Button 
                size="xl" 
                color="indigo"
                leftSection={<IconShoppingCart size={24} />}
                onClick={() => navigate('/menu')}
                style={{ fontSize: '18px' }}
              >
                Заказать пиццу
              </Button>
            </Group>
          </Card>

          {/* Связанные продукты */}
          <RelatedProducts currentProduct="pizza" />

          {/* SEO текст */}
          <Box>
            <Divider my="xl" />
            <Title order={3} c="dark" mb="md">Подслушано в Волжске - ДИМБО Пицца</Title>
            <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
              <strong>Подслушано в Волжске</strong> - это не просто группа в социальных сетях, это живое сообщество 
              нашего города, где жители делятся новостями, событиями и рекомендациями. ДИМБО Пицца гордится тем, 
              что является неотъемлемой частью этого сообщества. Мы не просто доставляем пиццу - мы участвуем 
              в жизни Волжска, поддерживаем местные инициативы и строим связи с нашими соседями.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              В группах <strong>"Подслушано в Волжске"</strong> часто можно встретить положительные отзывы о нашей 
              пиццерии. Жители города ценят нас за качество, скорость доставки и честные цены. Мы активно следим 
              за обратной связью в местных сообществах и постоянно улучшаем наш сервис, основываясь на пожеланиях 
              волжан. Каждый отзыв важен для нас, ведь мы работаем для людей, которые живут рядом с нами.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              ДИМБО Пицца - это местный семейный бизнес, который вырос вместе с Волжском. Мы знаем каждый район 
              города, понимаем потребности жителей и стремимся быть полезными для нашего сообщества. Когда вы 
              заказываете пиццу у нас, вы поддерживаете не только местную экономику, но и помогаете нам продолжать 
              участвовать в жизни города, который мы все любим.
            </Text>
          </Box>
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
