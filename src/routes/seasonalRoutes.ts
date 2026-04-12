import { lazy } from 'react'
import type { SEORouteConfig } from '../utils/routeGenerator'
import { SEASONAL_PAGES } from '../data/seasonalData'

const seasonalComponents = Array.from({ length: 15 }, (_, i) =>
  lazy(() => import('../pages/seasonal').then(m => ({ default: (m as any)[`Seasonal${i}Page`] })))
)

export const seasonalRoutes: SEORouteConfig[] = SEASONAL_PAGES.map((page, i) => ({
  path: `/${page.slug}`,
  component: seasonalComponents[i],
}))
