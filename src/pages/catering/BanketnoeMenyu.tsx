import { CateringTemplate } from '../../components/seo/CateringTemplate'
import { CATERING_PAGES } from '../../data/cateringData'

const config = CATERING_PAGES[3]

export function BanketnoeMenyuPage() {
  return <CateringTemplate config={config} />
}
