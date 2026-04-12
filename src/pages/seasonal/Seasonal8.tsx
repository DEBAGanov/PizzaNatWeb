import { SeasonalPageTemplate } from '../../components/seo/SeasonalPageTemplate'
import { SEASONAL_PAGES } from '../../data/seasonalData'

const config = SEASONAL_PAGES[8]

export function Seasonal8Page() {
  return <SeasonalPageTemplate config={config} />
}
