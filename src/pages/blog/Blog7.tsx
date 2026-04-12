import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[7]

export function Blog7Page() {
  return <BlogArticleTemplate config={config} />
}
