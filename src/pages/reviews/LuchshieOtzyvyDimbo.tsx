import { ReviewsPageTemplate } from '../../components/seo/ReviewsPageTemplate'
import { REVIEWS_PAGES } from '../../data/reviewsData'

const config = REVIEWS_PAGES[3]

export function LuchshieOtzyvyDimboPage() {
  return <ReviewsPageTemplate config={config} />
}
