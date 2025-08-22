/**
 * @file: App.tsx
 * @description: Главный компонент приложения PizzaNat Web с роутингом
 * @dependencies: Mantine, AuthContext, React Router, страницы
 * @created: 2024-12-19
 */

import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import { useAuth } from './contexts/AuthContext'
import { useProducts } from './contexts/ProductsContext'
import { TelegramProvider, useIsTelegram } from './contexts/TelegramContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { YandexMetrikaProvider } from './components/analytics/YandexMetrika'
import { TelegramApp } from './components/telegram/TelegramApp'
import { TelegramBottomNav } from './components/telegram/TelegramNavigation'
import { AuthPage } from './pages/AuthPage'
import { HomePage } from './pages/HomePage'
import { MenuPage } from './pages/MenuPage'
import { CategoryProductsPage } from './pages/CategoryProductsPage'
import { ProductPage } from './pages/ProductPage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import ProfilePage from './pages/ProfilePage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import { AuthTestPage } from './pages/AuthTestPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import { DimboKidsPage } from './pages/DimboKidsPage'
import { PizzaSEOPage, ShashlykSEOPage, SushiSEOPage, BurgerSEOPage, WingsSEOPage, FriesSEOPage, FoodSEOPage, ShortKeywordSEOPage, NuggetsSEOPage } from './pages/product-seo'

// Компонент для определения платформы (внутри Router и TelegramProvider)
function PlatformRouter() {
  const isInTelegram = useIsTelegram()
  
  // Если мы в Telegram, рендерим Telegram версию
  if (isInTelegram) {
    return <TelegramApp />
  }
  
  // Иначе рендерим обычную веб версию
  return <WebApp />
}

// Роутер для страницы меню - показывает категории или продукты категории
function MenuPageRouter() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  // Если есть параметр category, показываем продукты категории
  if (categoryParam) {
    return <CategoryProductsPage />
  }
  
  // Иначе показываем список категорий
  return <MenuPage />
}

// Веб-версия приложения (переименованная из AppWithRouter)
function WebApp() {
  const { user } = useAuth()
  const { loadCategories, loadCart } = useProducts()

  // Загружаем категории только один раз
  useEffect(() => {
    console.log('🔄 Загружаем категории...')
    loadCategories()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Загружаем корзину при появлении пользователя
  useEffect(() => {
    if (user && user.id) {
      console.log('🔄 Пользователь аутентифицирован, загружаем корзину...', user.username, 'ID:', user.id)
      loadCart()
    }
  }, [user?.id]) // eslint-disable-line react-hooks/exhaustive-deps



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
      <Route 
        path="/dimbokids" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <DimboKidsPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      
      {/* SEO-страницы для продвижения по высокочастотным запросам */}
      <Route 
        path="/dostavka-pizzy" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <PizzaSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/zakazat-pizzu" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <PizzaSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dostavka-shashlyka" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <ShashlykSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/zakazat-shashlyk" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <ShashlykSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dostavka-sushi" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <SushiSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/zakazat-sushi" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <SushiSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dostavka-burgerov" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <BurgerSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/zakazat-burgery" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <BurgerSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dostavka-krylyshek" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <WingsSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/zakazat-krylyshki" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <WingsSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dostavka-kartoshki-fri" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <FriesSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/zakazat-kartoshku-fri" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <FriesSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dostavka-edy-volzhsk" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <FoodSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/zakazat-edu-volzhsk" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <FoodSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      
      {/* Короткие высокочастотные запросы */}
      <Route 
        path="/пицца" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <ShortKeywordSEOPage keyword="пицца" />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/суши" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <ShortKeywordSEOPage keyword="суши" />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/роллы" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <ShortKeywordSEOPage keyword="роллы" />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/бургеры" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <ShortKeywordSEOPage keyword="бургеры" />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/шашлык" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <ShortKeywordSEOPage keyword="шашлык" />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/картошка-фри" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <ShortKeywordSEOPage keyword="картошка-фри" />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/закрытая-пицца" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <ShortKeywordSEOPage keyword="закрытая-пицца" />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      
      {/* Нагетсы */}
      <Route 
        path="/доставка-нагетсов" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <NuggetsSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/заказать-нагетсы" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <NuggetsSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/нагетсы" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <NuggetsSEOPage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      
      {/* Главная страница БЕЗ авторизации для SEO */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute requireAuth={false}>
            <AppShell padding="md">
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <HomePage />
              </AppShell.Main>
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      
      {/* Защищенные маршруты */}
      <Route 
        path="/*" 
        element={
          <ProtectedRoute requireAuth={true}>
            <AppShell
              padding="md"
            >
              <AppShell.Main style={{ paddingBottom: '120px' }}>
                <Routes>
                  <Route path="/menu" element={<MenuPageRouter />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
                  <Route path="/auth-test" element={<AuthTestPage />} />
                </Routes>
              </AppShell.Main>
              
              {/* Bottom Navigation для веба */}
              <TelegramBottomNav />
            </AppShell>
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

const App: React.FC = () => {
  // ID счетчика Яндекс.Метрики
  const YANDEX_METRIKA_ID = import.meta.env.VITE_YANDEX_METRIKA_ID || '103585127'
  
  return (
    <YandexMetrikaProvider counterId={YANDEX_METRIKA_ID}>
      <Router>
        <TelegramProvider>
          <PlatformRouter />
        </TelegramProvider>
      </Router>
    </YandexMetrikaProvider>
  )
}

export default App
