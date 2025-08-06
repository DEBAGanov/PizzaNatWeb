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
              🍕 ДИМБО Пицца Волжск - быстрая доставка пиццы на дом
            </Title>
            <Text size="lg" ta="center" c="dimmed">
              Заказать пиццу с доставкой в Волжске стало еще проще! Горячая пицца с доставкой за 30-60 минут. 
              Мы работаем для жителей Волжска, знаем ваши вкусы и предлагаем только лучшее качество.
            </Text>
            
            {/* Блок конкурентных преимуществ */}
            <Paper p="md" radius="md" bg="orange.0">
              <Title order={3} size="h4" mb="sm" c="orange.8">
                🏆 Наши преимущества перед конкурентами в Волжске:
              </Title>
              <List spacing="xs" size="sm" c="orange.9">
                <List.Item>✅ <strong>Лучше Додо Пиццы</strong> - местная пиццерия против федеральной сети</List.Item>
                <List.Item>✅ <strong>Дешевле Pizza Time</strong> - доступные цены для жителей Волжска</List.Item>
                <List.Item>✅ <strong>Быстрее Pizza Express</strong> - оптимизированная доставка по городу</List.Item>
                <List.Item>✅ <strong>Вкуснее Модерниссимо</strong> - профессиональные итальянские повара</List.Item>
                <List.Item>✅ <strong>Качественнее Street Food</strong> - сертифицированные продукты</List.Item>
              </List>
            </Paper>
          </Stack>
        </Paper>

        {/* Преимущества доставки */}
        <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="lg">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md" align="center">
              <ThemeIcon size={60} radius="xl" color="orange" variant="light">
                <IconClock size={30} />
              </ThemeIcon>
              <Title order={4} ta="center">Быстрая доставка пиццы</Title>
              <Text size="sm" ta="center" c="dimmed">
                Горячая пицца с доставкой по Волжску за 30-60 минут. Водитель доставит пиццу точно в срок!
              </Text>
            </Stack>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md" align="center">
              <ThemeIcon size={60} radius="xl" color="green" variant="light">
                <IconTruck size={30} />
              </ThemeIcon>
              <Title order={4} ta="center">Бесплатная доставка пиццы</Title>
              <Text size="sm" ta="center" c="dimmed">
                Доставка пиццы без минимальной суммы заказа по району! Бесплатно от 800₽ по всему Волжску
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

        {/* Конкурентные преимущества ДИМБО Пицца */}
        <Paper p="xl" radius="lg" bg="yellow.0" withBorder>
          <Stack gap="lg">
            <Title order={2} ta="center" c="orange.8">
              ДИМБО vs конкуренты в Волжске: честное сравнение
            </Title>
            
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
              <Card padding="lg" radius="md" bg="white" withBorder>
                <Stack gap="sm">
                  <Title order={4} c="orange.7">🆚 Додо Пицца (ул. Ленина 52)</Title>
                  <Text size="sm" c="green.7" fw={600}>✅ ДИМБО лучше:</Text>
                  <List size="xs" spacing={4}>
                    <List.Item>Персональный подход, а не поток</List.Item>
                    <List.Item>Локальные рецепты для Волжска</List.Item>
                    <List.Item>Быстрее готовим - меньше ждете</List.Item>
                    <List.Item>Бесплатная доставка пиццы от 800₽</List.Item>
                  </List>
                </Stack>
              </Card>
              
              <Card padding="lg" radius="md" bg="white" withBorder>
                <Stack gap="sm">
                  <Title order={4} c="orange.7">🆚 Pizza Express & Pizza Time</Title>
                  <Text size="sm" c="green.7" fw={600}>✅ ДИМБО лучше:</Text>
                  <List size="xs" spacing={4}>
                    <List.Item>Стабильное качество каждый день</List.Item>
                    <List.Item>Профессиональная доставка пиццы</List.Item>
                    <List.Item>Гарантия свежести ингредиентов</List.Item>
                    <List.Item>Удобный онлайн заказ</List.Item>
                  </List>
                </Stack>
              </Card>
              
              <Card padding="lg" radius="md" bg="white" withBorder>
                <Stack gap="sm">
                  <Title order={4} c="orange.7">🆚 Фастфуд (Crazy Food, E-food)</Title>
                  <Text size="sm" c="green.7" fw={600}>✅ ДИМБО лучше:</Text>
                  <List size="xs" spacing={4}>
                    <List.Item>Настоящая итальянская пицца</List.Item>
                    <List.Item>Качественные ингредиенты</List.Item>
                    <List.Item>Готовая пицца с доставкой на дом</List.Item>
                    <List.Item>Подходим для семейного ужина</List.Item>
                  </List>
                </Stack>
              </Card>
            </SimpleGrid>
            
            <Text ta="center" size="sm" c="dimmed" style={{ fontStyle: 'italic' }}>
              Попробуйте ДИМБО Пицца в Волжске - почувствуйте разницу! Доставка пиццы 24 часа для вашего удобства.
            </Text>
          </Stack>
        </Paper>

        {/* Почему выбирают нас */}
        <Card shadow="sm" padding="xl" radius="lg" withBorder>
          <Stack gap="lg">
            <Title order={2} ta="center" c="orange.7">
              Почему ДИМБО Пицца лучше других пиццерий Волжска?
            </Title>
            
            <Text size="md" ta="center">
              В отличие от сетевых пиццерий (Додо Пицца на ул. Ленина 52), мы - локальная команда, которая работает 
              специально для жителей Волжска. Знаем ваши предпочтения лучше чем Pizza Time Cafe или Pizza Express. 
              Наша самая вкусная пицца с доставкой готовится с любовью к каждому клиенту!
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

// SEO блок с ответами на популярные вопросы
export function SEOQuestionsBlock() {
  return (
    <Paper p="xl" radius="lg" bg="gray.0" withBorder>
      <Stack gap="lg">
        <Title order={2} ta="center" c="orange.7">
          Часто задаваемые вопросы о доставке пиццы в Волжске
        </Title>
        
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          <Card padding="md" radius="md" bg="white">
            <Stack gap="xs">
              <Text fw={600} size="sm" c="orange.7">Как заказать пиццу с доставкой?</Text>
              <Text size="xs">
                Выберите пиццу в меню, добавьте в корзину, укажите адрес в Волжске и оформите заказ онлайн. 
                Время доставки пиццы составляет 30-60 минут.
              </Text>
            </Stack>
          </Card>
          
          <Card padding="md" radius="md" bg="white">
            <Stack gap="xs">
              <Text fw={600} size="sm" c="orange.7">Режим работы пиццерий с доставкой?</Text>
              <Text size="xs">
                ДИМБО Пицца работает ежедневно с 10:00 до 20:00. Принимаем заказы на доставку пиццы на дом 
                без выходных для удобства жителей Волжска.
              </Text>
            </Stack>
          </Card>
          
          <Card padding="md" radius="md" bg="white">
            <Stack gap="xs">
              <Text fw={600} size="sm" c="orange.7">Есть ли акции и скидки на доставку пиццы?</Text>
              <Text size="xs">
                Да! Бесплатная доставка пиццы от 800₽, скидки постоянным клиентам, 
                акции на популярные виды пиццы с доставкой. Следите за обновлениями!
              </Text>
            </Stack>
          </Card>
          
          <Card padding="md" radius="md" bg="white">
            <Stack gap="xs">
              <Text fw={600} size="sm" c="orange.7">Какие отзывы о доставке пиццы ДИМБО?</Text>
              <Text size="xs">
                Наши клиенты отмечают быстроту доставки, качество продуктов и вежливость курьеров. 
                Средняя оценка 4.8/5 за доставку пиццы в Волжске.
              </Text>
            </Stack>
          </Card>
        </SimpleGrid>
        
        <Text ta="center" size="sm" c="dimmed">
          <strong>Закрытая пицца</strong> доставляется в специальных термосумках для сохранения температуры. 
          Купить пиццу онлайн в Волжске стало проще с ДИМБО Пицца!
        </Text>
      </Stack>
    </Paper>
  )
}