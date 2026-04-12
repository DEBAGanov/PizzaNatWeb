import { ProductCityTemplate } from '../../components/seo/ProductCityTemplate'
import { VOLZHSK_PRODUCT_CITY_PAGES } from '../../data/productCityData'

const config = VOLZHSK_PRODUCT_CITY_PAGES[5]

export function ProductVolzhsk5Page() {
  return <ProductCityTemplate config={config} />
}
