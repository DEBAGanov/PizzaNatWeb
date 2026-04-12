import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[11]

export function Blog11Page() {
  return <BlogArticleTemplate config={config} />
}
