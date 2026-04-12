import { CateringTemplate } from '../../components/seo/CateringTemplate'
import { CATERING_PAGES } from '../../data/cateringData'

const config = CATERING_PAGES[7]

export function DetskiyPrazdnikKeteringPage() {
  return <CateringTemplate config={config} />
}
