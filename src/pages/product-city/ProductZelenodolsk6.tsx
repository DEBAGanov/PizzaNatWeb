import { ProductCityTemplate } from '../../components/seo/ProductCityTemplate'
import { ZELENODOLSK_PRODUCT_CITY_PAGES } from '../../data/productCityData'

const config = ZELENODOLSK_PRODUCT_CITY_PAGES[6]

export function ProductZelenodolsk6Page() {
  return <ProductCityTemplate config={config} />
}
