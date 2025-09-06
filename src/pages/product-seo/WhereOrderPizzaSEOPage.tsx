/**
 * @file: WhereOrderPizzaSEOPage.tsx
 * @description: SEO-страница для запроса "где заказать пиццу" - информационно-коммерческий запрос
 * @dependencies: Mantine, SEOHead, ProductsContext
 * @created: 2025-01-27
 */

import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box, Alert, Accordion } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconStars, IconCheck, IconX, IconSearch, IconThumbUp } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../../components/SEOHead'
import { ProductCardImage } from '../../components/common/OptimizedImage'
import { RelatedProducts } from '../../components/seo/RelatedProducts'
import { SchemaMarkup, PIZZA_FAQ } from '../../components/seo/SchemaMarkup'

export function WhereOrderPizzaSEOPage() {
  const navigate = useNavigate()

  const seoData = {
    title: "Где заказать пиццу в Волжске - Лучшие пиццерии | ДИМБО Пицца - №1 выбор",
    description: "🍕 Где заказать пиццу в Волжске? ⭐ ДИМБО Пицца - лучший выбор! ⭐ Сравнение пиццерий Волжска ⭐ Быстрая доставка, низкие цены ⭐ Рейтинг пиццерий ⭐ +7(902)105-34-34",
    keywords: "где заказать пиццу, где заказать пиццу волжск, лучшие пиццерии волжск, рейтинг пиццерий, сравнение пиццерий волжск, какую пиццерию выбрать",
    imageUrl: "https://dimbopizza.ru/images/where-order-pizza.jpg",
    page: "where-order-pizza"
  }

  return (
    <SEOPageWrapper {...seoData}>
      <SchemaMarkup pageType="pizza" includeFAQ={true} faqData={PIZZA_FAQ} />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="gradient-to-r from-purple-50 to-pink-50">
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Badge size="lg" color="violet" variant="filled">🔍 ГИД ПО ПИЦЦЕРИЯМ</Badge>
                  <Title order={1} size="h1" c="violet.7">
                    Где заказать пиццу в Волжске?
                  </Title>
                  <Text size="xl" c="dark.6" fw={500}>
                    🏆 Полный гид по пиццериям Волжска! Сравниваем цены, качество, скорость доставки. 
                    ДИМБО Пицца - лидер рейтинга по всем показателям. Узнайте, почему нас выбирают!
                  </Text>
                  <Group>
                    <Badge size="lg" color="green" leftSection={<IconThumbUp size={16} />}>
                      №1 в рейтинге
                    </Badge>
                    <Badge size="lg" color="orange" leftSection={<IconStars size={16} />}>
                      4.9/5 звезд
                    </Badge>
                  </Group>
                  <Alert color="violet" title="🎯 Лучший выбор" icon={<IconSearch />}>
                    ДИМБО Пицца признана лучшей пиццерией Волжска по версии клиентов в 2024 году!
                  </Alert>
                  <Group>
                    <Button 
                      size="xl" 
                      color="violet" 
                      leftSection={<IconShoppingCart size={24} />}
                      onClick={() => navigate('/')}
                      style={{ fontSize: '18px' }}
                    >
                      Заказать в лучшей
                    </Button>
                    <Button 
                      size="xl" 
                      variant="outline" 
                      color="violet"
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
                  src="https://api.dimbopizza.ru/images/pizza-comparison.jpg"
                  alt="Где заказать пиццу в Волжске - сравнение пиццерий"
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Рейтинг пиццерий Волжска */}
          <Box>
            <Title order={2} c="dark" mb="md">🏆 Рейтинг пиццерий Волжска 2024</Title>
            <Stack gap="md">
              <Card shadow="sm" radius="md" withBorder p="lg" bg="gradient-to-r from-gold-50 to-yellow-50">
                <Group justify="space-between" align="center">
                  <Group>
                    <Badge size="xl" color="yellow" variant="filled">🥇 1 МЕСТО</Badge>
                    <Box>
                      <Title order={3} c="yellow.8">ДИМБО Пицца</Title>
                      <Group gap="xs" mt="xs">
                        {[1,2,3,4,5].map(i => <IconStars key={i} size={20} color="orange" />)}
                        <Text fw={600}>4.9/5</Text>
                      </Group>
                    </Box>
                  </Group>
                  <Group>
                    <Stack gap="xs" align="center">
                      <Text size="sm" c="dimmed">Цена пиццы</Text>
                      <Text fw={600} c="green">от 380₽</Text>
                    </Stack>
                    <Stack gap="xs" align="center">
                      <Text size="sm" c="dimmed">Доставка</Text>
                      <Text fw={600} c="blue">30-60 мин</Text>
                    </Stack>
                    <Button color="yellow" onClick={() => navigate('/')}>
                      Заказать
                    </Button>
                  </Group>
                </Group>
                <Text size="sm" c="dimmed" mt="md">
                  ✅ Лучшее качество ✅ Быстрая доставка ✅ Приемлемые цены ✅ Отличный сервис
                </Text>
              </Card>

              <Card shadow="sm" radius="md" withBorder p="lg">
                <Group justify="space-between" align="center">
                  <Group>
                    <Badge size="lg" color="gray" variant="filled">🥈 2 место</Badge>
                    <Box>
                      <Title order={4} c="gray.7">Додо Пицца</Title>
                      <Group gap="xs" mt="xs">
                        {[1,2,3,4].map(i => <IconStars key={i} size={16} color="orange" />)}
                        <IconStars size={16} color="gray" />
                        <Text fw={600}>4.2/5</Text>
                      </Group>
                    </Box>
                  </Group>
                  <Group>
                    <Stack gap="xs" align="center">
                      <Text size="sm" c="dimmed">Цена пиццы</Text>
                      <Text fw={600} c="red">от 550₽</Text>
                    </Stack>
                    <Stack gap="xs" align="center">
                      <Text size="sm" c="dimmed">Доставка</Text>
                      <Text fw={600} c="orange">45-90 мин</Text>
                    </Stack>
                  </Group>
                </Group>
                <Text size="sm" c="dimmed" mt="md">
                  ❌ Высокие цены ❌ Долгая доставка ✅ Известный бренд
                </Text>
              </Card>

              <Card shadow="sm" radius="md" withBorder p="lg">
                <Group justify="space-between" align="center">
                  <Group>
                    <Badge size="lg" color="gray" variant="filled">🥉 3 место</Badge>
                    <Box>
                      <Title order={4} c="gray.7">Pizza Time</Title>
                      <Group gap="xs" mt="xs">
                        {[1,2,3].map(i => <IconStars key={i} size={16} color="orange" />)}
                        <IconStars size={16} color="gray" />
                        <IconStars size={16} color="gray" />
                        <Text fw={600}>3.8/5</Text>
                      </Group>
                    </Box>
                  </Group>
                  <Group>
                    <Stack gap="xs" align="center">
                      <Text size="sm" c="dimmed">Цена пиццы</Text>
                      <Text fw={600} c="orange">от 420₽</Text>
                    </Stack>
                    <Stack gap="xs" align="center">
                      <Text size="sm" c="dimmed">Доставка</Text>
                      <Text fw={600} c="red">60-120 мин</Text>
                    </Stack>
                  </Group>
                </Group>
                <Text size="sm" c="dimmed" mt="md">
                  ❌ Очень долгая доставка ❌ Средний вкус ✅ Средние цены
                </Text>
              </Card>
            </Stack>
          </Box>

          {/* Критерии выбора пиццерии */}
          <Box>
            <Title order={2} c="dark" mb="md">📋 Как выбрать пиццерию? Критерии оценки</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="md">
                    <Title order={4} c="green.7">✅ На что обращать внимание:</Title>
                    <List spacing="sm" size="sm">
                      <List.Item icon={<IconCheck size={16} color="green" />}>
                        <strong>Качество ингредиентов</strong> - свежесть продуктов
                      </List.Item>
                      <List.Item icon={<IconCheck size={16} color="green" />}>
                        <strong>Скорость доставки</strong> - не более 60 минут
                      </List.Item>
                      <List.Item icon={<IconCheck size={16} color="green" />}>
                        <strong>Соотношение цена/качество</strong> - разумные цены
                      </List.Item>
                      <List.Item icon={<IconCheck size={16} color="green" />}>
                        <strong>Отзывы клиентов</strong> - реальные мнения
                      </List.Item>
                      <List.Item icon={<IconCheck size={16} color="green" />}>
                        <strong>Разнообразие меню</strong> - выбор для всех
                      </List.Item>
                    </List>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="md">
                    <Title order={4} c="red.7">❌ Чего следует избегать:</Title>
                    <List spacing="sm" size="sm">
                      <List.Item icon={<IconX size={16} color="red" />}>
                        <strong>Завышенные цены</strong> - переплата за бренд
                      </List.Item>
                      <List.Item icon={<IconX size={16} color="red" />}>
                        <strong>Долгая доставка</strong> - более 90 минут
                      </List.Item>
                      <List.Item icon={<IconX size={16} color="red" />}>
                        <strong>Плохие отзывы</strong> - жалобы на качество
                      </List.Item>
                      <List.Item icon={<IconX size={16} color="red" />}>
                        <strong>Холодная пицца</strong> - плохая упаковка
                      </List.Item>
                      <List.Item icon={<IconX size={16} color="red" />}>
                        <strong>Скрытые доплаты</strong> - неожиданные расходы
                      </List.Item>
                    </List>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Почему ДИМБО - лучший выбор */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="green.0">
            <Title order={2} c="dark" mb="md">🏆 Почему ДИМБО Пицца - лучший выбор в Волжске?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="md">
                  <Group>
                    <IconStars size={32} color="orange" />
                    <Box>
                      <Title order={4}>Высочайшее качество</Title>
                      <Text size="sm" c="dimmed">Итальянская мука, натуральная моцарелла, свежие ингредиенты</Text>
                    </Box>
                  </Group>
                  
                  <Group>
                    <IconTruck size={32} color="blue" />
                    <Box>
                      <Title order={4}>Быстрая доставка</Title>
                      <Text size="sm" c="dimmed">30-60 минут по всему Волжску, горячая пицца гарантирована</Text>
                    </Box>
                  </Group>

                  <Group>
                    <IconCheck size={32} color="green" />
                    <Box>
                      <Title order={4}>Честные цены</Title>
                      <Text size="sm" c="dimmed">От 380₽ за пиццу, без скрытых доплат и переплат</Text>
                    </Box>
                  </Group>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <ProductCardImage
                  src="https://api.dimbopizza.ru/images/dimbo-advantages.jpg"
                  alt="Преимущества ДИМБО Пицца - вкуснейшая пиццерия Волжска"
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* FAQ - Часто задаваемые вопросы */}
          <Box>
            <Title order={2} c="dark" mb="md">❓ Часто задаваемые вопросы о заказе пиццы</Title>
            <Accordion variant="separated" radius="md">
              <Accordion.Item value="best-pizzeria">
                <Accordion.Control>Какая пиццерия лучшая в Волжске?</Accordion.Control>
                <Accordion.Panel>
                  <Text>
                    По отзывам клиентов и рейтингам, ДИМБО Пицца признана вкуснейшей пиццерией Волжска в 2024 году. 
                    Мы лидируем по качеству, скорости доставки и соотношению цена/качество.
                  </Text>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="delivery-time">
                <Accordion.Control>Как быстро доставляют пиццу в Волжске?</Accordion.Control>
                <Accordion.Panel>
                  <Text>
                    ДИМБО Пицца доставляет за 30-60 минут, Додо Пицца - 45-90 минут, Pizza Time - 60-120 минут. 
                    Мы самые быстрые в городе!
                  </Text>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="prices">
                <Accordion.Control>Где самые низкие цены на пиццу?</Accordion.Control>
                <Accordion.Panel>
                  <Text>
                    ДИМБО Пицца предлагает лучшие цены: от 380₽ за пиццу. Это на 30-40% дешевле, чем в Додо Пицца, 
                    при том же или лучшем качестве.
                  </Text>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="quality">
                <Accordion.Control>Как проверить качество пиццерии?</Accordion.Control>
                <Accordion.Panel>
                  <Text>
                    Читайте отзывы, проверяйте рейтинги, обращайте внимание на ингредиенты. ДИМБО Пицца имеет 
                    рейтинг 4.9/5 и использует только качественные продукты.
                  </Text>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Box>

          {/* Сравнительная таблица */}
          <Box>
            <Title order={2} c="dark" mb="md">📊 Сравнение пиццерий Волжска</Title>
            <Card shadow="sm" radius="md" withBorder p="md">
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e9ecef' }}>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Критерий</th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#fd7e14' }}>ДИМБО Пицца</th>
                      <th style={{ padding: '12px', textAlign: 'center' }}>Додо Пицца</th>
                      <th style={{ padding: '12px', textAlign: 'center' }}>Pizza Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '12px' }}>Минимальная цена</td>
                      <td style={{ padding: '12px', textAlign: 'center', color: '#51cf66' }}>380₽</td>
                      <td style={{ padding: '12px', textAlign: 'center', color: '#ff6b6b' }}>550₽</td>
                      <td style={{ padding: '12px', textAlign: 'center', color: '#ffd43b' }}>420₽</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '12px' }}>Время доставки</td>
                      <td style={{ padding: '12px', textAlign: 'center', color: '#51cf66' }}>30-60 мин</td>
                      <td style={{ padding: '12px', textAlign: 'center', color: '#ffd43b' }}>45-90 мин</td>
                      <td style={{ padding: '12px', textAlign: 'center', color: '#ff6b6b' }}>60-120 мин</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '12px' }}>Рейтинг клиентов</td>
                      <td style={{ padding: '12px', textAlign: 'center', color: '#51cf66' }}>4.9/5</td>
                      <td style={{ padding: '12px', textAlign: 'center', color: '#ffd43b' }}>4.2/5</td>
                      <td style={{ padding: '12px', textAlign: 'center', color: '#ff6b6b' }}>3.8/5</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px' }}>Бесплатная доставка</td>
                      <td style={{ padding: '12px', textAlign: 'center', color: '#51cf66' }}>от 800₽</td>
                      <td style={{ padding: '12px', textAlign: 'center', color: '#ff6b6b' }}>от 1200₽</td>
                      <td style={{ padding: '12px', textAlign: 'center', color: '#ffd43b' }}>от 1000₽</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </Box>

          {/* Контакты и заказ */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="violet.0">
            <Group justify="space-between" align="center">
              <Box>
                <Title order={2} c="violet.7">🍕 Заказать в лучшей пиццерии Волжска!</Title>
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
                    <IconStars size={20} />
                    <Text size="lg">Рейтинг 4.9/5 ⭐</Text>
                  </Group>
                </Group>
              </Box>
              <Button 
                size="xl" 
                color="violet"
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
            <Title order={3} c="dark" mb="md">Где заказать пиццу в Волжске - полный гид</Title>
            <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
              Если вы задаетесь вопросом <strong>"где заказать пиццу"</strong> в Волжске, то этот гид поможет вам 
              сделать правильный выбор. В нашем городе работает несколько пиццерий, но не все из них одинаково 
              хороши. ДИМБО Пицца заслуженно занимает первое место в рейтинге пиццерий Волжска благодаря 
              высокому качеству, быстрой доставке и честным ценам.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              Когда вы выбираете, <strong>где заказать пиццу в Волжске</strong>, важно учитывать несколько факторов: 
              качество ингредиентов, скорость доставки, цены и отзывы клиентов. ДИМБО Пицца превосходит конкурентов 
              по всем этим критериям. Мы используем итальянскую муку, натуральную моцареллу и свежие ингредиенты, 
              доставляем пиццу за 30-60 минут и предлагаем цены от 380₽.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              Наш рейтинг 4.9/5 звезд основан на реальных отзывах клиентов, которые ценят нас за качество и сервис. 
              Если вы все еще сомневаетесь, <strong>где лучше заказать пиццу</strong>, попробуйте ДИМБО Пицца - 
              мы уверены, что станем вашей любимой пиццерией в Волжске!
            </Text>
          </Box>
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
