import { BlogArticleTemplate } from '../../components/seo/BlogArticleTemplate'
import { BLOG_PAGES } from '../../data/blogData'

const config = BLOG_PAGES[10]

export function Blog10Page() {
  return <BlogArticleTemplate config={config} />
}
