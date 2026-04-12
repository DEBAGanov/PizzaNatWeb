import { CateringTemplate } from '../../components/seo/CateringTemplate'
import { CATERING_PAGES } from '../../data/cateringData'

const config = CATERING_PAGES[4]

export function SvadebnyyKeteringPage() {
  return <CateringTemplate config={config} />
}
