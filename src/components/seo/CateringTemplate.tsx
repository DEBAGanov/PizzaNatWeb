/**
 * @file: CateringTemplate.tsx
 * @description: Шаблон SEO-страницы B2B/кейтеринга для ДИМБО Пицца
 * @dependencies: Mantine UI, Tabler Icons, Schema.org
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
  List,
  ThemeIcon,
  NumberFormatter,
  Accordion,
  Box,
  Anchor,
  Paper,
} from '@mantine/core'
import {
  IconPhone,
  IconChevronRight,
  IconUsers,
  IconCheck,
  IconTruck,
  IconBuilding,
  IconStar,
} from '@tabler/icons-react'
import { SEOPageWrapper } from '../SEOHead'
import { SchemaMarkup } from './SchemaMarkup'
import { LocalInfo } from './LocalInfo'
import { YandexReviewsWidget } from '../common/YandexReviewsWidget'
import { generateServiceSchema, generateFAQSchema } from '../../utils/schemaOrg'

interface MenuPackage {
  name: string
  description: string
  pricePerPerson: number
  minPersons: number
  items: string[]
}

interface CateringPageConfig {
  slug: string
  type: 'office' | 'corporate' | 'banquet' | 'wedding' | 'buffet' | 'picnic'
  title: string
  description: string
  keywords: string
  h1: string
  h1Subtext: string
  content: string[]
  menuPackages: MenuPackage[]
  faq?: Array<{ question: string; answer: string }>
  ctaPhone: string
}

interface CateringTemplateProps {
  config: CateringPageConfig
}

export const CateringTemplate: React.FC<CateringTemplateProps> = ({ config }) => {
  const customSchema: object[] = [
    generateServiceSchema({
      serviceType: config.type,
      name: config.title,
      description: config.description,
      areaServed: ['Волжск', 'Зеленодольск'],
    }),
  ]

  if (config.faq && config.faq.length > 0) {
    customSchema.push(generateFAQSchema(config.faq))
  }

  return (
    <SEOPageWrapper
      page={config.slug}
      title={config.title}
      description={config.description}
      keywords={[config.keywords]}
    >
      <SchemaMarkup customSchema={customSchema} />

      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* 1. Hero card */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="orange.0">
            <Stack gap="lg" ta="center">
              <Badge size="lg" color="violet" variant="light" leftSection={<IconBuilding size={16} />}>
                Для бизнеса
              </Badge>
              <Title order={1} size="h1" c="orange.7">
                {config.h1}
              </Title>
              <Text size="xl" c="dark.6" maw={800} mx="auto">
                {config.h1Subtext}
              </Text>
              <Group justify="center" gap="md">
                <Button
                  size="lg"
                  color="orange"
                  leftSection={<IconPhone size={20} />}
                  component="a"
                  href={`tel:${config.ctaPhone.replace(/[^+\d]/g, '')}`}
                >
                  Позвонить {config.ctaPhone}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  color="blue"
                  leftSection={<IconChevronRight size={20} />}
                  component="a"
                  href="https://vk.com/dimbo_volzhsk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Написать в ВК
                </Button>
              </Group>
            </Stack>
          </Card>

          {/* 2. Service description */}
          {config.content.length > 0 && (
            <Card shadow="sm" radius="md" withBorder p="xl">
              <Stack gap="md">
                <Title order={2} c="dark">
                  О услуге
                </Title>
                {config.content.map((paragraph, index) => (
                  <Text
                    key={index}
                    size="md"
                    c="dark.6"
                    lh={1.6}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </Stack>
            </Card>
          )}

          {/* 3. Menu packages */}
          {config.menuPackages.length > 0 && (
            <Box>
              <Title order={2} c="dark" mb="md">
                Меню для {config.type === 'office' ? 'офиса' : config.type === 'corporate' ? 'корпоратива' : config.type === 'banquet' ? 'банкета' : config.type === 'wedding' ? 'свадьбы' : config.type === 'buffet' ? 'фуршета' : 'пикника'}
              </Title>
              <Grid>
                {config.menuPackages.map((pkg, index) => (
                  <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
                    <Card shadow="sm" radius="md" withBorder p="lg" h="100%">
                      <Stack gap="md" h="100%">
                        <Stack gap="xs">
                          <Title order={4} c="orange.7">
                            {pkg.name}
                          </Title>
                          <Text size="sm" c="dimmed">
                            {pkg.description}
                          </Text>
                        </Stack>

                        <Group gap="xs" align="baseline">
                          <Text size="xl" fw={700} c="orange">
                            <NumberFormatter
                              value={pkg.pricePerPerson}
                              suffix=" ₽/чел"
                              thousandSeparator=" "
                            />
                          </Text>
                        </Group>

                        <Group gap="xs">
                          <IconUsers size={16} color="var(--mantine-color-blue-6)" />
                          <Text size="sm" c="dimmed">
                            от {pkg.minPersons} человек
                          </Text>
                        </Group>

                        <List spacing="xs" size="sm" style={{ flex: 1 }}>
                          {pkg.items.map((item, itemIndex) => (
                            <List.Item
                              key={itemIndex}
                              icon={
                                <ThemeIcon size="xs" color="green" variant="light" radius="xl">
                                  <IconCheck size={10} />
                                </ThemeIcon>
                              }
                            >
                              {item}
                            </List.Item>
                          ))}
                        </List>

                        <Button
                          fullWidth
                          color="orange"
                          variant="light"
                          component="a"
                          href={`tel:${config.ctaPhone.replace(/[^+\d]/g, '')}`}
                        >
                          Заказать
                        </Button>
                      </Stack>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </Box>
          )}

          {/* 4. How it works */}
          <Card shadow="sm" radius="md" withBorder p="xl">
            <Stack gap="lg">
              <Title order={2} ta="center" c="dark">
                Как заказать кейтеринг
              </Title>
              <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Paper p="lg" radius="md" bg="orange.0" withBorder ta="center" h="100%">
                    <Stack gap="sm" align="center">
                      <ThemeIcon size="xl" color="orange" variant="light">
                        <IconPhone size={28} />
                      </ThemeIcon>
                      <Badge size="lg" color="orange" variant="filled">
                        1
                      </Badge>
                      <Text fw={600} c="orange.8">
                        Оставьте заявку
                      </Text>
                      <Text size="sm" c="dimmed">
                        Позвоните по телефону {config.ctaPhone} или напишите нам в ВК
                      </Text>
                    </Stack>
                  </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Paper p="lg" radius="md" bg="blue.0" withBorder ta="center" h="100%">
                    <Stack gap="sm" align="center">
                      <ThemeIcon size="xl" color="blue" variant="light">
                        <IconStar size={28} />
                      </ThemeIcon>
                      <Badge size="lg" color="blue" variant="filled">
                        2
                      </Badge>
                      <Text fw={600} c="blue.8">
                        Согласуйте меню
                      </Text>
                      <Text size="sm" c="dimmed">
                        Обсудите количество гостей, предпочтения и бюджет с нашим менеджером
                      </Text>
                    </Stack>
                  </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Paper p="lg" radius="md" bg="green.0" withBorder ta="center" h="100%">
                    <Stack gap="sm" align="center">
                      <ThemeIcon size="xl" color="green" variant="light">
                        <IconTruck size={28} />
                      </ThemeIcon>
                      <Badge size="lg" color="green" variant="filled">
                        3
                      </Badge>
                      <Text fw={600} c="green.8">
                        Получите доставку
                      </Text>
                      <Text size="sm" c="dimmed">
                        Привезём свежие блюда точно к назначенному времени в термобоксах
                      </Text>
                    </Stack>
                  </Paper>
                </Grid.Col>
              </Grid>
            </Stack>
          </Card>

          {/* 5. FAQ (conditional) */}
          {config.faq && config.faq.length > 0 && (
            <Card shadow="sm" radius="md" withBorder p="xl">
              <Stack gap="md">
                <Title order={2} ta="center" c="dark">
                  Часто задаваемые вопросы
                </Title>
                <Accordion variant="separated" radius="md">
                  {config.faq.map((item, index) => (
                    <Accordion.Item key={index} value={`faq-${index}`}>
                      <Accordion.Control icon={<IconChevronRight size={16} />}>
                        {item.question}
                      </Accordion.Control>
                      <Accordion.Panel>
                        <Text size="sm" c="dimmed" lh={1.6}>
                          {item.answer}
                        </Text>
                      </Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Stack>
            </Card>
          )}

          {/* 6. CTA card */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg="orange.0">
            <Stack gap="md" ta="center">
              <Title order={2} c="orange.7">
                Закажите кейтеринг для вашего мероприятия
              </Title>
              <Text size="lg" c="dimmed">
                Свяжитесь с нами для бесплатной консультации и расчёта меню
              </Text>
              <Group justify="center" gap="md">
                <Group gap="xs">
                  <IconPhone size={20} />
                  <Anchor
                    href={`tel:${config.ctaPhone.replace(/[^+\d]/g, '')}`}
                    size="lg"
                    fw={600}
                    c="orange.7"
                  >
                    {config.ctaPhone}
                  </Anchor>
                </Group>
                <Group gap="xs">
                  <IconBuilding size={20} />
                  <Anchor
                    href="https://vk.com/dimbo_volzhsk"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    fw={600}
                    c="blue.7"
                  >
                    vk.com/dimbo_volzhsk
                  </Anchor>
                </Group>
              </Group>
              <Group justify="center" mt="md">
                <Button
                  size="lg"
                  color="orange"
                  leftSection={<IconPhone size={20} />}
                  component="a"
                  href={`tel:${config.ctaPhone.replace(/[^+\d]/g, '')}`}
                >
                  Позвонить сейчас
                </Button>
              </Group>
            </Stack>
          </Card>

          {/* 7. LocalInfo compact */}
          <LocalInfo variant="compact" showRating={true} showDeliveryInfo={false} />

          {/* 8. YandexReviewsWidget */}
          <YandexReviewsWidget title={`Отзывы о кейтеринге ДИМБО Пицца`} />
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
