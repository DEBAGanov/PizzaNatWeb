import { lazy } from 'react'
import type { SEORouteConfig } from '../utils/routeGenerator'
import { BLOG_PAGES } from '../data/blogData'

const blogComponents = Array.from({ length: 30 }, (_, i) =>
  lazy(() => import('../pages/blog').then(m => ({ default: (m as any)[`Blog${i}Page`] })))
)

export const blogRoutes: SEORouteConfig[] = BLOG_PAGES.map((page, i) => ({
  path: `/${page.slug}`,
  component: blogComponents[i],
}))
