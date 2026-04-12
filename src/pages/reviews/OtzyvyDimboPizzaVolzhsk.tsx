import { ReviewsPageTemplate } from '../../components/seo/ReviewsPageTemplate'
import { REVIEWS_PAGES } from '../../data/reviewsData'

const config = REVIEWS_PAGES[0]

export function OtzyvyDimboPizzaVolzhskPage() {
  return <ReviewsPageTemplate config={config} />
}
