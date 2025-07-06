/**
 * @file: AppInstallButtons.tsx
 * @description: Компонент кнопок установки мобильных приложений
 * @dependencies: Mantine
 * @created: 2025-01-07
 */

import { Stack, Text, UnstyledButton, Group, Image } from '@mantine/core'
import { APP_LINKS } from '../config/appLinks'

interface AppInstallButtonsProps {
  googlePlayUrl?: string
  ruStoreUrl?: string
  title?: string
}

export function AppInstallButtons({ 
  googlePlayUrl = APP_LINKS.googlePlay, 
  ruStoreUrl = APP_LINKS.ruStore,
  title = "Скачайте приложение на телефон для удобного заказа пиццы"
}: AppInstallButtonsProps) {
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
    <Stack gap="md" mt="xl">
      <Text size="sm" ta="center" c="dimmed">
        {title}
      </Text>
      
      <Group justify="center" gap="sm">
        {/* Google Play Store */}
        <UnstyledButton
          onClick={handleGooglePlayClick}
          style={{
            borderRadius: '8px',
            transition: 'all 0.2s ease',
          }}
          styles={{
            root: {
              '&:hover': {
                transform: 'scale(1.05)',
                opacity: 0.9,
              },
            },
          }}
        >
          <Image
            src="/images/app-store/google-play-badge.svg"
            alt="Скачать в Google Play"
            h={40}
            w="auto"
            fit="contain"
          />
        </UnstyledButton>

        {/* RuStore - используем PNG логотип */}
        <UnstyledButton
          onClick={handleRuStoreClick}
          style={{
            borderRadius: '8px',
            transition: 'all 0.2s ease',
          }}
          styles={{
            root: {
              '&:hover': {
                transform: 'scale(1.05)',
                opacity: 0.9,
              },
            },
          }}
        >
          <Image
            src="/images/app-store/logo-color-light.svg"
            alt="Скачать в RuStore"
            h={40}
            w="auto"
            fit="contain"
          />
        </UnstyledButton>
      </Group>
    </Stack>
  )
} 