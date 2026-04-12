import { SeasonalPageTemplate } from '../../components/seo/SeasonalPageTemplate'
import { SEASONAL_PAGES } from '../../data/seasonalData'

const config = SEASONAL_PAGES[9]

export function Seasonal9Page() {
  return <SeasonalPageTemplate config={config} />
}
