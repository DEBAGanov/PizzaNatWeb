import { lazy } from 'react'
import type { SEORouteConfig } from '../utils/routeGenerator'
import { CATERING_PAGES } from '../data/cateringData'

const KeteringDlyaOfisaPage = lazy(() => import('../pages/catering').then(m => ({ default: m.KeteringDlyaOfisaPage })))
const KorporativnoePitaniePage = lazy(() => import('../pages/catering').then(m => ({ default: m.KorporativnoePitaniePage })))
const BanketnoeMenyuPage = lazy(() => import('../pages/catering').then(m => ({ default: m.BanketnoeMenyuPage })))
const SvadebnyyKeteringPage = lazy(() => import('../pages/catering').then(m => ({ default: m.SvadebnyyKeteringPage })))
const PiknikDostavkaPage = lazy(() => import('../pages/catering').then(m => ({ default: m.PiknikDostavkaPage })))
const FurshetnayaDostavkaPage = lazy(() => import('../pages/catering').then(m => ({ default: m.FurshetnayaDostavkaPage })))
const DetskiyPrazdnikKeteringPage = lazy(() => import('../pages/catering').then(m => ({ default: m.DetskiyPrazdnikKeteringPage })))
const DostavkaObedovVOfisPage = lazy(() => import('../pages/catering').then(m => ({ default: m.DostavkaObedovVOfisPage })))
const KeteringVolzhskPage = lazy(() => import('../pages/catering').then(m => ({ default: m.KeteringVolzhskPage })))
const KeteringZelenodolskPage = lazy(() => import('../pages/catering').then(m => ({ default: m.KeteringZelenodolskPage })))

const pages = [
  KeteringDlyaOfisaPage, KorporativnoePitaniePage, BanketnoeMenyuPage,
  SvadebnyyKeteringPage, PiknikDostavkaPage, FurshetnayaDostavkaPage,
  DetskiyPrazdnikKeteringPage, DostavkaObedovVOfisPage, KeteringVolzhskPage,
  KeteringZelenodolskPage,
]

export const cateringRoutes: SEORouteConfig[] = CATERING_PAGES.map((page, i) => ({
  path: `/${page.slug}`,
  component: pages[i],
}))
