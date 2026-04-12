import { CateringTemplate } from '../../components/seo/CateringTemplate'
import { CATERING_PAGES } from '../../data/cateringData'

const config = CATERING_PAGES[6]

export function FurshetnayaDostavkaPage() {
  return <CateringTemplate config={config} />
}
