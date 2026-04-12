import { SeasonalPageTemplate } from '../../components/seo/SeasonalPageTemplate'
import { SEASONAL_PAGES } from '../../data/seasonalData'

const config = SEASONAL_PAGES[13]

export function Seasonal13Page() {
  return <SeasonalPageTemplate config={config} />
}
