import { SeasonalPageTemplate } from '../../components/seo/SeasonalPageTemplate'
import { SEASONAL_PAGES } from '../../data/seasonalData'

const config = SEASONAL_PAGES[3]

export function Seasonal3Page() {
  return <SeasonalPageTemplate config={config} />
}
