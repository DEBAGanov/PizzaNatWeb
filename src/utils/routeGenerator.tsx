import { type LazyExoticComponent, type ComponentType } from 'react'
import { useRoutes } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { TelegramBottomNav } from '../components/telegram/TelegramNavigation'

export interface SEORouteConfig {
  path: string
  component: LazyExoticComponent<ComponentType<any>> | ComponentType<any>
  props?: Record<string, any>
}

function seoRouteElement(Component: SEORouteConfig['component'], props?: Record<string, any>) {
  return (
    <ProtectedRoute requireAuth={false}>
      <AppShell padding="md">
        <AppShell.Main style={{ paddingBottom: '120px' }}>
          <Component {...(props || {})} />
        </AppShell.Main>
        <TelegramBottomNav />
      </AppShell>
    </ProtectedRoute>
  )
}

export function useSEORoutes(routeArrays: SEORouteConfig[][]) {
  const allRoutes = routeArrays.flat().map(route => ({
    path: route.path,
    element: seoRouteElement(route.component, route.props),
  }))
  return useRoutes(allRoutes)
}
