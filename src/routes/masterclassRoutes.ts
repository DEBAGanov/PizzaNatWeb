import { lazy } from 'react'
import type { SEORouteConfig } from '../utils/routeGenerator'

const MasterclassPitstsaPage = lazy(() => import('../pages/masterclass').then(m => ({ default: m.MasterclassPitstsaPage })))
const MasterclassBurgeryPage = lazy(() => import('../pages/masterclass').then(m => ({ default: m.MasterclassBurgeryPage })))

export const masterclassRoutes: SEORouteConfig[] = [
  { path: '/master-klass-po-prigotovleniyu-pitstsy', component: MasterclassPitstsaPage },
  { path: '/master-klass-po-prigotovleniyu-burgerov', component: MasterclassBurgeryPage },
]
