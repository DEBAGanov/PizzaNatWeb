import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[19]

export function Blog19Page() {
  return <BlogArticleTemplate config={config} />
}
