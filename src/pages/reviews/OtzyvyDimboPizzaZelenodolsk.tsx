import { ReviewsPageTemplate } from '../../components/seo/ReviewsPageTemplate'
import { REVIEWS_PAGES } from '../../data/reviewsData'

const config = REVIEWS_PAGES[1]

export function OtzyvyDimboPizzaZelenodolskPage() {
  return <ReviewsPageTemplate config={config} />
}
