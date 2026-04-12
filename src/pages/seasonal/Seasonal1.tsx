import { SeasonalPageTemplate } from '../../components/seo/SeasonalPageTemplate'
import { SEASONAL_PAGES } from '../../data/seasonalData'

const config = SEASONAL_PAGES[1]

export function Seasonal1Page() {
  return <SeasonalPageTemplate config={config} />
}
