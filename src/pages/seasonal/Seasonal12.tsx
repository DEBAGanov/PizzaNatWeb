import { SeasonalPageTemplate } from '../../components/seo/SeasonalPageTemplate'
import { SEASONAL_PAGES } from '../../data/seasonalData'

const config = SEASONAL_PAGES[12]

export function Seasonal12Page() {
  return <SeasonalPageTemplate config={config} />
}
