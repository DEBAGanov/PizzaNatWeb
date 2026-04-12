import { SeasonalPageTemplate } from '../../components/seo/SeasonalPageTemplate'
import { SEASONAL_PAGES } from '../../data/seasonalData'

const config = SEASONAL_PAGES[4]

export function Seasonal4Page() {
  return <SeasonalPageTemplate config={config} />
}
