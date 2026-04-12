import { SeasonalPageTemplate } from '../../components/seo/SeasonalPageTemplate'
import { SEASONAL_PAGES } from '../../data/seasonalData'

const config = SEASONAL_PAGES[7]

export function Seasonal7Page() {
  return <SeasonalPageTemplate config={config} />
}
