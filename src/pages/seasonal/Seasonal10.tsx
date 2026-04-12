import { SeasonalPageTemplate } from '../../components/seo/SeasonalPageTemplate'
import { SEASONAL_PAGES } from '../../data/seasonalData'

const config = SEASONAL_PAGES[10]

export function Seasonal10Page() {
  return <SeasonalPageTemplate config={config} />
}
