/**
 * @file: LocalInfo.tsx
 * @description: Компонент с локальной информацией о пиццерии (по образцу Додо Пиццы)
 * @dependencies: Mantine UI, Tabler Icons
 * @created: 2025-01-27
 */

import React from 'react'
import { 
  Box, 
  Title, 
  Text, 
  Group, 
  Stack, 
  Card, 
  Badge,
  Divider,
  Button,
  Anchor
} from '@mantine/core'
import { 
  IconMapPin, 
  IconPhone, 
  IconClock, 
  IconTruck, 
  IconStar,
  IconCurrencyRubel,
  IconUsers
} from '@tabler/icons-react'

interface LocalInfoProps {
  variant?: 'full' | 'compact' | 'minimal'
  showRating?: boolean
  showDeliveryInfo?: boolean
  className?: string
}

/**
 * Компонент локальной информации о ДИМБО Пицца в Волжске
 * Создан по образцу успешных практик Додо Пиццы
 */
export const LocalInfo: React.FC<LocalInfoProps> = ({ 
  variant = 'full',
  showRating = true,
  showDeliveryInfo = true,
  className 
}) => {
  const localData = {
    name: 'ДИМБО Пицца',
    city: 'Волжск',
    address: 'ул. Шестакова, 1Б',
    phone: '+7(902)105-34-34',
    workingHours: 'Ежедневно 11:00-20:00',
    rating: '4.8',
    reviewsCount: '127',
    deliveryTime: '30-60 минут',
    deliveryZones: 'По всему Волжску',
    minOrder: '1000₽',
    deliveryFree: ''
  }

  if (variant === 'minimal') {
    return (
      <Box className={className}>
        <Group gap="xs" align="center">
          <IconMapPin size={16} color="var(--mantine-color-orange-6)" />
          <Text size="sm" c="dimmed">
            {localData.address}, {localData.city}
          </Text>
        </Group>
      </Box>
    )
  }

  if (variant === 'compact') {
    return (
      <Card shadow="sm" padding="md" radius="md" className={className}>
        <Stack gap="sm">
          <Group gap="xs" align="center">
            <IconMapPin size={18} color="var(--mantine-color-orange-6)" />
            <Text fw={500}>{localData.name} в {localData.city}</Text>
          </Group>
          
          <Group gap="xl">
            <Group gap="xs">
              <IconMapPin size={16} />
              <Text size="sm">{localData.address}</Text>
            </Group>
            
            <Group gap="xs">
              <IconPhone size={16} />
              <Anchor href={`tel:${localData.phone}`} size="sm">
                {localData.phone}
              </Anchor>
            </Group>
            
            <Group gap="xs">
              <IconClock size={16} />
              <Text size="sm">{localData.workingHours}</Text>
            </Group>
          </Group>

          {showRating && (
            <Group gap="xs">
              <IconStar size={16} color="var(--mantine-color-yellow-6)" />
              <Text size="sm" fw={500}>
                {localData.rating}/5
              </Text>
              <Text size="sm" c="dimmed">
                ({localData.reviewsCount} отзывов)
              </Text>
            </Group>
          )}
        </Stack>
      </Card>
    )
  }

  // Full variant
  return (
    <Card shadow="md" padding="lg" radius="md" className={className}>
      <Stack gap="md">
        {/* Заголовок */}
        <Group justify="space-between" align="flex-start">
          <Box>
            <Title order={3} c="orange.7">
              {localData.name} в {localData.city}
            </Title>
            <Text c="dimmed" size="sm">
              Доставка пиццы, суши, бургеров
            </Text>
          </Box>
          
          {showRating && (
            <Badge 
              size="lg" 
              variant="light" 
              color="yellow"
              leftSection={<IconStar size={14} />}
            >
              {localData.rating}/5
            </Badge>
          )}
        </Group>

        <Divider />

        {/* Основная информация */}
        <Stack gap="sm">
          <Group gap="sm" align="flex-start">
            <IconMapPin size={20} color="var(--mantine-color-orange-6)" />
            <Box>
              <Text fw={500}>Адрес</Text>
              <Text size="sm" c="dimmed">
                {localData.address}, {localData.city}
              </Text>
              <Text size="xs" c="dimmed">
                Республика Марий Эл
              </Text>
            </Box>
          </Group>

          <Group gap="sm" align="flex-start">
            <IconPhone size={20} color="var(--mantine-color-green-6)" />
            <Box>
              <Text fw={500}>Телефон</Text>
              <Anchor href={`tel:${localData.phone}`} size="sm">
                {localData.phone}
              </Anchor>
              <Text size="xs" c="dimmed">
                
              </Text>
            </Box>
          </Group>

          <Group gap="sm" align="flex-start">
            <IconClock size={20} color="var(--mantine-color-blue-6)" />
            <Box>
              <Text fw={500}>Режим работы</Text>
              <Text size="sm" c="dimmed">
                {localData.workingHours}
              </Text>
              <Text size="xs" c="dimmed">
                Без выходных
              </Text>
            </Box>
          </Group>
        </Stack>

        {showDeliveryInfo && (
          <>
            <Divider />
            
            {/* Информация о доставке */}
            <Stack gap="sm">
              <Title order={4} size="md" c="orange.7">
                Доставка в {localData.city}
              </Title>
              
              <Group gap="sm" align="flex-start">
                <IconTruck size={20} color="var(--mantine-color-orange-6)" />
                <Box>
                  <Text fw={500}>Время доставки</Text>
                  <Text size="sm" c="dimmed">
                    {localData.deliveryTime}
                  </Text>
                  <Text size="xs" c="dimmed">
                    В зависимости от района
                  </Text>
                </Box>
              </Group>

              <Group gap="sm" align="flex-start">
                <IconCurrencyRubel size={20} color="var(--mantine-color-green-6)" />
                <Box>
                  <Text fw={500}>Стоимость доставки</Text>
                  <Text size="sm" c="dimmed">
                    {localData.deliveryFree}
                  </Text>
                  <Text size="xs" c="dimmed">
                    Дружба, Маяк, Горгаз, Центр - 150₽ (от 1000₽ бесплатно)<br/>
                    Машинка, Заря - 200₽ (от 1500₽ бесплатно)<br/>
                    Луговая, Мамасево - 250₽ (от 2000₽ бесплатно)<br/>
                    Часовенная, Промзона, Волгарь - 300₽ (от 2500₽ бесплатно)<br/>
                  </Text>
                </Box>
              </Group>

              <Group gap="sm" align="flex-start">
                <IconMapPin size={20} color="var(--mantine-color-blue-6)" />
                <Box>
                  <Text fw={500}>Зона доставки</Text>
                  <Text size="sm" c="dimmed">
                    {localData.deliveryZones}
                  </Text>
                  <Text size="xs" c="dimmed">
                    Центр, Микрорайоны, Частный сектор
                  </Text>
                </Box>
              </Group>
            </Stack>
          </>
        )}

        {showRating && (
          <>
            <Divider />
            
            {/* Рейтинг и отзывы */}
            <Group justify="space-between" align="center">
              <Group gap="sm">
                <IconUsers size={20} color="var(--mantine-color-grape-6)" />
                <Box>
                  <Text fw={500}>Отзывы клиентов</Text>
                  <Group gap="xs">
                    <Text size="sm" c="dimmed">
                      {localData.reviewsCount} отзывов
                    </Text>
                    <Text size="sm" fw={500} c="yellow.7">
                      ⭐ {localData.rating}/5
                    </Text>
                  </Group>
                </Box>
              </Group>
              
              <Button 
                variant="light" 
                size="sm"
                color="orange"
                onClick={() => {
                  // Scroll to reviews section or open reviews modal
                  const reviewsSection = document.getElementById('reviews-section')
                  if (reviewsSection) {
                    reviewsSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                Читать отзывы
              </Button>
            </Group>
          </>
        )}

        {/* Call to Action */}
        {/* <Divider />
        
        <Group justify="center">
          <Button 
            size="md" 
            color="orange"
            leftSection={<IconPhone size={18} />}
            component="a"
            href={`tel:${localData.phone}`}
          >
            Позвонить и заказать
          </Button>
        </Group> */}
      </Stack>
    </Card>
  )
}

export default LocalInfo
