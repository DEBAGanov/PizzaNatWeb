import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { SEORouteConfig } from '../utils/routeGenerator'

const MasterclassBurgeryPage = lazy(() => import('../pages/masterclass').then(m => ({ default: m.MasterclassBurgeryPage })))

export const masterclassRoutes: SEORouteConfig[] = [
  { path: '/master-klass-po-prigotovleniyu-pitstsy', component: Navigate, props: { to: '/v1/master-klass', replace: true } },
  { path: '/master-klass-po-prigotovleniyu-burgerov', component: MasterclassBurgeryPage },
]
