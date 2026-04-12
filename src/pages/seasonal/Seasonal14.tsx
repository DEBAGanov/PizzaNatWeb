import { SeasonalPageTemplate } from '../../components/seo/SeasonalPageTemplate'
import { SEASONAL_PAGES } from '../../data/seasonalData'

const config = SEASONAL_PAGES[14]

export function Seasonal14Page() {
  return <SeasonalPageTemplate config={config} />
}
