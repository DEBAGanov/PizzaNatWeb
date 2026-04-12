import { SeasonalPageTemplate } from '../../components/seo/SeasonalPageTemplate'
import { SEASONAL_PAGES } from '../../data/seasonalData'

const config = SEASONAL_PAGES[5]

export function Seasonal5Page() {
  return <SeasonalPageTemplate config={config} />
}
