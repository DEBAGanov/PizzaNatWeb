import { SeasonalPageTemplate } from '../../components/seo/SeasonalPageTemplate'
import { SEASONAL_PAGES } from '../../data/seasonalData'

const config = SEASONAL_PAGES[2]

export function Seasonal2Page() {
  return <SeasonalPageTemplate config={config} />
}
