/**
 * @file: AppStoreLinks.tsx
 * @description: Компонент с ссылками на магазины приложений
 * @dependencies: Mantine, иконки
 * @created: 2024-12-19
 */

import { Group, Paper, Text, UnstyledButton, Stack, Badge } from '@mantine/core'
import { IconBrandGooglePlay, IconDeviceMobile } from '@tabler/icons-react'

interface AppStoreLinksProps {
  googlePlayUrl?: string
  ruStoreUrl?: string
}

export function AppStoreLinks({ 
  googlePlayUrl = '#', 
  ruStoreUrl = '#' 
}: AppStoreLinksProps) {
  const handleGooglePlayClick = () => {
    if (googlePlayUrl && googlePlayUrl !== '#') {
      window.open(googlePlayUrl, '_blank', 'noopener,noreferrer')
    } else {
      console.log('Google Play URL не настроен')
    }
  }

  const handleRuStoreClick = () => {
    if (ruStoreUrl && ruStoreUrl !== '#') {
      window.open(ruStoreUrl, '_blank', 'noopener,noreferrer')
    } else {
      console.log('RuStore URL не настроен')
    }
  }

  return (
    <Paper p="md" shadow="sm" radius="md" style={{ marginTop: '20px' }}>
      <Stack gap="md">
        <Text size="sm" fw={500} ta="center" c="dimmed">
          Скачайте мобильное приложение PizzaNat
        </Text>
        
        <Group justify="center" gap="md">
          {/* Google Play Store */}
          <UnstyledButton
            onClick={handleGooglePlayClick}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#fff',
              transition: 'all 0.2s ease',
              minWidth: '140px',
            }}
            styles={{
              root: {
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
              },
            }}
          >
            <IconBrandGooglePlay 
              size={24} 
              style={{ color: '#34A853' }}
            />
            <Stack gap={2} style={{ alignItems: 'flex-start' }}>
              <Text size="xs" c="dimmed" style={{ lineHeight: 1 }}>
                Доступно в
              </Text>
              <Text size="sm" fw={500} style={{ lineHeight: 1 }}>
                Google Play
              </Text>
            </Stack>
          </UnstyledButton>

          {/* RuStore */}
          <UnstyledButton
            onClick={handleRuStoreClick}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#fff',
              transition: 'all 0.2s ease',
              minWidth: '140px',
            }}
            styles={{
              root: {
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
              },
            }}
          >
            <IconDeviceMobile 
              size={24} 
              style={{ color: '#FF6B35' }}
            />
            <Stack gap={2} style={{ alignItems: 'flex-start' }}>
              <Text size="xs" c="dimmed" style={{ lineHeight: 1 }}>
                Доступно в
              </Text>
              <Text size="sm" fw={500} style={{ lineHeight: 1 }}>
                RuStore
              </Text>
            </Stack>
          </UnstyledButton>
        </Group>

        {/* Дополнительная информация */}
        <Group justify="center" gap="xs">
          <Badge variant="light" color="green" size="sm">
            Бесплатно
          </Badge>
          <Badge variant="light" color="blue" size="sm">
            Быстрая доставка
          </Badge>
          <Badge variant="light" color="orange" size="sm">
            Скидки
          </Badge>
        </Group>

        <Text size="xs" ta="center" c="dimmed" style={{ marginTop: '8px' }}>
          Устанавливайте приложение для более удобного заказа пиццы
        </Text>
      </Stack>
    </Paper>
  )
} 