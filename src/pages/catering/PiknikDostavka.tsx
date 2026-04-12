import { CateringTemplate } from '../../components/seo/CateringTemplate'
import { CATERING_PAGES } from '../../data/cateringData'

const config = CATERING_PAGES[5]

export function PiknikDostavkaPage() {
  return <CateringTemplate config={config} />
}
