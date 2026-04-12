import { SeasonalPageTemplate } from '../../components/seo/SeasonalPageTemplate'
import { SEASONAL_PAGES } from '../../data/seasonalData'

const config = SEASONAL_PAGES[6]

export function Seasonal6Page() {
  return <SeasonalPageTemplate config={config} />
}
