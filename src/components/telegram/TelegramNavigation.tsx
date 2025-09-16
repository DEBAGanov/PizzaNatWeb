/**
 * @file: TelegramNavigation.tsx
 * @description: Адаптивная навигация для Telegram Web App
 * @dependencies: Mantine, React Router, useTelegram
 * @created: 2025-01-24
 */

import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Container,
  Group,
  UnstyledButton,
  Text,
  ActionIcon,
  Badge,
  Paper,
  Tabs
} from '@mantine/core'
import {
  IconHome,
  IconPizza,
  IconShoppingCart,
  IconArrowLeft,
  IconUser
} from '@tabler/icons-react'
import { useTelegram } from '../../contexts/TelegramContext'
import { useAuth } from '../../contexts/AuthContext'
import { useProducts } from '../../contexts/ProductsContext'

// Telegram Header - минималистичный заголовок
export const TelegramHeader: React.FC<{ title?: string; showBackButton?: boolean }> = ({
  title = 'ДИМБО Пицца',
  showBackButton = false
}) => {
  const navigate = useNavigate()
  const { isInTelegram, hapticFeedback } = useTelegram()
  const { user } = useAuth()

  const handleBack = () => {
    hapticFeedback.impact('light')
    navigate(-1)
  }

  const handleProfile = () => {
    hapticFeedback.impact('light')
    if (user) {
      navigate('/profile')
    } else {
      navigate('/auth')
    }
  }

  return (
    <Paper 
      shadow="xs" 
      p="md" 
      style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 100,
        borderRadius: 0,
        borderBottom: '1px solid var(--mantine-color-gray-2)'
      }}
    >
      <Container size="lg">
        <Group justify="space-between" align="center">
          <Group>
            {showBackButton && (
              <ActionIcon
                variant="subtle"
                color="orange"
                onClick={handleBack}
                size="lg"
              >
                <IconArrowLeft size={20} />
              </ActionIcon>
            )}
            <Text fw={600} size="lg" c="orange.7">
              {title}
            </Text>
          </Group>

          {!isInTelegram && (
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={handleProfile}
              size="lg"
            >
              <IconUser size={20} />
            </ActionIcon>
          )}
        </Group>
      </Container>
    </Paper>
  )
}

// Telegram Bottom Navigation - для основных разделов
export const TelegramBottomNav: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isInTelegram, hapticFeedback } = useTelegram()
  const { state: { cart }, getCartItemsCount } = useProducts()
  const { user } = useAuth()

  if (isInTelegram) {
    // В Telegram не показываем bottom nav, используем Telegram UI
    return null
  }

  const navItems = [
    {
      icon: IconHome,
      label: 'Главная',
      path: '/',
      active: location.pathname === '/'
    },
    {
      icon: IconPizza,
      label: 'Меню',
      path: '/menu',
      active: location.pathname === '/menu'
    },
    {
      icon: IconShoppingCart,
      label: 'Корзина',
      path: '/cart',
      active: location.pathname === '/cart',
      badge: getCartItemsCount()
    },
    {
      icon: IconUser,
      label: 'Профиль',
      path: user ? '/profile' : '/auth',
      active: location.pathname.startsWith('/profile'),
      disabled: false
    }
  ]

  const handleNavigation = (path: string, disabled: boolean = false) => {
    if (disabled) return
    
    hapticFeedback.impact('light')
    navigate(path)
  }

  return (
    <Paper
      shadow="lg"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderRadius: '16px 16px 0 0',
        borderTop: '1px solid var(--mantine-color-gray-2)'
      }}
      p="xs"
    >
      <Container size="lg" px="xs" className="mobile-bottom-nav">
        <div className="flex-between flex-nowrap" style={{
          gap: '4px',
          minHeight: '60px'
        }}>
          {navItems.map((item) => (
            <UnstyledButton
              key={item.path}
              onClick={() => handleNavigation(item.path, item.disabled)}
              className="mobile-bottom-nav-item mobile-touch-target"
              style={{
                flex: '1 1 0',
                minWidth: '0',
                padding: '6px 4px',
                borderRadius: '12px',
                backgroundColor: item.active ? 'var(--mantine-color-orange-0)' : 'transparent',
                opacity: item.disabled ? 0.5 : 1,
                cursor: item.disabled ? 'not-allowed' : 'pointer'
              }}
            >
              <div className="flex-center" style={{ 
                position: 'relative',
                marginBottom: '4px'
              }}>
                <item.icon
                  className="mobile-bottom-nav-icon"
                  size={18}
                  color={item.active ? 'var(--mantine-color-orange-7)' : 'var(--mantine-color-gray-6)'}
                />
                {item.badge && item.badge > 0 && (
                  <Badge
                    size="xs"
                    color="red"
                    style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      minWidth: 14,
                      height: 14,
                      padding: 0,
                      fontSize: '9px'
                    }}
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </Badge>
                )}
              </div>
              <Text
                className="mobile-bottom-nav-text"
                size="10px"
                fw={item.active ? 600 : 400}
                c={item.active ? 'orange.7' : 'gray.6'}
                style={{
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%'
                }}
              >
                {item.label}
              </Text>
            </UnstyledButton>
          ))}
        </div>
      </Container>
    </Paper>
  )
}

// Telegram Tabs Navigation - для переключения между категориями
export const TelegramTabs: React.FC<{
  tabs: Array<{ value: string; label: string; count?: number }>
  value: string
  onChange: (value: string) => void
}> = ({ tabs, value, onChange }) => {
  const { hapticFeedback } = useTelegram()

  const handleTabChange = (newValue: string) => {
    hapticFeedback.selection()
    onChange(newValue)
  }

  return (
    <Tabs value={value} onChange={handleTabChange} variant="pills">
      <Tabs.List grow>
        {tabs.map((tab) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            rightSection={
              tab.count ? (
                <Badge size="xs" color="orange" variant="filled">
                  {tab.count}
                </Badge>
              ) : undefined
            }
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  )
}

// Компонент для безопасного отступа в Telegram
export const TelegramSafeArea: React.FC<{ children: React.ReactNode; bottom?: boolean }> = ({
  children,
  bottom = false
}) => {
  const { isInTelegram } = useTelegram()

  if (!isInTelegram) {
    return <>{children}</>
  }

  return (
    <div
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: bottom ? 'calc(env(safe-area-inset-bottom) + 60px)' : 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)'
      }}
    >
      {children}
    </div>
  )
}

// Bread Crumbs для Telegram (упрощенные)
export const TelegramBreadcrumbs: React.FC<{
  items: Array<{ label: string; path?: string }>
}> = ({ items }) => {
  const navigate = useNavigate()
  const { hapticFeedback } = useTelegram()

  const handleBreadcrumbClick = (path?: string) => {
    if (path) {
      hapticFeedback.impact('light')
      navigate(path)
    }
  }

  return (
    <Group gap="xs" mb="md">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Text size="sm" c="dimmed">
              /
            </Text>
          )}
          <UnstyledButton
            onClick={() => handleBreadcrumbClick(item.path)}
            disabled={!item.path}
          >
            <Text
              size="sm"
              c={item.path ? 'orange.7' : 'dimmed'}
              td={item.path ? 'underline' : 'none'}
            >
              {item.label}
            </Text>
          </UnstyledButton>
        </React.Fragment>
      ))}
    </Group>
  )
}