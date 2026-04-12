import { SeasonalPageTemplate } from '../../components/seo/SeasonalPageTemplate'
import { SEASONAL_PAGES } from '../../data/seasonalData'

const config = SEASONAL_PAGES[11]

export function Seasonal11Page() {
  return <SeasonalPageTemplate config={config} />
}
