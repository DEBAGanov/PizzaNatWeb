/**
 * @file: App.tsx
 * @description: Главный компонент приложения PizzaNat Web с роутингом
 * @dependencies: Mantine, AuthContext, React Router, страницы
 * @created: 2024-12-19
 */

import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AppShell, Burger, Group, Button, Stack, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPizza, IconShoppingCart, IconUser, IconHome, IconMenu2, IconLogout } from '@tabler/icons-react'
import { useAuth } from './contexts/AuthContext'
import { useProducts } from './contexts/ProductsContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthPage } from './pages/AuthPage'
import { HomePage } from './pages/HomePage'
import { MenuPage } from './pages/MenuPage'
import { ProductPage } from './pages/ProductPage'
import { AuthTestPage } from './pages/AuthTestPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'

// Компонент с навигацией (внутри Router)
function AppWithRouter() {
  const [opened, { toggle }] = useDisclosure()
  const { user, logout } = useAuth()
  const { loadCategories } = useProducts()
  const navigate = useNavigate()
  const location = useLocation()

  // Загружаем данные при инициализации
  useEffect(() => {
    if (user) {
      console.log('🔄 Пользователь аутентифицирован, загружаем данные...')
      loadCategories()
    }
  }, [user, loadCategories])

  // Обработчик выхода
  const handleLogout = async () => {
    try {
      await logout()
      console.log('✅ Пользователь вышел из системы')
      navigate('/auth', { replace: true })
    } catch (error) {
      console.error('❌ Ошибка при выходе:', error)
    }
  }

  // Определяем активную страницу
  const isActive = (path: string) => location.pathname === path

  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route 
        path="/auth" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AuthPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/privacy" 
        element={
          <ProtectedRoute requireAuth={false}>
            <PrivacyPolicyPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Защищенные маршруты */}
      <Route 
        path="/*" 
        element={
          <ProtectedRoute requireAuth={true}>
            <AppShell
              header={{ height: 60 }}
              navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
              }}
              padding="md"
            >
              <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                  <Group>
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                      <IconPizza size={28} color="#ff8000" />
                      <Title order={3} c="orange.6">PizzaNat</Title>
                    </Group>
                  </Group>
                  <Group>
                    <Button variant="subtle" leftSection={<IconShoppingCart size={18} />}>
                      Корзина
                    </Button>
                    <Button variant="subtle" leftSection={<IconUser size={18} />}>
                      {user?.fullName || user?.username || 'Профиль'}
                    </Button>
                    <Button 
                      variant="subtle" 
                      color="red" 
                      leftSection={<IconLogout size={18} />} 
                      onClick={handleLogout}
                    >
                      Выйти
                    </Button>
                  </Group>
                </Group>
              </AppShell.Header>

              <AppShell.Navbar p="md">
                <Stack gap="xs">
                  <Button 
                    variant={isActive('/') ? "filled" : "light"}
                    color="orange"
                    leftSection={<IconHome size={18} />}
                    justify="flex-start"
                    fullWidth
                    onClick={() => navigate('/')}
                  >
                    Главная
                  </Button>
                  <Button 
                    variant={isActive('/menu') ? "filled" : "light"}
                    color="orange"
                    leftSection={<IconMenu2 size={18} />}
                    justify="flex-start"
                    fullWidth
                    onClick={() => navigate('/menu')}
                  >
                    Меню
                  </Button>
                  <Button 
                    variant="light" 
                    leftSection={<IconShoppingCart size={18} />}
                    justify="flex-start"
                    fullWidth
                    disabled
                  >
                    Корзина
                  </Button>
                  <Button 
                    variant="light" 
                    leftSection={<IconUser size={18} />}
                    justify="flex-start"
                    fullWidth
                    disabled
                  >
                    Профиль
                  </Button>
                </Stack>
              </AppShell.Navbar>

              <AppShell.Main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/auth-test" element={<AuthTestPage />} />
                </Routes>
              </AppShell.Main>
            </AppShell>
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

const App: React.FC = () => {
  return (
    <Router>
      <AppWithRouter />
    </Router>
  )
}

export default App
