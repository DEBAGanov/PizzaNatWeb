/**
 * @file: IndexingContent.tsx
 * @description: Компоненты с индексирующими текстами для SEO
 * @dependencies: Mantine, SEO texts
 * @created: 2025-01-24
 */

import {
  Container,
  Stack,
  Title,
  Text,
  Card,
  SimpleGrid,
  ThemeIcon,
  Group,
  List,
  Paper,
  Divider
} from '@mantine/core'
import {
  IconTruck,
  IconClock,
  IconCreditCard,
  IconShield,
  IconPizza,
  IconStar,
  IconMapPin,
  IconPhone
} from '@tabler/icons-react'
import { INDEXING_TEXTS } from '../../utils/seo'

// Индексирующий контент для главной страницы
export function HomePageSEOContent() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Главный блок о доставке пиццы в Волжске */}
        <Paper p="xl" radius="lg" withBorder>
          <Stack gap="md">
            <Title order={2} ta="center" c="orange.7">
              🍕 Лучшая пицца в Волжске с доставкой на дом
            </Title>
            <Text size="lg" ta="center" c="dimmed">
              {INDEXING_TEXTS.homePage.hero}
            </Text>
          </Stack>
        </Paper>

        {/* Преимущества доставки */}
        <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="lg">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md" align="center">
              <ThemeIcon size={60} radius="xl" color="orange" variant="light">
                <IconClock size={30} />
              </ThemeIcon>
              <Title order={4} ta="center">Быстрая доставка</Title>
              <Text size="sm" ta="center" c="dimmed">
                Доставляем горячую пиццу по Волжску за 30-60 минут
              </Text>
            </Stack>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md" align="center">
              <ThemeIcon size={60} radius="xl" color="green" variant="light">
                <IconTruck size={30} />
              </ThemeIcon>
              <Title order={4} ta="center">Бесплатная доставка</Title>
              <Text size="sm" ta="center" c="dimmed">
                Бесплатно доставляем заказы от 800₽ по всему Волжску
              </Text>
            </Stack>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md" align="center">
              <ThemeIcon size={60} radius="xl" color="blue" variant="light">
                <IconCreditCard size={30} />
              </ThemeIcon>
              <Title order={4} ta="center">Удобная оплата</Title>
              <Text size="sm" ta="center" c="dimmed">
                Наличными, картой или через СБП - выбирайте как удобно
              </Text>
            </Stack>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md" align="center">
              <ThemeIcon size={60} radius="xl" color="grape" variant="light">
                <IconShield size={30} />
              </ThemeIcon>
              <Title order={4} ta="center">Качество</Title>
              <Text size="sm" ta="center" c="dimmed">
                Только свежие ингредиенты и проверенные рецепты
              </Text>
            </Stack>
          </Card>
        </SimpleGrid>

        {/* Почему выбирают нас */}
        <Card shadow="sm" padding="xl" radius="lg" withBorder>
          <Stack gap="lg">
            <Title order={2} ta="center" c="orange.7">
              Почему жители Волжска выбирают ДИМБО Пицца?
            </Title>
            
            <Text size="md" ta="center">
              {INDEXING_TEXTS.homePage.advantages}
            </Text>
            
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
              <List spacing="sm" size="md" icon={
                <ThemeIcon color="orange" size={20} radius="xl">
                  <IconStar size={12} />
                </ThemeIcon>
              }>
                <List.Item>Работаем в Волжске уже более 3 лет</List.Item>
                <List.Item>Более 500 довольных клиентов</List.Item>
                <List.Item>Средняя оценка 4.8 из 5 звезд</List.Item>
                <List.Item>Гарантия качества на каждую пиццу</List.Item>
              </List>
              
              <List spacing="sm" size="md" icon={
                <ThemeIcon color="green" size={20} radius="xl">
                  <IconPizza size={12} />
                </ThemeIcon>
              }>
                <List.Item>Тесто готовим ежедневно по итальянскому рецепту</List.Item>
                <List.Item>Используем только натуральную моцареллу</List.Item>
                <List.Item>Свежие овощи от местных поставщиков</List.Item>
                <List.Item>Более 25 видов пиццы на любой вкус</List.Item>
              </List>
            </SimpleGrid>
          </Stack>
        </Card>

        {/* Информация о доставке в Волжске */}
        <Paper p="xl" radius="lg" bg="orange.0" withBorder>
          <Stack gap="lg">
            <Group justify="center">
              <ThemeIcon size={50} radius="xl" color="orange">
                <IconMapPin size={25} />
              </ThemeIcon>
              <Title order={2} c="orange.8">
                Доставка пиццы по всему Волжску
              </Title>
            </Group>
            
            <Text size="md" ta="center">
              {INDEXING_TEXTS.homePage.delivery}
            </Text>
            
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
              <Card padding="md" radius="md" bg="white">
                <Text fw={600} size="sm" mb="xs">Центральные районы</Text>
                <Text size="sm" c="dimmed">Бесплатная доставка от 800₽</Text>
                <Text size="xs" c="green">Время доставки: 30-45 мин</Text>
              </Card>
              
              <Card padding="md" radius="md" bg="white">
                <Text fw={600} size="sm" mb="xs">Спальные районы</Text>
                <Text size="sm" c="dimmed">Бесплатная доставка от 1000₽</Text>
                <Text size="xs" c="blue">Время доставки: 40-60 мин</Text>
              </Card>
              
              <Card padding="md" radius="md" bg="white">
                <Text fw={600} size="sm" mb="xs">Окраины города</Text>
                <Text size="sm" c="dimmed">Бесплатная доставка от 1200₽</Text>
                <Text size="xs" c="grape">Время доставки: 50-60 мин</Text>
              </Card>
            </SimpleGrid>
          </Stack>
        </Paper>

        {/* Контактная информация */}
        <Card shadow="sm" padding="xl" radius="lg" withBorder>
          <Stack gap="md">
            <Title order={3} ta="center" c="orange.7">
              Контакты ДИМБО Пицца в Волжске
            </Title>
            
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
              <Stack gap="sm">
                <Group>
                  <ThemeIcon size="sm" color="blue" variant="light">
                    <IconPhone size={14} />
                  </ThemeIcon>
                  <Text size="sm">
                    <strong>Телефон для заказов:</strong> +7 (902) 105-34-34
                  </Text>
                </Group>
                
                <Group>
                  <ThemeIcon size="sm" color="green" variant="light">
                    <IconClock size={14} />
                  </ThemeIcon>
                  <Text size="sm">
                    <strong>Режим работы:</strong> Ежедневно с 10:00 до 20:00
                  </Text>
                </Group>
              </Stack>
              
              <Stack gap="sm">
                <Group>
                  <ThemeIcon size="sm" color="orange" variant="light">
                    <IconMapPin size={14} />
                  </ThemeIcon>
                  <Text size="sm">
                    <strong>Адрес:</strong> г. Волжск, ул. Шестакова, д.1Б
                  </Text>
                </Group>
                
                <Group>
                  <ThemeIcon size="sm" color="grape" variant="light">
                    <IconTruck size={14} />
                  </ThemeIcon>
                  <Text size="sm">
                    <strong>Зона доставки:</strong> Весь Волжск и ближайшие районы
                  </Text>
                </Group>
              </Stack>
            </SimpleGrid>
          </Stack>
        </Card>
      </Stack>
    </Container>
  )
}

// Индексирующий контент для страницы меню
export function MenuPageSEOContent() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Введение в меню */}
        <Paper p="xl" radius="lg" withBorder>
          <Stack gap="md">
            <Title order={2} ta="center" c="orange.7">
              🍕 Меню пиццы ДИМБО в Волжске
            </Title>
            <Text size="lg" ta="center" c="dimmed">
              {INDEXING_TEXTS.menuPage.intro}
            </Text>
          </Stack>
        </Paper>

        {/* Описание категорий */}
        <Card shadow="sm" padding="xl" radius="lg" withBorder>
          <Stack gap="lg">
            <Title order={3} ta="center" c="orange.7">
              Разнообразие вкусов для жителей Волжска
            </Title>
            
            <Text size="md" ta="center">
              {INDEXING_TEXTS.menuPage.categories}
            </Text>
            
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
              <Card padding="lg" radius="md" bg="orange.0">
                <Stack gap="sm">
                  <Title order={4} c="orange.8">Классические пиццы</Title>
                  <Text size="sm">
                    Маргарита, Пепперони, Четыре сыра - проверенные временем рецепты, 
                    которые любят в Волжске и по всему миру.
                  </Text>
                </Stack>
              </Card>
              
              <Card padding="lg" radius="md" bg="red.0">
                <Stack gap="sm">
                  <Title order={4} c="red.8">Мясные пиццы</Title>
                  <Text size="sm">
                    Для настоящих мясоедов! Сочная говядина, куриное филе, 
                    бекон и колбаски в различных сочетаниях.
                  </Text>
                </Stack>
              </Card>
              
              <Card padding="lg" radius="md" bg="green.0">
                <Stack gap="sm">
                  <Title order={4} c="green.8">Вегетарианские</Title>
                  <Text size="sm">
                    Свежие овощи, ароматные травы, различные сыры - 
                    полезно и вкусно для тех, кто следит за питанием.
                  </Text>
                </Stack>
              </Card>
            </SimpleGrid>
          </Stack>
        </Card>

        {/* Процесс заказа */}
        <Paper p="xl" radius="lg" bg="blue.0" withBorder>
          <Stack gap="lg">
            <Title order={3} ta="center" c="blue.8">
              Как заказать пиццу в Волжске через сайт
            </Title>
            
            <Text size="md" ta="center">
              {INDEXING_TEXTS.menuPage.ordering}
            </Text>
            
            <SimpleGrid cols={{ base: 1, md: 4 }} spacing="lg">
              <Card padding="md" radius="md" bg="white">
                <Stack gap="xs" align="center">
                  <ThemeIcon size={40} radius="xl" color="blue">
                    <Text fw={700} size="lg">1</Text>
                  </ThemeIcon>
                  <Text fw={600} size="sm" ta="center">Выберите пиццу</Text>
                  <Text size="xs" ta="center" c="dimmed">
                    Просмотрите меню и добавьте понравившиеся позиции
                  </Text>
                </Stack>
              </Card>
              
              <Card padding="md" radius="md" bg="white">
                <Stack gap="xs" align="center">
                  <ThemeIcon size={40} radius="xl" color="green">
                    <Text fw={700} size="lg">2</Text>
                  </ThemeIcon>
                  <Text fw={600} size="sm" ta="center">Оформите заказ</Text>
                  <Text size="xs" ta="center" c="dimmed">
                    Укажите адрес доставки в Волжске и контактные данные
                  </Text>
                </Stack>
              </Card>
              
              <Card padding="md" radius="md" bg="white">
                <Stack gap="xs" align="center">
                  <ThemeIcon size={40} radius="xl" color="orange">
                    <Text fw={700} size="lg">3</Text>
                  </ThemeIcon>
                  <Text fw={600} size="sm" ta="center">Выберите оплату</Text>
                  <Text size="xs" ta="center" c="dimmed">
                    Наличными курьеру, картой онлайн или через СБП
                  </Text>
                </Stack>
              </Card>
              
              <Card padding="md" radius="md" bg="white">
                <Stack gap="xs" align="center">
                  <ThemeIcon size={40} radius="xl" color="grape">
                    <Text fw={700} size="lg">4</Text>
                  </ThemeIcon>
                  <Text fw={600} size="sm" ta="center">Получите заказ</Text>
                  <Text size="xs" ta="center" c="dimmed">
                    Курьер привезет горячую пиццу прямо к вашему дому
                  </Text>
                </Stack>
              </Card>
            </SimpleGrid>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}

// Блок "О нас" для любой страницы
export function AboutUsSEOBlock() {
  return (
    <Card shadow="sm" padding="xl" radius="lg" withBorder>
      <Stack gap="lg">
        <Title order={3} ta="center" c="orange.7">
          О пиццерии ДИМБО в Волжске
        </Title>
        
        <Text size="md" ta="center">
          {INDEXING_TEXTS.about.story}
        </Text>
        
        <Divider />
        
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          <Stack gap="sm">
            <Title order={4} c="orange.7">Качество ингредиентов</Title>
            <Text size="sm">
              {INDEXING_TEXTS.about.quality}
            </Text>
          </Stack>
          
          <Stack gap="sm">
            <Title order={4} c="orange.7">Сервис и забота</Title>
            <Text size="sm">
              {INDEXING_TEXTS.about.service}
            </Text>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Card>
  )
}