import { CateringTemplate } from '../../components/seo/CateringTemplate'
import { CATERING_PAGES } from '../../data/cateringData'

const config = CATERING_PAGES[2]

export function KorporativnoePitaniePage() {
  return <CateringTemplate config={config} />
}
