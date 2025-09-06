/**
 * @file: ShortKeywordSEOPage.tsx
 * @description: Универсальная SEO-страница для коротких высокочастотных запросов
 * @dependencies: Mantine, SEOHead, ProductsContext
 * @created: 2025-01-27
 */

import { Container, Stack, Title, Text, Grid, Card, Group, Button, List, Divider, Badge, Box, SimpleGrid } from '@mantine/core'
import { IconPhone, IconMapPin, IconClock, IconTruck, IconShoppingCart, IconStars, IconPizza, IconFish, IconGrill, IconBurger, IconCarrot, IconMeat } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { SEOPageWrapper } from '../../components/SEOHead'
import { ProductCardImage } from '../../components/common/OptimizedImage'
import { AllProductsLinks } from '../../components/seo/RelatedProducts'
import { SchemaMarkup } from '../../components/seo/SchemaMarkup'

interface ShortKeywordSEOPageProps {
  keyword: 'пицца' | 'суши' | 'роллы' | 'бургеры' | 'шашлык' | 'картошка-фри' | 'закрытая-пицца'
}

export function ShortKeywordSEOPage({ keyword }: ShortKeywordSEOPageProps) {
  const navigate = useNavigate()

  const keywordData = {
    'пицца': {
      title: "Пицца в Волжске - заказать с доставкой на дом | ДИМБО Пицца",
      description: "🍕 Пицца в Волжске с доставкой на дом ⭐ 20+ видов итальянской пиццы ⭐ Быстрая доставка за 30-60 минут ⭐ Вкуснейшая пицца в городе ⭐ +7(902)105-34-34",
      keywords: "пицца, пицца волжск, пицца заказать, итальянская пицца, лучшая пицца волжск",
      h1: "Пицца в Волжске",
      subtitle: "Вкуснейшая итальянская пицца с доставкой на дом",
      color: "orange",
      icon: <IconPizza size={48} />,
      pageType: 'pizza' as const
    },
    'суши': {
      title: "Суши в Волжске - заказать с доставкой на дом | Свежие суши и роллы",
      description: "🍣 Суши в Волжске с доставкой на дом ⭐ Свежие суши и роллы из качественной рыбы ⭐ Японская кухня ⭐ Быстрая доставка ⭐ +7(902)105-34-34",
      keywords: "суши, суши волжск, японская кухня, свежие суши, суши заказать",
      h1: "Суши в Волжске",
      subtitle: "Свежие суши и роллы из качественной рыбы",
      color: "blue",
      icon: <IconFish size={48} />,
      pageType: 'sushi' as const
    },
    'роллы': {
      title: "Роллы в Волжске - заказать с доставкой | Японские роллы на дом",
      description: "🍣 Роллы в Волжске с доставкой ⭐ Классические и авторские роллы ⭐ Свежая рыба ежедневно ⭐ Быстрая доставка роллов ⭐ +7(902)105-34-34",
      keywords: "роллы, роллы волжск, японские роллы, роллы заказать, роллы доставка",
      h1: "Роллы в Волжске", 
      subtitle: "Классические и авторские роллы с доставкой",
      color: "cyan",
      icon: <IconFish size={48} />,
      pageType: 'sushi' as const
    },
    'бургеры': {
      title: "Бургеры в Волжске - заказать с доставкой | Сочные бургеры на дом",
      description: "🍔 Бургеры в Волжске с доставкой ⭐ Сочные бургеры из свежих котлет ⭐ Картофель фри в подарок ⭐ Быстрая доставка бургеров ⭐ +7(902)105-34-34",
      keywords: "бургеры, бургеры волжск, сочные бургеры, бургеры заказать, американская кухня",
      h1: "Бургеры в Волжске",
      subtitle: "Сочные бургеры с картофелем фри",
      color: "yellow",
      icon: <IconBurger size={48} />,
      pageType: 'burgers' as const
    },
    'шашлык': {
      title: "Шашлык в Волжске - заказать с доставкой | Шашлык на углях",
      description: "🔥 Шашлык в Волжске с доставкой ⭐ Сочный шашлык на березовых углях ⭐ Отборное мясо ⭐ Быстрая доставка шашлыка ⭐ +7(902)105-34-34",
      keywords: "шашлык, шашлык волжск, шашлык на углях, шашлык заказать, мясо на углях",
      h1: "Шашлык в Волжске",
      subtitle: "Сочный шашлык на березовых углях",
      color: "red",
      icon: <IconGrill size={48} />,
      pageType: 'shashlyk' as const
    },
    'картошка-фри': {
      title: "Картошка фри в Волжске - заказать с доставкой | Хрустящий картофель",
      description: "🍟 Картошка фри в Волжске с доставкой ⭐ Хрустящий золотистый картофель ⭐ Различные соусы ⭐ Быстрая доставка ⭐ +7(902)105-34-34",
      keywords: "картошка фри, картофель фри волжск, хрустящий картофель, картошка заказать",
      h1: "Картошка фри в Волжске",
      subtitle: "Хрустящий золотистый картофель с соусами",
      color: "yellow",
      icon: <IconCarrot size={48} />,
      pageType: 'fries' as const
    },
    'закрытая-пицца': {
      title: "Закрытая пицца в Волжске - заказать с доставкой | Кальцоне на дом",
      description: "🥟 Закрытая пицца в Волжске с доставкой ⭐ Кальцоне с различными начинками ⭐ Сочная начинка в тонком тесте ⭐ Быстрая доставка ⭐ +7(902)105-34-34",
      keywords: "закрытая пицца, кальцоне, закрытая пицца волжск, кальцоне заказать, итальянская кухня",
      h1: "Закрытая пицца в Волжске",
      subtitle: "Кальцоне с сочными начинками",
      color: "orange",
      icon: <IconPizza size={48} />,
      pageType: 'pizza' as const
    }
  }

  const data = keywordData[keyword]
  
  const seoData = {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    imageUrl: `https://dimbopizza.ru/images/${keyword}-hero.jpg`
  }

  return (
    <SEOPageWrapper {...seoData}>
      <SchemaMarkup pageType={data.pageType} />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg={`${data.color}.0`}>
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack>
                  <Group gap="md" align="center">
                    <div style={{ color: `var(--mantine-color-${data.color}-6)` }}>
                      {data.icon}
                    </div>
                    <Title order={1} size="h1" c={`${data.color}.7`}>
                      {data.h1}
                    </Title>
                  </Group>
                  <Text size="xl" c="dark.6">
                    {data.subtitle}. Быстрая доставка по всему Волжску за 30-60 минут. 
                    Качественные ингредиенты, проверенные рецепты и честные цены.
                  </Text>
                  <Group>
                    <Badge size="lg" color="green">Бесплатная доставка от 800₽</Badge>
                    <Badge size="lg" color={data.color}>Работаем до 20:00</Badge>
                    <Badge size="lg" color="blue">Оплата любым способом</Badge>
                  </Group>
                  <Group>
                    <Button 
                      size="lg" 
                      color={data.color} 
                      leftSection={<IconShoppingCart size={20} />}
                      onClick={() => navigate('/')}
                    >
                      Заказать сейчас
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      color={data.color}
                      leftSection={<IconPhone size={20} />}
                      component="a"
                      href="tel:+79021053434"
                    >
                      +7(902)105-34-34
                    </Button>
                  </Group>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <ProductCardImage
                  src={`https://api.dimbopizza.ru/images/${keyword}-hero.jpg`}
                  alt={`${data.h1} - заказать с доставкой`}
                  style={{ borderRadius: '12px' }}
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Все товары */}
          <AllProductsLinks />

          {/* Популярные позиции */}
          <Box>
            <Title order={2} c="dark" mb="md">Популярные позиции</Title>
            <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
              {[
                { name: "Маргарита", price: "380 ₽", category: "пицца" },
                { name: "Филадельфия", price: "420 ₽", category: "роллы" },
                { name: "Классический", price: "350 ₽", category: "бургер" },
                { name: "Из свинины", price: "650 ₽", category: "шашлык" },
                { name: "С сыром", price: "220 ₽", category: "картофель" },
                { name: "Калифорния", price: "380 ₽", category: "роллы" },
                { name: "Пепперони", price: "450 ₽", category: "пицца" },
                { name: "Чизбургер", price: "420 ₽", category: "бургер" }
              ].map((item, index) => (
                <Card key={index} shadow="sm" radius="md" withBorder p="md">
                  <Stack align="center" gap="xs">
                    <Title order={5} ta="center" size="sm">{item.name}</Title>
                    <Text size="lg" fw={600} c={data.color}>{item.price}</Text>
                    <Button size="xs" color={data.color} onClick={() => navigate('/')}>
                      Заказать
                    </Button>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Box>

          {/* Преимущества */}
          <Card shadow="sm" radius="md" withBorder p="xl" bg="gray.0">
            <Title order={2} c="dark" mb="md" ta="center">Почему выбирают нас в Волжске?</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Stack align="center" gap="md">
                  <IconTruck size={48} color="orange" />
                  <Title order={4} ta="center">Быстрая доставка</Title>
                  <Text ta="center" size="sm">30-60 минут по всему Волжску</Text>
                </Stack>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Stack align="center" gap="md">
                  <IconStars size={48} color="green" />
                  <Title order={4} ta="center">Качество продуктов</Title>
                  <Text ta="center" size="sm">Только свежие ингредиенты</Text>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Stack align="center" gap="md">
                  <IconMapPin size={48} color="blue" />
                  <Title order={4} ta="center">Доставляем везде</Title>
                  <Text ta="center" size="sm">Весь Волжск и окрестности</Text>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Stack align="center" gap="md">
                  <IconPhone size={48} color="violet" />
                  <Title order={4} ta="center">Удобная оплата</Title>
                  <Text ta="center" size="sm">Наличные, карта, СБП</Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Card>

          {/* Контакты */}
          <Card shadow="lg" radius="md" withBorder p="xl" bg={`${data.color}.0`}>
            <Group justify="space-between" align="center">
              <Box>
                <Title order={2} c={`${data.color}.7`}>Заказать {keyword.replace('-', ' ')} в Волжске</Title>
                <Group mt="md">
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
                    <Text size="lg">Ежедневно с 10:00 до 20:00</Text>
                  </Group>
                </Group>
              </Box>
              <Button 
                size="xl" 
                color={data.color}
                leftSection={<IconShoppingCart size={24} />}
                onClick={() => navigate('/')}
              >
                Открыть меню
              </Button>
            </Group>
          </Card>

          {/* SEO текст */}
          <Box>
            <Divider my="xl" />
            <Title order={3} c="dark" mb="md">{data.h1} - лучший выбор в городе</Title>
            <Text size="md" c="dark.6" style={{ lineHeight: 1.6 }}>
              <strong>{data.h1}</strong> от ДИМБО - это гарантия качества и вкуса. Мы готовим каждое блюдо 
              из отборных ингредиентов, следуя проверенным рецептам. {data.subtitle.toLowerCase()}, 
              которые вы можете заказать с доставкой на дом в любую точку Волжска.
            </Text>
            <Text size="md" c="dark.6" mt="md" style={{ lineHeight: 1.6 }}>
              Заказать {keyword.replace('-', ' ')} в Волжске стало проще! Мы работаем ежедневно с 10:00 до 20:00 
              и доставляем заказы за 30-60 минут. Бесплатная доставка от 800₽. Оплата наличными, картой или через СБП.
            </Text>
          </Box>
        </Stack>
      </Container>
    </SEOPageWrapper>
  )
}
