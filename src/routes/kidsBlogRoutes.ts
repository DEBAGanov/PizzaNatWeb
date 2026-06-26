import { lazy } from 'react'
import type { SEORouteConfig } from '../utils/routeGenerator'
import { KIDS_BLOG_PAGES } from '../data/kidsBlogData'

// Все детские статьи рендерит один резолвер KidsArticlePage (по pathname)
const KidsArticlePage = lazy(() =>
  import('../pages/blog/KidsArticlePage').then((m) => ({ default: m.KidsArticlePage }))
)

export const kidsBlogRoutes: SEORouteConfig[] = KIDS_BLOG_PAGES.map((p) => ({
  path: `/${p.slug}`,
  component: KidsArticlePage,
}))
