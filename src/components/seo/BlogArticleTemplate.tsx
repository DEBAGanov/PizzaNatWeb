import { Container, Stack, Title, Text, Card, Badge, Group, Divider, Button, Accordion, Grid } from '@mantine/core'
import { IconPhone, IconChevronRight, IconCalendar, IconUser, IconBook, IconStar } from '@tabler/icons-react'
import { SEOPageWrapper } from '../SEOHead'
import { SchemaMarkup } from './SchemaMarkup'
import { LocalInfo } from './LocalInfo'
import { YandexReviewsWidget } from '../common/YandexReviewsWidget'
import { generateArticleSchema, generateBreadcrumbSchema } from '../../utils/schemaOrg'

export interface BlogArticleConfig {
  slug: string
  title: string
  description: string
  keywords: string
  h1: string
  author: string
  datePublished: string
  imageUrl: string
  content: string[]
  faq?: Array<{question: string; answer: string}>
  relatedArticles?: Array<{title: string; slug: string}>
  category: string
  categoryLabel: string
}

interface BlogArticleTemplateProps {
  config: BlogArticleConfig
}

const CATEGORY_COLORS: Record<string, string> = {
  recipes: 'orange',
  tips: 'blue',
  'food-guide': 'green',
  restaurant: 'red',
  culture: 'violet',
  seasonal: 'cyan',
  comparisons: 'teal',
  health: 'lime',
}

export function BlogArticleTemplate({ config }: BlogArticleTemplateProps) {
  const categoryColor = CATEGORY_COLORS[config.category] || 'gray'

  return (
    <SEOPageWrapper
      page={config.slug}
      title={config.title}
      description={config.description}
      keywords={config.keywords}
      imageUrl={config.imageUrl}
    >
      <SchemaMarkup
        customSchema={[
          generateArticleSchema({
            title: config.title,
            description: config.description,
            imageUrl: config.imageUrl.startsWith('/')
              ? `https://dimbopizza.ru${config.imageUrl}`
              : config.imageUrl,
            datePublished: config.datePublished,
          }),
          generateBreadcrumbSchema([
            { name: 'Главная', url: 'https://dimbopizza.ru' },
            { name: config.categoryLabel, url: `https://dimbopizza.ru/blog` },
            { name: config.h1, url: `https://dimbopizza.ru/${config.slug}` },
          ]),
        ]}
      />

      <Container size="sm" py="xl">
        <Stack gap="lg">
          {/* Hero */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="md">
              <Badge color={categoryColor} size="lg" variant="filled" leftSection={<IconBook size={14} />}>
                {config.categoryLabel}
              </Badge>
              <Group gap="xs">
                <IconCalendar size={16} />
                <Text size="sm" c="dimmed">{config.datePublished}</Text>
              </Group>
            </Group>

            <Title order={1} size="h2" mb="md">{config.h1}</Title>

            <Group gap="xs" mb="md">
              <IconUser size={16} />
              <Text size="sm" c="dimmed">{config.author}</Text>
            </Group>

            <Divider my="md" />
          </Card>

          {/* Article body */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
              {config.content.map((paragraph, i) => (
                <Text key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </Stack>
          </Card>

          {/* FAQ */}
          {config.faq && config.faq.length > 0 && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} size="h3" mb="md">Часто задаваемые вопросы</Title>
              <Accordion variant="separated">
                {config.faq.map((item, i) => (
                  <Accordion.Item key={i} value={`faq-${i}`} label={item.question}>
                    <Accordion.Control>{item.question}</Accordion.Control>
                    <Accordion.Panel><Text>{item.answer}</Text></Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card>
          )}

          {/* Related articles */}
          {config.relatedArticles && config.relatedArticles.length > 0 && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={2} size="h3" mb="md">Читайте также</Title>
              <Grid>
                {config.relatedArticles.map((article, i) => (
                  <Grid.Col key={i} span={{ base: 12, sm: 6 }}>
                    <Card component="a" href={`/${article.slug}`} withBorder padding="md">
                      <Text fw={600}>{article.title}</Text>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </Card>
          )}

          {/* CTA */}
          <Card shadow="sm" padding="lg" radius="md" withBorder style={{ background: 'linear-gradient(135deg, #ff6b00 0%, #ff8533 100%)' }}>
            <Title order={2} size="h3" c="white" mb="sm">Закажите пиццу пока читаете</Title>
            <Text c="white" mb="md" opacity={0.9}>Свежая пицца, суши, шашлык с быстрой доставкой в Волжске</Text>
            <Group>
              <Button component="a" href="tel:+79021053434" leftSection={<IconPhone size={16} />} size="lg" variant="filled" color="dark">
                +7(902)105-34-34
              </Button>
              <Button component="a" href="https://max.ru/id121603899498_bot" target="_blank" variant="white" rightSection={<IconChevronRight size={16} />} size="lg">
                Перейти в меню
              </Button>
            </Group>
          </Card>

          <LocalInfo variant="compact" />
          <YandexReviewsWidget />
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
