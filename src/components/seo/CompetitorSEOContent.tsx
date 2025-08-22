/**
 * @file: CompetitorSEOContent.tsx  
 * @description: SEO контент против конкурентов в Волжске
 * @dependencies: Mantine, competitorAnalysis.ts
 * @created: 2025-01-26
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
  Divider,
  Badge
} from '@mantine/core'
import {
  IconVs,
  IconTrendingUp,
  IconCurrency,
  IconClock,
  IconChefHat,
  IconStar,
  IconMapPin
} from '@tabler/icons-react'

// Компонент сравнения с конкурентами
export function CompetitorComparisonSEO() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        
        {/* Заголовок секции */}
        <Paper p="xl" radius="lg" withBorder bg="gradient-to-r from-orange-50 to-yellow-50">
          <Title order={2} ta="center" c="orange.7" mb="md">
            🥇 Почему ДИМБО Пицца вкуснее конкурентов в Волжске?
          </Title>
          <Text ta="center" size="lg" c="dimmed">
            Сравниваем нашу пиццерию с основными конкурентами города Волжск, 
            Республика Марий Эл. Объективный анализ качества, цен и сервиса.
          </Text>
        </Paper>

        {/* Сравнение с прямыми конкурентами пиццериями */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} c="orange.7" mb="md">
            🍕 Сравнение с пиццериями Волжска
          </Title>
          
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
            
            {/* VS Додо Пицца */}
            <Paper p="md" radius="md" withBorder>
              <Group mb="sm">
                <ThemeIcon color="orange" variant="light">
                  <IconVs size="1rem" />
                </ThemeIcon>
                <Text fw={600}>ДИМБО vs Додо Пицца (ул. Ленина, 52/2)</Text>
              </Group>
              <List spacing="xs" size="sm">
                <List.Item>✅ <strong>Местная vs сетевая</strong> - знаем вкусы волжан</List.Item>
                <List.Item>✅ <strong>Свежие ингредиенты</strong> - не замороженные полуфабрикаты</List.Item>
                <List.Item>✅ <strong>Персональный подход</strong> - не конвейерное производство</List.Item>
                <List.Item>✅ <strong>Доступные цены</strong> - без наценки за бренд</List.Item>
              </List>
            </Paper>

            {/* VS Pizza Time */}
            <Paper p="md" radius="md" withBorder>
              <Group mb="sm">
                <ThemeIcon color="blue" variant="light">
                  <IconCurrency size="1rem" />
                </ThemeIcon>
                <Text fw={600}>ДИМБО vs Pizza Time (ул. Ленина, 62в)</Text>
              </Group>
              <List spacing="xs" size="sm">
                <List.Item>✅ <strong>Дешевле на 15-20%</strong> - выгодные цены</List.Item>
                <List.Item>✅ <strong>Больше начинки</strong> - не экономим на ингредиентах</List.Item>
                <List.Item>✅ <strong>Вкуснее всех тесто</strong> - итальянская рецептура</List.Item>
                <List.Item>✅ <strong>Стабильное качество</strong> - контроль каждой пиццы</List.Item>
              </List>
            </Paper>

            {/* VS Pizza Express */}
            <Paper p="md" radius="md" withBorder>
              <Group mb="sm">
                <ThemeIcon color="green" variant="light">
                  <IconClock size="1rem" />
                </ThemeIcon>
                <Text fw={600}>ДИМБО vs Pizza Express (ул. Ленина, 63/2)</Text>
              </Group>
              <List spacing="xs" size="sm">
                <List.Item>✅ <strong>Быстрее доставка</strong> - 30-45 минут против 60</List.Item>
                <List.Item>✅ <strong>Горячая пицца</strong> - термосумки и быстрая логистика</List.Item>
                <List.Item>✅ <strong>Точность времени</strong> - не опаздываем</List.Item>
                <List.Item>✅ <strong>Больше курьеров</strong> - всегда доставим вовремя</List.Item>
              </List>
            </Paper>

            {/* VS Модерниссимо */}
            <Paper p="md" radius="md" withBorder>
              <Group mb="sm">
                <ThemeIcon color="grape" variant="light">
                  <IconChefHat size="1rem" />
                </ThemeIcon>
                <Text fw={600}>ДИМБО vs Модерниссимо (ул. Ленина, 52)</Text>
              </Group>
              <List spacing="xs" size="sm">
                <List.Item>✅ <strong>Вкуснее рецепты</strong> - проверенные итальянские традиции</List.Item>
                <List.Item>✅ <strong>Вкуснее всех сыры</strong> - моцарелла премиум класса</List.Item>
                <List.Item>✅ <strong>Сочная начинка</strong> - больше мяса и овощей</List.Item>
                <List.Item>✅ <strong>Хрустящее тесто</strong> - секретная рецептура</List.Item>
              </List>
            </Paper>
          </SimpleGrid>
        </Card>

        {/* Сравнение с доставкой других видов еды */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} c="orange.7" mb="md">
            🥘 Сравнение с другими службами доставки в Волжске
          </Title>
          
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
            
            {/* VS Японский городовой */}
            <Paper p="md" radius="md" withBorder>
              <Group mb="sm">
                <ThemeIcon color="red" variant="light">
                  <IconStar size="1rem" />
                </ThemeIcon>
                <Text fw={600} size="sm">vs Японский городовой</Text>
              </Group>
              <List spacing="xs" size="xs">
                <List.Item>✅ Европейская кухня vs азиатская</List.Item>
                <List.Item>✅ Привычные вкусы для волжан</List.Item>
                <List.Item>✅ Больше вариантов для детей</List.Item>
              </List>
            </Paper>

            {/* VS Street Food */}
            <Paper p="md" radius="md" withBorder>
              <Group mb="sm">
                <ThemeIcon color="yellow" variant="light">
                  <IconTrendingUp size="1rem" />
                </ThemeIcon>
                <Text fw={600} size="sm">vs Street Food</Text>
              </Group>
              <List spacing="xs" size="xs">
                <List.Item>✅ Ресторанное качество vs уличная еда</List.Item>
                <List.Item>✅ Чистая кухня и сертификаты</List.Item>
                <List.Item>✅ Полноценный обед vs снэки</List.Item>
              </List>
            </Paper>

            {/* VS Азия Mix */}
            <Paper p="md" radius="md" withBorder>
              <Group mb="sm">
                <ThemeIcon color="teal" variant="light">
                  <IconMapPin size="1rem" />
                </ThemeIcon>
                <Text fw={600} size="sm">vs Азия Mix</Text>
              </Group>
              <List spacing="xs" size="xs">
                <List.Item>✅ Итальянская классика vs эксперименты</List.Item>
                <List.Item>✅ Понятные ингредиенты</List.Item>
                <List.Item>✅ Семейные рецепты</List.Item>
              </List>
            </Paper>
          </SimpleGrid>
        </Card>

        {/* Локальные преимущества */}
        <Paper p="xl" radius="lg" withBorder bg="blue.0">
          <Title order={3} c="blue.7" mb="md">
            📍 Почему местные жители Волжска выбирают ДИМБО Пиццу?
          </Title>
          
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
            <div>
              <Text fw={600} c="blue.8" mb="xs">🏠 Знаем местные особенности:</Text>
              <List spacing="xs" size="sm">
                <List.Item>Адреса всех районов Волжска</List.Item>
                <List.Item>Быстрые маршруты доставки</List.Item>
                <List.Item>Учитываем местные вкусовые предпочтения</List.Item>
                <List.Item>Работаем в удобное для волжан время</List.Item>
              </List>
            </div>
            
            <div>
              <Text fw={600} c="blue.8" mb="xs">💝 Заботимся о земляках:</Text>
              <List spacing="xs" size="sm">
                <List.Item>Особые скидки для постоянных клиентов</List.Item>
                <List.Item>Бесплатная доставка по всему городу</List.Item>
                <List.Item>Персональный подход к каждому заказу</List.Item>
                <List.Item>Поддерживаем местную экономику</List.Item>
              </List>
            </div>
          </SimpleGrid>
        </Paper>

        {/* SEO текст в конце */}
        <Paper p="md" radius="md" bg="gray.0">
          <Text size="sm" c="dimmed" ta="center">
            <strong>ДИМБО Пицца в Волжске</strong> - ваша вкуснее всех альтернатива всем конкурентам на улице Ленина. 
            Мы превосходим Додо Пиццу по качеству, Pizza Time по цене, Pizza Express по скорости, 
            а Модерниссимо по вкусу. Закажите пиццу в ДИМБО и убедитесь сами!
          </Text>
        </Paper>

      </Stack>
    </Container>
  )
}