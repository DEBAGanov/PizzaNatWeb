/**
 * @file: CityDeliverySEOTemplate.tsx
 * @description: Шаблон SEO-страницы доставки для любого города
 */

import React from 'react'
import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconStars } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../SEOHead'
import { ProductCardImage } from '../common/OptimizedImage'
import { RelatedProducts } from './RelatedProducts'
import { SchemaMarkup, PIZZA_FAQ, SUSHI_FAQ, SHASHLYK_FAQ, FOOD_FAQ } from './SchemaMarkup'
import { YandexReviewsWidget } from '../common/YandexReviewsWidget'
import type { DeliveryPageConfig } from '../../data/zelenodolskDeliveryData'

interface CityDeliverySEOTemplateProps {
  config: DeliveryPageConfig
  city: string
  fromCity: string
  fromCityAddress: string
  phone: string
  phoneHref: string
  deliveryTime: string
  freeDeliveryFrom: number
}

const FAQ_MAP: Record<string, Array<{ question: string; answer: string }>> = {
  pizza: PIZZA_FAQ,
  sushi: SUSHI_FAQ,
  shashlyk: SHASHLYK_FAQ,
  food: FOOD_FAQ,
}

export const CityDeliverySEOTemplate: React.FC<CityDeliverySEOTemplateProps> = ({
  config,
  city,
  fromCity,
  fromCityAddress,
  phone,
  phoneHref,
  deliveryTime,
  freeDeliveryFrom,
}) => {
  const navigate = useNavigate()

  const faqData = FAQ_MAP[config.category]

  return (
    <SEOPageWrapper
      title={config.title}
      description={config.description}
      keywords={config.keywords}
    >
      <SchemaMarkup
        pageType={config.category === 'burger' ? 'burgers' : config.category}
        includeFAQ={!!faqData}
        faqData={faqData}
      />

      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="orange.0">
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Title order={1} size="h1" c="orange.7">
                    {config.h1}
                  </Title>
                  <Text size="xl" c="dark.6">
                    {config.h1Subtext}
                  </Text>
                  <Group>
                    <Badge size="lg" color="green">Бесплатная доставка от {freeDeliveryFrom}₽</Badge>
                    <Badge size="lg" color="blue">Работаем до 20:00</Badge>
                  </Group>
                  <Group>
                    <Button
                      size="lg"
                      color="orange"
                      leftSection={<IconShoppingCart size={20} />}
                      onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}
                    >
                      Заказать сейчас
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      color="orange"
                      leftSection={<IconPhone size={20} />}
                      component="a"
                      href={`tel:${phoneHref}`}
                    >
                      {phone}
                    </Button>
                  </Group>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <ProductCardImage
                  src={config.products[0]?.image}
                  alt={`${config.h1} - ДИМБО Пицца`}
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Популярные блюда */}
          {config.products.length > 0 && (
            <Box>
              <Title order={2} c="dark" mb="md">{config.productsTitle}</Title>
              <Grid>
                {config.products.map((product, idx) => (
                  <Grid.Col key={idx} span={{ base: 12, sm: 6, md: 4 }}>
                    <Card shadow="sm" radius="md" withBorder>
                      <ProductCardImage
                        src={product.image}
                        alt={`${product.name} - заказать с доставкой в ${city}`}
                        style={{ height: '200px' }}
                      />
                      <Stack mt="md" gap="xs">
                        <Title order={4}>{product.name}</Title>
                        <Text size="sm" c="dimmed">{product.description}</Text>
                        <Group justify="space-between" align="center">
                          <Text size="lg" fw={700} c="orange">{product.price} ₽</Text>
                          <Button size="sm" color="orange" onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}>Заказать</Button>
                        </Group>
                      </Stack>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </Box>
          )}

          {/* Как заказать */}
          <Card shadow="sm" radius="md" withBorder p="xl">
            <Title order={2} c="dark" mb="md">Как заказать с доставкой в {city}?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <List spacing="md" size="lg">
                  <List.Item icon={<IconShoppingCart size={24} color="orange" />}>
                    <strong>Выберите блюдо</strong> в нашем меню — у нас большой выбор вкусной еды
                  </List.Item>
                  <List.Item icon={<IconMapPin size={24} color="orange" />}>
                    <strong>Укажите адрес доставки</strong> в {city} — доставляем из {fromCity}
                  </List.Item>
                  <List.Item icon={<IconPhone size={24} color="orange" />}>
                    <strong>Подтвердите заказ</strong> по телефону {phone}
                  </List.Item>
                  <List.Item icon={<IconTruck size={24} color="orange" />}>
                    <strong>Получите горячее блюдо</strong> через {deliveryTime} прямо к двери
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card bg="orange.1" p="md">
                  <Stack gap="xs" align="center">
                    <IconClock size={40} color="orange" />
                    <Title order={4} c="orange.7">Доставка из {fromCity}</Title>
                    <Text ta="center" size="sm">Доставка в {city} за {deliveryTime}</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Преимущества */}
          <Box>
            <Title order={2} c="dark" mb="md">Почему заказывают у нас?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconTruck size={48} color="orange" />
                    <Title order={4} ta="center">Доставка из {fromCity}</Title>
                    <Text ta="center" size="sm">Бережная доставка в {city} за {deliveryTime} в термосумках</Text>
                  </Stack>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconStars size={48} color="green" />
                    <Title order={4} ta="center">Качество ингредиентов</Title>
                    <Text ta="center" size="sm">Свежие продукты, натуральные ингредиенты, итальянские рецепты</Text>
                  </Stack>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconMapPin size={48} color="blue" />
                    <Title order={4} ta="center">Доставка по всему {city}</Title>
                    <Text ta="center" size="sm">Доставляем в любую точку {city}. Бесплатная доставка от {freeDeliveryFrom}₽</Text>
                  </Stack>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" radius="md" withBorder p="md" h="100%">
                  <Stack align="center" gap="md">
                    <IconPhone size={48} color="violet" />
                    <Title order={4} ta="center">Удобная оплата</Title>
                    <Text ta="center" size="sm">Наличные, банковская карта или СБП — выбирайте как удобно</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Зоны доставки */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="blue.0">
            <Title order={2} c="dark" mb="md">Доставка из {fromCity} в {city}</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="green.7" mb="sm">Центр {city}</Title>
                  <Text size="sm" mb="xs">Бесплатная доставка от {freeDeliveryFrom}₽</Text>
                  <Text size="sm" c="green.6" fw={600}>Время: {deliveryTime}</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="blue.7" mb="sm">Спальные районы</Title>
                  <Text size="sm" mb="xs">Бесплатная доставка от {freeDeliveryFrom + 200}₽</Text>
                  <Text size="sm" c="blue.6" fw={600}>Время: {deliveryTime}</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box>
                  <Title order={4} c="violet.7" mb="sm">Окраины города</Title>
                  <Text size="sm" mb="xs">Бесплатная доставка от {freeDeliveryFrom + 400}₽</Text>
                  <Text size="sm" c="violet.6" fw={600}>Время: до 90 мин</Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Контакты */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="orange.0">
            <Group justify="space-between" align="center" wrap="wrap">
              <Box>
                <Title order={2} c="orange.7">Заказать сейчас!</Title>
                <Group mt="md" wrap="wrap">
                  <Group gap="xs">
                    <IconPhone size={20} />
                    <Text size="lg" fw={600}>{phone}</Text>
                  </Group>
                  <Group gap="xs">
                    <IconMapPin size={20} />
                    <Text size="lg">Доставка из {fromCityAddress}</Text>
                  </Group>
                  <Group gap="xs">
                    <IconClock size={20} />
                    <Text size="lg">Ежедневно 10:00–20:00</Text>
                  </Group>
                </Group>
              </Box>
              <Button
                size="xl"
                color="orange"
                leftSection={<IconShoppingCart size={24} />}
                onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}
              >
                Перейти в меню
              </Button>
            </Group>
          </Card>

          {/* Связанные продукты */}
          <RelatedProducts currentProduct={config.relatedKey} />

          {/* SEO текст */}
          <Box>
            <Divider my="xl" />
            <Title order={3} c="dark" mb="md">{config.seoTitle}</Title>
            <Text size="md" c="dark.6" dangerouslySetInnerHTML={{ __html: config.seoText1 }} style={{ lineHeight: 1.6 }} />
            <Text size="md" c="dark.6" mt="md" dangerouslySetInnerHTML={{ __html: config.seoText2 }} style={{ lineHeight: 1.6 }} />
            <Text size="md" c="dark.6" mt="md" dangerouslySetInnerHTML={{ __html: config.seoText3 }} style={{ lineHeight: 1.6 }} />
          </Box>
        </Stack>

        <YandexReviewsWidget />
      </Container>
    </SEOPageWrapper>
  )
}
