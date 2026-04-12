import { CateringTemplate } from '../../components/seo/CateringTemplate'
import { CATERING_PAGES } from '../../data/cateringData'

const config = CATERING_PAGES[0]

export function Page() {
  return <CateringTemplate config={config} />
}
