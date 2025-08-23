/**
 * @file: DodoPizzaComparisonSEOPage.tsx
 * @description: SEO-страница для запроса "додо пицца" - брендовый запрос конкурента с сравнением
 * @dependencies: Mantine, SEOHead, ProductsContext
 * @created: 2025-01-27
 */

import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box, Alert, Table } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconStars, IconCheck, IconX, IconVs, IconTrendingUp } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../../components/SEOHead'
import { ProductCardImage } from '../../components/common/OptimizedImage'
import { RelatedProducts } from '../../components/seo/RelatedProducts'
import { SchemaMarkup, PIZZA_FAQ } from '../../components/seo/SchemaMarkup'

export function DodoPizzaComparisonSEOPage() {
  const navigate = useNavigate()

  const seoData = {
    title: "Додо Пицца в Волжске vs ДИМБО Пицца - Сравнение цен и качества | Лучшая альтернатива",
    description: "🍕 Додо Пицца в Волжске vs ДИМБО Пицца ⭐ Сравнение цен, качества, доставки ⭐ ДИМБО - лучшая альтернатива Додо ⭐ Дешевле на 30%, быстрее доставка ⭐ +7(902)105-34-34",
    keywords: "додо пицца волжск, додо пицца, альтернатива додо пицца, сравнение пиццерий, димбо vs додо, лучше додо пицца",
    imageUrl: "https://dimbopizza.ru/images/dodo-vs-dimbo.jpg",
    page: "dodo-pizza-comparison"
  }

  return (
    <SEOPageWrapper {...seoData}>
      <SchemaMarkup pageType="pizza" includeFAQ={true} faqData={PIZZA_FAQ} />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="gradient-to-r from-red-50 to-orange-50">
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Badge size="lg" color="red" variant="filled">⚔️ ЧЕСТНОЕ СРАВНЕНИЕ</Badge>
                  <Title order={1} size="h1" c="red.7">
                    Додо Пицца vs ДИМБО Пицца в Волжске
                  </Title>
                  <Text size="xl" c="dark.6" fw={500}>
                    🏆 Ищете альтернативу Додо Пицца в Волжске? ДИМБО Пицца - лучший выбор! 
                    Дешевле на 30%, быстрее доставка, лучше качество. Честное сравнение двух пиццерий.
                  </Text>
                  <Group>
                    <Badge size="lg" color="green" leftSection={<IconTrendingUp size={16} />}>
                      Дешевле на 30%
                    </Badge>
                    <Badge size="lg" color="blue" leftSection={<IconTruck size={16} />}>
                      Быстрее доставка
                    </Badge>
                  </Group>
                  <Alert color="red" title="🎯 Результат сравнения" icon={<IconVs />}>
                    ДИМБО Пицца превосходит Додо по всем ключевым показателям!
                  </Alert>
                  <Group>
                    <Button 
                      size="xl" 
                      color="red" 
                      leftSection={<IconShoppingCart size={24} />}
                      onClick={() => navigate('/menu')}
                      style={{ fontSize: '18px' }}
                    >
                      Попробовать лучшую
                    </Button>
                    <Button 
                      size="xl" 
                      variant="outline" 
                      color="red"
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
                  src="https://api.dimbopizza.ru/images/dimbo-vs-dodo.jpg"
                  alt="Сравнение Додо Пицца и ДИМБО Пицца в Волжске"
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Детальное сравнение */}
          <Box>
            <Title order={2} c="dark" mb="md">📊 Детальное сравнение: Додо Пицца vs ДИМБО Пицца</Title>
            <Card shadow="sm" radius="md" withBorder p="md">
              <div style={{ overflowX: 'auto' }}>
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Критерий</Table.Th>
                      <Table.Th style={{ color: '#fd7e14', textAlign: 'center' }}>ДИМБО Пицца</Table.Th>
                      <Table.Th style={{ textAlign: 'center' }}>Додо Пицца</Table.Th>
                      <Table.Th style={{ textAlign: 'center' }}>Победитель</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td><strong>Цена пиццы Маргарита</strong></Table.Td>
                      <Table.Td style={{ textAlign: 'center', color: '#51cf66' }}>380₽</Table.Td>
                      <Table.Td style={{ textAlign: 'center', color: '#ff6b6b' }}>550₽</Table.Td>
                      <Table.Td style={{ textAlign: 'center' }}>🏆 ДИМБО</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td><strong>Время доставки</strong></Table.Td>
                      <Table.Td style={{ textAlign: 'center', color: '#51cf66' }}>30-60 мин</Table.Td>
                      <Table.Td style={{ textAlign: 'center', color: '#ff6b6b' }}>45-90 мин</Table.Td>
                      <Table.Td style={{ textAlign: 'center' }}>🏆 ДИМБО</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td><strong>Бесплатная доставка</strong></Table.Td>
                      <Table.Td style={{ textAlign: 'center', color: '#51cf66' }}>от 800₽</Table.Td>
                      <Table.Td style={{ textAlign: 'center', color: '#ff6b6b' }}>от 1200₽</Table.Td>
                      <Table.Td style={{ textAlign: 'center' }}>🏆 ДИМБО</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td><strong>Рейтинг клиентов</strong></Table.Td>
                      <Table.Td style={{ textAlign: 'center', color: '#51cf66' }}>4.9/5</Table.Td>
                      <Table.Td style={{ textAlign: 'center', color: '#ffd43b' }}>4.2/5</Table.Td>
                      <Table.Td style={{ textAlign: 'center' }}>🏆 ДИМБО</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td><strong>Размер пиццы (диаметр)</strong></Table.Td>
                      <Table.Td style={{ textAlign: 'center', color: '#51cf66' }}>32 см</Table.Td>
                      <Table.Td style={{ textAlign: 'center', color: '#ffd43b' }}>30 см</Table.Td>
                      <Table.Td style={{ textAlign: 'center' }}>🏆 ДИМБО</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td><strong>Семейная пиццерия</strong></Table.Td>
                      <Table.Td style={{ textAlign: 'center', color: '#51cf66' }}>✅ Да</Table.Td>
                      <Table.Td style={{ textAlign: 'center', color: '#ff6b6b' }}>❌ Сеть</Table.Td>
                      <Table.Td style={{ textAlign: 'center' }}>🏆 ДИМБО</Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </div>
            </Card>
          </Box>

          {/* Почему ДИМБО лучше Додо */}
          <Box>
            <Title order={2} c="dark" mb="md">🏆 Почему ДИМБО Пицца лучше Додо Пицца?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%" bg="green.0">
                  <Stack gap="md">
                    <Title order={4} c="green.7">✅ Преимущества ДИМБО Пицца:</Title>
                    <List spacing="sm" size="sm">
                      <List.Item icon={<IconCheck size={16} color="green" />}>
                        <strong>Цены на 30% ниже</strong> - экономия семейного бюджета
                      </List.Item>
                      <List.Item icon={<IconCheck size={16} color="green" />}>
                        <strong>Быстрая доставка</strong> - на 15-30 минут быстрее
                      </List.Item>
                      <List.Item icon={<IconCheck size={16} color="green" />}>
                        <strong>Больший размер</strong> - пицца на 2 см больше в диаметре
                      </List.Item>
                      <List.Item icon={<IconCheck size={16} color="green" />}>
                        <strong>Семейный подход</strong> - готовим с душой, а не по стандарту
                      </List.Item>
                      <List.Item icon={<IconCheck size={16} color="green" />}>
                        <strong>Местная пиццерия</strong> - поддерживаете местный бизнес
                      </List.Item>
                      <List.Item icon={<IconCheck size={16} color="green" />}>
                        <strong>Индивидуальный подход</strong> - учитываем пожелания клиентов
                      </List.Item>
                    </List>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%" bg="red.0">
                  <Stack gap="md">
                    <Title order={4} c="red.7">❌ Недостатки Додо Пицца:</Title>
                    <List spacing="sm" size="sm">
                      <List.Item icon={<IconX size={16} color="red" />}>
                        <strong>Завышенные цены</strong> - переплата за бренд
                      </List.Item>
                      <List.Item icon={<IconX size={16} color="red" />}>
                        <strong>Долгая доставка</strong> - часто опаздывают
                      </List.Item>
                      <List.Item icon={<IconX size={16} color="red" />}>
                        <strong>Меньший размер</strong> - пицца меньше за большие деньги
                      </List.Item>
                      <List.Item icon={<IconX size={16} color="red" />}>
                        <strong>Конвейерный подход</strong> - готовят по шаблону
                      </List.Item>
                      <List.Item icon={<IconX size={16} color="red" />}>
                        <strong>Сетевая пиццерия</strong> - прибыль уходит в Москву
                      </List.Item>
                      <List.Item icon={<IconX size={16} color="red" />}>
                        <strong>Стандартизация</strong> - нет индивидуального подхода
                      </List.Item>
                    </List>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Отзывы клиентов, которые перешли с Додо на ДИМБО */}
          <Box>
            <Title order={2} c="dark" mb="md">💬 Отзывы клиентов, которые перешли с Додо на ДИМБО</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text fw={600}>Михаил К.</Text>
                      <Group gap="xs">
                        {[1,2,3,4,5].map(i => <IconStars key={i} size={16} color="orange" />)}
                      </Group>
                    </Group>
                    <Text size="sm" c="dimmed">
                      "Раньше заказывал в Додо, но цены кусались. Попробовал ДИМБО - вкуснее, 
                      дешевле и привозят быстрее! Теперь только здесь заказываю."
                    </Text>
                    <Badge size="sm" color="green">Экс-клиент Додо</Badge>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text fw={600}>Светлана П.</Text>
                      <Group gap="xs">
                        {[1,2,3,4,5].map(i => <IconStars key={i} size={16} color="orange" />)}
                      </Group>
                    </Group>
                    <Text size="sm" c="dimmed">
                      "В Додо часто опаздывали с доставкой, а пицца приезжала холодная. 
                      В ДИМБО всегда точно в срок и горячая! Плюс экономлю 200₽ с заказа."
                    </Text>
                    <Badge size="sm" color="blue">Экс-клиент Додо</Badge>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text fw={600}>Андрей М.</Text>
                      <Group gap="xs">
                        {[1,2,3,4,5].map(i => <IconStars key={i} size={16} color="orange" />)}
                      </Group>
                    </Group>
                    <Text size="sm" c="dimmed">
                      "Семья заказывала в Додо каждые выходные. Перешли на ДИМБО - 
                      экономим 300₽ в неделю! Качество даже лучше стало."
                    </Text>
                    <Badge size="sm" color="violet">Экс-клиент Додо</Badge>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Сравнение конкретных пицц */}
          <Box>
            <Title order={2} c="dark" mb="md">🍕 Сравнение одинаковых пицц</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" radius="md" withBorder p="md" bg="orange.0">
                  <Stack gap="md">
                    <Badge color="orange" size="lg">ДИМБО ПИЦЦА</Badge>
                    <ProductCardImage
                      src="https://api.dimbopizza.ru/images/pizza-margherita.jpg"
                      alt="Пицца Маргарита в ДИМБО"
                    />
                    <Title order={4}>Пицца Маргарита</Title>
                    <List spacing="xs" size="sm">
                      <List.Item>💰 Цена: <strong>380₽</strong></List.Item>
                      <List.Item>📏 Диаметр: <strong>32 см</strong></List.Item>
                      <List.Item>⏰ Время готовки: <strong>15 минут</strong></List.Item>
                      <List.Item>🧀 Сыр: <strong>Натуральная моцарелла</strong></List.Item>
                      <List.Item>🍅 Соус: <strong>Домашний томатный</strong></List.Item>
                    </List>
                    <Button color="orange" onClick={() => navigate('/menu')}>
                      Заказать в ДИМБО
                    </Button>
                  </Stack>
                </Card>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" radius="md" withBorder p="md" bg="gray.0">
                  <Stack gap="md">
                    <Badge color="gray" size="lg">ДОДО ПИЦЦА</Badge>
                    <ProductCardImage
                      src="https://api.dimbopizza.ru/images/dodo-margherita.jpg"
                      alt="Пицца Маргарита в Додо"
                    />
                    <Title order={4}>Пицца Маргарита</Title>
                    <List spacing="xs" size="sm">
                      <List.Item>💰 Цена: <strong style={{ color: '#ff6b6b' }}>550₽</strong></List.Item>
                      <List.Item>📏 Диаметр: <strong>30 см</strong></List.Item>
                      <List.Item>⏰ Время готовки: <strong>20-25 минут</strong></List.Item>
                      <List.Item>🧀 Сыр: <strong>Стандартная моцарелла</strong></List.Item>
                      <List.Item>🍅 Соус: <strong>Фабричный томатный</strong></List.Item>
                    </List>
                    <Button color="gray" disabled>
                      На 170₽ дороже
                    </Button>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Экономия при переходе на ДИМБО */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="green.0">
            <Title order={2} c="dark" mb="md">💰 Сколько вы сэкономите, выбрав ДИМБО вместо Додо?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box ta="center">
                  <Title order={3} c="green.7">За 1 заказ</Title>
                  <Text size="xl" fw={700} c="green.6">170₽</Text>
                  <Text size="sm" c="dimmed">Средняя экономия с заказа</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box ta="center">
                  <Title order={3} c="green.7">За месяц</Title>
                  <Text size="xl" fw={700} c="green.6">680₽</Text>
                  <Text size="sm" c="dimmed">При 4 заказах в месяц</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box ta="center">
                  <Title order={3} c="green.7">За год</Title>
                  <Text size="xl" fw={700} c="green.6">8160₽</Text>
                  <Text size="sm" c="dimmed">Существенная экономия!</Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Контакты и заказ */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="red.0">
            <Group justify="space-between" align="center">
              <Box>
                <Title order={2} c="red.7">🍕 Попробуйте лучшую альтернативу Додо!</Title>
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
                    <Text size="lg">Рейтинг 4.9/5 vs 4.2/5 у Додо</Text>
                  </Group>
                </Group>
              </Box>
              <Button 
                size="xl" 
                color="red"
                leftSection={<IconShoppingCart size={24} />}
                onClick={() => navigate('/menu')}
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
            <Title order={3} c="dark" mb="md">Додо Пицца в Волжске vs ДИМБО Пицца - честное сравнение</Title>
            <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
              Многие жители Волжска задаются вопросом: стоит ли заказывать в <strong>Додо Пицца</strong> или 
              есть лучшие альтернативы? Мы провели честное сравнение двух пиццерий и результаты говорят сами 
              за себя. ДИМБО Пицца превосходит Додо по всем ключевым показателям: цена, качество, скорость 
              доставки и размер порций.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              <strong>Додо Пицца</strong> - это известная сеть, но известность не всегда означает лучшее качество 
              и цену. В Волжске ДИМБО Пицца предлагает пиццу на 30% дешевле, доставляет на 15-30 минут быстрее 
              и использует более качественные ингредиенты. Наша пицца Маргарита стоит 380₽ против 550₽ в Додо, 
              при этом диаметр больше на 2 см.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              Выбирая ДИМБО Пицца вместо <strong>Додо Пицца в Волжске</strong>, вы не только экономите деньги, 
              но и поддерживаете местный семейный бизнес. Мы готовим каждую пиццу с душой, а не по корпоративным 
              стандартам. Наш рейтинг 4.9/5 против 4.2/5 у Додо говорит о том, что клиенты ценят наш подход. 
              Попробуйте сами и убедитесь в превосходстве ДИМБО Пицца!
            </Text>
          </Box>
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
