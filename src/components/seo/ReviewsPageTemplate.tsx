import { Container, Stack, Title, Text, Card, Badge, Group, Progress, Button, Image } from '@mantine/core'
import { IconPhone, IconStar, IconStarFilled, IconExternalLink, IconTrophy, IconMessageCircle } from '@tabler/icons-react'
import { SEOPageWrapper } from '../SEOHead'
import { SchemaMarkup } from './SchemaMarkup'
import { LocalInfo } from './LocalInfo'
import { YandexReviewsWidget } from '../common/YandexReviewsWidget'
import { generateBreadcrumbSchema } from '../../utils/schemaOrg'

export interface ReviewsPageConfig {
  slug: string
  city: string
  title: string
  description: string
  keywords: string
  h1: string
  rating: number
  reviewCount: number
  awardBadge: boolean
}

interface ReviewsPageTemplateProps {
  config: ReviewsPageConfig
}

const RATING_BARS = [
  { stars: 5, percent: 75, count: '95' },
  { stars: 4, percent: 15, count: '19' },
  { stars: 3, percent: 7, count: '9' },
  { stars: 2, percent: 2, count: '3' },
  { stars: 1, percent: 1, count: '1' },
]

export function ReviewsPageTemplate({ config }: ReviewsPageTemplateProps) {
  const cityGenitive = config.city === 'Зеленодольск' ? 'Зеленодольске' : 'Волжске'

  return (
    <SEOPageWrapper
      page={config.slug}
      title={config.title}
      description={config.description}
      keywords={config.keywords}
    >
      <SchemaMarkup
        customSchema={[
          generateBreadcrumbSchema([
            { name: 'Главная', url: 'https://dimbopizza.ru' },
            { name: config.h1, url: `https://dimbopizza.ru/${config.slug}` },
          ]),
        ]}
      />

      <Container size="sm" py="xl">
        <Stack gap="lg">
          {/* Hero with rating */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="md">
              <Badge color="orange" size="lg" variant="filled">
                {config.city}
              </Badge>
              <Group gap={4}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStarFilled key={i} size={18} color="#ff6b00" />
                ))}
              </Group>
            </Group>

            <Title order={1} size="h2" mb="md">{config.h1}</Title>

            <Group gap="xs" align="baseline" mb="sm">
              <Text fw={900} size="48px" c="orange">{config.rating}</Text>
              <Text size="lg" c="dimmed">из 5</Text>
            </Group>

            <Text size="lg" c="dimmed" mb="md">
              на основе {config.reviewCount} отзывов на Яндекс Картах
            </Text>

            <Group>
              <Button
                component="a"
                href="https://yandex.ru/maps/org/dimbo/188302222909/reviews/"
                target="_blank"
                leftSection={<IconExternalLink size={16} />}
                size="lg"
                color="orange"
              >
                Читать отзывы на Яндекс
              </Button>
              <Button
                component="a"
                href="tel:+79021053434"
                leftSection={<IconPhone size={16} />}
                size="lg"
                variant="light"
              >
                +7(902)105-34-34
              </Button>
            </Group>
          </Card>

          {/* Award badge */}
          {config.awardBadge && (
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ background: 'linear-gradient(135deg, #ffd700 0%, #ffed4a 100%)' }}>
              <Group>
                <IconTrophy size={48} color="#b8860b" />
                <Stack gap={4}>
                  <Text fw={900} size="xl" c="#8B4513">Хорошее место 2026</Text>
                  <Text c="#8B4513">Награда от Яндекс Карты за высокие рейтинги и положительные отзывы клиентов</Text>
                </Stack>
              </Group>
              <Image
                src="/images/awards/yandex-good-place-2026.png"
                alt="Хорошее место 2026"
                fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iNjAiIGZpbGw9IiNmZmQ3MDAiLz48dGV4dCB4PSIxMCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBemlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzhiNDUxMyI+0KXQvtGA0L7RiNC+0LUg0L/QtdGC0LXQutGDISAyMDI2PC90ZXh0Pjwvc3ZnPg=="
                h={60}
                fit="contain"
                mt="md"
              />
            </Card>
          )}

          {/* Rating breakdown */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={2} size="h3" mb="md">Распределение оценок</Title>
            <Stack gap="sm">
              {RATING_BARS.map(bar => (
                <Group key={bar.stars} gap="sm">
                  <Text size="sm" w={20} ta="right">{bar.stars}</Text>
                  <IconStarFilled size={14} color="#ff6b00" />
                  <Progress value={bar.percent} size="lg" radius="xl" style={{ flex: 1 }} color="orange" />
                  <Text size="sm" c="dimmed" w={40}>{bar.percent}%</Text>
                </Group>
              ))}
            </Stack>
          </Card>

          {/* Yandex reviews widget */}
          <YandexReviewsWidget title="Отзывы клиентов" height={400} />

          {/* CTA */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" align="center">
              <Stack gap={4}>
                <Text fw={700} size="lg">Понравились отзывы?</Text>
                <Text c="dimmed">Закажите доставку и оцените сами!</Text>
              </Stack>
              <Button
                component="a"
                href="/menu"
                size="lg"
                color="orange"
                rightSection={<IconExternalLink size={16} />}
              >
                Перейти в меню
              </Button>
            </Group>
          </Card>

          {/* SEO text */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={2} size="h3" mb="md">
              Отзывы о доставке еды в {cityGenitive}
            </Title>
            <Text mb="md">
              ДИМБО Пицца — доставка пиццы, суши, шашлыка и бургеров в {cityGenitive}.
              Мы ценим каждый отзыв и постоянно работаем над качеством.
              Наш рейтинг {config.rating} из 5 на основе {config.reviewCount} отзывов — лучшее подтверждение качества.
            </Text>
          </Card>

          <LocalInfo variant="compact" />
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
