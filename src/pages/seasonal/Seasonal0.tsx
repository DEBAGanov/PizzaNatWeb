import { SeasonalPageTemplate } from '../../components/seo/SeasonalPageTemplate'
import { SEASONAL_PAGES } from '../../data/seasonalData'

const config = SEASONAL_PAGES[0]

export function Seasonal0Page() {
  return <SeasonalPageTemplate config={config} />
}
