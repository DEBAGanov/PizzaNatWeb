import { lazy } from 'react'
import type { SEORouteConfig } from '../utils/routeGenerator'
import { REVIEWS_PAGES } from '../data/reviewsData'

const OtzyvyDimboPizzaVolzhskPage = lazy(() => import('../pages/reviews').then(m => ({ default: m.OtzyvyDimboPizzaVolzhskPage })))
const OtzyvyDimboPizzaZelenodolskPage = lazy(() => import('../pages/reviews').then(m => ({ default: m.OtzyvyDimboPizzaZelenodolskPage })))
const ReytingPitstseriiVolzhskPage = lazy(() => import('../pages/reviews').then(m => ({ default: m.ReytingPitstseriiVolzhskPage })))
const LuchshieOtzyvyDimboPage = lazy(() => import('../pages/reviews').then(m => ({ default: m.LuchshieOtzyvyDimboPage })))

const pages = [
  OtzyvyDimboPizzaVolzhskPage, OtzyvyDimboPizzaZelenodolskPage,
  ReytingPitstseriiVolzhskPage, LuchshieOtzyvyDimboPage,
]

export const reviewRoutes: SEORouteConfig[] = REVIEWS_PAGES.map((page, i) => ({
  path: `/${page.slug}`,
  component: pages[i],
}))
