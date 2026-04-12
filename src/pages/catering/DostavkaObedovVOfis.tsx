import { CateringTemplate } from '../../components/seo/CateringTemplate'
import { CATERING_PAGES } from '../../data/cateringData'

const config = CATERING_PAGES[8]

export function DostavkaObedovVOfisPage() {
  return <CateringTemplate config={config} />
}
