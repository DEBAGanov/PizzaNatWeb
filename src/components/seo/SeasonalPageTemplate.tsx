/**
 * @file: SeasonalPageTemplate.tsx
 * @description: Шаблон SEO-страницы для сезонных и праздничных мероприятий
 * @dependencies: Mantine, Tabler Icons, SchemaMarkup, LocalInfo, RelatedProducts
 * @created: 2026-04-12
 */

import React from 'react'
import {
  Container,
  Stack,
  Title,
  Text,
  Card,
  Badge,
  Group,
  Grid,
  Button,
  Image,
  Accordion,
  Box
} from '@mantine/core'
import {
  IconPhone,
  IconChevronRight,
  IconClock,
  IconStar,
  IconGrill,
  IconCalendar
} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../SEOHead'
import { SchemaMarkup } from './SchemaMarkup'
import { LocalInfo } from './LocalInfo'
import { YandexReviewsWidget } from '../common/YandexReviewsWidget'
import { RelatedProducts } from './RelatedProducts'
import { ProductCardImage } from '../common/OptimizedImage'
import { generateEventSchema } from '../../utils/schemaOrg'

interface SeasonalProduct {
  name: string
  description: string
  price: number
  image: string
}

interface MasterclassInfo {
  title: string
  description: string
  images: string[]
}

interface SeasonalPageConfig {
  slug: string
  event: string
  title: string
  description: string
  keywords: string
  h1: string
  h1Subtext: string
  imageUrl: string
  content: string[] // HTML paragraphs
  menuItems: SeasonalProduct[]
  faq?: Array<{ question: string; answer: string }>
  ctaText: string
  masterclassInfo?: MasterclassInfo
  seasonalPeriod: string
  category?: string // for RelatedProducts, e.g. 'pizza', 'food'
}

interface SeasonalPageTemplateProps {
  config: SeasonalPageConfig
}

export const SeasonalPageTemplate: React.FC<SeasonalPageTemplateProps> = ({ config }) => {
  const navigate = useNavigate()

  const customSchema = [
    generateEventSchema({
      name: config.event,
      description: config.description,
      startDate: config.seasonalPeriod,
      location: 'ДИМБО Пицца, Волжск'
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Главная',
          item: 'https://dimbopizza.ru'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: config.event,
          item: `https://dimbopizza.ru/${config.slug}`
        }
      ]
    }
  ]

  return (
    <SEOPageWrapper
      page={config.slug}
      customSeo={{
        title: config.title,
        description: config.description,
        keywords: config.keywords.split(',').map(k => k.trim()),
        ogImage: config.imageUrl
      }}
    >
      <SchemaMarkup customSchema={customSchema} />

      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* 1. Hero Section */}
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
                    <Badge
                      size="lg"
                      color="red"
                      leftSection={<IconCalendar size={16} />}
                    >
                      {config.event}
                    </Badge>
                    <Badge size="lg" color="orange">
                      {config.seasonalPeriod}
                    </Badge>
                  </Group>
                  <Group>
                    <Button
                      size="lg"
                      color="orange"
                      leftSection={<IconPhone size={20} />}
                      component="a"
                      href="tel:+79021053434"
                    >
                      Позвонить
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      color="orange"
                      rightSection={<IconChevronRight size={20} />}
                      onClick={() => navigate('/')}
                    >
                      Смотреть меню
                    </Button>
                  </Group>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <ProductCardImage
                  src={config.imageUrl}
                  alt={`${config.h1} - ДИМБО Пицца`}
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* 2. Event Content */}
          {config.content.length > 0 && (
            <Box>
              {config.content.map((paragraph, idx) => (
                <Text
                  key={idx}
                  size="md"
                  c="dark.6"
                  mt={idx > 0 ? 'md' : undefined}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                  style={{ lineHeight: 1.6 }}
                />
              ))}
            </Box>
          )}

          {/* 3. Recommended Menu */}
          {config.menuItems.length > 0 && (
            <Box>
              <Title order={2} c="dark" mb="md">
                Рекомендуемое меню для {config.event.toLowerCase()}
              </Title>
              <Grid>
                {config.menuItems.map((item, idx) => (
                  <Grid.Col key={idx} span={{ base: 12, sm: 6, md: 4 }}>
                    <Card shadow="sm" radius="md" withBorder>
                      <ProductCardImage
                        src={item.image}
                        alt={`${item.name} - ${config.event} в ДИМБО Пицца`}
                        style={{ height: '200px' }}
                      />
                      <Stack mt="md" gap="xs">
                        <Title order={4}>{item.name}</Title>
                        <Text size="sm" c="dimmed">{item.description}</Text>
                        <Group justify="space-between" align="center">
                          <Text size="lg" fw={700} c="orange">{item.price} ₽</Text>
                          <Button size="sm" color="orange">Заказать</Button>
                        </Group>
                      </Stack>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </Box>
          )}

          {/* 4. Masterclass Promo (conditional) */}
          {config.masterclassInfo && (
            <Card shadow="sm" radius="md" withBorder p="xl" bg="yellow.0">
              <Stack gap="lg">
                <Group>
                  <IconStar size={32} color="var(--mantine-color-orange-6)" />
                  <Title order={2} c="orange.7">
                    {config.masterclassInfo.title}
                  </Title>
                </Group>
                <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
                  {config.masterclassInfo.description}
                </Text>
                {config.masterclassInfo.images.length > 0 && (
                  <Grid>
                    {config.masterclassInfo.images.map((img, idx) => (
                      <Grid.Col key={idx} span={{ base: 6, sm: 4, md: 3 }}>
                        <Image
                          src={img}
                          alt={`${config.masterclassInfo!.title} - фото ${idx + 1}`}
                          radius="md"
                          style={{ objectFit: 'cover', height: '180px' }}
                          fallbackSrc="/placeholder-food.jpg"
                        />
                      </Grid.Col>
                    ))}
                  </Grid>
                )}
                <Button
                  size="lg"
                  color="orange"
                  leftSection={<IconPhone size={20} />}
                  component="a"
                  href="tel:+79061382868"
                >
                  Записаться на мастер-класс
                </Button>
              </Stack>
            </Card>
          )}

          {/* 5. How to Order Steps */}
          <Card shadow="sm" radius="md" withBorder p="xl">
            <Title order={2} c="dark" mb="lg" ta="center">
              Как заказать на {config.event.toLowerCase()}?
            </Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card bg="orange.0" p="md" h="100%">
                  <Stack gap="sm" align="center">
                    <Badge size="xl" color="orange" variant="filled">1</Badge>
                    <IconGrill size={40} color="orange" />
                    <Title order={4} ta="center" c="orange.8">Выберите блюда</Title>
                    <Text size="sm" ta="center" c="dimmed">
                      Изучите наше праздничное меню и выберите любимые блюда
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card bg="blue.0" p="md" h="100%">
                  <Stack gap="sm" align="center">
                    <Badge size="xl" color="blue" variant="filled">2</Badge>
                    <IconPhone size={40} color="blue" />
                    <Title order={4} ta="center" c="blue.8">Позвоните или закажите онлайн</Title>
                    <Text size="sm" ta="center" c="dimmed">
                      Оформите заказ по телефону +7(902)105-34-34 или через сайт
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card bg="green.0" p="md" h="100%">
                  <Stack gap="sm" align="center">
                    <Badge size="xl" color="green" variant="filled">3</Badge>
                    <IconClock size={40} color="green" />
                    <Title order={4} ta="center" c="green.8">Получите доставку</Title>
                    <Text size="sm" ta="center" c="dimmed">
                      Доставим горячие блюда за 30-60 минут прямо к вашему столу
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>

          {/* 6. FAQ (conditional) */}
          {config.faq && config.faq.length > 0 && (
            <Card shadow="sm" radius="md" withBorder p="xl">
              <Title order={2} c="dark" mb="md" ta="center">
                Часто задаваемые вопросы
              </Title>
              <Accordion variant="separated" radius="md">
                {config.faq.map((item, idx) => (
                  <Accordion.Item key={idx} value={`faq-${idx}`}>
                    <Accordion.Control>{item.question}</Accordion.Control>
                    <Accordion.Panel>
                      <Text>{item.answer}</Text>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card>
          )}

          {/* 7. CTA Card */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="orange.0">
            <Stack align="center" gap="md">
              <Title order={2} c="orange.7" ta="center">
                {config.ctaText}
              </Title>
              <Group>
                <Button
                  size="xl"
                  color="orange"
                  leftSection={<IconPhone size={24} />}
                  component="a"
                  href="tel:+79021053434"
                >
                  +7(902)105-34-34
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  color="orange"
                  rightSection={<IconChevronRight size={24} />}
                  onClick={() => window.open('https://max.ru/id121603899498_bot', '_blank')}
                >
                  Перейти в меню
                </Button>
              </Group>
            </Stack>
          </Card>

          {/* 8. RelatedProducts (conditional) */}
          {config.category && (
            <RelatedProducts currentProduct={config.category} />
          )}

          {/* 9. LocalInfo compact */}
          <LocalInfo variant="compact" />
        </Stack>

        {/* 10. YandexReviewsWidget */}
        <YandexReviewsWidget />
      </Container>
    </SEOPageWrapper>
  )
}
