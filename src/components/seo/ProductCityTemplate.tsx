import { Container, Stack, Title, Text, Card, Group, Badge, Button } from '@mantine/core'
import { IconPhone, IconChevronRight } from '@tabler/icons-react'
import { SEOPageWrapper } from '../SEOHead'
import { SchemaMarkup } from './SchemaMarkup'
import { LocalInfo } from './LocalInfo'
import { YandexReviewsWidget } from '../common/YandexReviewsWidget'
import { RelatedProducts } from './RelatedProducts'
import { ProductCardImage } from '../common/OptimizedImage'
import { generateBreadcrumbSchema } from '../../utils/schemaOrg'

interface ProductCityConfig {
  product: {
    id: number
    name: string
    price: number
    imageUrl: string
  }
  city: string
  slug: string
  title: string
  description: string
  keywords: string
  h1: string
  category: string
  deliveryFrom: string
}

interface ProductCityTemplateProps {
  config: ProductCityConfig
}

export function ProductCityTemplate({ config }: ProductCityTemplateProps) {
  const { product, city, slug, title, description, keywords, h1, category, deliveryFrom } = config

  const isZelenodolsk = city === 'Зеленодольск'
  const cityGenitive = isZelenodolsk ? 'Зеленодольска' : 'Волжска'
  const deliveryText = isZelenodolsk ? 'Доставка из Волжска в Зеленодольск за 60-90 минут' : 'Доставка по Волжску за 30-60 минут'

  return (
    <SEOPageWrapper
      page={slug}
      title={title}
      description={description}
      keywords={keywords}
    >
      <SchemaMarkup
        pageType={category as any}
        includeFAQ={false}
        customSchema={[
          generateBreadcrumbSchema([
            { name: 'Главная', url: 'https://dimbopizza.ru' },
            { name: h1, url: `https://dimbopizza.ru/${slug}` },
          ]),
        ]}
      />

      <Container size="sm" py="xl">
        <Stack gap="lg">
          {/* Hero */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="md">
              <Badge color="orange" size="lg" variant="filled">
                {deliveryFrom}
              </Badge>
              <Badge color="blue" size="lg" variant="light">
                {city}
              </Badge>
            </Group>

            <Title order={1} size="h2" mb="sm">{h1}</Title>
            <Text c="dimmed" size="lg" mb="md">{deliveryText}</Text>

            <Group align="flex-start" gap="md" mb="lg">
              <ProductCardImage src={product.imageUrl} alt={product.name} />
              <Stack gap="xs">
                <Text fw={700} size="lg">{product.name}</Text>
                <Badge color="orange" size="lg" variant="filled">
                  от {product.price} ₽
                </Badge>
              </Stack>
            </Group>

            <Group>
              <Button
                component="a"
                href="tel:+79021053434"
                leftSection={<IconPhone size={16} />}
                size="lg"
                color="orange"
              >
                +7(902)105-34-34
              </Button>
              <Button
                component="a"
                href="https://max.ru/id121603899498_bot"
                target="_blank"
                variant="light"
                rightSection={<IconChevronRight size={16} />}
                size="lg"
              >
                Перейти в меню
              </Button>
            </Group>
          </Card>

          {/* Описание */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={2} size="h3" mb="md">
              {product.name} с доставкой в {cityGenitive}
            </Title>
            <Text mb="md">
              {isZelenodolsk
                ? `Закажите ${product.name.toLowerCase()} с доставкой из Волжска в Зеленодольск. Готовим из свежих ингредиентов, доставляем горячим в термоупаковке.`
                : `Закажите ${product.name.toLowerCase()} с быстрой доставкой по Волжску. Готовим из свежих ингредиентов на заказ.`
              }
            </Text>
            <Text c="dimmed" size="sm">
              Бесплатная доставка при заказе от {isZelenodolsk ? '1200' : '800'} ₽.{' '}
              Время доставки: {isZelenodolsk ? '60-90' : '30-60'} минут.{' '}
              Режим работы: ежедневно с 10:00 до 20:00.
            </Text>
          </Card>

          {/* Преимущества */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={2} size="h3" mb="md">Почему выбирают нас</Title>
            <Stack gap="sm">
              {[
                'Свежие ингредиенты — готовим на заказ',
                'Горячая доставка в термоупаковке',
                'Награда «Хорошее место 2026» от Яндекса',
                'Рейтинг 4.8 из 5 на Яндекс Картах',
                isZelenodolsk ? 'Доставка из Волжска в Зеленодольск' : 'Быстрая доставка по Волжску',
              ].map((advantage, i) => (
                <Group key={i} gap="sm">
                  <Badge color="orange" variant="filled" circle>✓</Badge>
                  <Text>{advantage}</Text>
                </Group>
              ))}
            </Stack>
          </Card>

          {/* Похожие категории */}
          <RelatedProducts currentProduct={category} variant="full" />

          {/* Контакты */}
          <LocalInfo variant="compact" />
          <YandexReviewsWidget />
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
