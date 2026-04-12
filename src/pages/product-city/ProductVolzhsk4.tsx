import { ProductCityTemplate } from '../../components/seo/ProductCityTemplate'
import { VOLZHSK_PRODUCT_CITY_PAGES } from '../../data/productCityData'

const config = VOLZHSK_PRODUCT_CITY_PAGES[4]

export function ProductVolzhsk4Page() {
  return <ProductCityTemplate config={config} />
}
