import { lazy } from 'react'
import type { SEORouteConfig } from '../utils/routeGenerator'
import { ALL_PRODUCT_CITY_PAGES } from '../data/productCityData'

// Lazy import from barrel
const ProductVolzhsk0Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk0Page })))
const ProductVolzhsk1Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk1Page })))
const ProductVolzhsk2Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk2Page })))
const ProductVolzhsk3Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk3Page })))
const ProductVolzhsk4Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk4Page })))
const ProductVolzhsk5Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk5Page })))
const ProductVolzhsk6Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk6Page })))
const ProductVolzhsk7Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk7Page })))
const ProductVolzhsk8Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk8Page })))
const ProductVolzhsk9Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk9Page })))
const ProductVolzhsk10Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk10Page })))
const ProductVolzhsk11Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk11Page })))
const ProductVolzhsk12Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk12Page })))
const ProductVolzhsk13Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk13Page })))
const ProductVolzhsk14Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk14Page })))
const ProductVolzhsk15Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk15Page })))
const ProductVolzhsk16Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk16Page })))
const ProductVolzhsk17Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk17Page })))
const ProductVolzhsk18Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk18Page })))
const ProductVolzhsk19Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk19Page })))
const ProductVolzhsk20Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk20Page })))
const ProductVolzhsk21Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk21Page })))
const ProductVolzhsk22Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk22Page })))
const ProductVolzhsk23Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk23Page })))
const ProductVolzhsk24Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk24Page })))
const ProductVolzhsk25Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductVolzhsk25Page })))
const ProductZelenodolsk0Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk0Page })))
const ProductZelenodolsk1Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk1Page })))
const ProductZelenodolsk2Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk2Page })))
const ProductZelenodolsk3Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk3Page })))
const ProductZelenodolsk4Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk4Page })))
const ProductZelenodolsk5Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk5Page })))
const ProductZelenodolsk6Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk6Page })))
const ProductZelenodolsk7Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk7Page })))
const ProductZelenodolsk8Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk8Page })))
const ProductZelenodolsk9Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk9Page })))
const ProductZelenodolsk10Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk10Page })))
const ProductZelenodolsk11Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk11Page })))
const ProductZelenodolsk12Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk12Page })))
const ProductZelenodolsk13Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk13Page })))
const ProductZelenodolsk14Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk14Page })))
const ProductZelenodolsk15Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk15Page })))
const ProductZelenodolsk16Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk16Page })))
const ProductZelenodolsk17Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk17Page })))
const ProductZelenodolsk18Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk18Page })))
const ProductZelenodolsk19Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk19Page })))
const ProductZelenodolsk20Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk20Page })))
const ProductZelenodolsk21Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk21Page })))
const ProductZelenodolsk22Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk22Page })))
const ProductZelenodolsk23Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk23Page })))
const ProductZelenodolsk24Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk24Page })))
const ProductZelenodolsk25Page = lazy(() => import('../pages/product-city').then(m => ({ default: m.ProductZelenodolsk25Page })))

export const productCityRoutes: SEORouteConfig[] = [
  { path: `/${ALL_PRODUCT_CITY_PAGES[0].slug}`, component: ProductVolzhsk0Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[1].slug}`, component: ProductVolzhsk1Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[2].slug}`, component: ProductVolzhsk2Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[3].slug}`, component: ProductVolzhsk3Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[4].slug}`, component: ProductVolzhsk4Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[5].slug}`, component: ProductVolzhsk5Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[6].slug}`, component: ProductVolzhsk6Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[7].slug}`, component: ProductVolzhsk7Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[8].slug}`, component: ProductVolzhsk8Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[9].slug}`, component: ProductVolzhsk9Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[10].slug}`, component: ProductVolzhsk10Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[11].slug}`, component: ProductVolzhsk11Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[12].slug}`, component: ProductVolzhsk12Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[13].slug}`, component: ProductVolzhsk13Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[14].slug}`, component: ProductVolzhsk14Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[15].slug}`, component: ProductVolzhsk15Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[16].slug}`, component: ProductVolzhsk16Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[17].slug}`, component: ProductVolzhsk17Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[18].slug}`, component: ProductVolzhsk18Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[19].slug}`, component: ProductVolzhsk19Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[20].slug}`, component: ProductVolzhsk20Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[21].slug}`, component: ProductVolzhsk21Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[22].slug}`, component: ProductVolzhsk22Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[23].slug}`, component: ProductVolzhsk23Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[24].slug}`, component: ProductVolzhsk24Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[25].slug}`, component: ProductVolzhsk25Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[26].slug}`, component: ProductZelenodolsk0Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[27].slug}`, component: ProductZelenodolsk1Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[28].slug}`, component: ProductZelenodolsk2Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[29].slug}`, component: ProductZelenodolsk3Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[30].slug}`, component: ProductZelenodolsk4Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[31].slug}`, component: ProductZelenodolsk5Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[32].slug}`, component: ProductZelenodolsk6Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[33].slug}`, component: ProductZelenodolsk7Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[34].slug}`, component: ProductZelenodolsk8Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[35].slug}`, component: ProductZelenodolsk9Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[36].slug}`, component: ProductZelenodolsk10Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[37].slug}`, component: ProductZelenodolsk11Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[38].slug}`, component: ProductZelenodolsk12Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[39].slug}`, component: ProductZelenodolsk13Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[40].slug}`, component: ProductZelenodolsk14Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[41].slug}`, component: ProductZelenodolsk15Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[42].slug}`, component: ProductZelenodolsk16Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[43].slug}`, component: ProductZelenodolsk17Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[44].slug}`, component: ProductZelenodolsk18Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[45].slug}`, component: ProductZelenodolsk19Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[46].slug}`, component: ProductZelenodolsk20Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[47].slug}`, component: ProductZelenodolsk21Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[48].slug}`, component: ProductZelenodolsk22Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[49].slug}`, component: ProductZelenodolsk23Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[50].slug}`, component: ProductZelenodolsk24Page },
  { path: `/${ALL_PRODUCT_CITY_PAGES[51].slug}`, component: ProductZelenodolsk25Page },
]
