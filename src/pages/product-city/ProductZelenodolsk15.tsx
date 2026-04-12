import { ProductCityTemplate } from '../../components/seo/ProductCityTemplate'
import { ZELENODOLSK_PRODUCT_CITY_PAGES } from '../../data/productCityData'

const config = ZELENODOLSK_PRODUCT_CITY_PAGES[15]

export function ProductZelenodolsk15Page() {
  return <ProductCityTemplate config={config} />
}
