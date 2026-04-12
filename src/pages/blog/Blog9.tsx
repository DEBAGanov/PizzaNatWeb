import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[9]

export function Blog9Page() {
  return <BlogArticleTemplate config={config} />
}
