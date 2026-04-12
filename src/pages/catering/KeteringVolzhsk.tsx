import { CateringTemplate } from '../../components/seo/CateringTemplate'
import { CATERING_PAGES } from '../../data/cateringData'

const config = CATERING_PAGES[9]

export function KeteringVolzhskPage() {
  return <CateringTemplate config={config} />
}
